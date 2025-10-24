const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const PakistanCompletePackageRequest = require('../models/PakistanCompletePackageRequest');
const { sendSubmissionEmail } = require('../utils/emailService');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');

// Validation rules
const pakistanCompletePackageValidationRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('contact').trim().notEmpty().withMessage('Contact number is required'),
  body('dateOfBirth').trim().notEmpty().withMessage('Date of birth is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
];


// Submit Pakistan Complete Package request
router.post('/', auth, pakistanCompletePackageValidationRules, handleValidationErrors, async (req, res) => {
  try {
    console.log('Received Pakistan Complete Package request:', req.body);
    
    const sanitized = sanitizeInput(req.body);
    const payload = { 
      ...sanitized, 
      userId: req.user.id,
      packageName: 'Complete Package',
      packagePrice: 'PKR 80,000',
      status: 'pending'
    };
    
    console.log('Payload to save:', payload);
    const request = await PakistanCompletePackageRequest.create(payload);

    // Send confirmation email
    try {
      await sendSubmissionEmail({
        to: request.email,
        subject: 'Pakistan Complete Package Submission Confirmation',
        heading: 'Your Pakistan Complete Package Details',
        formType: 'Pakistan Complete Package',
        details: {
          'Full Name': request.fullName,
          'Email': request.email,
          'Contact': request.contact,
          'Date of Birth': request.dateOfBirth,
          'City': request.city,
          'Package Name': request.packageName,
          'Package Price': request.packagePrice,
          'Reference ID': request._id,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (Pakistan Complete Package):', emailErr.message);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Pakistan Complete Package request submitted successfully',
      data: request 
    });
  } catch (error) {
    console.error('Pakistan Complete Package submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get user's Pakistan Complete Package requests
router.get('/my-requests', auth, async (req, res) => {
  try {
    const requests = await PakistanCompletePackageRequest.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching Pakistan Complete Package requests:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all Pakistan Complete Package requests (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    // Check if user is admin (you can implement your own admin check)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const requests = await PakistanCompletePackageRequest.find()
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching all Pakistan Complete Package requests:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
