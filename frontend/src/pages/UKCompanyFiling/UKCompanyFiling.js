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

const UKCompanyFiling = () => {
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

  // UK Company types data based on the images
  const companyTypes = [
    {
      type: 'Private Limited Company (LTD)',
      description: 'Most common business structure',
      features: [
        'Owners liability is limited to their investment',
        'Ideal for startups, SMEs, and businesses looking to grow'
      ]
    },
    {
      type: 'Public Limited Company (PLC)',
      description: 'Can offer shares to the public',
      features: [
        'Minimum share capital of £50,000 required',
        'Suitable for larger businesses seeking big investments'
      ]
    },
    {
      type: 'Limited Liability Partnership (LLP)',
      description: 'Combines features of partnerships and limited companies',
      features: [
        'Partners share profits but enjoy limited liability',
        'Popular among professional firms like law or accounting practices'
      ]
    }
  ];

  // Filing steps data based on the images
  const filingSteps = [
    {
      step: '1',
      title: 'Choose a Company Name',
      description: 'Must be unique and not similar to existing companies. Cannot include offensive words or restricted terms. You can check name availability on the Companies House website.'
    },
    {
      step: '2',
      title: 'Provide a Registered Office Address',
      description: 'Your company must have a UK-based address. This will appear on public records and receive official correspondence.'
    },
    {
      step: '3',
      title: 'Appoint Directors and Shareholders',
      description: 'At least one director (aged 16 or older) is required. Shareholders own the company, and directors run it. In smaller companies, the same person can be both.'
    },
    {
      step: '4',
      title: 'Prepare Key Documents',
      description: 'Two important documents are required: Memorandum of Association – confirms the company\'s formation. Articles of Association – rules on how the company will be run.'
    },
    {
      step: '5',
      title: 'File with Companies House',
      description: 'Filing can be done online in a few hours or via paper forms (slower). Most businesses choose online registration for speed and convenience.'
    },
    {
      step: '6',
      title: 'Receive Your Certificate of Incorporation',
      description: 'Once approved, you\'ll get an official certificate. This confirms your company is legally registered and ready to trade.'
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Credibility',
      description: 'Being on the official register builds trust with clients, banks, and investors.'
    },
    {
      icon: ScaleIcon,
      title: 'Legal Protection',
      description: 'Your personal finances are separate from your company\'s debts.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Tax Benefits',
      description: 'Limited companies often pay lower tax rates compared to sole traders.'
    },
    {
      icon: TrophyIcon,
      title: 'Funding Opportunities',
      description: 'Easier to attract investors or apply for loans.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Recognition',
      description: 'A UK-registered company is respected worldwide.'
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
    // Handle form submission logic here
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
              COMPANY FILING IN UK
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-8 text-[#f8bd0a]"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              THE COMPLETE GUIDE TO COMPANY FILING IN THE UK
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Starting a business in the UK is one of the smartest steps for entrepreneurs looking to build a professional and legally recognized company. The UK offers a transparent business environment, strong investor confidence, and global credibility. But before you can trade officially, you need to <span className="text-[#f8bd0a] font-semibold">file your company with Companies House</span> – the UK's official register of companies.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl mb-12 text-blue-100 max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              This blog will walk you through everything you need to know about <span className="text-[#f8bd0a] font-semibold">company filing in the UK</span>, including the process, requirements, costs, and compliance responsibilities.
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
            {/* What is Company Filing */}
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
                WHAT IS COMPANY FILING IN THE UK?
              </motion.h2>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700 mb-6">
                  Company filing refers to the process of <span className="text-[#f8bd0a] font-semibold">registering and maintaining your business with Companies House</span>, a government body that oversees all limited companies in England, Scotland, Wales, and Northern Ireland.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  When you file your company, you create a <span className="text-[#f8bd0a] font-semibold">separate legal identity</span> for your business. This means your company can:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>Own assets and property</li>
                  <li>Hire employees</li>
                  <li>Enter contracts</li>
                  <li>Protect your personal assets from business liabilities</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Why Company Filing is Important */}
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
                WHY COMPANY FILING IS IMPORTANT
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                Company filing is not just a legal formality – it gives your business a professional edge.
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

            {/* Types of Companies */}
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
                TYPES OF COMPANIES YOU CAN REGISTER IN THE UK
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                When filing, you'll need to decide what type of company structure best fits your needs:
              </motion.p>
              <div className="space-y-8">
                {companyTypes.map((company, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                    variants={fadeInUp}
                  >
                    <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                      {index + 1}. {company.type}
                    </h3>
                    <p className="text-lg text-[#f8bd0a] font-semibold mb-4">{company.description}</p>
                    <ul className="space-y-2">
                      {company.features.map((feature, featureIndex) => (
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
              <h2 className="text-4xl font-bold text-[#041e72] mb-6">Simple 6-Step Filing Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've streamlined the UK company registration process into simple, manageable steps.
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
                At <span className="text-[#f8bd0a] font-semibold">Elite Filing</span>, we simplify the entire process of company registration and ongoing compliance. As an <span className="text-[#041e72] font-semibold">authorized partner of Companies House</span>, we are fully approved in-house software to ensure a fast, smooth, and legally compliant experience.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Here's what you get with us:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">UK Limited Company Formation from £12.99</span></span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Free domain name</span> with company formation or virtual office packages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Registered office address service</span></span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Audit and tax support</span> to keep you compliant with HMRC</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Virtual office packages</span> for a professional presence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><span className="text-[#f8bd0a] font-semibold">Ongoing compliance reminders</span> so you never miss a filing deadline</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                With Elite Filing, you don't just register a company – You establish a strong foundation for long-term growth.
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
                  Company filing in the UK is the first major step towards building a legitimate, credible, and growth-ready business. While the process is relatively straightforward, it's critical to get it right from the start. From choosing the right structure to staying compliant with annual filings, each step plays a vital role in your company's success.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  With expert support from Elite Filing, you can focus on growing your business while we handle the legal and compliance details.
                </p>
                <div className="bg-[#f8bd0a] bg-opacity-10 border-l-4 border-[#f8bd0a] p-6 rounded-r-lg">
                  <p className="text-lg font-semibold text-[#041e72] mb-2">
                    Ready to start your UK company?
                  </p>
                  <p className="text-gray-700">
                    Get in touch with Elite Filing today and launch your business with confidence.
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
                ONGOING FILING RESPONSIBILITIES
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                Once your company is incorporated, you must maintain compliance. Ongoing filings include:
              </motion.p>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    1. Confirmation Statement (Annual Return)
                  </h4>
                  <p className="text-gray-700">Updates shareholder and company information once a year.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    2. Annual Accounts
                  </h4>
                  <p className="text-gray-700">Submit financial statements to Companies House.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    3. Corporation Tax Returns
                  </h4>
                  <p className="text-gray-700">Submit to HMRC.</p>
                </motion.div>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-xl font-bold text-[#041e72] mb-4">
                    4. VAT and PAYE Filings (if applicable)
                  </h4>
                  <p className="text-gray-700">For businesses above VAT threshold or those hiring employees.</p>
                </motion.div>
              </div>
              <motion.p 
                className="text-center text-gray-600 mt-8"
                variants={fadeInUp}
              >
                Failure to file can result in fines, penalties, or even having your company struck off the register.
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
              COSTS OF COMPANY FILING
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              The costs for filing depend on how you register:
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  Online Registration (via Companies House)
                </h3>
                <p className="text-3xl font-bold text-[#f8bd0a] mb-4">£12</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  Postal Registration
                </h3>
                <p className="text-3xl font-bold text-[#f8bd0a] mb-4">£40</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-[#041e72] mb-4">
                  Through Authorized Agents (like Elite Filing)
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Starting at <span className="text-[#f8bd0a] font-bold">£12.99</span> with added services like free domain names, virtual offices, and tax support.
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
            Ready to Start Your UK Business?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-100"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Join thousands of entrepreneurs who trust Elite Filing for their UK company registration.
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

export default UKCompanyFiling;