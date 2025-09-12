import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';

const UKSharedOffices = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    businessType: '',
    officeRequirements: '',
    duration: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              className="text-left text-white"
              initial="hidden"
              animate="show"
              variants={slideFromLeft}
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                UK Shared
                <span className="block text-yellow-400">Offices</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Professional UK office services for overseas entrepreneurs and local businesses seeking a prestigious address.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-900 bg-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-2xl hover:bg-white hover:text-blue-900 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right Side - Office Image */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial="hidden"
              animate="show"
              variants={slideFromRight}
            >
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our UK Office Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond company formation by offering fully compliant UK office services for our clients.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Professional Address */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100"
              variants={scaleIn}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Prestigious UK Address
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Use our professional UK address for your business registration and correspondence.
              </p>
            </motion.div>
            
            {/* Mail Handling */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100"
              variants={scaleIn}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mail Forwarding & Scanning
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive mail and mail forwarding via scan to email for instant access to your correspondence.
              </p>
            </motion.div>
            
            {/* Business Support */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100"
              variants={scaleIn}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.28.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                24/7 Call Answering
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Free 24/7 call answering service with a dedicated UK phone line (1500 minutes included).
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to establish your UK business presence.
            </p>
          </motion.div>
          
          {/* Recommended Plan */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                RECOMMENDED
              </span>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-yellow-400">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Satellite Office Package
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-blue-900">PKR 47,723</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">
                  Perfect for small businesses and startups
                </p>
              </div>
              
              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  'Work from Business Lounge (restrictions apply)',
                  'Access by appointment only',
                  'Use address for your Business (Terms apply)',
                  'Receive mail and mail forwarding via scan to email',
                  'Business Rates included',
                  'License agreement in personal name',
                  'Free UK Multi Currency Bank Accounts & International Transfers',
                  'Free 24/7 call answering and free phone line (1500 mins)'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.button
                onClick={scrollToForm}
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-900"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl p-8 md:p-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                UK Shared Offices Form
              </h2>
              <p className="text-gray-600">
                Get started with your UK office setup today. Fill out the form below and we'll contact you within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>
              
              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>
              
              {/* Company Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  required
                />
              </div>
              
              {/* Business Type and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="Startup">Startup</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Medium Enterprise">Medium Enterprise</option>
                    <option value="Large Corporation">Large Corporation</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Duration Required *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2+ Years">2+ Years</option>
                  </select>
                </div>
              </div>
              
              {/* Office Requirements */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Office Requirements
                </label>
                <textarea
                  name="officeRequirements"
                  value={formData.officeRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-white"
                  placeholder="Describe your specific office requirements, team size, special needs, etc..."
                />
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-white"
                  placeholder="Any additional information or questions..."
                />
              </div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-900"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Enquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
              {/* Fully Compliant */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Fully Compliant</span>
              </div>
              
              {/* Professional Service */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Professional Service</span>
              </div>
              
              {/* 24/7 Support */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">24/7 Support</span>
              </div>
              
              {/* Secure & Reliable */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Secure & Reliable</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default UKSharedOffices;