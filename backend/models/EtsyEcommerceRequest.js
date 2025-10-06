const mongoose = require('mongoose');

const EtsyEcommerceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phoneNumber: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  sellingCountry: { type: String, required: true, trim: true },
  productCategory: { type: String, required: true, trim: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EtsyEcommerceRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('EtsyEcommerceRequest', EtsyEcommerceRequestSchema);