const mongoose = require('mongoose');

const UKVATReturnRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    vatNumber: { type: String, required: true, trim: true },
    vatPeriod: { type: String, required: true, enum: ['Quarterly', 'Annually', 'Monthly'] },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['pending', 'in_review', 'completed', 'cancelled'],
      default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'UK-VAT-Return' }
);

UKVATReturnRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UKVATReturnRequest', UKVATReturnRequestSchema);