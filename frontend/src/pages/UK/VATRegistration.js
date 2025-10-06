import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { apiMethods } from '../../services/api';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import bluebg from '../../assets/bluebg.jpg';
import vat1 from '../../assets/vat1.jpg';
import vat2 from '../../assets/vat2.jpg';

const VATRegistration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        annualTurnoverEstimate: '',
        typeOfBusinessActivity: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Valid email is required';
        if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
        if (!formData.annualTurnoverEstimate.trim()) errors.annualTurnoverEstimate = 'Annual turnover estimate is required';
        if (!formData.typeOfBusinessActivity.trim()) errors.typeOfBusinessActivity = 'Type of business activity is required';
        if (!formData.message.trim()) errors.message = 'Message is required';
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
                    message: 'Please log in to submit the UK VAT Registration form.',
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

        setIsSubmitting(true);
        try {
            const res = await apiMethods.submissions.submitUKVATRegistration({
                firstName: formData.firstName,
                lastName: formData.lastName,
                companyName: formData.companyName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                annualTurnoverEstimate: formData.annualTurnoverEstimate,
                typeOfBusinessActivity: formData.typeOfBusinessActivity,
                message: formData.message,
            });
            const refId = res?.data?.data?._id;
            dispatch(
                addUiNotification({
                    type: 'success',
                    title: 'Submission Received',
                    message: `Your UK VAT Registration request has been submitted successfully${refId ? ` (Reference ID: ${refId})` : ''}.`,
                })
            );
            setShowSuccessPopup(true);
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    companyName: '',
                    email: '',
                    phoneNumber: '',
                    annualTurnoverEstimate: '',
                    typeOfBusinessActivity: '',
                    message: '',
                });
                setShowForm(false);
                setShowSuccessPopup(false);
            }, 2000);
        } catch (error) {
            let message = 'Unable to submit your request. Please try again.';
            const firstErrorMsg = error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.errors?.[0]?.message;
            message = firstErrorMsg || error?.response?.data?.message || message;
            dispatch(
                addUiNotification({
                    type: 'error',
                    title: 'Submission Failed',
                    message,
                })
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShowForm = () => {
        setShowForm(true);
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

     const services = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "Business Eligibility Check",
            description: "We evaluate your business turnover and activities to determine your VAT registration requirements and ensure compliance with HMRC regulations."
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Document Preparation",
            description: "Our team compiles all necessary documents, including proof of business operations and financial details, to submit a complete application."
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Application Submission",
            description: "Elite Filing submits your VAT registration application to HMRC and tracks its progress, keeping you updated until the VAT number is issued."
        }
    ];

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

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-200 mb-6">
                            VAT Number Registration
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Elite Filing provides efficient VAT registration services for businesses in the UK. Our team handles the entire process, from gathering the necessary documents to submitting your application to HMRC.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowForm}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Get Your VAT Number Registration Done 
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
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Form Section - Moved to appear right after hero section */}
            <AnimatePresence>
                {showForm && (
                    <motion.section
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-16 bg-gray-50"
                    >
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-xl p-8"
                            >
                                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
                                    VAT NUMBER REGISTRATION FORM
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Company Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>

                                        <div>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                            name="annualTurnoverEstimate"
                                            value={formData.annualTurnoverEstimate}
                                            onChange={handleInputChange}
                                            placeholder="Annual Turnover Estimate"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                name="typeOfBusinessActivity"
                                                value={formData.typeOfBusinessActivity}
                                                onChange={handleInputChange}
                                                placeholder="Type of Business Activity"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Message"
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                                            isSubmitting 
                                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                                : 'bg-[#1e3a8a] hover:bg-[#facc15] text-white hover:text-[#1e3a8a]'
                                        }`}
                                    >
                                        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                                    </motion.button>
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
                                                    className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md w-full"
                                                >
                                                    <div className="flex items-center justify-center mb-4">
                                                        <FiCheckCircle className="text-green-500" size={56} />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">Submission Successful</h3>
                                                    <p className="text-gray-600">Your UK VAT Registration request has been submitted. We will contact you shortly.</p>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Auto-hide handled in submit logic */}

            {/* VAT REGISTRATION   */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm font-semibold text-gray-600 mb-4 tracking-wider uppercase">
                               QUICK SETUP
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                                HASSLE-FREE VAT REGISTRATION
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Elite Filing provides efficient VAT registration services for businesses in the UK. Our team handles the entire process, from gathering the necessary documents to submitting your application to HMRC. With our expertise, you can rest assured that your VAT number will be issued promptly, allowing your business to comply with UK tax regulations without unnecessary delays.
                            
                            </p>
                            
                           
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src={vat1}
                                alt="UK Annual Accounts - Professional Services"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TAX  */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src={vat2}
                                alt="UK Annual Accounts - Compliance Benefits"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                               STAY TAX COMPLIANT
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Registering for a VAT number is a legal requirement for businesses operating in the UK above a specific turnover. Elite Filing ensures a seamless process, helping you avoid penalties and maintain compliance. Whether you’re starting a new business or expanding your existing one, we make VAT registration straightforward and stress-free.
                            </p>
                             

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive company name change preparation and filing to keep your business compliant and transparent
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100"
                            >
                                <div className="text-[#1e3a8a] mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1e3a8a] mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default VATRegistration;
