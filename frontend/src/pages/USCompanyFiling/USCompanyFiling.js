import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightIcon,
  StarIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const USCompanyFiling = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Business structures data
  const businessStructures = [
    {
      type: 'LLC',
      title: 'Limited Liability Company',
      description: 'Perfect for small to medium businesses seeking flexibility and protection.',
      features: [
        'Limited liability protection for owners',
        'Tax flexibility with pass-through taxation',
        'Simple management structure and operations',
        'Enhanced credibility with customers and vendors',
        'Ability to build separate business credit'
      ]
    },
    {
      type: 'Corporation',
      title: 'C-Corporation',
      description: 'Ideal for businesses planning to raise capital or go public.',
      features: [
        'Maximum liability protection for shareholders',
        'Easier to raise capital through stock sales',
        'Perpetual existence beyond founders',
        'Tax deductible employee benefits',
        'Enhanced credibility and professional image'
      ]
    },
    {
      type: 'S-Corp',
      title: 'S-Corporation',
      description: 'Great for businesses wanting corporate benefits with pass-through taxation.',
      features: [
        'Pass-through taxation avoiding double taxation',
        'Limited liability protection for shareholders',
        'No corporate income tax at federal level',
        'Credibility and perpetual existence',
        'Easy transfer of ownership through stock sales'
      ]
    },
    {
      type: 'Partnership',
      title: 'Partnership',
      description: 'Simple structure for businesses with multiple owners.',
      features: [
        'Two or more people share ownership and responsibilities',
        'Simple structure but limited liability protection only with LLP',
        'Pass-through taxation with shared profits and losses',
        'Shared management responsibilities and decision making',
        'Easy to establish and maintain with minimal formalities'
      ]
    },
    {
      type: 'Sole Proprietorship',
      title: 'Sole Proprietorship',
      description: 'The simplest and most cost-effective business structure.',
      features: [
        'Easiest and cheapest business form to establish',
        'No legal separation between business and owner',
        'High personal liability for business debts',
        'Complete control over all business decisions',
        'Simple tax reporting on personal tax return'
      ]
    }

  ];

  // Filing steps data
  const filingSteps = [
    {
      step: '1',
      title: 'Choose Your State',
      description: 'Select the best state for your business incorporation based on your needs, tax benefits, and business-friendly regulations. Delaware, Nevada, and Wyoming are popular choices.'
    },
    {
      step: '2',
      title: 'Select Business Type',
      description: 'Choose between LLC, Corporation, S-Corp, or Partnership based on your business goals, tax preferences, and growth plans for optimal structure.'
    },
    {
      step: '3',
      title: 'Name Your Company',
      description: 'Pick a unique business name that complies with state requirements. We\'ll check availability across all states and reserve it for you during the filing process.'
    },
    {
      step: '4',
      title: 'Provide Information',
      description: 'Submit required business details including registered agent information, business address, ownership structure, and management details for your chosen entity type.'
    },
    {
      step: '5',
      title: 'Review & Submit',
      description: 'Carefully review all information for accuracy before we submit your filing to the appropriate state agency. Any errors can cause delays or rejections.'
    },
    {
      step: '6',
      title: 'State Processing',
      description: 'The state reviews and processes your application. Processing times vary by state and entity type, ranging from same-day to several weeks.'
    },
    {
      step: '7',
      title: 'Receive Documents',
      description: 'Get your official formation documents, EIN from the IRS, operating agreements or bylaws, and other important business paperwork to start operations.'
    },
    {
      step: '8',
      title: 'Ongoing Support',
      description: 'Access our ongoing compliance services, annual report filings, registered agent services, and business support tools to maintain good standing.'
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Credibility',
      description: 'A properly formed business entity builds trust with clients, banks, investors, and business partners.'
    },
    {
      icon: ScaleIcon,
      title: 'Legal Protection',
      description: 'Your personal assets are protected from business liabilities and debts with proper entity formation.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Tax Benefits',
      description: 'Take advantage of business deductions, tax planning strategies, and potentially lower tax rates.'
    },
    {
      icon: TrophyIcon,
      title: 'Funding Opportunities',
      description: 'Easier to attract investors, apply for business loans, and access various funding sources.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Business Growth',
      description: 'Structured entities provide the foundation for scaling operations and expanding into new markets.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your comment! We will review it shortly.');
    setFormData({
      comment: '',
      name: '',
      email: '',
      website: '',
      saveInfo: false
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-[#041e72] via-[#0a2d8a] to-[#1e40af] text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f8bd0a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              COMPANY FILING IN US
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-8 text-[#f8bd0a]"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              THE COMPLETE GUIDE TO BUSINESS FORMATION IN THE US
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Starting a business in the US opens doors to the world's largest economy, offering unparalleled opportunities for growth and success. The United States provides a robust legal framework, diverse funding options, and access to global markets. But before you can operate legally, you need to <span className="text-[#f8bd0a] font-semibold">properly form your business entity</span> with the appropriate state authorities.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl mb-12 text-blue-100 max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              This comprehensive guide will walk you through everything you need to know about <span className="text-[#f8bd0a] font-semibold">business formation in the US</span>, including entity types, filing processes, state requirements, costs, and ongoing compliance obligations.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <motion.section 
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'process', label: 'Filing Process' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'costs', label: 'Costs' },
              { id: 'reply', label: 'Leave a Reply' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-[#f8bd0a] text-[#041e72]'
                    : 'border-transparent text-gray-500 hover:text-[#041e72] hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.section>

      {/* Overview Section */}
      {activeTab === 'overview' && (
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* What is Business Formation */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-4xl font-bold text-[#041e72] mb-8 text-center"
                variants={fadeInUp}
              >
                WHAT IS BUSINESS FORMATION IN THE US?
              </motion.h2>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700 mb-6">
                  Business formation refers to the legal process of <span className="text-[#f8bd0a] font-semibold">creating a business entity</span> by filing the necessary documents with state authorities. This process establishes your business as a separate legal entity, distinct from its owners.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  When you properly form your business, you create a <span className="text-[#f8bd0a] font-semibold">separate legal identity</span> that can:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>Own assets and property in its own name</li>
                  <li>Enter into contracts and agreements</li>
                  <li>Hire employees and contractors</li>
                  <li>Protect your personal assets from business liabilities</li>
                  <li>Establish business credit separate from personal credit</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Why Business Formation is Important */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-4xl font-bold text-[#041e72] mb-8 text-center"
                variants={fadeInUp}
              >
                WHY PROPER BUSINESS FORMATION IS IMPORTANT
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                Business formation is not just a legal requirement – it provides your business with a solid foundation for growth and success.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    variants={fadeInUp}
                  >
                    <div className="flex items-center mb-4">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                      <benefit.icon className="h-8 w-8 text-[#041e72]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#041e72] mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Types of Business Entities */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-4xl font-bold text-[#041e72] mb-8 text-center"
                variants={fadeInUp}
              >
                TYPES OF BUSINESS ENTITIES YOU CAN FORM IN THE US
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                When forming your business, you'll need to choose the entity type that best fits your needs, goals, and circumstances:
              </motion.p>
              <div className="space-y-8">
                {businessStructures.map((structure, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                    variants={fadeInUp}
                  >
                    <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                      {index + 1}. {structure.title} ({structure.type})
                    </h3>
                    <p className="text-lg text-[#f8bd0a] font-semibold mb-4">{structure.description}</p>
                    <ul className="space-y-2">
                      {structure.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Filing Process Section */}
      {activeTab === 'process' && (
        <motion.section 
          className="py-20 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-[#041e72] mb-6">Simple 8-Step Filing Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've streamlined the US business formation process into simple, manageable steps.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {filingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  variants={fadeInUp}
                >
                  <div className="absolute -top-4 left-4">
                    <div className="w-8 h-8 bg-[#f8bd0a] text-[#041e72] rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-[#041e72] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < filingSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRightIcon className="w-6 h-6 text-[#f8bd0a]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Benefits Section */}
      {activeTab === 'benefits' && (
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-bold text-[#041e72] mb-12 text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              HOW ELITE FILING HELPS ENTREPRENEURS
            </motion.h2>
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 mb-12"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <p className="text-lg text-gray-700 mb-6">
                At <span className="text-[#f8bd0a] font-semibold">Elite Filing</span>, we simplify the entire process of business formation and ongoing compliance. As <span className="text-[#041e72] font-semibold">authorized filing agents</span> in all 50 states, we provide fast, reliable, and legally compliant business formation services.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Here's what you get with Elite Filing:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">LLC Formation starting at $99</span> + state fees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Free EIN (Federal Tax ID)</span> with all formation packages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Registered agent service</span> included for the first year</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Operating agreements and bylaws</span> customized for your business</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Business banking assistance</span> to get your accounts set up quickly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Ongoing compliance support</span> to maintain good standing</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                With Elite Filing, you don't just form a business – you establish a strong foundation for long-term success and growth.
              </p>
            </motion.div>

            {/* Final Thoughts Section */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h3 
                className="text-3xl font-bold text-[#041e72] mb-8 text-center"
                variants={fadeInUp}
              >
                FINAL THOUGHTS
              </motion.h3>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700 mb-6">
                  Business formation in the USA is the crucial first step toward building a legitimate, credible, and growth-ready company. While the process varies by state and entity type, getting it right from the beginning is essential for your long-term success. From choosing the right business structure to maintaining ongoing compliance, each decision impacts your company's future.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  With expert guidance from Elite Filing, you can navigate the complexities of business formation while focusing on what matters most – growing your business and serving your customers.
                </p>
                <div className="bg-[#f8bd0a] bg-opacity-10 border-l-4 border-[#f8bd0a] p-6 rounded-r-lg">
                  <p className="text-lg font-semibold text-[#041e72] mb-2">
                    Ready to start your US business?
                  </p>
                  <p className="text-gray-700">
                    Contact Elite Filing today and launch your business with confidence and expert support.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Ongoing Responsibilities */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h3 
                className="text-3xl font-bold text-[#041e72] mb-8 text-center"
                variants={fadeInUp}
              >
                ONGOING COMPLIANCE RESPONSIBILITIES
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                Once your business is formed, you must maintain compliance with state and federal requirements:
              </motion.p>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    1. Annual Reports/Statements
                  </h4>
                  <p className="text-gray-700">File annual reports with your state to maintain good standing and update business information.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    2. Tax Filings
                  </h4>
                  <p className="text-gray-700">Submit federal and state tax returns based on your entity type and business activities.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    3. Registered Agent Maintenance
                  </h4>
                  <p className="text-gray-700">Maintain a registered agent in your state of formation to receive legal documents.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    4. Business Licenses & Permits
                  </h4>
                  <p className="text-gray-700">Renew required business licenses and permits based on your industry and location.</p>
                </motion.div>
              </div>
              <motion.p 
                className="text-center text-gray-600 mt-8"
                variants={fadeInUp}
              >
                Failure to maintain compliance can result in penalties, loss of good standing, or administrative dissolution.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Costs Section */}
      {activeTab === 'costs' && (
        <motion.section 
          className="py-20 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-bold text-[#041e72] mb-12 text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              COSTS OF BUSINESS FORMATION
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              The costs for business formation vary by state and entity type:
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  DIY Filing (State Fees Only)
                </h3>
                <p className="text-3xl font-bold text-[#f8bd0a] mb-4">$50-$500</p>
                <p className="text-gray-700">Varies by state and entity type</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  Attorney Services
                </h3>
                <p className="text-3xl font-bold text-[#f8bd0a] mb-4">$1,000-$3,000+</p>
                <p className="text-gray-700">Plus state fees and additional costs</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  Elite Filing Services
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Starting at <span className="text-[#f8bd0a] font-bold">$99</span> + state fees with comprehensive support, documents, and ongoing assistance.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Leave a Reply Section */}
      {activeTab === 'reply' && (
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-bold text-[#041e72] mb-12 text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Leave a Reply
            </motion.h2>
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <p className="text-gray-600 mb-8">
                Your email address will not be published. Required fields are marked *
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={6}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent transition-all duration-200"
                    placeholder="Write your comment here..."
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#f8bd0a] focus:ring-[#f8bd0a] border-gray-300 rounded"
                  />
                  <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-[#f8bd0a] hover:bg-yellow-500 text-[#041e72] font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Post Comment
                </button>
              </form>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-[#041e72] to-[#0a2d8a] text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Ready to Start Your US Business?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-100"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Join thousands of entrepreneurs who trust Elite Filing for their US business formation.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <button className="bg-[#f8bd0a] hover:bg-yellow-500 text-[#041e72] font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#041e72] font-bold py-4 px-8 rounded-full transition-all duration-300 inline-block"
            >
              Contact Our Experts
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default USCompanyFiling;