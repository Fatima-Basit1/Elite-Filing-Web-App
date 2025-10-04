// Shared frontend validation utilities mirroring backend rules

// Password strength validation (aligned with backend constraints)
export const validatePasswordStrength = (password) => {
  const feedback = [];

  const checks = {
    length: password.length >= 8 && password.length <= 128,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&:#*()~`-]/.test(password),
  };

  if (!checks.length) feedback.push('At least 8 and at most 128 characters');
  if (!checks.lowercase) feedback.push('At least one lowercase letter');
  if (!checks.uppercase) feedback.push('At least one uppercase letter');
  if (!checks.number) feedback.push('At least one number');
  if (!checks.special) feedback.push('At least one special character (@$!%*?&)');

  // Common weak passwords (basic list)
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey',
  ];
  const isCommon = commonPasswords.includes(password.toLowerCase());
  if (isCommon) {
    feedback.push('Password is too common');
  }

  // Score out of 5 (length + four character classes) for UI indicator
  const score = [
    checks.length,
    checks.lowercase,
    checks.uppercase,
    checks.number,
    checks.special,
  ].filter(Boolean).length;

  const isValid = feedback.length === 0;
  return { score, feedback, isValid };
};

// Email validation with basic disposable domain check (aligned with backend)
export const validateEmail = (email) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }
  if (email.length > 254) {
    errors.push('Email address is too long');
  }
  const disposableDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
    'mailinator.com', 'throwaway.email',
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && disposableDomains.includes(domain)) {
    errors.push('Please use a permanent email address');
  }
  return { isValid: errors.length === 0, errors };
};

// Name validation (aligned with backend rules)
export const validateName = (name) => {
  const errors = [];
  const trimmed = (name || '').trim();
  if (!trimmed) errors.push('Name is required');
  if (trimmed.length < 2) errors.push('Name must be at least 2 characters long');
  if (trimmed.length > 50) errors.push('Name must be less than 50 characters long');
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  return { isValid: errors.length === 0, errors };
};

// Aggregate signup validation using first/last names
export const validateSignup = ({ firstName, lastName, email, password, confirmPassword }) => {
  const errors = {};

  // Names
  const firstNameResult = validateName(firstName);
  if (!firstNameResult.isValid) {
    errors.firstName = firstNameResult.errors.join(', ');
  }
  const lastNameResult = validateName(lastName);
  if (!lastNameResult.isValid) {
    errors.lastName = lastNameResult.errors.join(', ');
  }

  // Email
  const emailResult = validateEmail((email || '').trim().toLowerCase());
  if (!emailResult.isValid) {
    errors.email = emailResult.errors.join(', ');
  }

  // Password
  const pwdResult = validatePasswordStrength(password || '');
  if (!pwdResult.isValid) {
    errors.password = 'Password must meet all strength requirements';
  }

  // Confirm Password
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Login validation (aligned with backend)
export const validateLogin = ({ email, password }) => {
  const errors = {};

  const emailResult = validateEmail((email || '').trim().toLowerCase());
  if (!emailResult.isValid) {
    errors.email = emailResult.errors.join(', ');
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};