import React, { useState } from 'react';
import { motion } from 'framer-motion';
import spc1 from '../../assets/spc1.jpg';
import spc2 from '../../assets/spc2.jpg';

const SPCFreeZone = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyProposedName: '',
    email: '',
    phoneNumber: '',
    businessActivity: '',
    licenseType: '',
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4 overflow-hidden"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-yellow-400"
            variants={fadeInUp}
          >
            SPC FREE ZONE
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            At Elite Filing ES, we provide a wide range of tailored business services designed to help you establish and grow your enterprise in the UAE SPC (Special Purpose Companies) Free Zone.
          </motion.p>
        </div>
      </motion.section>

      {/* Form Section */}
      <motion.section 
        className="py-16 px-4 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8"
            variants={fadeInUp}
          >
            SPC FREE ZONE FORM
          </motion.h2>
          
          {!showForm ? (
            <motion.button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Application
            </motion.button>
          ) : (
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Proposed Name
                  </label>
                  <input
                    type="text"
                    name="companyProposedName"
                    value={formData.companyProposedName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    placeholder="Enter proposed company name"
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Business Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Business Activity
                    </label>
                    <input
                      type="text"
                      name="businessActivity"
                      value={formData.businessActivity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      placeholder="Describe your business activity"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      License Type
                    </label>
                    <select
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    >
                      <option value="">Select License Type</option>
                      <option value="trading">Trading License</option>
                      <option value="professional">Professional License</option>
                      <option value="industrial">Industrial License</option>
                      <option value="service">Service License</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none"
                    placeholder="Additional information or requirements"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SUBMIT
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section 
        className="py-16 px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                COMPREHENSIVE BUSINESS SOLUTIONS
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-8">
                UAE SPC FREE ZONE
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                At Elite Filing ES, we provide a wide range of tailored business services designed to help you establish and grow your enterprise in the UAE SPC (Special Purpose Companies) Free Zone. Our expertise lies in navigating the legal, financial, and regulatory frameworks to ensure your business operates smoothly and efficiently in one of the most favorable economic environments in the region. Whether you're starting a new venture or expanding your current operations, we offer end-to-end solutions including company formation, registration, visa processing, office space leasing, and more. With our local knowledge and international standards, we guide you through the entire process, ensuring you meet all compliance requirements with ease.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-4">
                <img 
                  src={spc1} 
                  alt="UAE SPC Free Zone Office" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div 
              className="bg-yellow-500 rounded-2xl p-8 border-4 border-yellow-400"
              variants={fadeInUp}
            >
              <div className="text-2xl font-bold text-blue-900 mb-4">01</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">BUSINESS REGISTRATION</h3>
              <p className="text-blue-900 leading-relaxed">
                The first step is registering your business with the SPC Free Zone authorities. This involves submitting your business plan, choosing your company structure, and obtaining the necessary licenses to operate within the zone.
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              className="bg-yellow-500 rounded-2xl p-8 border-4 border-yellow-400"
              variants={fadeInUp}
            >
              <div className="text-2xl font-bold text-blue-900 mb-4">02</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">VISA & LICENSING</h3>
              <p className="text-blue-900 leading-relaxed">
                Once your business is registered, we assist you with the processing of investor, employee, and family visas. Along with residency permits, you'll receive all the necessary licenses for legal operations in the UAE.
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              className="bg-yellow-500 rounded-2xl p-8 border-4 border-yellow-400"
              variants={fadeInUp}
            >
              <div className="text-2xl font-bold text-blue-900 mb-4">03</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">OFFICE SETUP</h3>
              <p className="text-blue-900 leading-relaxed">
                We help you secure office space in the Free Zone, whether it's a flexible desk or a private office. Our services also include arranging all the utilities and infrastructure needed to run your business smoothly.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section - Why Choose the UAE SPC Free Zone? */}
      <motion.section 
        className="py-16 px-4 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-4">
                <img 
                  src={spc2} 
                  alt="Dubai Skyline" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
                WHY CHOOSE THE UAE SPC FREE ZONE?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                The UAE SPC Free Zone offers unmatched advantages for entrepreneurs and businesses looking to set up in the region. With its strategic location, tax incentives, and straightforward regulatory procedures, it is an ideal hub for international businesses looking to access global markets. Companies operating in the SPC Free Zone benefit from 100% foreign ownership, zero income tax, and the ability to repatriate capital and profits.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SPCFreeZone;