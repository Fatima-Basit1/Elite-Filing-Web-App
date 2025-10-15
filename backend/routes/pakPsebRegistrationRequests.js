const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const PAKPSEBRegistrationRequest = require('../models/PAKPSEBRegistrationRequest');

// Validation rules for PAK PSEB Registration
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
  body('secpNumber').trim().notEmpty().withMessage('SECP number is required'),
  body('residentialAddress').trim().notEmpty().withMessage('Residential address is required'),
  body('natureOfBusiness').trim().notEmpty().isLength({ max: 200 }).withMessage('Nature of business is required'),
  body('exportActivityDetails').optional().isString().isLength({ max: 1000 }).withMessage('Export activity details too long'),
  body('message').optional().isString().isLength({ max: 1000 }).withMessage('Message too long'),
];

// Create a PAK PSEB Registration request (auth required)
router.post('/', auth, validationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const created = await PAKPSEBRegistrationRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'PSEB Registration Submission Confirmation',
        heading: 'Your PSEB Registration Details',
        formType: 'PSEB Registration',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone': created.phone,
          'Company Name': created.companyName,
          'SECP Number': created.secpNumber,
          'Residential Address': created.residentialAddress,
          'Nature Of Business': created.natureOfBusiness,
          'Export Activity Details': created.exportActivityDetails || 'None',
          'Message': created.message || 'None',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (PAK PSEB):', emailErr.message);
    }

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('PAK PSEB Registration request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;