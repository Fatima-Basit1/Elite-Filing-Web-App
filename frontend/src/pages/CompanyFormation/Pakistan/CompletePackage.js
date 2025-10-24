import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../../store/slices/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';
import ChatWidget from '../../../components/ChatWidget/ChatWidget';
import { FiCheckCircle } from 'react-icons/fi';
import bluebg from '../../../assets/bluebg.jpg';
import { apiMethods } from '../../../services/api';

const CompletePackage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [showForm, setShowForm] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contact: '',
        dateOfBirth: '',
        city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to submit your Pakistan Complete Package request.',
                })
            );
            navigate('/get-started');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Pakistan Complete Package submission:', formData);
            
            const response = await apiMethods.submissions.submitPakistanCompletePackage(formData);
            
            if (response.data.success) {
                dispatch(
                    addUiNotification({
                        type: 'success',
                        title: 'Submission Received',
                        message: 'Your Pakistan Complete Package request has been successfully submitted.',
                    })
                );
                
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setFormData({
                        fullName: '',
                        email: '',
                        contact: '',
                        dateOfBirth: '',
                        city: ''
                    });
                    setShowForm(false);
                    setShowSuccessPopup(false);
                }, 3000);
            } else {
                throw new Error(response.data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Pakistan Complete Package submission error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Unable to submit your request. Please try again.';
            
            dispatch(
                addUiNotification({
                    type: 'error',
                    title: 'Submission Failed',
                    message: errorMessage,
                })
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartForm = () => {
        if (!isAuthenticated) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to access the Pakistan Complete Package form.',
                })
            );
            navigate('/get-started');
            return;
        }
        setShowForm(true);
    };

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: "SECP Registration",
            description: "Complete company registration with Securities and Exchange Commission of Pakistan, including all necessary documentation and compliance requirements."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "FBR Registration",
            description: "Federal Board of Revenue registration for tax purposes, ensuring compliance with Pakistani tax laws and regulations."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "PSEB Registration",
            description: "Pakistan Software Export Board registration for IT companies, enabling software export and business development opportunities."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Business Consultation",
            description: "Expert consultation on Pakistani business laws, market entry strategies, and regulatory compliance for successful business operations."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            title: "Documentation Support",
            description: "Comprehensive documentation assistance including forms, applications, and legal documents required for Pakistani business registration."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            title: "Ongoing Support",
            description: "Continuous support and guidance throughout your business journey in Pakistan, including compliance monitoring and regulatory updates."
        }
    ];

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
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight mt-16">
                            Pakistan Complete Package{' '}
                            <span className="block text-yellow-400">with Elite Filing</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
                            Everything you need to establish and run your business in Pakistan. Complete SECP, FBR, and PSEB registration in one comprehensive package.
                        </p>
                        <div className="flex flex-wrap justify-start gap-4 mb-8">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                                <span className="text-yellow-400 font-semibold">✓</span>
                                <span className="ml-2">SECP Registration</span>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                                <span className="text-yellow-400 font-semibold">✓</span>
                                <span className="ml-2">FBR Registration</span>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                                <span className="text-yellow-400 font-semibold">✓</span>
                                <span className="ml-2">PSEB Registration</span>
                            </div>
                        </div>
                        <button
                            onClick={handleStartForm}
                            className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
                        >
                            Start Your Complete Package
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

            {/* Form Section */}
            {showForm && (
                <div className="py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-fade-in-up">
                            <div className="bg-white rounded-2xl shadow-2xl p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                                    Pakistan Complete Package Form
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

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
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    {/* Package Summary */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-green-900 mb-4">Package Includes:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="text-green-800 font-medium">SECP Registration</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="text-green-800 font-medium">FBR Registration</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="text-green-800 font-medium">PSEB Registration</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-green-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-green-900">Total Package Price:</span>
                                                <span className="text-2xl font-bold text-green-600">PKR 80,000</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                        style={{
                                            background: "linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)",
                                        }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Complete Package Request'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Section - Complete Package Process */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Complete Package Process – All-in-One Business Registration
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Elite Filing delivers comprehensive business registration services for Pakistan. We handle SECP, FBR, and PSEB registration in one streamlined package, ensuring full compliance with all Pakistani regulations.
                        </p>
                    </div>

                    {/* Process Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* SECP Registration */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">01</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">SECP Registration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Complete company registration with Securities and Exchange Commission of Pakistan, including all necessary documentation and compliance requirements.
                            </p>
                        </div>

                        {/* FBR Registration */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">02</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">FBR Registration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Federal Board of Revenue registration for tax purposes, ensuring compliance with Pakistani tax laws and regulations.
                            </p>
                        </div>

                        {/* PSEB Registration */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">03</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">PSEB Registration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Pakistan Software Export Board registration for IT companies, enabling software export and business development opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Expert Services */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Expert Business Registration Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                            Elite Filing manages all aspects of Pakistani business registration, helping businesses remain legally compliant and penalty-free.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h4 className="font-semibold text-gray-900 mb-2">Business Consultation</h4>
                                <p className="text-gray-600 text-sm">Expert guidance on Pakistani business laws and market entry strategies</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h4 className="font-semibold text-gray-900 mb-2">Documentation Support</h4>
                                <p className="text-gray-600 text-sm">Comprehensive assistance with all required forms and legal documents</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h4 className="font-semibold text-gray-900 mb-2">Ongoing Support</h4>
                                <p className="text-gray-600 text-sm">Continuous support throughout your business journey in Pakistan</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 font-medium mb-8">
                            Our experienced team handles the complexities so you can focus on running your business.
                        </p>
                        <button 
                            onClick={handleStartForm}
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
                            <p className="mt-2 text-gray-600">We have received your Pakistan Complete Package request. Our team will reach out soon.</p>
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

export default CompletePackage;
