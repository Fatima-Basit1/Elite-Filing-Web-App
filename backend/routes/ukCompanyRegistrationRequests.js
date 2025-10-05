const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const UKCompanyRegistrationRequest = require('../models/UKCompanyRegistrationRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for UK company registration
const ukCompanyRegistrationValidationRules = [
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
  body('dateOfBirth').isISO8601().withMessage('Date of birth must be a valid date'),
  body('residentialAddress').notEmpty().withMessage('Residential address is required'),
  body('companyProposedName').notEmpty().withMessage('Company proposed name is required'),
  body('companyType').notEmpty().withMessage('Company type is required'),
  body('businessActivity').notEmpty().withMessage('Business activity is required'),
  body('shareholdersDirectorsInfo').notEmpty().withMessage('Shareholders & Directors information is required'),
];

// Create a UK company registration request (auth required)
router.post('/', auth, ukCompanyRegistrationValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    const request = await UKCompanyRegistrationRequest.create(payload);

    // Send detailed email notification to the logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'UK Company Registration Submission Confirmation',
        heading: 'Your UK Company Registration Details',
        formType: 'UK Company Registration',
        details: {
          'First Name': request.firstName,
          'Last Name': request.lastName,
          'Email': request.email,
          'Phone Number': request.phoneNumber,
          'Date of Birth': request.dateOfBirth?.toISOString?.().slice(0, 10) || String(request.dateOfBirth),
          'Residential Address': request.residentialAddress,
          'Company Proposed Name': request.companyProposedName,
          'Company Type': request.companyType,
          'Business Activity': request.businessActivity,
          'Shareholders & Directors Info': request.shareholdersDirectorsInfo,
        },
      });
    } catch (emailErr) {
      console.error('Email send error (UK Company Registration):', emailErr.message);
      // Do not fail the request due to email errors
    }

    res.status(201).json({
      success: true,
      message: 'UK Company Registration request submitted successfully',
      data: request,
    });
  } catch (err) {
    console.error('UK Company Registration request error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;