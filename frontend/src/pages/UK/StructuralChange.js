import React, { useState } from 'react';
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
import sc1 from '../../assets/sc1.jpg';
import sc2 from '../../assets/sc2.jpg';

const StructuralChange = () => {
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
        typeOfChange: '',
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

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
        if (!formData.companyName?.trim()) errors.companyName = 'Company name is required';
        if (!formData.email?.trim() || !emailRegex.test(formData.email)) errors.email = 'Valid email is required';
        if (!formData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
        if (!formData.typeOfChange?.trim()) errors.typeOfChange = 'Type of change is required';
        if (!formData.message?.trim()) errors.message = 'Message is required';
        setFormErrors(errors);
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
                    message: 'Please log in to submit the UK Structural Change form.',
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
            const res = await apiMethods.submissions.submitUKStructureChange(formData);
            const refId = res?.data?.data?._id;
            dispatch(
                addUiNotification({
                    type: 'success',
                    title: 'Submission Received',
                    message: `Your UK Structural Change request has been submitted successfully${refId ? ` (Reference ID: ${refId})` : ''}.`,
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
                    typeOfChange: '',
                    message: ''
                });
                setShowForm(false);
                setShowSuccessPopup(false);
            }, 3000);
        } catch (error) {
            const firstErrorMsg = error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.errors?.[0]?.message;
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

    const handleShowForm = () => {
        if (!isAuthenticated) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to access the UK Structural Change form.',
                })
            );
            navigate('/get-started');
            return;
        }
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "Structure Review",
            description: "Assess your current business framework and identify necessary changes for improvement, focusing on efficiency and long-term growth."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Legal Compliance",
            description: "Ensure your company meets all regulatory requirements during the restructuring process, safeguarding your business from potential risks."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Smooth Transition",
            description: "Implement changes seamlessly while maintaining business continuity, minimizing disruption, and ensuring team alignment."
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
                            Company Structural Change
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            With our guidance, you can confidently navigate complex structural adjustments, ensuring your business remains agile and compliant. Trust us to manage every detail of the process, so you can focus on strategic growth and operational success.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowForm}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Get Your Company Structural Change Done
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
                        {/* Success Popup - standardized to modal overlay pattern */}
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
                                        <p className="text-gray-600">Your UK Structural Change request has been submitted. We will contact you shortly.</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-xl p-8"
                            >
                                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
                                    COMPANY STRUCTURAL CHANGE FORM
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
                                                required
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
                                                required
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
                                            required
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
                                                required
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
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-gray-700 font-medium">Type of Change :</label>
                                        <div className="flex flex-wrap gap-6">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="typeOfChange"
                                                    value="shareholders"
                                                    checked={formData.typeOfChange === 'shareholders'}
                                                    onChange={handleInputChange}
                                                    className="mr-2 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                                    required
                                                />
                                                <span className="text-gray-700">Shareholders</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="typeOfChange"
                                                    value="directors"
                                                    checked={formData.typeOfChange === 'directors'}
                                                    onChange={handleInputChange}
                                                    className="mr-2 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                                    required
                                                />
                                                <span className="text-gray-700">Directors</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="typeOfChange"
                                                    value="shares-structure"
                                                    checked={formData.typeOfChange === 'shares-structure'}
                                                    onChange={handleInputChange}
                                                    className="mr-2 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                                    required
                                                />
                                                <span className="text-gray-700">Shares Structure</span>
                                            </label>
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
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-[#1e3a8a] hover:bg-[#facc15] text-white hover:text-[#1e3a8a] py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        SUBMIT
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Tailored Solution */}
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
                               UNDERSTANDING COMPANY STRUCTURAL CHANGE
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                                TAILORED SOLUTIONS FOR YOUR EVOLVING BUSINESS
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Elite Filing provides in-depth expertise in managing company structural changes. Whether you’re altering your business model, shifting ownership, or adjusting your management framework, we help you navigate the complexities. Our experienced team ensures that all changes are made in full compliance with local laws and regulations. We work closely with your organization to craft a solution that supports long-term growth while minimizing potential disruptions. 
                            
                            </p>
                            
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                             By understanding your unique business needs, we tailor our approach to ensure that your company remains adaptable and competitive in a fast-evolving market. Let us streamline your business transformation for a smooth transition.
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
                                src={sc1}
                                alt="UK Annual Accounts - Professional Services"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Hassle free business */}
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
                                src={sc2}
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
                                HASSLE-FREE BUSINESS RESTRUCTURING
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                With Elite Filing, company restructuring becomes a seamless process. We handle everything from preparing necessary documents to liaising with regulatory bodies, ensuring that your transition is as efficient as possible. Our experts guide you through each step, keeping you informed and confident in your decisions. We take on the administrative workload so you can focus on the strategic aspects of your business. By providing timely solutions, we minimize operational disruptions, allowing your company to continue its growth trajectory without unnecessary delays. 
                            </p>
                             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our goal is to ensure that your company remains in excellent standing while adapting to new business needs.
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

export default StructuralChange;
