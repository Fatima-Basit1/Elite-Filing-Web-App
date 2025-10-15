const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const UKSharedOfficeRequest = require('../models/UKSharedOfficeRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for UK shared office requests
const ukSharedOfficeValidationRules = [
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
  body('businessType').notEmpty().withMessage('Type of use is required'),
  body('duration').notEmpty().withMessage('Contact time is required'),
];

// Create a UK shared office request
router.post('/', auth, ukSharedOfficeValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await UKSharedOfficeRequest.create(payload);

    // Send email notification to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK Shared Office Request Submitted',
        heading: 'Your UK Shared Office Request Details',
        formType: 'UK Shared Office',
        details: payload,
      });
    } catch (emailErr) {
      console.error('Email send error (uk office):', emailErr.message);
    }

    res.status(201).json({ message: 'UK shared office request submitted', data: request });
  } catch (err) {
    console.error('UK shared office request error:', err);
    res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
  }
});

module.exports = router;