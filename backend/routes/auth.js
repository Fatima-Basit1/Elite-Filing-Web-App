const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { auth } = require('../middleware/authEnhanced');
const { authLimiter, signupLimiter, passwordResetLimiter } = require('../middleware/rateLimiting');
const { 
  signupValidationRules, 
  loginValidationRules, 
  handleValidationErrors,
  sanitizeInput 
} = require('../utils/validation');
const { sendPasswordResetEmail } = require('../utils/emailService');
const {
  generateTokenPair,
  setTokenCookies,
  clearTokenCookies,
  verifyRefreshToken,
  extractUserIdFromToken
} = require('../utils/tokenUtils');
const {
  logLoginSuccess,
  logLoginFailure,
  logLoginBlocked,
  logSignupSuccess,
  logSignupFailure,
  logTokenRefresh,
  logTokenRefreshFailure,
  logLogout,
  logAccountLocked
} = require('../utils/securityLogger');

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user with enhanced security
// @access  Public
router.post('/signup', 
  signupLimiter,
  signupValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      // Sanitize input
      const sanitizedBody = sanitizeInput(req.body);
      const { name, email, password } = sanitizedBody;

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        logSignupFailure(email, 'Email already registered', req);
        return res.status(400).json({ 
          message: 'User with this email already exists',
          code: 'EMAIL_EXISTS'
        });
      }

      // Create new user
      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
      });

      // Save user
      await user.save();

      // Generate token pair
      const tokens = await generateTokenPair(user);

      // Set secure cookies
      setTokenCookies(res, tokens);

      // Log successful signup
      logSignupSuccess(user, req);

      // Return user data (without sensitive info)
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      };

      res.status(201).json({
        message: 'User registered successfully',
        user: userResponse,
        tokens: {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn
        }
      });

    } catch (error) {
      console.error('Signup error:', error);
      logSignupFailure(req.body.email, error.message, req);
      
      res.status(500).json({ 
        message: 'Server error during registration',
        code: 'SERVER_ERROR'
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user with enhanced security
// @access  Public
router.post('/login',
  authLimiter,
  loginValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      // Sanitize input
      const sanitizedBody = sanitizeInput(req.body);
      const { email, password } = sanitizedBody;

      // Find user and include security fields
      const user = await User.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        logLoginFailure(email, 'User not found', req);
        return res.status(400).json({ 
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Check if account is locked
      if (user.isLocked) {
        logLoginBlocked(email, 'Account locked', req);
        return res.status(423).json({ 
          message: 'Account is temporarily locked due to too many failed login attempts',
          code: 'ACCOUNT_LOCKED',
          lockUntil: user.lockUntil
        });
      }

      // Check if account is active
      if (!user.isActive) {
        logLoginBlocked(email, 'Account deactivated', req);
        return res.status(403).json({ 
          message: 'Account is deactivated',
          code: 'ACCOUNT_DEACTIVATED'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        // Increment login attempts
        await user.incLoginAttempts();
        
        // Check if account should be locked
        const updatedUser = await User.findById(user._id);
        if (updatedUser.isLocked) {
          logAccountLocked(user._id, email, req);
        }
        
        logLoginFailure(email, 'Invalid password', req);
        return res.status(400).json({ 
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Reset login attempts on successful login
      if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token pair
      const tokens = await generateTokenPair(user);

      // Set secure cookies
      setTokenCookies(res, tokens);

      // Log successful login
      logLoginSuccess(user, req);

      // Return user data (without sensitive info)
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLogin: user.lastLogin
      };

      res.json({
        message: 'Login successful',
        user: userResponse,
        tokens: {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      logLoginFailure(req.body.email, error.message, req);
      
      res.status(500).json({ 
        message: 'Server error during login',
        code: 'SERVER_ERROR'
      });
    }
  }
);

// @route   POST /api/auth/forgot-password
// @desc    Initiate password reset and send email
// @access  Public
router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
  try {
    const { email } = sanitizeInput(req.body);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    // Always respond success to prevent enumeration
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a reset link was sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    await sendPasswordResetEmail({ to: user.email, name: user.name, resetLink });

    return res.status(200).json({ message: 'If the email exists, a reset link was sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Server error during password reset' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword, confirmPassword } = sanitizeInput(req.body);

    if (!email || !token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate password via utility
    const { validatePasswordStrength } = require('../utils/validation');
    const validation = validatePasswordStrength(newPassword);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.errors.join(', ') });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    if (user.passwordResetExpires < Date.now()) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    const isValidToken = await bcrypt.compare(token, user.passwordResetToken);
    if (!isValidToken) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    // Assign plaintext; hashing handled by User model pre-save hook
    user.password = newPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ message: 'Server error during password reset' });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh access token using refresh token
// @access  Public (but requires valid refresh token)
router.post('/refresh', async (req, res) => {
  try {
    // Get refresh token from cookies or body
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      logTokenRefreshFailure('No refresh token provided', req);
      return res.status(401).json({ 
        message: 'Refresh token required',
        code: 'NO_REFRESH_TOKEN'
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      logTokenRefreshFailure('Invalid refresh token', req);
      clearTokenCookies(res);
      return res.status(401).json({ 
        message: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.user.id);
    if (!user) {
      logTokenRefreshFailure('User not found', req);
      clearTokenCookies(res);
      return res.status(401).json({ 
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(token => token.token === decoded.tokenId);
    if (!tokenExists) {
      logTokenRefreshFailure('Refresh token not found in user tokens', req);
      clearTokenCookies(res);
      return res.status(401).json({ 
        message: 'Invalid refresh token',
        code: 'TOKEN_NOT_FOUND'
      });
    }

    // Check if user is still active
    if (!user.isActive) {
      logTokenRefreshFailure('User account deactivated', req);
      clearTokenCookies(res);
      return res.status(403).json({ 
        message: 'Account is deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Remove old refresh token and generate new token pair
    user.refreshTokens = user.refreshTokens.filter(token => token.token !== decoded.tokenId);
    const tokens = await generateTokenPair(user);

    // Set new secure cookies
    setTokenCookies(res, tokens);

    // Log successful token refresh
    logTokenRefresh(user._id, req);

    res.json({
      message: 'Token refreshed successfully',
      tokens: {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    logTokenRefreshFailure(error.message, req);
    clearTokenCookies(res);
    
    res.status(500).json({ 
      message: 'Server error during token refresh',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user and invalidate tokens
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      // Get refresh token to remove
      const refreshToken = req.cookies?.refreshToken;
      
      if (refreshToken) {
        try {
          const decoded = verifyRefreshToken(refreshToken);
          // Remove specific refresh token
          user.refreshTokens = user.refreshTokens.filter(token => token.token !== decoded.tokenId);
          await user.save();
        } catch (error) {
          // Token might be invalid, but we still want to clear cookies
          console.log('Error removing refresh token during logout:', error.message);
        }
      }
    }

    // Clear cookies
    clearTokenCookies(res);

    // Log logout
    logLogout(req.user.id, req);

    res.json({ 
      message: 'Logged out successfully',
      code: 'LOGOUT_SUCCESS'
    });

  } catch (error) {
    console.error('Logout error:', error);
    clearTokenCookies(res); // Clear cookies even if there's an error
    
    res.status(500).json({ 
      message: 'Server error during logout',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   POST /api/auth/logout-all
// @desc    Logout from all devices (invalidate all refresh tokens)
// @access  Private
router.post('/logout-all', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      // Clear all refresh tokens
      user.refreshTokens = [];
      await user.save();
    }

    // Clear cookies
    clearTokenCookies(res);

    // Log logout from all devices
    logLogout(req.user.id + ' (all devices)', req);

    res.json({ 
      message: 'Logged out from all devices successfully',
      code: 'LOGOUT_ALL_SUCCESS'
    });

  } catch (error) {
    console.error('Logout all error:', error);
    clearTokenCookies(res);
    
    res.status(500).json({ 
      message: 'Server error during logout',
      code: 'SERVER_ERROR'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user info
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Server error',
      code: 'SERVER_ERROR'
    });
  }
});

module.exports = router;