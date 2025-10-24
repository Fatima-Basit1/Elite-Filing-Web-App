import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markUSTaxFilingSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import bluebg from '../../assets/bluebg.jpg';
import { FiCheckCircle } from 'react-icons/fi';

const Tax = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useSelector((state) => state.auth);

    const [showForm, setShowForm] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [hasItin, setHasItin] = useState(null); // null = not asked, true = has ITIN, false = needs ITIN
    const [needsItinService, setNeedsItinService] = useState(false);
    const [needsEinService, setNeedsEinService] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        residentialAddress: '',
        ssnOrItin: '',
        companyName: '',
        filingType: '',
        taxYear: '',
        ein: '',
        state: '',
        incomeDetails: '',
        deductions: '',
        message: ''
    });

    const taxFilingTypes = [
        'individual',
        'llc',
        'corp',
        'partnership'
    ];

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
                    message: 'Please log in to submit your USA Tax filing request.',
                })
            );
            navigate('/get-started');
            return;
        }

        const payload = {
            ...formData,
            taxYear: parseInt(formData.taxYear, 10) || new Date().getFullYear(),
        };

        try {
            const res = await apiMethods.submissions.submitUSTaxFiling(payload);
            const refId = res?.data?.data?._id;
            dispatch(
                addUiNotification({
                    type: 'success',
                    title: 'Submission Received',
                    message: `Your USA Tax Filing request has been successfully submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
                })
            );
            dispatch(markUSTaxFilingSubmitted());
            setShowSuccessPopup(true);
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    residentialAddress: '',
                    ssnOrItin: '',
                    companyName: '',
                    filingType: '',
                    taxYear: '',
                    ein: '',
                    state: '',
                    incomeDetails: '',
                    deductions: '',
                    message: ''
                });
                setShowForm(false);
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

    const handleStartForm = () => {
        if (!isAuthenticated || !token) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to access the USA Tax filing form.',
                })
            );
            navigate('/get-started');
            return;
        }
        setShowForm(true);
    };

    const goToPayment = () => {
        if (!isAuthenticated || !token) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to proceed to payment.',
                })
            );
            navigate('/get-started');
            return;
        }
        navigate('/USA/LLC-Formation/payment', { state: { formType: 'USA Tax Filing', backPath: '/USA/Tax' } });
    };

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Tax Filing Simplified",
            description: "Streamlined tax preparation and filing process that takes the complexity out of U.S. tax obligations. Our expert team ensures accuracy and timely submission."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Accurate Filing for Businesses",
            description: "Precise tax filing services tailored for businesses of all sizes. We ensure compliance with federal and state regulations while maximizing your deductions."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            title: "Minimize Liabilities",
            description: "Strategic tax planning to help reduce your tax burden legally and effectively. We identify opportunities to minimize liabilities while maintaining full compliance."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Strategic Tax Planning",
            description: "Comprehensive tax planning strategies designed to optimize your financial position. We help you make informed decisions that benefit your long-term tax situation."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "IRS Representation",
            description: "Professional representation before the IRS to resolve tax issues, handle audits, and ensure your rights are protected throughout the process."
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
                            USA Tax
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Simplify your U.S. tax filings with expert guidance.
                            We ensure compliance, accuracy, and peace of mind while you focus on growth.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartForm}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Start Your Tax Filing
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
                                    USA Tax Filing Form
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Residential Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="residentialAddress"
                                            value={formData.residentialAddress}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Type of Tax Filing *
                                            </label>
                                            <select
                                                name="filingType"
                                                value={formData.filingType}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            >
                                                <option value="">Select tax filing type</option>
                                                {taxFilingTypes.map(type => (
                                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tax Year *
                                            </label>
                                            <input
                                                type="number"
                                                name="taxYear"
                                                value={formData.taxYear}
                                                onChange={handleInputChange}
                                                required
                                                min="2000"
                                                max={new Date().getFullYear()}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* ITIN Condition Check - Only for Individual Filing */}
                                    {formData.filingType === 'individual' && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                            <h4 className="text-lg font-semibold text-blue-900 mb-4">ITIN Requirement Check</h4>
                                            <p className="text-blue-700 mb-4">
                                                Do you already have an ITIN (Individual Taxpayer Identification Number)?
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <label className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hasItin"
                                                        value="yes"
                                                        checked={hasItin === true}
                                                        onChange={(e) => {
                                                            setHasItin(true);
                                                            setNeedsItinService(false);
                                                        }}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-blue-900 font-medium">Yes, I have an ITIN</span>
                                                </label>
                                                
                                                <label className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hasItin"
                                                        value="no"
                                                        checked={hasItin === false}
                                                        onChange={(e) => {
                                                            setHasItin(false);
                                                            setNeedsItinService(true);
                                                        }}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-blue-900 font-medium">No, I need an ITIN</span>
                                                </label>
                                            </div>

                                            {/* ITIN Service Option */}
                                            {needsItinService && (
                                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-yellow-900">ITIN Service Required</span>
                                                        <span className="text-xl font-bold text-yellow-600">$250 USD</span>
                                                    </div>
                                                    <p className="text-sm text-yellow-700 mb-2">
                                                        We help you apply for an ITIN through the IRS. This service includes:
                                                    </p>
                                                    <ul className="text-xs text-yellow-700 mb-3 ml-4 space-y-1">
                                                        <li>• Form W-7 application assistance</li>
                                                        <li>• Document preparation guidance</li>
                                                        <li>• IRS submission and follow-up</li>
                                                        <li>• Processing support until approval</li>
                                                    </ul>
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/usa/itin')}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                                                    >
                                                        Get ITIN Service ($250)
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* EIN Service Check - Only for Business Filings */}
                                    {(formData.filingType === 'llc' || formData.filingType === 'corp' || formData.filingType === 'partnership') && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                            <h4 className="text-lg font-semibold text-green-900 mb-4">EIN Requirement Check</h4>
                                            <p className="text-green-700 mb-4">
                                                Do you already have an EIN (Employer Identification Number)?
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <label className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hasEin"
                                                        value="yes"
                                                        checked={!needsEinService}
                                                        onChange={(e) => setNeedsEinService(false)}
                                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="text-green-900 font-medium">Yes, I have an EIN</span>
                                                </label>
                                                
                                                <label className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hasEin"
                                                        value="no"
                                                        checked={needsEinService}
                                                        onChange={(e) => setNeedsEinService(true)}
                                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="text-green-900 font-medium">No, I need an EIN</span>
                                                </label>
                                            </div>

                                            {/* EIN Service Option */}
                                            {needsEinService && (
                                                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-orange-900">EIN Service Required</span>
                                                        <span className="text-xl font-bold text-orange-600">$470 USD</span>
                                                    </div>
                                                    <p className="text-sm text-orange-700 mb-2">
                                                        We help you apply for an EIN through the IRS. This service includes:
                                                    </p>
                                                    <ul className="text-xs text-orange-700 mb-3 ml-4 space-y-1">
                                                        <li>• Form SS-4 application assistance</li>
                                                        <li>• Business information preparation</li>
                                                        <li>• IRS submission and follow-up</li>
                                                        <li>• EIN retrieval and delivery</li>
                                                    </ul>
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/usa/ein')}
                                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                                                    >
                                                        Get EIN Service ($470)
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Conditional ID fields based on filing type */}
                                    {formData.filingType === 'individual' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SSN/ITIN *
                                            </label>
                                            <input
                                                type="text"
                                                name="ssnOrItin"
                                                value={formData.ssnOrItin}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    )}

                                    {(formData.filingType === 'llc' || formData.filingType === 'corp' || formData.filingType === 'partnership') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                EIN (Employer Identification Number) *
                                            </label>
                                            <input
                                                type="text"
                                                name="ein"
                                                value={formData.ein}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter EIN"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="Enter your state (optional)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Income Details (Optional)
                                        </label>
                                        <textarea
                                            name="incomeDetails"
                                            value={formData.incomeDetails}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Provide details of your income sources (optional)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Deductions (Optional)
                                        </label>
                                        <textarea
                                            name="deductions"
                                            value={formData.deductions}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="List any deductions you want to claim (optional)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
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
                                            placeholder="Please provide any additional information about your tax filing needs..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Pricing Summary</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Tax Filing Service:</span>
                                                <span className="font-medium text-gray-900">Included</span>
                                            </div>
                                            
                                            {needsItinService && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">ITIN Service:</span>
                                                    <span className="font-medium text-gray-900">$250 USD</span>
                                                </div>
                                            )}
                                            
                                            {needsEinService && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">EIN Service:</span>
                                                    <span className="font-medium text-gray-900">$470 USD</span>
                                                </div>
                                            )}
                                            
                                            <div className="border-t border-gray-300 pt-2">
                                                <div className="flex justify-between font-semibold text-lg">
                                                    <span className="text-gray-900">Total Estimated Cost:</span>
                                                    <span className="text-gray-900">
                                                        {(() => {
                                                            let total = 0;
                                                            if (needsItinService) total += 250;
                                                            if (needsEinService) total += 470;
                                                            return total > 0 ? `$${total} USD` : 'Free';
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={goToPayment}
                                        className="w-full bg-[#1e3a8a] hover:bg-[#facc15] text-white hover:text-[#1e3a8a] py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Proceed To Payment
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
                            Our Tax Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive tax solutions designed to simplify your U.S. tax obligations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccessPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                        <div className="bg-white rounded-2xl p-8 shadow-2xl relative z-10 max-w-md w-full mx-4">
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Tax Filing Submitted!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Your tax filing request has been submitted successfully. Our team will review your information and contact you soon.
                                </p>
                                <motion.div
                                    className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                >
                                    <div className="h-full bg-green-500 rounded-full" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tax;
