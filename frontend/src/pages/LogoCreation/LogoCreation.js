import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';

const LogoCreation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    logoStyle: '',
    colorPreferences: '',
    symbolsElements: '',
    referenceLogos: '',
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
    <div className="min-h-screen pt-24">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #041e72 0%, #0a285a 50%, #041e72 100%)'
      }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              Custom Logo Creation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed" style={{
              fontFamily: 'Inter, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Transform your brand vision into a memorable logo that represents your unique identity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #041e72 0%, #0a285a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              Our Purpose
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideFromLeft}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Logo Design Services</h3>
              <p className="text-gray-600 leading-relaxed">
                To offer custom logo-design services that represent the client's brand identity.
              </p>
              <div className="mt-4 text-sm font-medium text-yellow-600">Elite Filing</div>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideFromRight}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guided Design Process</h3>
              <p className="text-gray-600 leading-relaxed">
                To guide potential clients to submit the necessary information via a form so the design team can create a logo aligned with the client's vision.
              </p>
              <div className="mt-4 text-sm font-medium text-blue-600">Elite Filing</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #041e72 0%, #0a285a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              Logo Creation Form
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your vision with us and let our design team create the perfect logo for your brand
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your first name"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Client's first name</p>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your last name"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Client's last name</p>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact email for follow-up or delivery of design</p>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">For more direct / possibly quicker communication</p>
                </motion.div>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your business or brand name"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">What name the logo should represent</p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Logo Style
                </label>
                <select
                  name="logoStyle"
                  value={formData.logoStyle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select a style</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="modern">Modern</option>
                  <option value="vintage">Vintage</option>
                  <option value="classic">Classic</option>
                  <option value="playful">Playful</option>
                  <option value="elegant">Elegant</option>
                  <option value="bold">Bold</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">To know what visual style the client is going for</p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color Preferences
                </label>
                <input
                  type="text"
                  name="colorPreferences"
                  value={formData.colorPreferences}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Blue and gold, avoid red, earth tones"
                />
                <p className="text-xs text-gray-500 mt-1">Which colors to use (or avoid)</p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Any Symbols or Elements to Include
                </label>
                <input
                  type="text"
                  name="symbolsElements"
                  value={formData.symbolsElements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Mountain, star, arrow, geometric shapes"
                />
                <p className="text-xs text-gray-500 mt-1">If the client wants specific icons / symbols included</p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reference Logos
                </label>
                <input
                  type="text"
                  name="referenceLogos"
                  value={formData.referenceLogos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Share links or describe logos you admire"
                />
                <p className="text-xs text-gray-500 mt-1">Examples of logos the client likes (for inspiration)</p>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Any additional details or instructions you want our designers to know..."
                />
                <p className="text-xs text-gray-500 mt-1">Any additional details or instructions the client wants the designers to know</p>
              </motion.div>
              
              <motion.div
                className="pt-6"
                variants={fadeUp}
              >
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit Logo Request
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              Our Design Process
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A systematic approach to creating your perfect logo
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center"
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Understanding Your Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                Gathering information about business goals, audience, industry, etc., so the logo reflects those.
              </p>
              <div className="mt-4 text-sm font-medium text-yellow-400">Elite Filing</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Concept & Design</h3>
              <p className="text-blue-100 leading-relaxed">
                Designers will create multiple logo concepts, using creativity + strategy.
              </p>
              <div className="mt-4 text-sm font-medium text-blue-400">Elite Filing</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Finalization & Delivery</h3>
              <p className="text-blue-100 leading-relaxed">
                After feedback, the selected concept is refined and delivered in high-quality formats, ready for all platforms.
              </p>
              <div className="mt-4 text-sm font-medium text-green-400">Elite Filing</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Desired Qualities Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #041e72 0%, #0a285a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              What You'll Receive
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to delivering exceptional logo designs
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Unique & Memorable</h3>
              <p className="text-gray-600 leading-relaxed">
                Unique, memorable logos that align with the business vision.
              </p>
              <div className="mt-4 text-sm font-medium text-purple-600">Elite Filing</div>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Visually appealing, professional design.
              </p>
              <div className="mt-4 text-sm font-medium text-pink-600">Elite Filing</div>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Platform Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Suitable for use across all platforms (web, print, etc.) once finalized.
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-600">Elite Filing</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default LogoCreation;