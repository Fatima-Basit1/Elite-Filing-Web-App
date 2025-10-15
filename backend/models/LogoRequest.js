const mongoose = require('mongoose');

const logoRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  serviceIndustry: {
    type: String,
    trim: true
  },
  logoStyle: {
    type: String,
    trim: true
  },
  colorPreferences: {
    type: String,
    trim: true
  },
  symbolsElements: {
    type: String,
    trim: true
  },
  referenceImages: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
logoRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LogoRequest', logoRequestSchema);