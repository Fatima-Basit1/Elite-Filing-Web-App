import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';
import { markLogoRequestSubmitted } from '../../store/slices/submissionsSlice';

const LogoCreation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    logoStyle: '',
    colorPreferences: '',
    symbolsElements: '',
    message: ''
  });

  const [referenceImages, setReferenceImages] = useState([]);
  const [uploadErrors, setUploadErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errors = [];
    const validFiles = [];

    // Validate each file
    files.forEach((file, index) => {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        errors.push(`File ${file.name}: Only image files are allowed (JPEG, PNG, GIF, WebP, SVG)`);
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`File ${file.name}: File size must be less than 10MB`);
        return;
      }

      validFiles.push(file);
    });

    // Check total number of files
    if (referenceImages.length + validFiles.length > 5) {
      errors.push('Maximum 5 files allowed');
      setUploadErrors(errors);
      return;
    }

    setUploadErrors(errors);
    if (validFiles.length > 0) {
      setReferenceImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadErrors([]);

    // Client-side auth guard
    if (!isAuthenticated || !token) {
      setIsSubmitting(false);
      setUploadErrors(["Please register or log in first to submit the logo creation form."]); 
      // Redirect to login/register page
      navigate('/get-started');
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append files
      referenceImages.forEach(file => {
        formDataToSend.append('referenceImages', file);
      });

      const response = await fetch('http://localhost:5000/api/logo-requests', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success) {
        // Show success popup
        setShowSuccessPopup(true);
        // Mark logo request as submitted for global success modal
        dispatch(markLogoRequestSubmitted());
        // Hide popup and reset form after delay
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            businessName: '',
            logoStyle: '',
            colorPreferences: '',
            symbolsElements: '',
            message: ''
          });
          setReferenceImages([]);
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        setUploadErrors([result.message || 'Failed to submit request']);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setUploadErrors(['Network error. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen">
      <Navigation />
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center relative overflow-hidden"
            >
              <div className="text-green-500 mb-4">
                <FiCheckCircle className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Success!
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Your logo request has been submitted successfully.
              </p>
              {/* Progress bar */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="absolute bottom-0 left-0 h-1 bg-green-500"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${bluebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Custom Logo Creation{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Transform your brand vision into a memorable logo that represents your unique identity
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Custom Design</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Professional Quality</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Multi-Platform Ready</span>
              </div>
            </div>
            <button
              onClick={() => document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
            >
              Start Your Logo Design
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

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
                To offer custom logo design services that represent the client's brand identity.
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
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guided Design Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Guide clients to submit form details so the design team can create a logo that matches their vision.
              </p>
              <div className="mt-4 text-sm font-medium" style={{
                color: 'rgba(6,30,68,1)'
              }}>Elite Filing</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 bg-gradient-to-br from-gray-50 to-white"
      >
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
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                  Reference Images
                </label>
                <div className="space-y-4">
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors duration-300">
                    <input
                      type="file"
                      id="referenceImages"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="referenceImages"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div className="text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP, SVG up to 10MB (Max 5 files)</p>
                    </label>
                  </div>

                  {/* Display Upload Errors */}
                  {uploadErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex">
                        <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-red-700">
                          <ul className="list-disc list-inside space-y-1">
                            {uploadErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Display Selected Files */}
                  {referenceImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected Files ({referenceImages.length}/5):</p>
                      <div className="grid grid-cols-1 gap-2">
                        {referenceImages.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload reference images of logos you admire (for inspiration)</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 resize-none"
                  style={{
                    '--tw-ring-color': 'rgba(6,30,68,1)'
                  }}
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
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'transform hover:scale-105'
                  }`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Logo Request'
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16" style={{
        background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
      }}>
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
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(39, 99, 197) 0%, rgb(21, 77, 174) 100%)'
              }}>
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
                After feedback, the chosen concept is refined and delivered in high quality formats for all platforms.
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
                Clean, visually appealing, and polished design that enhances your brand image.
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
                Suitable for use across all platforms including web, print, etc. once finalized.
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