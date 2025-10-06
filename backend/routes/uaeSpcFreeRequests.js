const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const UAESPCFreeRequest = require('../models/UAESPCFreeRequest');

// Validation rules for UAE SPC Free Zone
const validationRules = [
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
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('companyProposedName').trim().notEmpty().withMessage('Company proposed name is required'),
  body('businessActivity').trim().notEmpty().withMessage('Business activity is required'),
  body('licenseType').isIn(['trading', 'professional', 'industrial', 'service']).withMessage('Invalid license type'),
  body('message').optional().isString().isLength({ max: 1000 }).withMessage('Message too long'),
];

// Create UAE SPC Free Zone request (auth required)
router.post('/', auth, validationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const created = await UAESPCFreeRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UAE SPC Free Zone Submission Confirmation',
        heading: 'Your UAE SPC Free Zone Details',
        formType: 'UAE SPC Free Zone',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Proposed Name': created.companyProposedName,
          'Business Activity': created.businessActivity,
          'License Type': created.licenseType,
          'Message': created.message || 'None',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (UAE SPC Free):', emailErr.message);
    }

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('UAE SPC Free Zone request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;