const fs = require('fs').promises;
const path = require('path');

// Ensure logs directory exists
const ensureLogsDirectory = async () => {
  const logsDir = path.join(__dirname, '../logs');
  try {
    await fs.access(logsDir);
  } catch (error) {
    await fs.mkdir(logsDir, { recursive: true });
  }
  return logsDir;
};

// Format log entry
const formatLogEntry = (level, event, details, req = null) => {
  const timestamp = new Date().toISOString();
  const ip = req ? (req.ip || req.connection?.remoteAddress || 'unknown') : 'system';
  const userAgent = req ? req.get('User-Agent') || 'unknown' : 'system';
  const userId = req?.user?.id || 'anonymous';
  
  return {
    timestamp,
    level,
    event,
    ip,
    userAgent,
    userId,
    details: typeof details === 'object' ? details : { message: details }
  };
};

// Write log to file
const writeLog = async (logEntry, filename = 'security.log') => {
  try {
    const logsDir = await ensureLogsDirectory();
    const logFile = path.join(logsDir, filename);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    await fs.appendFile(logFile, logLine);
  } catch (error) {
    console.error('Failed to write security log:', error);
  }
};

// Security event types
const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_BLOCKED: 'LOGIN_BLOCKED',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  TOKEN_REFRESH: 'TOKEN_REFRESH',
  TOKEN_REFRESH_FAILURE: 'TOKEN_REFRESH_FAILURE',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY'
};

// Log security events
const logSecurityEvent = async (event, details, req = null, level = 'info') => {
  const logEntry = formatLogEntry(level, event, details, req);
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SECURITY] ${event}:`, logEntry);
  }
  
  // Write to file
  await writeLog(logEntry);
  
  // For critical events, also log to separate file
  if (level === 'error' || level === 'critical') {
    await writeLog(logEntry, 'security-critical.log');
  }
};

// Specific logging functions
const logLoginSuccess = (user, req) => {
  logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, {
    userId: user._id,
    email: user.email,
    name: user.name
  }, req, 'info');
};

const logLoginFailure = (email, reason, req) => {
  logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILURE, {
    email,
    reason,
    timestamp: new Date().toISOString()
  }, req, 'warn');
};

const logLoginBlocked = (email, reason, req) => {
  logSecurityEvent(SECURITY_EVENTS.LOGIN_BLOCKED, {
    email,
    reason,
    timestamp: new Date().toISOString()
  }, req, 'error');
};

const logSignupSuccess = (user, req) => {
  logSecurityEvent(SECURITY_EVENTS.SIGNUP_SUCCESS, {
    userId: user._id,
    email: user.email,
    name: user.name
  }, req, 'info');
};

const logSignupFailure = (email, reason, req) => {
  logSecurityEvent(SECURITY_EVENTS.SIGNUP_FAILURE, {
    email,
    reason,
    timestamp: new Date().toISOString()
  }, req, 'warn');
};

const logTokenRefresh = (userId, req) => {
  logSecurityEvent(SECURITY_EVENTS.TOKEN_REFRESH, {
    userId
  }, req, 'info');
};

const logTokenRefreshFailure = (reason, req) => {
  logSecurityEvent(SECURITY_EVENTS.TOKEN_REFRESH_FAILURE, {
    reason,
    timestamp: new Date().toISOString()
  }, req, 'warn');
};

const logLogout = (userId, req) => {
  logSecurityEvent(SECURITY_EVENTS.LOGOUT, {
    userId
  }, req, 'info');
};

const logAccountLocked = (userId, email, req) => {
  logSecurityEvent(SECURITY_EVENTS.ACCOUNT_LOCKED, {
    userId,
    email,
    timestamp: new Date().toISOString()
  }, req, 'error');
};

const logRateLimitExceeded = (endpoint, req) => {
  logSecurityEvent(SECURITY_EVENTS.RATE_LIMIT_EXCEEDED, {
    endpoint,
    timestamp: new Date().toISOString()
  }, req, 'warn');
};

const logUnauthorizedAccess = (resource, req) => {
  logSecurityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, {
    resource,
    timestamp: new Date().toISOString()
  }, req, 'error');
};

const logSuspiciousActivity = (activity, details, req) => {
  logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, {
    activity,
    details,
    timestamp: new Date().toISOString()
  }, req, 'critical');
};

module.exports = {
  SECURITY_EVENTS,
  logSecurityEvent,
  logLoginSuccess,
  logLoginFailure,
  logLoginBlocked,
  logSignupSuccess,
  logSignupFailure,
  logTokenRefresh,
  logTokenRefreshFailure,
  logLogout,
  logAccountLocked,
  logRateLimitExceeded,
  logUnauthorizedAccess,
  logSuspiciousActivity
};