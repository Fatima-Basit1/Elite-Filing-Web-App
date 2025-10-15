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

const PSEBRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    residentialAddress: '',
    companyName: '',
    secpNumber: '',
    email: '',
    phone: '',
    natureOfBusiness: '',
    exportActivityDetails: '',
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
    if (!formData.residentialAddress || formData.residentialAddress.trim().length < 5) errors.residentialAddress = 'Residential address is required';
    if (!formData.companyName || formData.companyName.trim().length < 2) errors.companyName = 'Company name is required';
    if (!formData.secpNumber || formData.secpNumber.trim().length < 1) errors.secpNumber = 'SECP number is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.trim().length < 7) errors.phone = 'Valid phone number is required';
    if (!formData.natureOfBusiness) errors.natureOfBusiness = 'Please select nature of business';
    if (!formData.exportActivityDetails || formData.exportActivityDetails.trim().length < 5) errors.exportActivityDetails = 'Export activity details are required';
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
          message: 'Please log in to submit the PSEB form.',
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
      const res = await apiMethods.submissions.submitPAKPSEBRegistration({
        ...formData,
      });
      const refId = res?.data?.data?._id || res?.data?._id;
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Submission Received',
          message: `Your PSEB registration request has been submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
        })
      );
      setShowSuccessPopup(true);
      setFormData({
        firstName: '',
        lastName: '',
        residentialAddress: '',
        companyName: '',
        secpNumber: '',
        email: '',
        phone: '',
        natureOfBusiness: '',
        exportActivityDetails: '',
        message: ''
      });
    } catch (error) {
      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Failed',
          message: error?.response?.data?.message || 'Unable to submit PSEB registration. Please try again.',
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
              PSEB Registration & Compliance{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Stay compliant with PSEB regulations — annual renewals, export certifications, and statutory requirements handled by our expert team.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Annual Renewals</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Export Certifications</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Statutory Requirements</span>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
            >
              Register with PSEB
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
                  PSEB Registration Form
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" id="pseb-form">
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
                      Residential Address *
                    </label>
                    <textarea
                      name="residentialAddress"
                      value={formData.residentialAddress}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your complete residential address"
                    />
                    {formErrors.residentialAddress && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.residentialAddress}</p>
                    )}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SECP Number *
                    </label>
                    <input
                      type="text"
                      name="secpNumber"
                      value={formData.secpNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your SECP registration number"
                    />
                    {formErrors.secpNumber && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.secpNumber}</p>
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
                      Nature of IT/Software Business *
                    </label>
                    <select
                      name="natureOfBusiness"
                      value={formData.natureOfBusiness}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select nature of business</option>
                      <option value="Software Development">Software Development</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="E-commerce Solutions">E-commerce Solutions</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Cloud Services">Cloud Services</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.natureOfBusiness && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.natureOfBusiness}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Export Activity Details *
                    </label>
                    <textarea
                      name="exportActivityDetails"
                      value={formData.exportActivityDetails}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter the detail about your export activities"
                    />
                    {formErrors.exportActivityDetails && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.exportActivityDetails}</p>
                    )}
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
                    {isSubmitting ? 'Submitting...' : 'Submit PSEB Registration Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Section - PSEB Registration Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Empower Your IT Business – PSEB Registration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Professional PSEB registration for IT & software companies. Covers: eligibility assessment → documentation → submission.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Export Incentives</h3>
                <p className="text-blue-700 text-sm">Access to government export incentives and benefits</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Certifications</h3>
                <p className="text-yellow-700 text-sm">Official PSEB certifications for your IT business</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Market Facilitation</h3>
                <p className="text-green-700 text-sm">Support for global market expansion and recognition</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 font-medium">
              Goal: Enable IT businesses to expand globally with compliance and recognition.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Documents Preparation */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">01</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents Preparation</h3>
              <p className="text-gray-600 leading-relaxed">
                Collect and prepare required documents as per SECP standards for incorporation.
              </p>
            </div>

            {/* Application Submission */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">02</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submission</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit the registration application ensuring all requirements are accurately met.
              </p>
            </div>

            {/* Certificate Issuance */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">03</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Certificate Issuance</h3>
              <p className="text-gray-600 leading-relaxed">
                Deliver official SECP registration certificate upon approval, completing the process seamlessly.
              </p>
            </div>
          </div>

          {/* Comprehensive Compliance Solutions */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Compliance Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Elite Filing manages all PSEB compliance requirements, ensuring IT companies meet PSEB standards. Clients can focus on innovation and growth without compliance stress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Annual Renewals</h4>
                <p className="text-gray-600 text-sm">Timely renewal of PSEB registrations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Export Certification</h4>
                <p className="text-gray-600 text-sm">Export certification processes</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Statutory Requirements</h4>
                <p className="text-gray-600 text-sm">Fulfillment of statutory requirements</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">PSEB Standards</h4>
                <p className="text-gray-600 text-sm">Ensure compliance with PSEB standards</p>
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
              <p className="mt-2 text-gray-600">We have received your PSEB registration request. Our team will reach out soon.</p>
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

export default PSEBRegistration;
