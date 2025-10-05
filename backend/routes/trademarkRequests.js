const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const TrademarkRequest = require('../models/TrademarkRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for trademark requests
const trademarkValidationRules = [
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
  body('phone').notEmpty().withMessage('Phone is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
];

// Create a trademark request
router.post('/', auth, trademarkValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await TrademarkRequest.create(payload);

    // Send email notification to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'Trademark Registration Submitted',
        heading: 'Your Trademark Registration Details',
        formType: 'Trademark Registration',
        details: payload,
      });
    } catch (emailErr) {
      console.error('Email send error (trademark):', emailErr.message);
    }

    res.status(201).json({ message: 'Trademark request submitted', data: request });
  } catch (err) {
    console.error('Trademark request error:', err);
    res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
  }
});

module.exports = router;