
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markRegisteredAgentSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';

const RegisteredAgent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    businessType: '',
    stateOfRegistration: '',
    serviceDuration: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !token) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Sign In Required',
          message: 'Please log in to request registered agent services.',
        })
      );
      navigate('/get-started');
      return;
    }

    try {
      await apiMethods.submissions.submitRegisteredAgent(formData);
      setShowSuccessPopup(true);
      dispatch(markRegisteredAgentSubmitted());
      setTimeout(() => {
        setFormData(initialFormData);
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      const firstErrorMsg = error?.response?.data?.errors?.[0]?.msg;
      const message = firstErrorMsg || error?.response?.data?.message || 'Unable to submit your request. Please try again.';
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Failed',
          message,
        })
      );
    }
  };

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="bg-white font-sans">
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
                Your registered agent request has been submitted successfully.
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
              Registered Agent Services{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Your reliable point of contact for legal & state compliance.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Official Contact</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Legal Compliance</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Document Handling</span>
              </div>
            </div>
            <button
              onClick={scrollToForm}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
            >
              Start Now
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Registered Agent Service
            </h2>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Card 1: Official Point of Contact */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(152, 97, 14) 0%, rgb(156, 150, 32) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Official Point of Contact
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                We serve as your official registered address for all legal and state correspondence.
              </p>
            </motion.div>
            
            {/* Card 2: Safeguard Legal Documents */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(12, 91, 218) 0%, rgba(10,40,90,1) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Safeguard Legal Documents
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Secure handling and prompt forwarding of all legal documents and official notices.
              </p>
            </motion.div>
            
            {/* Card 3: Stay Compliant Always */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(38, 165, 85) 0%, rgb(9, 96, 15) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M9,17H7V12H9V17M13,17H11V7H13V17M17,17H15V14H17V17Z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Stay Compliant Always
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Maintain continuous compliance with state requirements and avoid penalties.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Step 1 */}
              <motion.div
                className="text-center relative"
                variants={fadeUp}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10" style={{
                  background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
                }}>
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Provide Company Details
                </h3>
                
                <p className="text-gray-600 text-sm">
                  Share your company information through our secure form.
                </p>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div
                className="text-center relative"
                variants={fadeUp}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10" style={{
                background: 'linear-gradient(180deg, rgb(34, 158, 43) 0%, rgb(18, 67, 21) 100%)'
                }}>
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We Become Your Agent
                </h3>
                
                <p className="text-gray-600 text-sm">
                  We officially register as your agent with the state.
                </p>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div
                className="text-center relative"
                variants={fadeUp}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10" style={{
                  background: 'linear-gradient(180deg, rgb(44, 142, 139) 0%, rgb(9, 54, 67) 100%)'
                }}>
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We Receive Legal Docs
                </h3>
                
                <p className="text-gray-600 text-sm">
                  We receive and forward all legal documents to you.
                </p>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div
                className="text-center relative"
                variants={fadeUp}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10" style={{
                  background: 'linear-gradient(180deg, rgb(25, 93, 157) 0%, rgba(10,40,90,1) 100%)'
                }}>
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  You Stay Compliant
                </h3>
                
                <p className="text-gray-600 text-sm">
                  Your business remains compliant and worry-free.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 bg-gradient-to-br from-gray-50 to-white"
      >
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
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight:'1.3',
              paddingBottom:'4px'
            }}>
              Start Your Registered Agent Service

            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll get you set up quickly.
            </p>
          </motion.div>
          
          <div className="flex justify-center">
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={scaleIn}
            >
            
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone *
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
                    required
                  />
                </div>
              </div>
              
              {/* Company Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Company Proposed Name / Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              
              {/* Business Type and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    State of Registration *
                  </label>
                  <select
                    name="stateOfRegistration"
                    value={formData.stateOfRegistration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
              </div>
              
              {/* Service Duration */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Duration of Service Required (1 year, 2 years, etc.) *
                </label>
                <input
                  type="text"
                  name="serviceDuration"
                  value={formData.serviceDuration}
                  onChange={handleInputChange}
                  placeholder="1 year, 2 years, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 resize-none"
                  style={{
                    '--tw-ring-color': 'rgba(6,30,68,1)'
                  }}
                  placeholder="Any additional information or questions..."
                />
              </div>
              
              {/* Submit Button */}
              <motion.button
  type="submit"
  className="w-full py-4 text-lg font-bold text-white rounded-2xl shadow-lg hover:text-black transition-all duration-300"
  style={{
    background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
  }}
  whileHover={{
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(175, 188, 57, 0.3)",
    background: "linear-gradient(to right, rgb(250, 204, 21), rgb(234, 179, 8))" // yellow-400 → yellow-500
  }}
  whileTap={{ scale: 0.98 }}
>
  Submit Application
</motion.button>
            </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust/Compliance Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center space-y-4 md:space-y-0 md:space-x-12">

              {/* Legal Compliance */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Legal Compliance</span>
              </div>
              
              {/* Privacy Protected */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Privacy Protected</span>
              </div>
              
              {/* Reliable Support */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Reliable Support</span>
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

export default RegisteredAgent;