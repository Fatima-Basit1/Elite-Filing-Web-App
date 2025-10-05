import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markTrademarkUKSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';

const TrademarkUK = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    trademarkType: '',
    goodsServices: '',
    classNumber: '',
    existingTrademark: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormData);

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
          message: 'Please log in to submit a trademark request.',
        })
      );
      navigate('/get-started');
      return;
    }

    try {
      await apiMethods.submissions.submitTrademarkUK(formData);
      dispatch(
        addUiNotification({
          type: 'success',
          title: 'Submission Received',
          message: 'Your UK trademark request has been submitted successfully.',
        })
      );
      dispatch(markTrademarkUKSubmitted());
      setFormData(initialFormData);
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Trademark Registration UK{' '}
              <span className="block text-yellow-400">with Elite Filing</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl">
              Protect your brand with professional trademark registration services. Secure exclusive rights and legal protection for your business identity.
            </p>
            <div className="flex flex-wrap justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Exclusive Rights</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Brand Protection</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                <span className="text-yellow-400 font-semibold">✓</span>
                <span className="ml-2">Legal Support</span>
              </div>
            </div>
            <button
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 w-full sm:w-auto text-center"
            >
              Start Registration
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

      {/* What is Trademark Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What is a <span style={{color: 'rgba(6,30,68,1)'}}>Trademark?</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A trademark is a distinctive sign, symbol, word, or phrase that identifies and distinguishes 
              your products or services from those of others. It's your brand's unique identifier that 
              gives you exclusive rights to use it in commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Register Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Register a <span style={{color: 'rgba(6,30,68,1)'}}>Trademark?</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              {
                icon: "🔒",
                title: "Exclusive Rights",
                description: "Gain legal ownership and exclusive rights to use your brand in the UK."
              },
              {
                icon: "🛡️",
                title: "Brand Protection",
                description: "Help prevent unauthorized use of your trademark by others."
              },
              {
                icon: "📈",
                title: "Greater Value",
                description: "A registered trademark adds credibility and boosts your brand's value."
              },
              {
                icon: "⚖️",
                title: "Legal Support",
                description: "You’ll have legal grounds to enforce your rights in case of infringement."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center group"
              >
                <motion.div
                  variants={cardHover}
                  className="text-4xl mb-4"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:transition-colors" style={{
                  '--hover-color': 'rgba(6,30,68,1)'
                }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Eligibility for <span style={{color: 'rgba(6,30,68,1)'}}>Trademark</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Unique & Identifiable</h3>
                  <p className="text-sm sm:text-base text-gray-600">Your trademark must be distinctive and recognizable</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{
                    backgroundColor: 'rgba(6,30,68,0.1)'
                  }}>
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" style={{
                      color: 'rgba(6,30,68,1)'
                    }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Non-Generic</h3>
                  <p className="text-sm sm:text-base text-gray-600">Avoid generic or overly descriptive terms</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">No Conflicts</h3>
                  <p className="text-sm sm:text-base text-gray-600">Must not conflict with existing registered trademarks</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20" style={{
        background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your <span style={{color: 'rgba(248,189,10,1)'}}>Trademark Registration</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get expert assistance with your trademark registration. Our team will guide you through the entire process.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
               <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
  {/* Two-column layout to match reference image ordering */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    {/* First Row */}
    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        First Name *
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Last Name *
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    {/* Second Row */}
    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Email *
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Phone Number *
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    {/* Third Row */}
    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Company Proposed Name / Company Name *
      </label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Trademark Type (Wordmark, Logo, Both) *
      </label>
      <input
        type="text"
        name="trademarkType"
        value={formData.trademarkType}
        onChange={handleInputChange}
        placeholder="e.g., Wordmark, Logo, or Both"
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    {/* Fourth Row */}
    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Description of Goods / Services *
      </label>
      <input
        type="text"
        name="goodsServices"
        value={formData.goodsServices}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
        required
      />
    </div>

    <div>
      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
        Class Number(s) (if known)
      </label>
      <input
        type="text"
        name="classNumber"
        value={formData.classNumber}
        onChange={handleInputChange}
        placeholder="e.g., 25, 35, 42"
        className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-base"
        style={{
          '--tw-ring-color': 'rgba(6,30,68,1)'
        }}
      />
    </div>
  </div>

  {/* Existing Trademark Applications */}
  <div>
    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
      Existing Trademark Applications?
    </label>
    <div className="flex items-center space-x-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="existingTrademark"
          value="Yes"
          checked={formData.existingTrademark === 'Yes'}
          onChange={handleInputChange}
          className="w-5 h-5 text-blue-600"
        />
        <span className="ml-2 text-gray-700 font-medium">Yes</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="existingTrademark"
          value="No"
          checked={formData.existingTrademark === 'No'}
          onChange={handleInputChange}
          className="w-5 h-5 text-blue-600"
        />
        <span className="ml-2 text-gray-700 font-medium">No</span>
      </label>
    </div>
  </div>

  {/* Message Field */}
  <div>
    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
      Message
    </label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleInputChange}
      rows={4}
      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none text-base"
      style={{
        '--tw-ring-color': 'rgba(6,30,68,1)'
      }}
      placeholder="Tell us more about your trademark registration needs..."
    ></textarea>
  </div>

  <motion.button
    type="submit"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-base sm:text-lg transition-colors shadow-lg"
    style={{
      background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
    }}
  >
    Submit Registration Request
  </motion.button>
</form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center"
          >
            {[
              {
                icon: "✓",
                title: "Expert Guidance",
                description: "Professional trademark attorneys to guide you"
              },
              {
                icon: "✓",
                title: "Fast Processing",
                description: "Quick and efficient registration process"
              },
              {
                icon: "✓",
                title: "Full Support",
                description: "Complete support from application to registration"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3"
              >
                <div className="w-10 h-10 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {item.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-sm">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default TrademarkUK;