const mongoose = require('mongoose');

const UKBankAccountRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    preferredBank: { type: String, required: true, trim: true },
    accountType: { type: String, enum: ['Personal', 'Business'], required: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'UK-Bank-Account',
  }
);

UKBankAccountRequestSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.models.UKBankAccountRequest || mongoose.model('UKBankAccountRequest', UKBankAccountRequestSchema);