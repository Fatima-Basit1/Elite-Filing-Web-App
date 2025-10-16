import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markUKSharedOfficeSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';

const UKSharedOffices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    duration: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedPackage) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Package Required',
          message: 'Please select a package before submitting.',
        })
      );
      return;
    }

    if (!formData.duration) {
      dispatch(
        addUiNotification({
          type: 'warning',
          title: 'Duration Required',
          message: 'Please select a duration before submitting.',
        })
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare the payload with all required fields
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        duration: formData.duration,
        selectedPackage: selectedPackage
      };

      // Submit the form
      const response = await apiMethods.submissions.submitUKSharedOffice(payload);

      // Handle successful submission
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Form Submitted',
          message: 'Your UK shared office request has been submitted successfully.',
        })
      );

      // Reset form
      setFormData(initialFormData);
      setSelectedPackage('');
      setShowSuccessPopup(true);

      // Start progress animation
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 5;
          return next >= 100 ? 100 : next;
        });
      }, 150);

      // Clean up after animation
      setTimeout(() => {
        clearInterval(interval);
        setShowSuccessPopup(false);
        setProgress(0);
      }, 3000);

    } catch (error) {
      // Handle submission errors
      const errorMessage = error?.response?.data?.message || 'Failed to submit the form. Please try again.';
      
      if (error?.response?.status === 401) {
        dispatch(
          addUiNotification({
            type: 'warning',
            title: 'Authentication Required',
            message: 'Please sign in to submit your request.',
          })
        );
        navigate('/get-started');
        return;
      }

      dispatch(
        addUiNotification({
          type: 'error',
          title: 'Submission Error',
          message: errorMessage,
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setTimeout(() => setShowSuccessPopup(false), 3200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessPopup]);

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  const choosePackage = (pkg) => {
    setSelectedPackage(pkg);
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
              UK Shared Offices{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Professional UK office services for overseas entrepreneurs and local businesses seeking a prestigious address.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Prestigious Address</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Mail Forwarding</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">24/7 Support</span>
              </div>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('packages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
            >
              Get Started Today
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
              variants={slideFromLeft}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(69, 114, 157) 0%, rgb(46, 91, 169) 100%)'
              }}>
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
              variants={slideFromRight}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(28, 108, 111) 0%, rgb(12, 76, 78) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mail Forwarding & Scanning
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive mail and forwarding via scan to email for instant access to your mail.
              </p>
            </motion.div>
            
            {/* Business Support */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                background: 'linear-gradient(180deg, rgb(20, 152, 119) 0%, rgb(24, 142, 83) 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.28.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                24/7 Call Answering
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Free 24/7 call answering with a dedicated UK phone line and 1500 minutes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          {/* Package Cards */}
          <div id="packages" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BASIC PACKAGE */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-3xl transition-all"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">BASIC PACKAGE — £199</h3>
              </div>
                <p className="text-gray-700 text-sm mb-6 text-center">
                  Ideal for freelancers or startups needing a registered UK business address. <br></br>
                  Includes:
                </p>
              <div className="space-y-4 mb-8">
                {[
                  'Shared office business address in the UK',
                  'Mail handling and forwarding (10 items/month)',
                  'Registered office for Companies House',
                  'Government and tax mail notifications',
                  'Email support during business hours',
                  '35% service fee included in price'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
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
              <motion.button
                onClick={() => choosePackage('Basic')}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl shadow-lg"
                style={{
                  background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Choose This Package
              </motion.button>
            </motion.div>
              
             {/* PREMIUM PACKAGE */}
<motion.div
  className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-yellow-400 hover:shadow-yellow-300/50 hover:scale-[1.02] transition-all duration-300"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  variants={scaleIn}
>
  {/* Optional Highlight Badge */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
    Most Popular
  </div>

  <div className="mb-6 text-center">
    <h3 className="text-xl font-bold text-gray-900">PREMIUM PACKAGE — £345</h3>
  </div>

  <p className="text-gray-700 text-sm mb-6 text-center">
    Best for established businesses or international entrepreneurs needing full UK office representation.
  </p>

  <div className="space-y-4 mb-8">
    {[
      'Unlimited mail forwarding & dedicated phone line with call forwarding',
      'Virtual office certificate for international clients',
      'Access to meeting room (10 hours/month)',
      'Company formation consultation & compliance/tax reminder service',
      'VIP email and WhatsApp support',
      '35% service fee included in price'
    ].map((feature, index) => (
      <motion.div
        key={index}
        className="flex items-start space-x-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
      >
        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg
            className="w-4 h-4 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
      </motion.div>
    ))}
  </div>

  <motion.button
    onClick={() => choosePackage('Premium')}
    className="w-full py-3 text-sm font-semibold text-white rounded-xl shadow-lg bg-gradient-to-b from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    Choose This Package
  </motion.button>
</motion.div>


            {/* STANDARD PACKAGE */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-3xl transition-all"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">STANDARD PACKAGE — £285</h3>
              </div>
              <p className="text-gray-700 text-sm mb-6 text-center">
                Perfect for small companies seeking flexibility and enhanced features. Includes everything in Basic, plus:</p>
              <div className="space-y-4 mb-8">
                {[
                  'Dedicated mail forwarding (25 items/month)',
                  'Business call answering (with company name)',
                  'Access to meeting room (4 hours/month)',
                  'Business phone number registration',
                  'Priority document forwarding service',
                  '35% service fee included in price'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
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
              <motion.button
                onClick={() => choosePackage('Standard')}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl shadow-lg"
                style={{
                  background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Choose This Package
              </motion.button>
            </motion.div>

           
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-gray-50 to-white"
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
              UK Shared Offices Form

            </h2>
            {selectedPackage ? (
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Selected Package: <span className="font-semibold">{selectedPackage}</span>
              </p>
            ) : (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please select a package above to open the form.
              </p>
            )}
          </motion.div>
          
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Package Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Package *
                  </label>
                  <select
                    name="selectedPackage"
                    value={selectedPackage || ''}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  >
                    <option value="">Select Package</option>
                    <option value="Basic">Basic Package (£199)</option>
                    <option value="Standard">Standard Package (£285)</option>
                    <option value="Premium">Premium Package (£345)</option>
                  </select>
                </div>
              </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  />
                </div>
              </div>
             
              
              {/* Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white"
                    style={{
                      '--tw-ring-color': 'rgba(6,30,68,1)'
                    }}
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                    <option value="9 months">9 Months</option>
                    <option value="12 months">12 Months</option>
                  </select>
                </div>
              </div>
              
              
              
              
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{
                  background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: isSubmitting ? undefined : "0 20px 40px rgba(6, 30, 68, 0.3)" }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'Submit Enquiry'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-green-600 text-3xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful</h3>
              <p className="text-gray-600 mb-6">We have received your UK shared office request. Our team will contact you shortly.</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default UKSharedOffices;