import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';
import { markUSLLCFormationSubmitted } from '../../store/slices/submissionsSlice';
import { apiMethods } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import bluebg from '../../assets/bluebg.jpg';
import { FiCheckCircle } from 'react-icons/fi';
const LLCFormation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        residentialAddress: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        companyProposedName: '',
        state: '',
        numberOfMembers: '1',
        businessIndustry: '',
        members: [],
        services: [],
        message: ''
    });

    const usStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Special handling for numberOfMembers to size the members array
        if (name === 'numberOfMembers') {
            const count = Math.max(parseInt(value, 10) || 1, 1);
            setFormData(prev => {
                const additionalCount = Math.max(count - 1, 0);
                const nextMembers = [...prev.members];
                // Grow or shrink members array to match additionalCount
                if (nextMembers.length < additionalCount) {
                    while (nextMembers.length < additionalCount) {
                        nextMembers.push({ firstName: '', lastName: '', address: '' });
                    }
                } else if (nextMembers.length > additionalCount) {
                    nextMembers.length = additionalCount;
                }
                return {
                    ...prev,
                    [name]: value,
                    members: nextMembers
                };
            });
            return;
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMemberFieldChange = (index, field, value) => {
        setFormData(prev => {
            const members = [...prev.members];
            if (!members[index]) members[index] = { firstName: '', lastName: '', address: '' };
            members[index] = { ...members[index], [field]: value };
            return { ...prev, members };
        });
    };

    const serviceOptions = [
        { value: 'LLC formation', label: 'LLC formation' },
        { value: 'EIN registration', label: 'EIN registration (470 USD)' },
        { value: 'Registered Agent Service', label: 'Register Agent Service (300 USD)' },
        { value: 'Bank Account', label: 'Bank Account (95 USD)' },
        { value: 'Business Address', label: 'Business Address (499 USD)' },
        { value: 'Phone Number', label: 'Phone Number (90 USD)' },
        { value: 'Complete Package', label: 'Complete Package (10% off)' },
        { value: 'Resale Certificate', label: 'Resale Certificate (70 USD)' },
    ];

    // Services selection grouping and exclusivity helpers
    const completePackageValue = 'Complete Package';
    const individualServiceValues = [
        'LLC formation',
        'EIN registration',
        'Registered Agent Service',
        'Business Address',
        'Bank Account',
        'Phone Number',
        'Resale Certificate',
    ];
    const individualServiceOptions = [
        { value: 'LLC formation', label: 'LLC formation' },
        { value: 'EIN registration', label: 'EIN registration (470 USD)' },
        { value: 'Registered Agent Service', label: 'Register Agent Service (300 USD)' },
        { value: 'Business Address', label: 'Business Address (499 USD)' },
        { value: 'Bank Account', label: 'Bank Account (95 USD)' },
        { value: 'Phone Number', label: 'Phone Number (90 USD)' },
        { value: 'Resale Certificate', label: 'Resale Certificate (70 USD)' },
    ];
    const isCompleteSelected = formData.services.includes(completePackageValue);
    const anyIndividualSelected = formData.services.some(s => individualServiceValues.includes(s));
    const toggleService = (serviceValue) => {
        setFormData(prev => {
            const isIndividual = individualServiceValues.includes(serviceValue);
            let nextServices = [...prev.services];
    
            if (serviceValue === completePackageValue) {
                // Toggling Complete Package
                if (nextServices.includes(completePackageValue)) {
                    // Uncheck Complete Package -> re-enable individuals
                    nextServices = nextServices.filter(s => s !== completePackageValue);
                } else {
                    // Select Complete Package -> clear individuals and select only the package
                    nextServices = [completePackageValue];
                }
            } else if (isIndividual) {
                // Toggling individual service -> ensure Complete Package is unchecked
                nextServices = nextServices.filter(s => s !== completePackageValue);
                if (nextServices.includes(serviceValue)) {
                    nextServices = nextServices.filter(s => s !== serviceValue);
                } else {
                    nextServices.push(serviceValue);
                }
            }
    
            return { ...prev, services: nextServices };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated || !token) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Sign In Required',
                    message: 'Please log in to submit your US LLC formation form.',
                })
            );
            navigate('/get-started');
            return;
        }

        // Validate service selection: cannot select Complete Package together with individuals
        const hasComplete = formData.services.includes(completePackageValue);
        const hasIndividuals = formData.services.some(s => individualServiceValues.includes(s));
        if (hasComplete && hasIndividuals) {
            dispatch(
                addUiNotification({
                    type: 'error',
                    title: 'Invalid Service Selection',
                    message: 'Please choose either the Complete Package or individual services, not both.',
                })
            );
            return;
        }

        const payload = {
            ...formData,
            numberOfMembers: parseInt(formData.numberOfMembers, 10) || 1,
        };
        if (payload.numberOfMembers <= 1) {
            // Avoid sending empty members array when single-member LLC
            delete payload.members;
        }

        try {
            const res = await apiMethods.submissions.submitUSLLCFormation(payload);
            const refId = res?.data?.data?._id;
            dispatch(
                addUiNotification({
                    type: 'success',
                    title: 'Submission Received',
                    message: `Your US LLC Formation Form has been successfully submitted${refId ? ` (Reference ID: ${refId})` : ''}.`,
                })
            );
            dispatch(markUSLLCFormationSubmitted());
            setShowSuccessPopup(true);
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    residentialAddress: '',
                    dateOfBirth: '',
                    email: '',
                    phoneNumber: '',
                    companyProposedName: '',
                    state: '',
                    numberOfMembers: '',
                    businessIndustry: '',
                    members: [],
                    services: [],
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
                    message: 'Please log in to access the US LLC formation form.',
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
        const selected = formData.services || [];
        if (!selected.length) {
            dispatch(
                addUiNotification({
                    type: 'warning',
                    title: 'Select Services',
                    message: 'Please select at least one service to proceed to payment.',
                })
            );
            return;
        }
        const hasComplete = selected.includes(completePackageValue);
        const hasIndividuals = selected.some((s) => individualServiceValues.includes(s));
        if (hasComplete && hasIndividuals) {
            dispatch(
                addUiNotification({
                    type: 'error',
                    title: 'Invalid Service Selection',
                    message: 'Please choose either the Complete Package or individual services, not both.',
                })
            );
            return;
        }
        navigate('/USA/LLC-Formation/payment', { state: { services: selected } });
    };

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Business Structure Advisory",
            description: "Expert guidance on choosing the right LLC structure for your business needs and goals."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "Filing & Documentation",
            description: "Complete handling of all necessary paperwork and state filing requirements."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Ongoing Compliance Support",
            description: "Continuous support to ensure your LLC maintains compliance with state regulations."
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
                            US LLC Formation
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Launch your business in the United States with ease.
                            We handle filings, documentation, and compliance while you focus on growth.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartForm}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 group"
                        >
                            Start Your LLC Formation
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
                                    US LLC Formation Form
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

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Residential Address *
                                        </label>
                                        <textarea
                                            name="residentialAddress"
                                            value={formData.residentialAddress}
                                            onChange={handleInputChange}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            Company Proposed Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="companyProposedName"
                                            value={formData.companyProposedName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            >
                                                <option value="">Select a state</option>
                                                {usStates.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Members *
                                            </label>
                                            <input
                                                type="number"
                                                name="numberOfMembers"
                                                value={formData.numberOfMembers}
                                                onChange={handleInputChange}
                                                required
                                                min="1"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Industry *
                                        </label>
                                        <textarea
                                            name="businessIndustry"
                                            value={formData.businessIndustry}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    {/* Additional Members Section */}
                                    {parseInt(formData.numberOfMembers, 10) > 1 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Additional Members Details
                                            </label>
                                            <div className="space-y-6">
                                                {formData.members.map((member, index) => (
                                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Member {index + 2}</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <label className="block text-sm text-gray-700 mb-2">First Name *</label>
                                                                <input
                                                                    type="text"
                                                                    value={member.firstName}
                                                                    onChange={(e) => handleMemberFieldChange(index, 'firstName', e.target.value)}
                                                                    required
                                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm text-gray-700 mb-2">Last Name *</label>
                                                                <input
                                                                    type="text"
                                                                    value={member.lastName}
                                                                    onChange={(e) => handleMemberFieldChange(index, 'lastName', e.target.value)}
                                                                    required
                                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm text-gray-700 mb-2">Address *</label>
                                                                <input
                                                                    type="text"
                                                                    value={member.address}
                                                                    onChange={(e) => handleMemberFieldChange(index, 'address', e.target.value)}
                                                                    required
                                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Services Multi-select */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Services (select as many as you want)
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {individualServiceOptions.map(opt => (
                                                <label
                                                    key={opt.value}
                                                    className={`flex items-center p-3 border border-gray-200 rounded-lg ${isCompleteSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.services.includes(opt.value)}
                                                        onChange={() => toggleService(opt.value)}
                                                        disabled={isCompleteSelected}
                                                        className="mr-3 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                                    />
                                                    <span className="text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center my-4">
                                        <div className="flex-1 border-t border-gray-200"></div>
                                        <span className="px-3 text-sm text-gray-500">OR</span>
                                        <div className="flex-1 border-t border-gray-200"></div>
                                    </div>

                                    {/* Complete Package */}
                                    <label
                                        className={`flex items-start p-3 border border-gray-200 rounded-lg ${anyIndividualSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.services.includes(completePackageValue)}
                                            onChange={() => toggleService(completePackageValue)}
                                            disabled={anyIndividualSelected}
                                            className="mr-3 mt-1 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                        />
                                        <div>
                                            <span className="text-gray-700">Complete Package (10% off all above)</span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Includes all services above with a 10% discount. Selecting this will disable individual options.
                                            </p>
                                        </div>
                                    </label>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all duration-300"
                                        />
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
                            Our LLC Formation Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide comprehensive support throughout your LLC formation process
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
                                    Submission Successful!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Your LLC Formation request has been submitted successfully. We'll process your application and contact you soon.
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

export default LLCFormation;
