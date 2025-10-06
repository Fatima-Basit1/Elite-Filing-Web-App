const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const WalmartEcommerceRequest = require('../models/WalmartEcommerceRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for Walmart E-commerce submissions
const walmartValidationRules = [
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
  body('productType').notEmpty().withMessage('Product type is required'),
  body('businessRegistration').notEmpty().withMessage('Business registration is required'),
  body('message').optional().isString(),
];

// Create Walmart E-commerce request
router.post('/', auth, walmartValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const payload = { ...sanitizedBody, userId: req.user._id };

    const created = await WalmartEcommerceRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'Walmart E-commerce Submission Confirmation',
        heading: 'Your Walmart E-commerce Request Details',
        formType: 'Walmart E-commerce',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Name': created.companyName,
          'Product Type': created.productType,
          'Business Registration': created.businessRegistration,
          'Message': created.message || 'None provided',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      // Do not fail request due to email issues
      console.error('Email send error (Walmart E-commerce):', emailErr.message);
    }

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Walmart E-commerce request error:', err);
    return res.status(500).json({ message: 'Server error processing request' });
  }
});

module.exports = router;