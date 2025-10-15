const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const PAKFBRRegistrationRequest = require('../models/PAKFBRRegistrationRequest');

// Validation rules for PAK FBR Registration
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
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('businessActivity').optional().isString().isLength({ max: 1000 }).withMessage('Business activity too long'),
  body('registrationType').isIn(['NTN', 'STRN', 'Sales Tax', 'Income Tax']).withMessage('Invalid registration type'),
  body('message').optional().isString().isLength({ max: 1000 }).withMessage('Message too long'),
];

// Create a PAK FBR Registration request (auth required)
router.post('/', auth, validationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const created = await PAKFBRRegistrationRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'FBR Registration Submission Confirmation',
        heading: 'Your FBR Registration Details',
        formType: 'FBR Registration',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone': created.phone,
          'Company Name': created.companyName,
          'Business Activity': created.businessActivity || 'None',
          'Registration Type': created.registrationType,
          'Message': created.message || 'None',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (PAK FBR):', emailErr.message);
    }

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('PAK FBR Registration request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;