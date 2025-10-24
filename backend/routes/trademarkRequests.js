const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { handleValidationErrors, sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const TrademarkRequest = require('../models/TrademarkRequest');
const { sendSubmissionEmail } = require('../utils/emailService');

// Validation rules for trademark requests
const trademarkValidationRules = [
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
  body('trademarkName').notEmpty().withMessage('Trademark name is required'),
  body('trademarkType').notEmpty().withMessage('Trademark type is required')
    .isIn(['Word', 'Logo', 'Slogan', 'Other']).withMessage('Invalid trademark type'),
  body('jurisdiction').notEmpty().withMessage('Jurisdiction is required'),
  body('state').optional().isString().isLength({ min: 2, max: 100 }).withMessage('State must be between 2 and 100 characters'),
  body('classOfGoods').notEmpty().withMessage('Class of goods/services is required'),
  body('numberOfClasses').isInt({ min: 1, max: 45 }).withMessage('Number of classes must be between 1 and 45'),
  body('estimatedCost').isNumeric().withMessage('Estimated cost must be a valid number')
];

// Create a trademark request
router.post('/', auth, trademarkValidationRules, handleValidationErrors, async (req, res) => {
  try {
    console.log('Received trademark request data:', req.body);
    const sanitized = sanitizeInput(req.body);
    const payload = { ...sanitized, userId: req.user._id };
    console.log('Payload to save:', payload);
    const request = await TrademarkRequest.create(payload);

    // Send detailed email notification
    try {
      await sendSubmissionEmail({
        to: req.user.email,
        subject: 'Trademark Registration Submission Confirmation',
        heading: 'Your Trademark Registration Details',
        formType: 'Trademark Registration',
        details: {
          'First Name': request.firstName,
          'Last Name': request.lastName,
          'Email': request.email,
          'Phone Number': request.phoneNumber,
          'Trademark Name': request.trademarkName,
          'Trademark Type': request.trademarkType,
          'State': request.state || 'N/A',
          'Jurisdiction': request.jurisdiction,
          'Class of Goods/Services': request.classOfGoods,
          'Number of Classes': request.numberOfClasses,
          'Estimated Cost': `$${request.estimatedCost.toLocaleString()} USD`,
          'Additional Message': request.message || 'None provided'
        }
      });
    } catch (emailErr) {
      console.error('Email send error (trademark):', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Trademark request submitted successfully',
      data: request
    });
  } catch (err) {
    console.error('Trademark request error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;