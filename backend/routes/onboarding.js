const express = require('express');
const { auth } = require('../middleware/authEnhanced');
const { generalLimiter } = require('../middleware/rateLimiting');
const User = require('../models/User');
const { sanitizeInput } = require('../utils/validation');
const { logSecurityEvent } = require('../utils/securityLogger');

const router = express.Router();

// Onboarding steps configuration
const ONBOARDING_STEPS = {
  WELCOME: {
    id: 'welcome',
    title: 'Welcome to Elite Filing',
    description: 'Let\'s get you started with your business filing journey',
    order: 1,
    required: true
  },
  BUSINESS_INFO: {
    id: 'business_info',
    title: 'Business Information',
    description: 'Tell us about your business to provide personalized services',
    order: 2,
    required: true
  },
  SERVICE_SELECTION: {
    id: 'service_selection',
    title: 'Select Services',
    description: 'Choose the services that best fit your business needs',
    order: 3,
    required: true
  },
  PREFERENCES: {
    id: 'preferences',
    title: 'Set Preferences',
    description: 'Customize your experience and notification settings',
    order: 4,
    required: false
  },
  VERIFICATION: {
    id: 'verification',
    title: 'Account Verification',
    description: 'Verify your email and complete your profile setup',
    order: 5,
    required: true
  },
  COMPLETE: {
    id: 'complete',
    title: 'Setup Complete',
    description: 'You\'re all set! Start exploring Elite Filing services',
    order: 6,
    required: true
  }
};

// @route   GET /api/onboarding/steps
// @desc    Get all onboarding steps
// @access  Public
router.get('/steps', generalLimiter, (req, res) => {
  try {
    const steps = Object.values(ONBOARDING_STEPS).sort((a, b) => a.order - b.order);
    
    res.json({
      message: 'Onboarding steps retrieved successfully',
      steps: steps,
      totalSteps: steps.length
    });
  } catch (error) {
    console.error('Get onboarding steps error:', error);
    res.status(500).json({
      message: 'Server error retrieving onboarding steps',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   GET /api/onboarding/progress
// @desc    Get user's onboarding progress
// @access  Private
router.get('/progress', auth, generalLimiter, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Initialize onboarding progress if not exists
    if (!user.onboardingProgress) {
      user.onboardingProgress = {
        currentStep: 'welcome',
        completedSteps: [],
        startedAt: new Date(),
        isCompleted: false
      };
      await user.save();
    }

    const steps = Object.values(ONBOARDING_STEPS).sort((a, b) => a.order - b.order);
    const progress = user.onboardingProgress;

    // Calculate completion percentage
    const completedCount = progress.completedSteps.length;
    const totalSteps = steps.length;
    const completionPercentage = Math.round((completedCount / totalSteps) * 100);

    // Get current step details
    const currentStepDetails = steps.find(step => step.id === progress.currentStep) || steps[0];

    // Get next step
    const currentStepIndex = steps.findIndex(step => step.id === progress.currentStep);
    const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

    res.json({
      message: 'Onboarding progress retrieved successfully',
      progress: {
        currentStep: progress.currentStep,
        currentStepDetails: currentStepDetails,
        nextStep: nextStep,
        completedSteps: progress.completedSteps,
        completionPercentage: completionPercentage,
        isCompleted: progress.isCompleted,
        startedAt: progress.startedAt,
        completedAt: progress.completedAt
      },
      steps: steps
    });

  } catch (error) {
    console.error('Get onboarding progress error:', error);
    res.status(500).json({
      message: 'Server error retrieving onboarding progress',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   POST /api/onboarding/step/:stepId/complete
// @desc    Mark a specific onboarding step as completed
// @access  Private
router.post('/step/:stepId/complete', auth, generalLimiter, async (req, res) => {
  try {
    const { stepId } = req.params;
    const sanitizedBody = sanitizeInput(req.body);
    const { stepData } = sanitizedBody;

    // Validate step ID
    const stepExists = Object.values(ONBOARDING_STEPS).find(step => step.id === stepId);
    if (!stepExists) {
      return res.status(400).json({
        message: 'Invalid step ID',
        code: 'INVALID_STEP'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Initialize onboarding progress if not exists
    if (!user.onboardingProgress) {
      user.onboardingProgress = {
        currentStep: 'welcome',
        completedSteps: [],
        startedAt: new Date(),
        isCompleted: false
      };
    }

    // Check if step is already completed
    if (user.onboardingProgress.completedSteps.includes(stepId)) {
      return res.status(400).json({
        message: 'Step already completed',
        code: 'STEP_ALREADY_COMPLETED'
      });
    }

    // Store step-specific data
    if (stepData) {
      if (!user.onboardingData) {
        user.onboardingData = {};
      }
      user.onboardingData[stepId] = {
        ...stepData,
        completedAt: new Date()
      };
    }

    // Mark step as completed
    user.onboardingProgress.completedSteps.push(stepId);

    // Determine next step
    const steps = Object.values(ONBOARDING_STEPS).sort((a, b) => a.order - b.order);
    const currentStepIndex = steps.findIndex(step => step.id === stepId);
    const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

    if (nextStep) {
      user.onboardingProgress.currentStep = nextStep.id;
    } else {
      // All steps completed
      user.onboardingProgress.isCompleted = true;
      user.onboardingProgress.completedAt = new Date();
      user.onboardingProgress.currentStep = 'complete';
    }

    await user.save();

    // Log onboarding progress
    logSecurityEvent('ONBOARDING_STEP_COMPLETED', {
      userId: user._id,
      stepId: stepId,
      stepTitle: stepExists.title,
      nextStep: nextStep?.id || 'complete',
      isOnboardingComplete: user.onboardingProgress.isCompleted
    }, req, 'info');

    res.json({
      message: `Step '${stepExists.title}' completed successfully`,
      progress: {
        currentStep: user.onboardingProgress.currentStep,
        nextStep: nextStep,
        completedSteps: user.onboardingProgress.completedSteps,
        isCompleted: user.onboardingProgress.isCompleted,
        completionPercentage: Math.round((user.onboardingProgress.completedSteps.length / steps.length) * 100)
      }
    });

  } catch (error) {
    console.error('Complete onboarding step error:', error);
    res.status(500).json({
      message: 'Server error completing onboarding step',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   POST /api/onboarding/reset
// @desc    Reset user's onboarding progress
// @access  Private
router.post('/reset', auth, generalLimiter, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Reset onboarding progress
    user.onboardingProgress = {
      currentStep: 'welcome',
      completedSteps: [],
      startedAt: new Date(),
      isCompleted: false
    };

    // Clear onboarding data
    user.onboardingData = {};

    await user.save();

    // Log onboarding reset
    logSecurityEvent('ONBOARDING_RESET', {
      userId: user._id,
      resetAt: new Date()
    }, req, 'info');

    res.json({
      message: 'Onboarding progress reset successfully',
      progress: user.onboardingProgress
    });

  } catch (error) {
    console.error('Reset onboarding error:', error);
    res.status(500).json({
      message: 'Server error resetting onboarding',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   GET /api/onboarding/data
// @desc    Get user's onboarding data
// @access  Private
router.get('/data', auth, generalLimiter, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('onboardingData onboardingProgress');
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      message: 'Onboarding data retrieved successfully',
      data: user.onboardingData || {},
      progress: user.onboardingProgress || {
        currentStep: 'welcome',
        completedSteps: [],
        isCompleted: false
      }
    });

  } catch (error) {
    console.error('Get onboarding data error:', error);
    res.status(500).json({
      message: 'Server error retrieving onboarding data',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   PUT /api/onboarding/data/:stepId
// @desc    Update onboarding data for a specific step
// @access  Private
router.put('/data/:stepId', auth, generalLimiter, async (req, res) => {
  try {
    const { stepId } = req.params;
    const sanitizedBody = sanitizeInput(req.body);

    // Validate step ID
    const stepExists = Object.values(ONBOARDING_STEPS).find(step => step.id === stepId);
    if (!stepExists) {
      return res.status(400).json({
        message: 'Invalid step ID',
        code: 'INVALID_STEP'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Initialize onboarding data if not exists
    if (!user.onboardingData) {
      user.onboardingData = {};
    }

    // Update step data
    user.onboardingData[stepId] = {
      ...user.onboardingData[stepId],
      ...sanitizedBody,
      updatedAt: new Date()
    };

    await user.save();

    res.json({
      message: `Data for step '${stepExists.title}' updated successfully`,
      stepData: user.onboardingData[stepId]
    });

  } catch (error) {
    console.error('Update onboarding data error:', error);
    res.status(500).json({
      message: 'Server error updating onboarding data',
      code: 'SERVER_ERROR'
    });
  }
});

module.exports = router;