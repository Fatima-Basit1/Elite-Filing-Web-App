import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import { apiMethods } from '../../../services/api';
import { addNotification as addUiNotification } from '../../../store/slices/uiSlice';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';
import ChatWidget from '../../../components/ChatWidget/ChatWidget';
import bluebg from '../../../assets/bluebg.jpg';

const FBRRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    businessActivity: '',
    email: '',
    phone: '',
    registrationType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName || formData.firstName.trim().length < 2) errors.firstName = 'First name is required';
    if (!formData.lastName || formData.lastName.trim().length < 2) errors.lastName = 'Last name is required';
    if (!formData.companyName || formData.companyName.trim().length < 2) errors.companyName = 'Company name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.trim().length < 7) errors.phone = 'Valid phone number is required';
    if (!formData.registrationType) errors.registrationType = 'Please select a registration type';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Sign In Required',
          message: 'Please log in to submit the FBR form.',
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
      const res = await apiMethods.submissions.submitPAKFBRRegistration({
        ...formData,
      });
      const refId = res?.data?.data?._id || res?.data?._id;
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Submission Received',
          message: `Your FBR registration request has been submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
        })
      );
      setShowSuccessPopup(true);
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        businessActivity: '',
        email: '',
        phone: '',
        registrationType: '',
        message: ''
      });
    } catch (error) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Failed',
          message: error?.response?.data?.message || 'Unable to submit FBR registration. Please try again.',
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
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
              FBR Registration & Compliance{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Elite Filing provides FBR registration and compliance services, allowing businesses to focus on growth while staying fully compliant.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">NTN Registration</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">STRN Registration</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Tax Compliance</span>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
            >
              Register with FBR
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lead Form Section */}
      {showForm && (
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  FBR Registration Form
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" id="fbr-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                      {formErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                      {formErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your company name"
                      />
                      {formErrors.companyName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.companyName}</p>
                      )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Registration *
                    </label>
                    <select
                      name="registrationType"
                      value={formData.registrationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select registration type</option>
                      <option value="NTN">NTN (National Tax Number)</option>
                      <option value="STRN">STRN (Sales Tax Registration Number)</option>
                      <option value="Sales Tax">Sales Tax Registration</option>
                      <option value="Income Tax">Income Tax Registration</option>
                    </select>
                    {formErrors.registrationType && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.registrationType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Activity
                    </label>
                    <textarea
                      name="businessActivity"
                      value={formData.businessActivity}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Describe your business activity (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about your business requirements"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    style={{
                      background: "linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)",
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit FBR Registration Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Section - FBR Registration Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Simplify Tax Compliance – FBR Registration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Seamless FBR registration for businesses in Pakistan. Covers: National Tax Number (NTN), STRN, Sales Tax, and Income Tax registration. Ensures accuracy and compliance at every step.
            </p>
            
            <p className="text-lg text-gray-700 font-medium">
              Goal: Streamline registration and save time and effort.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Consultation Call */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">01</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation Call</h3>
              <p className="text-gray-600 leading-relaxed">
                Discuss FBR requirements and business details with our experts.
              </p>
            </div>

            {/* Document Submission */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">02</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Document Submission</h3>
              <p className="text-gray-600 leading-relaxed">
                Provide CNIC, bank statements, and business info for registration or filing.
              </p>
            </div>

            {/* Registration & Filing */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">03</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration & Filing</h3>
              <p className="text-gray-600 leading-relaxed">
                Elite Filing completes registration or filing, ensuring compliance with FBR standards.
              </p>
            </div>
          </div>

          {/* FBR Services Overview */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Complete FBR Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Elite Filing handles all aspects of FBR registration and compliance, ensuring your business meets all tax obligations while you focus on growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">NTN Registration</h4>
                <p className="text-gray-600 text-sm">National Tax Number registration</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">STRN Registration</h4>
                <p className="text-gray-600 text-sm">Sales Tax Registration Number</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Sales Tax</h4>
                <p className="text-gray-600 text-sm">Sales Tax registration and filing</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Income Tax</h4>
                <p className="text-gray-600 text-sm">Income Tax registration and compliance</p>
              </div>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />

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
              <p className="mt-2 text-gray-600">We have received your FBR registration request. Our team will reach out soon.</p>
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

export default FBRRegistration;
