const mongoose = require('mongoose');

const PAKSECPRegistrationRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyProposedName: { type: String, required: true, trim: true },
    companyProposedName2: { type: String, trim: true },
    companyProposedName3: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    registrationType: {
      type: String,
      required: true,
      enum: ['Private Limited', 'Sole Proprietor', 'Partnership'],
    },
    message: { type: String, trim: true },
    status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'PAK-SECP-Registration',
  }
);

module.exports = mongoose.model('PAKSECPRegistrationRequest', PAKSECPRegistrationRequestSchema);