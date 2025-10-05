const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const USTaxFilingRequest = require('../models/USTaxFilingRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for US Tax Filing
const taxValidationRules = [
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
  body('residentialAddress').notEmpty().withMessage('Residential address is required'),
  body('ssnOrItin').notEmpty().withMessage('SSN/ITIN is required'),
  body('filingType').isIn(['individual', 'llc', 'corp', 'partnership']).withMessage('Invalid filing type'),
  body('taxYear').isInt({ min: 2000 }).withMessage('Tax year must be 2000 or later'),
  body('companyName').optional().isString(),
  body('ein').optional().isString(),
  body('state').optional().isString(),
  body('incomeDetails').optional().isString(),
  body('deductions').optional().isString(),
  body('message').optional().isString(),
];

// Create US Tax Filing request
router.post('/', auth, taxValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await USTaxFilingRequest.create(payload);

    // Send email notification to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'USA Tax Filing Submitted',
        heading: 'Your USA Tax Filing Details',
        formType: 'USA Tax Filing',
        details: { ...payload, referenceId: request._id }
      });
    } catch (emailErr) {
      console.error('Email send error (US Tax Filing):', emailErr.message);
    }

    res.status(201).json({ message: 'USA Tax filing request submitted', data: request });
  } catch (err) {
    console.error('USA Tax filing request error:', err);
    res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
  }
});

module.exports = router;