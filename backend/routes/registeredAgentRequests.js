const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const RegisteredAgentRequest = require('../models/RegisteredAgentRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for registered agent requests
const registeredAgentValidationRules = [
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
  body('phoneNumber').notEmpty().withMessage('Phone number is required')
];

// Create a registered agent request
router.post('/', auth, registeredAgentValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await RegisteredAgentRequest.create(payload);

    // Send email notification to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'Registered Agent Request Submitted',
        heading: 'Your Registered Agent Request Details',
        formType: 'Registered Agent',
        details: payload,
      });
    } catch (emailErr) {
      console.error('Email send error (registered agent):', emailErr.message);
    }

    res.status(201).json({ message: 'Registered agent request submitted', data: request });
  } catch (err) {
    console.error('Registered agent request error:', err);
    res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
  }
});

module.exports = router;