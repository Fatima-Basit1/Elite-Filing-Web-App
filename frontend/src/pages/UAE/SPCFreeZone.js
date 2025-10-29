import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { apiMethods } from '../../services/api';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import { FiCheckCircle } from 'react-icons/fi';
import spc1 from '../../assets/spc1.jpg';
import spc2 from '../../assets/spc2.jpg';
import bluebg from '../../assets/bluebg.jpg';

const SPCFreeZone = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Allow viewing the page; redirect on submit if not logged in
  const { isAuthenticated } = useAuth(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
  const [packageFormData, setPackageFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    dateOfBirth: '',
    selectedPackage: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [packageFormErrors, setPackageFormErrors] = useState({});
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [isPackageSubmitting, setIsPackageSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageInputChange = (e) => {
    const { name, value } = e.target;
    setPackageFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageSelect = (packageName) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Authentication Required',
          message: 'Please log in first to access our package services.',
        })
      );
      // Redirect to login page
      navigate('/auth/login');
      return;
    }
    
    setPackageFormData(prev => ({
      ...prev,
      selectedPackage: packageName
    }));
    setShowPackageForm(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!formData.companyProposedName?.trim()) errors.companyProposedName = 'Company proposed name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    if (!formData.businessActivity?.trim()) errors.businessActivity = 'Business activity is required';
    if (!formData.licenseType?.trim()) errors.licenseType = 'License type is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePackageForm = () => {
    const errors = {};
    if (!packageFormData.fullName?.trim()) errors.fullName = 'Full name is required';
    if (!packageFormData.email?.trim()) errors.email = 'Email is required';
    if (!packageFormData.contact?.trim()) errors.contact = 'Contact number is required';
    if (!packageFormData.dateOfBirth?.trim()) errors.dateOfBirth = 'Date of birth is required';
    setPackageFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Redirect unauthenticated users to Get Started page on submit
    if (!isAuthenticated) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Sign In Required',
          message: 'Please log in to submit the SPC Free Zone form.',
        })
      );
      navigate('/get-started');
      return;
    }

    if (!validateForm()) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Validation Error',
          message: 'Please check the form for errors and try again.',
        })
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await apiMethods.submissions.submitUAESPCFreeZone({
        ...formData,
      });
      const refId = res?.data?.data?._id || res?.data?._id;
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Submission Received',
          message: `Your UAE SPC Free Zone request has been submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
        })
      );
      setShowSuccessPopup(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        companyProposedName: '',
        email: '',
        phoneNumber: '',
        businessActivity: '',
        licenseType: '',
        message: ''
      });
    } catch (error) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Failed',
          message: error?.response?.data?.message || 'Unable to submit SPC Free Zone request. Please try again.',
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePackageForm()) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Validation Error',
          message: 'Please check the form for errors and try again.',
        })
      );
      return;
    }

    try {
      setIsPackageSubmitting(true);
      // Save package selection data to database with sub-collection structure
      const res = await apiMethods.submissions.submitUAESPCFreeZonePackage({
        ...packageFormData,
        packageType: packageFormData.selectedPackage,
        subCollection: 'spc-package',
        submissionType: 'package-selection'
      });
      
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Package Selected',
          message: `Your ${packageFormData.selectedPackage} package has been selected. Redirecting to payment...`,
        })
      );
      
      // Navigate to payment page
      setTimeout(() => {
        navigate('/payment', { 
          state: { 
            packageData: packageFormData,
            packageType: packageFormData.selectedPackage
          }
        });
      }, 1500);
      
    } catch (error) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Failed',
          message: error?.response?.data?.message || 'Unable to process package selection. Please try again.',
        })
      );
    } finally {
      setIsPackageSubmitting(false);
    }
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
      <Navigation />
      {/* Hero Section */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${bluebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Animated glowing background dots */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-200 mb-6">
              SPC FREE ZONE
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed">
              At Elite Filing ES, we provide a wide range of tailored business services designed to help you establish and grow your enterprise in the UAE SPC (Special Purpose Companies) Free Zone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
              SPC FREE ZONE FORM
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete the form below to get started with your SPC Free Zone application
            </p>
          </motion.div>
          
          {!showForm ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Application
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
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
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
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
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
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
                  {formErrors.companyProposedName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.companyProposedName}</p>
                  )}
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
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
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
                    {formErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
                    )}
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
                    {formErrors.businessActivity && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.businessActivity}</p>
                    )}
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
                    {formErrors.licenseType && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.licenseType}</p>
                    )}
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
                  disabled={isSubmitting}
                  className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Select the perfect package for your business needs. All packages include comprehensive support and professional guidance.
            </p>
            {!isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Login Required:</strong> Please log in to access our package services and proceed with your selection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">Basic Package</h3>
                  <div className="text-4xl font-bold text-yellow-500 mb-2">AED 7,762.50</div>
                  <p className="text-gray-600">No Visa</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 text-sm mb-4">
                    <strong className="text-[#1e3a8a]">Ideal for:</strong> Freelancers, consultants, or small business owners who don't need a UAE visa.
                  </p>
                  
                  <h4 className="font-semibold text-[#1e3a8a] mb-3">Basic Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 min-h-[280px]">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      1-year SPC Free Zone Trade/Service License
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Business name reservation & registration
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      E-License (Digital Copy), no office required
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Free Zone documentation support
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Bank account assistance (UAE banks)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Dedicated account manager (1 month)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Customer support via email/WhatsApp
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => handlePackageSelect('Basic Package')}
                  className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isAuthenticated 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? 'Choose Basic Package' : 'Login Required'}
                </button>
              </div>
            </motion.div>

            {/* Standard Package */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl border-2 border-yellow-400 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105 relative flex flex-col"
              variants={fadeInUp}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#041e72] mb-2">Standard Package</h3>
                  <div className="text-4xl font-bold text-yellow-500 mb-2">AED 12,487.50</div>
                  <p className="text-gray-600">1 Visa Quota</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 text-sm mb-4">
                    <strong className="text-[#041e72]">Ideal for:</strong> Entrepreneurs or single-member startups who need a UAE residence visa.
                  </p>
                  
                  <h4 className="font-semibold text-[#041e72] mb-3">Basic Features, plus:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 min-h-[280px]">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      1 residence visa quota under SPC Free Zone
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      E-channel registration & setup for visa
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Medical & Emirates ID assistance
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Company establishment card
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      UAE address & virtual desk
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Bank account opening support (premium)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      One-time business consultation (operations)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Renewal reminder & compliance guidance
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => handlePackageSelect('Standard Package')}
                  className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isAuthenticated 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? 'Choose Standard Package' : 'Login Required'}
                </button>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 flex flex-col"
              variants={fadeInUp}
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#041e72] mb-2">Premium Package</h3>
                  <div className="text-4xl font-bold text-yellow-500 mb-2">AED 14,647.50</div>
                  <p className="text-gray-600">5 Visa Quota</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 text-sm mb-4">
                    <strong className="text-[#041e72]">Ideal for:</strong> Small teams, business partners, or companies planning local operations.
                  </p>
                  
                  <h4 className="font-semibold text-[#041e72] mb-3">Standard Package, plus:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 min-h-[280px]">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      5 residence visa quotas under SPC Free Zone
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Partner & staff visa processing support
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Document attestation & notarization
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Business plan assistance (bank & visa)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Tax registration advisory (VAT)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Full-year business support (renewals)
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Co-working or virtual office space
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Quarterly business review sessions
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => handlePackageSelect('Premium Package')}
                  className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isAuthenticated 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? 'Choose Premium Package' : 'Login Required'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
      <Footer />
      <ChatWidget />

      {/* Package Form Modal */}
      <AnimatePresence>
        {showPackageForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#041e72] mb-2">
                  Complete Your Package Selection
                </h3>
                <p className="text-gray-600">
                  Selected: <span className="font-semibold text-yellow-600">{packageFormData.selectedPackage}</span>
                </p>
              </div>

              <form onSubmit={handlePackageSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#041e72] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={packageFormData.fullName}
                    onChange={handlePackageInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                  {packageFormErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{packageFormErrors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#041e72] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={packageFormData.email}
                    onChange={handlePackageInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                  {packageFormErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{packageFormErrors.email}</p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-semibold text-[#041e72] mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={packageFormData.contact}
                    onChange={handlePackageInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    placeholder="Enter your contact number"
                  />
                  {packageFormErrors.contact && (
                    <p className="mt-1 text-sm text-red-600">{packageFormErrors.contact}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-[#041e72] mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={packageFormData.dateOfBirth}
                    onChange={handlePackageInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                  />
                  {packageFormErrors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{packageFormErrors.dateOfBirth}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPackageForm(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPackageSubmitting}
                    className={`flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isPackageSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isPackageSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <FiCheckCircle className="mx-auto text-green-600" size={48} />
              <h3 className="mt-4 text-2xl font-bold text-gray-900">Submission Successful</h3>
              <p className="mt-2 text-gray-600">We have received your UAE SPC Free Zone request. Our team will reach out soon.</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SPCFreeZone;