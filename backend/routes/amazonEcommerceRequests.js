const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const AmazonEcommerceRequest = require('../models/AmazonEcommerceRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for Amazon E-commerce submissions
const amazonValidationRules = [
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
  body('marketplace').notEmpty().withMessage('Marketplace is required'),
  body('productType').notEmpty().withMessage('Product type is required'),
  body('message').optional().isString(),
];

// Create Amazon E-commerce request
router.post('/', auth, amazonValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const payload = { ...sanitizedBody, userId: req.user._id };

    const created = await AmazonEcommerceRequest.create(payload);

    // Send confirmation email to logged-in user
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'Amazon E-commerce Submission Confirmation',
        heading: 'Your Amazon E-commerce Request Details',
        formType: 'Amazon E-commerce',
        details: {
          'First Name': created.firstName,
          'Last Name': created.lastName,
          'Email': created.email,
          'Phone Number': created.phoneNumber,
          'Company Name': created.companyName,
          'Marketplace': created.marketplace,
          'Product Type': created.productType,
          'Message': created.message || 'None provided',
          'Reference ID': created._id,
        },
      });
    } catch (emailErr) {
      // Do not fail request due to email issues
      console.error('Email send error (Amazon E-commerce):', emailErr.message);
    }

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Amazon E-commerce request error:', err);
    return res.status(500).json({ message: 'Server error processing request' });
  }
});

module.exports = router;