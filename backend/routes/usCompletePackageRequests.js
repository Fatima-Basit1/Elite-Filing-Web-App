const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const USCompletePackageRequest = require('../models/USCompletePackageRequest');
const { sendSubmissionEmail } = require('../utils/emailService');
const { optionalAuth } = require('../middleware/authEnhanced');

// Validation middleware
const validateCompletePackageRequest = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('businessType').trim().notEmpty().isIn(['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship', 'Other'])
        .withMessage('Valid business type is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('message').trim().optional()
];

// Create a new Complete Package request
router.post('/', optionalAuth, validateCompletePackageRequest, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Create new request
        const completePackageRequest = new USCompletePackageRequest(req.body);
        await completePackageRequest.save();

        // Prepare email content
        const emailDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            companyName: req.body.companyName,
            businessType: req.body.businessType,
            state: req.body.state,
            message: req.body.message || 'No additional message provided'
        };

        // Send email notification
        await sendSubmissionEmail({
            to: (req.user?.email || req.body.email),
            subject: 'Complete Package Request Confirmation',
            heading: 'Complete Package Request Confirmation',
            formType: 'Complete Package Request',
            details: emailDetails // Changed from formDetails to details to match the function signature
        });

        res.status(201).json({
            success: true,
            message: 'Complete Package request submitted successfully'
        });
    } catch (error) {
        console.error('Error in Complete Package request submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting Complete Package request'
        });
    }
});

// Get all Complete Package requests
router.get('/', async (req, res) => {
    try {
        const requests = await USCompletePackageRequest.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error('Error fetching Complete Package requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Complete Package requests'
        });
    }
});

module.exports = router;