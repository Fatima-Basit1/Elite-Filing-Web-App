const mongoose = require('mongoose');
const UAESPCPackageRequest = require('./models/UAESPCPackageRequest');

// Test MongoDB connection and package collection
async function testPackageConnection() {
  try {
    // Connect to MongoDB with your URI
    const uri = 'mongodb+srv://mehreen:elitefiling@cluster0.wrspfaq.mongodb.net/elite-filing?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Test creating a package document
    const testPackage = new UAESPCPackageRequest({
      userId: new mongoose.Types.ObjectId(),
      fullName: 'Test User',
      email: 'test@example.com',
      contact: '+1234567890',
      dateOfBirth: '1990-01-01',
      selectedPackage: 'Basic Package',
      packageType: 'Basic Package',
      status: 'pending'
    });
    
    const saved = await testPackage.save();
    console.log('✅ Package document created successfully:', saved._id);
    
    // Test reading the document
    const found = await UAESPCPackageRequest.findById(saved._id);
    console.log('✅ Package document retrieved successfully:', found.fullName);
    
    // Clean up test document
    await UAESPCPackageRequest.findByIdAndDelete(saved._id);
    console.log('✅ Test document cleaned up');
    
    console.log('🎉 UAE-SPC-Package collection is working perfectly!');
    
  } catch (error) {
    console.error('❌ Error testing package connection:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📡 MongoDB connection closed');
  }
}

// Load environment variables
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('Environment check:', {
  MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'elite-filing'
});

testPackageConnection();
