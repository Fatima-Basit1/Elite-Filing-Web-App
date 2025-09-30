const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate access token
const generateAccessToken = (userId) => {
  const payload = {
    user: {
      id: userId
    }
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRE || '15m',
      issuer: 'elite-filing',
      audience: 'elite-filing-users'
    }
  );
};

// Generate refresh token
const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

// Generate signed refresh token (JWT)
const generateSignedRefreshToken = (userId, tokenId) => {
  const payload = {
    user: {
      id: userId
    },
    tokenId: tokenId,
    type: 'refresh'
  };

  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
      issuer: 'elite-filing',
      audience: 'elite-filing-users'
    }
  );
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Generate token pair (access + refresh)
const generateTokenPair = async (user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshTokenId = generateRefreshToken();
  const refreshToken = generateSignedRefreshToken(user._id, refreshTokenId);

  // Store refresh token in user document
  user.refreshTokens.push({
    token: refreshTokenId,
    createdAt: new Date()
  });

  // Keep only the last 5 refresh tokens
  if (user.refreshTokens.length > 5) {
    user.refreshTokens = user.refreshTokens.slice(-5);
  }

  await user.save();

  return {
    accessToken,
    refreshToken,
    expiresIn: process.env.JWT_EXPIRE || '15m'
  };
};

// Set secure cookies
const setTokenCookies = (res, tokens) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Set access token cookie
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/'
  });

  // Set refresh token cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh'
  });
};

// Clear auth cookies
const clearTokenCookies = (res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/'
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/api/auth/refresh'
  });
};

// Validate token format
const validateTokenFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Basic JWT format check (3 parts separated by dots)
  const parts = token.split('.');
  return parts.length === 3;
};

// Extract user ID from token without verification (for logging purposes)
const extractUserIdFromToken = (token) => {
  try {
    const payload = jwt.decode(token);
    return payload?.user?.id || null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateSignedRefreshToken,
  verifyRefreshToken,
  generateTokenPair,
  setTokenCookies,
  clearTokenCookies,
  validateTokenFormat,
  extractUserIdFromToken
};