const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const ITINRequest = require('../models/ITINRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/itin-passport-scans');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer disk storage for passport scans
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${timestamp}-${sanitizedName}`);
  }
});

const allowedMime = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const fileFilter = (req, file, cb) => {
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or image files are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
});

// Validation rules for ITIN requests
const itinValidationRules = [
  body('firstName').custom((value) => {
    const v = validateName(value);
    if (!v.isValid) throw new Error(v.errors.join(', '));
    return true;
  }),
  body('lastName').custom((value) => {
    const v = validateName(value);
    if (!v.isValid) throw new Error(v.errors.join(', '));
    return true;
  }),
  body('email').custom((value) => {
    const v = validateEmail(value);
    if (!v.isValid) throw new Error(v.errors.join(', '));
    return true;
  }),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('reasonForITIN').notEmpty().withMessage('Reason for ITIN is required')
    .isIn(['Tax Filing', 'Bank Account', 'Other']).withMessage('Invalid reason for ITIN'),
  body('nationality').notEmpty().withMessage('Nationality is required')
];

// Create an ITIN request (with passport scan upload)
router.post('/', auth, upload.array('passportScans', 2), itinValidationRules, handleValidationErrors, async (req, res) => {
  try {
    console.log('Received ITIN request:', req.body);
    console.log('User:', req.user);
    // Validate that 1-2 passport scan images are present
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least 1 passport image (max 2)'
      });
    }
    if (req.files.length > 2) {
      return res.status(400).json({
        success: false,
        message: 'You can upload at most 2 images'
      });
    }

    const sanitized = sanitizeInput(req.body);
    console.log('Sanitized data:', sanitized);
    const passportScans = (req.files || []).map(f => ({
      filename: f.filename,
      originalName: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      path: f.path,
      uploadDate: Date.now()
    }));
    const payload = { ...sanitized, userId: req.user._id, passportScans };
    console.log('Final payload:', payload);
    const request = await ITINRequest.create(payload);

    // Send detailed email notification
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'ITIN Application Submission Confirmation',
        heading: 'ITIN Application Details',
        formType: 'ITIN Application',
        details: {
          'First Name': request.firstName,
          'Last Name': request.lastName,
          'Email': request.email,
          'Phone Number': request.phoneNumber,
          'Reason for ITIN': request.reasonForITIN,
          'Nationality': request.nationality,
          'Passport Scans Uploaded Count': (request.passportScans?.length || 0),
          'Passport File Names': (request.passportScans || []).map(f => f.originalName || f.filename).join(', '),
          'Additional Message': request.message || 'None provided'
        }
      });
    } catch (emailError) {
      console.error('Error sending ITIN request email:', emailError);
      // Continue with the response even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'ITIN request submitted successfully',
      data: request
    });

  } catch (error) {
    console.error('Error creating ITIN request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all ITIN requests for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const requests = await ITINRequest.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching ITIN requests:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Get a specific ITIN request
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await ITINRequest.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'ITIN request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error fetching ITIN request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;