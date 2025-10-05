const mongoose = require('mongoose');

const UKCompanyNameChangeRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    currentCompanyName: { type: String, required: true, trim: true },
    newCompanyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'in_review', 'completed'], default: 'pending' },
  },
  { timestamps: true, collection: 'UK company-Name-Change' }
);

module.exports = mongoose.model('UKCompanyNameChangeRequest', UKCompanyNameChangeRequestSchema);