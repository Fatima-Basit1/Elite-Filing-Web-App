const mongoose = require('mongoose');

const USLLCFormationRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phoneNumber: { type: String, required: true, trim: true },
  residentialAddress: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  companyProposedName: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  numberOfMembers: { type: Number, required: true, min: 1 },
  businessIndustry: { type: String, required: true, trim: true },
  members: [
    new mongoose.Schema({
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    }, { _id: false })
  ],
  services: [{
    type: String,
    enum: [
      'LLC formation',
      'EIN registration',
      'Registered Agent Service',
      'Bank Account',
      'Business Address',
      'Phone Number',
      'Complete Package',
      'Resale Certificate',
    ],
  }],
  message: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'reviewed', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Enforce mutual exclusivity and uniqueness for services
USLLCFormationRequestSchema.path('services').validate(function(services) {
  if (!Array.isArray(services) || services.length === 0) return true;
  const hasComplete = services.includes('Complete Package');
  const others = services.filter((s) => s !== 'Complete Package');
  if (hasComplete && others.length > 0) return false;
  const uniqueCount = new Set(services).size;
  return uniqueCount === services.length;
}, 'Services selection invalid: "Complete Package" cannot be combined with other services or duplicates.');

USLLCFormationRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('USLLCFormationRequest', USLLCFormationRequestSchema);