const mongoose = require('mongoose');

const UKSharedOfficeRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phoneNumber: { type: String, required: true, trim: true },
  selectedPackage: { type: String, required: true, enum: ['Basic', 'Standard', 'Premium'] },
  duration: { type: String, required: true, enum: ['3 months', '6 months', '9 months', '12 months'] },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UKSharedOfficeRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UKSharedOfficeRequest', UKSharedOfficeRequestSchema);