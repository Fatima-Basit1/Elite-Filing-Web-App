const mongoose = require('mongoose');

const PAKFBRRegistrationRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    businessActivity: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    registrationType: {
      type: String,
      required: true,
      enum: ['NTN', 'STRN', 'Sales Tax', 'Income Tax'],
    },
    message: { type: String, trim: true },
    status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'PAK-FBR-Registration',
  }
);

module.exports = mongoose.model('PAKFBRRegistrationRequest', PAKFBRRegistrationRequestSchema);