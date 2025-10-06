const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const UKVATRegistrationRequest = require('../models/UKVATRegistrationRequest');

const router = express.Router();

// Validation rules for UK VAT Registration
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
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('annualTurnoverEstimate').trim().notEmpty().withMessage('Annual turnover estimate is required'),
  body('typeOfBusinessActivity').trim().notEmpty().withMessage('Type of business activity is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Create a UK VAT Registration request (auth required)
router.post('/', auth, validationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      companyName,
      email,
      phoneNumber,
      annualTurnoverEstimate,
      typeOfBusinessActivity,
      message,
    } = req.body;

    const sanitized = {
      userId: req.user._id,
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      companyName: sanitizeInput(companyName),
      email: sanitizeInput(email),
      phoneNumber: sanitizeInput(phoneNumber),
      annualTurnoverEstimate: sanitizeInput(annualTurnoverEstimate),
      typeOfBusinessActivity: sanitizeInput(typeOfBusinessActivity),
      message: sanitizeInput(message),
    };

    const created = await UKVATRegistrationRequest.create(sanitized);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK VAT Registration Submission Confirmation',
        heading: 'Your UK VAT Registration Details',
        formType: 'UK VAT Registration',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Name': created.companyName,
          'Annual Turnover Estimate': created.annualTurnoverEstimate,
          'Type of Business Activity': created.typeOfBusinessActivity,
          'Message': created.message || 'None provided',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      // Do not fail the request due to email errors
      console.error('Email send error (UK VAT Registration):', emailErr.message);
    }

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('UK VAT Registration request error:', err);
    return res.status(500).json({ message: 'Server error processing request' });
  }
});

module.exports = router;