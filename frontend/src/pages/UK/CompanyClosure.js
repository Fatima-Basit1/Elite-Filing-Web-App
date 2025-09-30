import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { CheckCircleIcon, ShieldCheckIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

// Import images
import bluebg from '../../assets/bluebg.jpg';
import cc1 from '../../assets/cc1.jpg';
import cc2 from '../../assets/cc2.jpg';

const CompanyClosure = () => {
    const services = [
        {
            icon: DocumentTextIcon,
            title: "Dissolution Application",
            description: "Preparation and submission of the official dissolution application to regulatory authorities, ensuring legal compliance and timely processing."
        },
        {
            icon: CheckCircleIcon,
            title: "Final Accounts Preparation",
            description: "Assistance in preparing and submitting final accounts, including closing statements, to meet legal requirements and conclude operations smoothly."
        },
        {
            icon: ShieldCheckIcon,
            title: "Debt Settlement",
            description: "Guidance on settling outstanding debts, resolving liabilities, and ensuring compliance with all closure-related legal obligations."
        },
        {
            icon: ClockIcon,
            title: "Compliance Support",
            description: "Continuous support to ensure your company closure maintains compliance with statutory requirements and regulatory frameworks."
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
                            Company Closure Dissolution
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-10 leading-relaxed">
                            Closing a company can be a complex process, but Elite Filing simplifies it for you. We specialize in efficient and compliant company dissolution services, handling all the paperwork and legal requirements on your behalf.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Closure Information Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm font-semibold text-gray-600 mb-4 tracking-wider uppercase">
                                EFFORTLESS COMPANY CLOSURE SOLUTIONS
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                                Streamlined Dissolution
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Closing a company can be a complex process, but Elite Filing simplifies it for you. We specialize in efficient and compliant company dissolution services, handling all the paperwork and legal requirements on your behalf. From preparing final accounts to submitting dissolution applications to regulatory authorities, we ensure a seamless process. Our experienced team provides expert guidance to help you avoid penalties and conclude operations stress-free.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Trust Elite Filing to make your company closure smooth and hassle-free.
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
                                src={cc1}
                                alt="Company Closure Process"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            {/* Company Closure Dissolution Details Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src={cc2}
                                alt="Company Closure Documentation"
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
                                COMPANY CLOSURE DISSOLUTION
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Dissolving a company is a critical step that demands careful execution and compliance with legal frameworks. At Elite Filing, we take the complexity out of this process by managing everything from initial paperwork to final approvals. Our experienced team ensures all legal obligations are met, including notifying relevant authorities, filing final accounts, and clearing outstanding liabilities. Whether you're closing due to restructuring, retirement, or any other reason, we provide personalized solutions to ensure a smooth and hassle-free transition. Partner with us to conclude your business operations with confidence and peace of mind.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
                            Our Company Closure Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive dissolution services to ensure your company closure is handled professionally and efficiently.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e3a8a] mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CompanyClosure;