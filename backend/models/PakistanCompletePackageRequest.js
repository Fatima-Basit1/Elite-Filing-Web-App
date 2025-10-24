const mongoose = require('mongoose');

const PakistanCompletePackageRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contact: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    packageName: { type: String, default: 'Complete Package', trim: true },
    packagePrice: { type: String, default: 'PKR 80,000', trim: true },
    status: { type: String, enum: ['pending', 'in_review', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'Pakistan-Complete-Package' }
);

PakistanCompletePackageRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('PakistanCompletePackageRequest', PakistanCompletePackageRequestSchema);
