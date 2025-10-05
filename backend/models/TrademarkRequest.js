const mongoose = require('mongoose');

const TrademarkRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  trademarkType: { type: String, trim: true },
  goodsServices: { type: String, trim: true },
  classNumber: { type: String, trim: true },
  existingTrademark: { type: String, trim: true },
  message: { type: String, trim: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TrademarkRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('TrademarkRequest', TrademarkRequestSchema);