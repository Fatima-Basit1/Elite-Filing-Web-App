const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const LogoRequest = require('../models/LogoRequest');
const { sendLogoRequestEmail } = require('../utils/emailService');
const { auth } = require('../middleware/authEnhanced');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/logo-references');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer to store files in memory first for email attachments
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

// @route   POST /api/logo-requests
// @desc    Create a new logo request (requires authentication)
// @access  Private
router.post('/', auth, upload.array('referenceImages', 5), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      businessName,
      logoStyle,
      colorPreferences,
      symbolsElements,
      message
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !businessName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: firstName, lastName, phoneNumber, businessName'
      });
    }

    // Process uploaded files
    const referenceImages = req.files ? req.files.map(file => ({
      filename: file.originalname,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer
    })) : [];

    // Create new logo request
    const logoRequest = new LogoRequest({
      firstName,
      lastName,
      email: req.user.email,
      phoneNumber,
      businessName,
      logoStyle,
      colorPreferences,
      symbolsElements,
      referenceImages,
      message,
      userId: req.user._id
    });

    const savedRequest = await logoRequest.save();

    // Send confirmation email
    const emailResult = await sendLogoRequestEmail(
      {
        firstName,
        lastName,
        email: req.user.email,
        phoneNumber,
        businessName,
        logoStyle,
        colorPreferences,
        symbolsElements,
        message
      },
      referenceImages,
      req.user.email
    );

    // Log email result for debugging
    console.log('Email sending result:', emailResult);

    res.status(201).json({
      success: true,
      message: 'Logo request submitted successfully',
      data: {
        id: logoRequest._id,
        firstName: logoRequest.firstName,
        lastName: logoRequest.lastName,
        email: logoRequest.email,
        businessName: logoRequest.businessName,
        status: logoRequest.status,
        createdAt: logoRequest.createdAt,
        filesUploaded: referenceImages.length,
        emailSent: emailResult.success
      }
    });

  } catch (error) {
    console.error('Error creating logo request:', error);
    
    // Clean up uploaded files if there was an error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB per file.'
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 5 files allowed.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/logo-requests
// @desc    Get all logo requests (for admin)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const logoRequests = await LogoRequest.find()
      .sort({ createdAt: -1 })
      .select('-referenceImages.path'); // Don't expose file paths

    res.json({
      success: true,
      count: logoRequests.length,
      data: logoRequests
    });
  } catch (error) {
    console.error('Error fetching logo requests:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/logo-requests/:id
// @desc    Get a specific logo request
// @access  Public (should be protected in production)
router.get('/:id', async (req, res) => {
  try {
    const logoRequest = await LogoRequest.findById(req.params.id);

    if (!logoRequest) {
      return res.status(404).json({
        success: false,
        message: 'Logo request not found'
      });
    }

    res.json({
      success: true,
      data: logoRequest
    });
  } catch (error) {
    console.error('Error fetching logo request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;