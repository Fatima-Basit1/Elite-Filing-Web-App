const mongoose = require('mongoose');

const UAESPCFreeRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyProposedName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    businessActivity: { type: String, required: true, trim: true },
    licenseType: { type: String, required: true, enum: ['trading', 'professional', 'industrial', 'service'] },
    message: { type: String, trim: true },
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