const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const ITINRequest = require('../models/ITINRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

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
  body('nationality').notEmpty().withMessage('Nationality is required'),
  body('passportNumber').notEmpty().withMessage('Passport number is required')
];

// Create an ITIN request
router.post('/', auth, itinValidationRules, handleValidationErrors, async (req, res) => {
  try {
    console.log('Received ITIN request:', req.body);
    console.log('User:', req.user);
    const sanitized = sanitizeInput(req.body);
    console.log('Sanitized data:', sanitized);
    const payload = { ...sanitized, userId: req.user._id };
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
          'Passport Number': request.passportNumber,
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