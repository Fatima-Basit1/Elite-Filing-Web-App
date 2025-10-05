import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import bluebg from '../../assets/bluebg.jpg';
import eori1 from '../../assets/eori1.jpg';
import eori2 from '../../assets/eori2.jpg';
import useAuth from '../../hooks/useAuth';
import { apiMethods } from '../../services/api';

const EORIApplication = () => {
    const { isAuthenticated } = useAuth(false);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        natureOfImportExport: '',
        vatNumber: '',
        message: ''
    });

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const validate = (data) => {
        const v = {};
        const isEmpty = (val) => !val || !String(val).trim();

        if (isEmpty(data.firstName)) v.firstName = 'First name is required.';
        if (isEmpty(data.lastName)) v.lastName = 'Last name is required.';
        if (isEmpty(data.companyName)) v.companyName = 'Company name is required.';

        if (isEmpty(data.email)) {
            v.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) v.email = 'Enter a valid email address.';
        }

        if (isEmpty(data.phoneNumber)) {
            v.phoneNumber = 'Phone number is required.';
        } else {
            const cleaned = String(data.phoneNumber).replace(/[^0-9]/g, '');
            if (cleaned.length < 7 || cleaned.length > 15) v.phoneNumber = 'Enter a valid phone number.';
        }

        if (isEmpty(data.natureOfImportExport)) v.natureOfImportExport = 'This field is required.';

        if (!isEmpty(data.vatNumber)) {
            const vatRegex = /^(GB)?[0-9A-Za-z]{9,12}$/;
            if (!vatRegex.test(data.vatNumber)) v.vatNumber = 'Enter a valid VAT number or leave blank.';
        }

        if (!isEmpty(data.message) && data.message.trim().length > 1000) {
            v.message = 'Message must be 1000 characters or fewer.';
        }

        return v;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const validationErrors = validate(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        if (!isAuthenticated) {
            navigate('/get-started');
            return;
        }

        try {
            setIsSubmitting(true);
            const payload = Object.fromEntries(
                Object.entries(formData).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
            );
            await apiMethods.submissions.submitUKEoriApplication(payload);
            setShowSuccessPopup(true);
            setFormData({
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                phoneNumber: '',
                natureOfImportExport: '',
                vatNumber: '',
                message: ''
            });
            setTimeout(() => {
                setShowForm(false);
                setShowSuccessPopup(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting EORI application:', error);
            const firstErrorMsg = error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.errors?.[0]?.message;
            setErrors({ api: firstErrorMsg || error?.response?.data?.message || 'Submission failed. Please try again.' });
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
            title: "Application Processing",
            description: "Complete EORI number application processing with HMRC, ensuring all documentation is accurate and submitted correctly."
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Trade Compliance",
            description: "Ensure your business meets all UK customs and trade regulations for seamless import/export operations."
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Fast Processing",
            description: "Quick turnaround time for EORI number applications, typically processed within 5-10 working days."
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
                            EORI Number Application
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Having an EORI number is essential for trading goods across EU and non-EU borders. Elite Filing makes sure your business stays compliant with UK customs regulations by assisting with a smooth application process
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowForm}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Get Your Confirmation Statement Filing Done
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
                                    EORI NUMBER APPLICATION FORM
                                </h2>

                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                                            {errors.firstName && (
                                                <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                                            )}
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
                                            {errors.lastName && (
                                                <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                                            )}
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
                                        {errors.companyName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
                                        )}
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
                                            {errors.email && (
                                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                            )}
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
                                            {errors.phoneNumber && (
                                                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="natureOfImportExport"
                                                value={formData.natureOfImportExport}
                                                onChange={handleInputChange}
                                                placeholder="Nature of Import/Export"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.natureOfImportExport && (
                                                <p className="mt-2 text-sm text-red-600">{errors.natureOfImportExport}</p>
                                            )}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                name="vatNumber"
                                                value={formData.vatNumber}
                                                onChange={handleInputChange}
                                                placeholder="VAT Number (optional)"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.vatNumber && (
                                                <p className="mt-2 text-sm text-red-600">{errors.vatNumber}</p>
                                            )}
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
                                            {errors.message && (
                                                <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                                            )}
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
                                    {errors.api && (
                                        <p className="mt-4 text-center text-sm text-red-600">{errors.api}</p>
                                    )}
                                </form>
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
                                                <p className="text-gray-600">Your UK EORI Application has been submitted. We will contact you shortly.</p>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* EORI REGISTRATION   */}
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
                               QUICK AND RELIABLE
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                                SIMPLIFIED EORI REGISTRATION
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Elite Filing ensures a hassle-free EORI number application process for businesses dealing with imports and exports in the UK. Our team verifies your business information, submits the application, and provides updates until the number is successfully issued. With our expertise, you can focus on growing your trade while we handle compliance.
                            
                            </p>
                            
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                              Having an EORI number is essential for trading goods across EU and non-EU borders. Elite Filing makes sure your business stays compliant with UK customs regulations by assisting with a smooth application process.
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
                                src={eori1}
                                alt="UK Annual Accounts - Professional Services"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TRADE OPERATIONS */}
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
                                src={eori2}
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
                               SEAMLESS TRADE OPERATIONS
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Having an EORI number is essential for trading goods across EU and non-EU borders. Elite Filing makes sure your business stays compliant with UK customs regulations by assisting with a smooth application process. Avoid delays and ensure your international shipments are processed efficiently with our professional support.
                            </p>
                             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Having an EORI number is essential for trading goods across EU and non-EU borders. Elite Filing makes sure your business stays compliant with UK customs regulations by assisting with a smooth application process
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

export default EORIApplication;
