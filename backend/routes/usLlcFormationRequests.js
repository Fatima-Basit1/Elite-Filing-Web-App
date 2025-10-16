const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const USLLCFormationRequest = require('../models/USLLCFormationRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for US LLC Formation
const llcValidationRules = [
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
  body('dateOfBirth').isISO8601().withMessage('Date of birth must be a valid date'),
  body('companyProposedName').notEmpty().withMessage('Company proposed name is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('numberOfMembers').isInt({ min: 1 }).withMessage('Number of members must be at least 1'),
  body('businessIndustry').notEmpty().withMessage('Business industry is required'),
  // Members validation: if numberOfMembers > 1, require members array with details
  body('members').custom((value, { req }) => {
    const count = parseInt(req.body.numberOfMembers, 10) || 1;
    if (count <= 1) return true;
    if (!Array.isArray(value)) throw new Error('Members must be an array');
    const requiredLength = Math.max(count - 1, 0);
    if (value.length < requiredLength) throw new Error(`Provide at least ${requiredLength} additional member(s)`);
    for (let i = 0; i < requiredLength; i++) {
      const m = value[i] || {};
      const f = validateName(m.firstName || '');
      const l = validateName(m.lastName || '');
      if (!f.isValid) throw new Error(`Member ${i + 2} first name: ${f.errors.join(', ')}`);
      if (!l.isValid) throw new Error(`Member ${i + 2} last name: ${l.errors.join(', ')}`);
      if (!m.address || typeof m.address !== 'string' || !m.address.trim()) {
        throw new Error(`Member ${i + 2} address is required`);
      }
    }
    return true;
  }),
  // Services validation: if provided, ensure allowed values
  body('services').optional().isArray().withMessage('Services must be an array'),
  body('services.*').optional().isIn([
    'LLC formation',
    'EIN registration',
    'Registered Agent Service',
    'Bank Account',
    'Business Address',
    'Phone Number',
    'Complete Package',
    'Resale Certificate',
  ]).withMessage('Invalid service selected'),
];

// Create US LLC Formation request
router.post('/', auth, llcValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await USLLCFormationRequest.create(payload);

    // Send email notification to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'US LLC Formation Submitted',
        heading: 'Your US LLC Formation Details',
        formType: 'US LLC Formation',
        details: payload,
      });
    } catch (emailErr) {
      console.error('Email send error (US LLC):', emailErr.message);
    }

    res.status(201).json({ message: 'US LLC formation request submitted', data: request });
  } catch (err) {
    console.error('US LLC formation request error:', err);
    res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
  }
});

module.exports = router;