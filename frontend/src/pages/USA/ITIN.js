import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markITINRequestSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import bluebg from '../../assets/bluebg.jpg';


const ITIN = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth(false);
    const [showForm, setShowForm] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        reasonForITIN: '',
        nationality: '',
        passportScans: [],
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Allow viewing the page; redirect on submit if not logged in

    const itinReasons = [
        'Tax Filing',
        'Bank Account',
        'Other'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        // Name validation (2-50 chars, letters, spaces, hyphens, apostrophes only)
        const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        } else if (!nameRegex.test(formData.firstName)) {
            errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes (2-50 characters)';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        } else if (!nameRegex.test(formData.lastName)) {
            errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes (2-50 characters)';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        } else if (formData.email.length > 254) {
            errors.email = 'Email address is too long';
        }

        // Phone validation (international format)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number (minimum 10 digits)';
        }

        // Reason for ITIN validation
        const validReasons = ['Tax Filing', 'Bank Account', 'Other'];
        if (!formData.reasonForITIN) {
            errors.reasonForITIN = 'Please select a reason for ITIN';
        } else if (!validReasons.includes(formData.reasonForITIN)) {
            errors.reasonForITIN = 'Please select a valid reason for ITIN';
        }

        // Nationality validation
        if (!formData.nationality.trim()) {
            errors.nationality = 'Nationality is required';
        } else if (!nameRegex.test(formData.nationality)) {
            errors.nationality = 'Nationality can only contain letters, spaces, hyphens, and apostrophes';
        }

    // Passport scans validation (images only, 1-2 files, each max 10MB)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (!formData.passportScans || formData.passportScans.length === 0) {
        errors.passportScans = 'Please upload at least 1 passport image';
    } else if (formData.passportScans.length > 2) {
        errors.passportScans = 'You can upload at most 2 images';
    } else {
        for (const file of formData.passportScans) {
            if (!allowedImageTypes.includes(file.type)) {
                errors.passportScans = 'Only image files (JPEG, PNG, GIF, WEBP) are allowed';
                break;
            }
            if (file.size > maxSizeBytes) {
                errors.passportScans = 'Each file must be under 10MB';
                break;
            }
        }
    }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        // Redirect unauthenticated users to Get Started page on submit
        if (!isAuthenticated) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to submit the ITIN form.',
                })
            );
            navigate('/get-started');
            return;
        }
        console.log('Form submission started');
        console.log('Form data:', formData);
        console.log('Auth status:', isAuthenticated);

        if (!validateForm()) {
            console.log('Form validation failed', formErrors);
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
            console.log('Making API call to submit ITIN request');
            console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
            console.log('Token:', localStorage.getItem('token'));
            // Build multipart form data for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phoneNumber', formData.phoneNumber);
            formDataToSend.append('reasonForITIN', formData.reasonForITIN);
            formDataToSend.append('nationality', formData.nationality);
            formDataToSend.append('message', formData.message || '');
            if (formData.passportScans && formData.passportScans.length > 0) {
                formData.passportScans.slice(0, 2).forEach((file) => {
                    formDataToSend.append('passportScans', file);
                });
            }

            const res = await apiMethods.submissions.submitITINRequest(formDataToSend);
            console.log('API response:', res);
            console.log('Response data:', res?.data);
            const refId = res?.data?.data?._id;
            
            dispatch(
                addUiNotification({
                    type: 'success',
                    title: 'Submission Received',
                    message: `Your ITIN application has been successfully submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
                })
            );
            dispatch(markITINRequestSubmitted());
            
            // Show success popup
            setShowSuccessPopup(true);

            // Reset form and hide after delay
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    reasonForITIN: '',
                    nationality: '',
                    passportScans: [],
                    message: ''
                });
                setShowForm(false);
                setShowSuccessPopup(false);
            }, 3000);
        } catch (error) {
            let errorMessage = 'Unable to submit your request. Please try again.';
            
            if (error?.response?.data?.errors) {
                // Handle validation errors from backend
                const backendErrors = error.response.data.errors;
                const newFormErrors = {};
                
                backendErrors.forEach(err => {
                    newFormErrors[err.field] = err.message;
                });
                
                setFormErrors(newFormErrors);
                errorMessage = backendErrors[0]?.message || errorMessage;
            } else if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            dispatch(
                addUiNotification({
                    type: 'error',
                    title: 'Submission Failed',
                    message: errorMessage,
                })
            );
        }
    };

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Streamlined ITIN Application Process",
            description: "Our simplified process makes ITIN application straightforward and stress-free. We guide you through every step to ensure accurate submission and faster processing."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "ITIN Application Assistance",
            description: "Complete assistance with your ITIN application including document preparation, form completion, and submission to the IRS. We ensure all requirements are met."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "ITIN Renewal Services",
            description: "Professional ITIN renewal services to ensure your tax identification number remains active. We handle the renewal process efficiently and on time."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            title: "ITIN Updates & Modifications",
            description: "Assistance with updating your ITIN information including name changes, address updates, and other modifications to keep your records current with the IRS."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
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
                                Your ITIN application has been submitted successfully.
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
                            ITIN
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Simplify your U.S. ITIN application with expert guidance.
                            We assist non-residents in obtaining, renewing, and updating their ITIN seamlessly.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Apply for ITIN
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

            {/* Form Section */}
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
                                    ITIN Application Form
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.firstName && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
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
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.lastName && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.phoneNumber && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.phoneNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Reason for ITIN Application *
                                            </label>
                                            <select
                                                name="reasonForITIN"
                                                value={formData.reasonForITIN}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.reasonForITIN ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select reason</option>
                                                {itinReasons.map(reason => (
                                                    <option key={reason} value={reason}>{reason}</option>
                                                ))}
                                            </select>
                                            {formErrors.reasonForITIN && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.reasonForITIN}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nationality *
                                            </label>
                                            <input
                                                type="text"
                                                name="nationality"
                                                value={formData.nationality}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your nationality"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                    formErrors.nationality ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.nationality && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.nationality}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Passport Scans (up to 2 images) *
                                        </label>
                                        <input
                                            type="file"
                                            name="passportScans"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = e.target.files ? Array.from(e.target.files).slice(0, 2) : [];
                                                setFormData(prev => ({ ...prev, passportScans: files }));
                                                if (formErrors.passportScans) {
                                                    setFormErrors(prev => ({ ...prev, passportScans: '' }));
                                                }
                                            }}
                                            required
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300 ${
                                                formErrors.passportScans ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {formErrors.passportScans && (
                                            <p className="mt-1 text-sm text-red-500">{formErrors.passportScans}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message / Additional Information
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Please provide any additional information about your ITIN application needs..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-[#1e3a8a] hover:bg-[#facc15] text-white hover:text-[#1e3a8a] py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Submit ITIN Application
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

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
                            Our ITIN Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive ITIN solutions designed to simplify your U.S. tax identification process
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

export default ITIN;
