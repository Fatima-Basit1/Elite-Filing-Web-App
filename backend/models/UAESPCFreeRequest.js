const mongoose = require('mongoose');

const UAESPCFreeRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    // Original form fields
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    companyProposedName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    businessActivity: { type: String, trim: true },
    licenseType: { type: String, enum: ['trading', 'professional', 'industrial', 'service'] },
    message: { type: String, trim: true },
    // Package selection fields
    fullName: { type: String, trim: true },
    contact: { type: String, trim: true },
    dateOfBirth: { type: String, trim: true },
    selectedPackage: { type: String, trim: true },
    packageType: { type: String, trim: true },
    // Metadata fields
    email: { type: String, required: true, trim: true, lowercase: true },
    submissionType: { type: String, enum: ['form-submission', 'package-selection'], default: 'form-submission' },
    subCollection: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'in_review', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'UAE-SPC-Free' }
);

UAESPCFreeRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UAESPCFreeRequest', UAESPCFreeRequestSchema);