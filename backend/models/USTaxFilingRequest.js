const mongoose = require('mongoose');

const USTaxFilingRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phoneNumber: { type: String, required: true, trim: true },
  residentialAddress: { type: String, required: true, trim: true },
  ssnOrItin: { type: String, required: true, trim: true },
  filingType: { type: String, required: true, enum: ['individual', 'llc', 'corp', 'partnership'], default: 'individual' },
  taxYear: { type: Number, required: true, min: 2000 },
  companyName: { type: String, trim: true },
  ein: { type: String, trim: true },
  state: { type: String, trim: true },
  incomeDetails: { type: String, trim: true },
  deductions: { type: String, trim: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

USTaxFilingRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('USTaxFilingRequest', USTaxFilingRequestSchema);