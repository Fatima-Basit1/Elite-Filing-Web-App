const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  refreshTokens: [{
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 604800 // 7 days in seconds
    }
  }],
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },

  // Onboarding progress
  onboardingProgress: {
    currentStep: {
      type: String,
      default: 'welcome'
    },
    completedSteps: [{
      type: String
    }],
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date,
    isCompleted: {
      type: Boolean,
      default: false
    }
  },

  // Onboarding data storage
  onboardingData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: new Map()
  }
}, {
  timestamps: true
});

// Index for faster queries
UserSchema.index({ email: 1 });

// Normalize and hash sensitive fields before save
UserSchema.pre('save', async function(next) {
  try {
    if (typeof this.email === 'string') {
      this.email = this.email.toLowerCase().trim();
    }
    if (typeof this.name === 'string') {
      this.name = this.name.trim();
    }
    if (this.isModified('password')) {
      const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const salt = await bcrypt.genSalt(rounds);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Virtual for account lock status
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Methods for account security
UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

module.exports = mongoose.model('User', UserSchema);