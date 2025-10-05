const mongoose = require('mongoose');

const RegisteredAgentRequestSchema = new mongoose.Schema({
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
  companyName: { type: String, trim: true },
  businessType: { type: String, trim: true },
  stateOfRegistration: { type: String, trim: true },
  serviceDuration: { type: String, trim: true },
  message: { type: String, trim: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

RegisteredAgentRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('RegisteredAgentRequest', RegisteredAgentRequestSchema);