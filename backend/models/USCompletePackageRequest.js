const mongoose = require('mongoose');

const usCompletePackageRequestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    businessType: {
        type: String,
        required: true,
        enum: ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship', 'Other']
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'USComplete-package'
});

module.exports = mongoose.model('USCompletePackageRequest', usCompletePackageRequestSchema);