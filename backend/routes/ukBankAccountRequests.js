const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const UKBankAccountRequest = require('../models/UKBankAccountRequest');

const router = express.Router();

// Validation rules for UK Bank Account submission
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
  body('preferredBank').trim().notEmpty().withMessage('Preferred bank is required'),
  body('accountType').isIn(['Personal', 'Business']).withMessage('Account type must be Personal or Business'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Create UK Bank Account request (auth required)
router.post('/', auth, validationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, companyName, email, phoneNumber, preferredBank, accountType, message } = req.body;

    const sanitized = {
      userId: req.user._id,
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      companyName: sanitizeInput(companyName),
      email: sanitizeInput(email),
      phoneNumber: sanitizeInput(phoneNumber),
      preferredBank: sanitizeInput(preferredBank),
      accountType: sanitizeInput(accountType),
      message: sanitizeInput(message),
    };

    const created = await UKBankAccountRequest.create(sanitized);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK Bank Account Submission Confirmation',
        heading: 'Your UK Bank Account Details',
        formType: 'UK Bank Account',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Name': created.companyName,
          'Preferred Bank': created.preferredBank,
          'Account Type': created.accountType,
          'Message': created.message || 'None provided',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      // Do not fail the request due to email errors
      console.error('Email send error (UK Bank Account):', emailErr.message);
    }

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('UK Bank Account request error:', err);
    return res.status(500).json({ message: 'Server error processing request' });
  }
});

module.exports = router;