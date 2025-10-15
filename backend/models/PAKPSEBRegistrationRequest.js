const mongoose = require('mongoose');

const PAKPSEBRegistrationRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    residentialAddress: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    secpNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    natureOfBusiness: { type: String, required: true, trim: true },
    exportActivityDetails: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'PAK-PSEB-Registration',
  }
);

module.exports = mongoose.model('PAKPSEBRegistrationRequest', PAKPSEBRegistrationRequestSchema);