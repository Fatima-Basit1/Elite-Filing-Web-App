const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const UKConfirmationStatementRequest = require('../models/UKConfirmationStatementRequest');

const router = express.Router();

// Validation rules
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
  body('confirmationPeriodEndDate').isISO8601().withMessage('Confirmation period end date must be a valid date'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Create a UK confirmation statement request (auth required)
router.post('/', auth, validationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, companyName, confirmationPeriodEndDate, message } = req.body;

    const sanitized = {
      userId: req.user._id,
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      companyName: sanitizeInput(companyName),
      email: sanitizeInput(email),
      phoneNumber: sanitizeInput(phoneNumber),
      confirmationPeriodEndDate: new Date(confirmationPeriodEndDate),
      message: sanitizeInput(message),
    };

    const created = await UKConfirmationStatementRequest.create(sanitized);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK Confirmation Statement Submission Confirmation',
        heading: 'Your UK Confirmation Statement Details',
        formType: 'UK Confirmation Statement',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Name': created.companyName,
          'Confirmation Period End Date': created.confirmationPeriodEndDate?.toISOString?.().slice(0, 10) || String(created.confirmationPeriodEndDate),
          'Message': created.message || 'None provided',
        },
      });
    } catch (emailErr) {
      // Do not fail the request due to email errors
      console.error('Email send error (UK Confirmation Statement):', emailErr.message);
    }

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('UK Confirmation Statement request error:', err);
    return res.status(500).json({ message: 'Server error processing request' });
  }
});

module.exports = router;