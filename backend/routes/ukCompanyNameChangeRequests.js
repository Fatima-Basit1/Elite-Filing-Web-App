const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/authEnhanced');
const { sanitizeInput, validateEmail, validateName } = require('../utils/validation');
const { sendSubmissionEmail } = require('../utils/emailService');
const UKCompanyNameChangeRequest = require('../models/UKCompanyNameChangeRequest');

const router = express.Router();

router.post(
  '/',
  auth,
  [
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
    body('currentCompanyName').trim().notEmpty().withMessage('Current company name is required'),
    body('newCompanyName').trim().notEmpty().withMessage('New company name is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, email, phoneNumber, currentCompanyName, newCompanyName, message } = req.body;

      const sanitizedData = {
        userId: req.user._id,
        firstName: sanitizeInput(firstName),
        lastName: sanitizeInput(lastName),
        email: sanitizeInput(email),
        phoneNumber: sanitizeInput(phoneNumber),
        currentCompanyName: sanitizeInput(currentCompanyName),
        newCompanyName: sanitizeInput(newCompanyName),
        message: sanitizeInput(message),
      };

      const created = await UKCompanyNameChangeRequest.create(sanitizedData);

      // Send email to logged-in user
      try {
        await sendSubmissionEmail({
          to: req.user.email,
          subject: 'UK Company Name Change Submission Confirmation',
          heading: 'Your UK Company Name Change Details',
          formType: 'UK Company Name Change',
          details: {
            'First Name': created.firstName,
            'Last Name': created.lastName,
            'Email': created.email,
            'Phone Number': created.phoneNumber,
            'Current Company Name': created.currentCompanyName,
            'New Company Name': created.newCompanyName,
            'Additional Message': created.message || 'None provided'
          }
        });
      } catch (emailErr) {
        // Do not fail the request solely due to email issues
        // Optionally log emailErr
      }

      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      return res.status(500).json({ message: 'Server error processing request' });
    }
  }
);

module.exports = router;