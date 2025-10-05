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
  body('businessPurpose').notEmpty().withMessage('Business purpose is required'),
  body('duration').isIn(['perpetual', 'fixed']).withMessage('Duration must be either perpetual or fixed'),
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