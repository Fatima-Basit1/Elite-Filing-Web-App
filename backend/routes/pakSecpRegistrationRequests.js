const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const PAKSECPRegistrationRequest = require('../models/PAKSECPRegistrationRequest');

// Validation rules for PAK SECP Registration
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
  body('companyProposedName').trim().notEmpty().withMessage('Company proposed name is required'),
  body('companyProposedName2').optional().trim().isLength({ min: 3 }).withMessage('Company proposed name 2 must be at least 3 characters'),
  body('companyProposedName3').optional().trim().isLength({ min: 3 }).withMessage('Company proposed name 3 must be at least 3 characters'),
  body('registrationType').isIn(['Private Limited', 'Sole Proprietor', 'Partnership']).withMessage('Invalid registration type'),
  body('message').optional().isString().isLength({ max: 1000 }).withMessage('Message too long'),
];

// Create a PAK SECP Registration request (auth required)
router.post('/', auth, validationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const created = await PAKSECPRegistrationRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'SECP Registration Submission Confirmation',
        heading: 'Your SECP Registration Details',
        formType: 'SECP Registration',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone': created.phone,
          'Company Proposed Name': created.companyProposedName,
          'Company Proposed Name 2': created.companyProposedName2 || 'None',
          'Company Proposed Name 3': created.companyProposedName3 || 'None',
          'Registration Type': created.registrationType,
          'Message': created.message || 'None',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (PAK SECP):', emailErr.message);
    }

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('PAK SECP Registration request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;