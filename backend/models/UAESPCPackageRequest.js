const mongoose = require('mongoose');

const UAESPCPackageRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contact: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    selectedPackage: { type: String, required: true, trim: true },
    packageType: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'in_review', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'UAE-SPC-Package' }
);

UAESPCPackageRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UAESPCPackageRequest', UAESPCPackageRequestSchema);
