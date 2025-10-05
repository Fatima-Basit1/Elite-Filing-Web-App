const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const UKAnnualAccountsRequest = require('../models/UKAnnualAccountsRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for UK Annual Accounts
const ukAnnualAccountsValidationRules = [
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
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('financialYearEndDate').isISO8601().withMessage('Financial year end date must be a valid date'),
  body('typeOfAccounts').isIn(['Full Accounts', 'Micro-Entity Accounts', 'Dormant Company Accounts']).withMessage('Invalid account type'),
  body('message').notEmpty().withMessage('Message is required')
];

// Create a UK Annual Accounts request (auth required)
router.post('/', auth, ukAnnualAccountsValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await UKAnnualAccountsRequest.create(payload);

    // Send detailed email notification to the logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK Annual Accounts Submission Confirmation',
        heading: 'Your UK Annual Accounts Details',
        formType: 'UK Annual Accounts',
        details: {
          'First Name': request.firstName,
          'Last Name': request.lastName,
          'Email': request.email,
          'Phone Number': request.phoneNumber,
          'Company Name': request.companyName,
          'Financial Year End Date': request.financialYearEndDate?.toISOString?.().slice(0, 10) || String(request.financialYearEndDate),
          'Type of Accounts': request.typeOfAccounts,
          'Message': request.message || 'None provided'
        }
      });
    } catch (emailErr) {
      console.error('Email send error (UK Annual Accounts):', emailErr.message);
      // Do not fail the request due to email errors
    }

    res.status(201).json({
      success: true,
      message: 'UK Annual Accounts request submitted successfully',
      data: request
    });
  } catch (err) {
    console.error('UK Annual Accounts request error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;