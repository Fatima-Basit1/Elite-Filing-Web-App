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
  phoneNumber: { type: String, required: true, trim: true },
  trademarkName: { type: String, required: true, trim: true },
  trademarkType: { type: String, required: true, trim: true },
  jurisdiction: { type: String, required: true, trim: true },
  state: { type: String, trim: true },
  classOfGoods: { type: String, required: true, trim: true },
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