const mongoose = require('mongoose');

const UKCompanyRegistrationRequestSchema = new mongoose.Schema({
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
  dateOfBirth: { type: Date, required: true },
  residentialAddress: { type: String, required: true, trim: true },
  companyProposedName: { type: String, required: true, trim: true },
  companyType: { type: String, required: true, trim: true },
  businessActivity: { type: String, required: true, trim: true },
  shareholdersDirectorsInfo: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'UK company-Registration'
});

UKCompanyRegistrationRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UKCompanyRegistrationRequest', UKCompanyRegistrationRequestSchema);