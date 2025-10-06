const rateLimit = require('express-rate-limit');

// Robust client IP resolver for rate limiting
// - Prefers left-most IP from X-Forwarded-For when present
// - Falls back to req.ip or socket remoteAddress
// - Strips any port suffixes to avoid validation issues
const ipKeyGenerator = (req) => {
  try {
    const xff = req.headers['x-forwarded-for'];
    let ipCandidate = '';

    if (typeof xff === 'string' && xff.length > 0) {
      // Use left-most entry (closest to client)
      ipCandidate = xff.split(',')[0].trim();
    } else {
      ipCandidate = req.ip || req.socket?.remoteAddress || '';
    }

    // Strip port from IPv4/IPv6 addresses if present
    return ipCandidate.replace(/:\d+[^:]*$/, '');
  } catch (e) {
    // Fallback to req.ip on any parsing error
    return (req.ip || '').replace(/:\d+[^:]*$/, '');
  }
};

// General rate limiting
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Disable validation warning when X-Forwarded-For is present but trust proxy is not set
  validate: { xForwardedForHeader: false },
  // Use robust IP detection to ensure consistent limiting per client
  keyGenerator: ipKeyGenerator,
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip} on ${req.originalUrl}`);
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
    });
  }
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 login attempts per windowMs
  message: {
    error: 'Too many authentication attempts from this IP, please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil((parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  validate: { xForwardedForHeader: false },
  keyGenerator: ipKeyGenerator,
  handler: (req, res) => {
    console.log(`Auth rate limit exceeded for IP: ${req.ip} on ${req.originalUrl}`);
    res.status(429).json({
      error: 'Too many authentication attempts from this IP, please try again later.',
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil((parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
    });
  }
});

// Very strict rate limiting for signup
const signupLimiter = rateLimit({
  windowMs: parseInt(process.env.SIGNUP_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.SIGNUP_RATE_LIMIT_MAX_REQUESTS) || 3, // limit each IP to 3 signup attempts per hour
  message: {
    error: 'Too many signup attempts from this IP, please try again later.',
    code: 'SIGNUP_RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil((parseInt(process.env.SIGNUP_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  validate: { xForwardedForHeader: false },
  keyGenerator: ipKeyGenerator,
  handler: (req, res) => {
    console.log(`Signup rate limit exceeded for IP: ${req.ip} on ${req.originalUrl}`);
    res.status(429).json({
      error: 'Too many signup attempts from this IP, please try again later.',
      code: 'SIGNUP_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil((parseInt(process.env.SIGNUP_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000) / 1000)
    });
  }
});

// Password reset rate limiting
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset attempts per hour
  message: {
    error: 'Too many password reset attempts from this IP, please try again later.',
    code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
    retryAfter: 3600
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  keyGenerator: ipKeyGenerator,
  handler: (req, res) => {
    console.log(`Password reset rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Too many password reset attempts from this IP, please try again later.',
      code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
      retryAfter: 3600
    });
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  signupLimiter,
  passwordResetLimiter
};