const mongoose = require('mongoose');

const UKVATRegistrationRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    annualTurnoverEstimate: { type: String, required: true, trim: true },
    typeOfBusinessActivity: { type: String, required: true, trim: true },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['pending', 'in_review', 'completed', 'cancelled'],
      default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'UK-VAT-Registration' }
);

UKVATRegistrationRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UKVATRegistrationRequest', UKVATRegistrationRequestSchema);