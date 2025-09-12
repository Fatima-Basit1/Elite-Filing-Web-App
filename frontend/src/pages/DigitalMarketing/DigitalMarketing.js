import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  MegaphoneIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  TrophyIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const DigitalMarketing = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Use imported icons to prevent build errors
    const icons = [
      ShieldCheckIcon,
      BuildingOfficeIcon,
      ArrowRightIcon,
      StarIcon,
      MegaphoneIcon
    ];
    console.log('DigitalMarketing component initialized with icons:', icons.length);
  }, []);

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

  // Key components data
  const keyComponents = [
    {
      title: 'Search Engine Optimization (SEO)',
      description: 'Optimizing websites to rank higher on search engines like Google, driving organic traffic and long-term visibility.'
    },
    {
      title: 'Social Media Marketing (SMM)',
      description: 'Promoting brands across platforms such as Facebook, Instagram, LinkedIn, and TikTok to increase awareness and engagement.'
    },
    {
      title: 'Pay-Per-Click (PPC) Advertising',
      description: 'Running targeted ads on platforms like Google Ads or Meta Ads to quickly attract potential customers.'
    },
    {
      title: 'Content Marketing',
      description: 'Creating valuable blogs, videos, infographics, and case studies that educate and engage the audience while positioning the brand as an authority.'
    },
    {
      title: 'Email Marketing & Nurture Campaigns',
      description: 'Building relationships through personalized communication, follow-ups, and automated workflows.'
    },
    {
      title: 'Affiliate & Influencer Marketing',
      description: 'Partnering with affiliates or influencers to extend reach and drive conversions through trusted voices.'
    },
    {
      title: 'Analytics & Testing',
      description: 'Measuring and improving performance with tools like Google Analytics, ensuring data-driven decision-making and continuous optimization.'
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: GlobeAltIcon,
      title: 'Global Reach',
      description: 'Connect with audiences across borders at a fraction of traditional advertising costs.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost-Effective',
      description: 'Run targeted campaigns tailored to your budget while maximizing ROI.'
    },
    {
      icon: ChartBarIcon,
      title: 'Measurable Results',
      description: 'Track clicks, leads, conversions, and ROI in real-time.'
    },
    {
      icon: UserGroupIcon,
      title: 'Targeted Audience',
      description: 'Reach exactly who you want, from niche markets to mass audiences.'
    },
    {
      icon: TrophyIcon,
      title: 'Scalability',
      description: 'Start small and scale campaigns as your business grows.'
    }
  ];

  // Elite Filing services
  const eliteServices = [
    'SEO optimization to boost rankings and visibility',
    'Creative ad campaigns designed to increase clicks and conversions',
    'Content and branding strategies that tell your story powerfully',
    'Lead generation and nurturing systems to convert prospects into loyal clients',
    'Performance tracking dashboards for complete transparency'
  ];

  // Form handlers
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
              DIGITAL MARKETING
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-8 text-[#f8bd0a]"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              DRIVING GROWTH IN THE DIGITAL AGE
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              In today's fast-paced business world, <span className="text-[#f8bd0a] font-semibold">digital marketing and promotion</span> have become essential for brands looking to stand out, attract customers, and achieve sustainable growth. With billions of people spending time online daily, businesses that fail to invest in digital strategies risk losing visibility, credibility, and market share compared to their competitors.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl mb-12 text-blue-100 max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              At its core, digital marketing is more than just running ads—it's about <span className="text-[#f8bd0a] font-semibold">building meaningful connections</span> with the right audience, at the right time, on the right platforms.
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
              { id: 'components', label: 'Key Components' },
              { id: 'benefits', label: 'Benefits' },
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
            {/* What is Digital Marketing */}
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
                WHAT IS DIGITAL MARKETING AND PROMOTION?
              </motion.h2>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700 mb-6">
                  <span className="text-[#f8bd0a] font-semibold">Digital marketing</span> refers to the use of online channels, tools, and strategies to promote products or services. It combines creativity, data, and technology to deliver targeted campaigns that reach audiences more effectively than traditional advertising.
                </p>
                <p className="text-lg text-gray-700">
                  <span className="text-[#f8bd0a] font-semibold">Promotion</span>, within digital marketing, is the process of amplifying brand awareness, driving engagement, and converting potential leads into loyal customers through carefully designed strategies.
                </p>
              </motion.div>
            </motion.div>

            {/* Why Businesses Can't Ignore It */}
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
                WHY BUSINESSES CAN'T IGNORE IT
              </motion.h2>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8"
                variants={fadeInUp}
              >
                <p className="text-lg text-gray-700">
                  Whether you're a startup, SME, or established enterprise, digital promotion ensures that your brand stays relevant. Customers today <span className="text-[#f8bd0a] font-semibold">research online before buying</span> – and this makes businesses they see first are the ones they're most likely to trust. Without a strong digital presence, even the best products or services can remain unnoticed.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Key Components Section */}
      {activeTab === 'components' && (
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-4xl font-bold text-[#041e72] mb-12 text-center"
                variants={fadeInUp}
              >
                KEY COMPONENTS OF DIGITAL MARKETING
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyComponents.map((component, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                    variants={fadeInUp}
                  >
                    <div className="text-center">
                      <div className="flex-shrink-0 mb-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-[#f8bd0a] text-white rounded-full font-bold text-lg mx-auto">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#041e72] mb-4">
                          {component.title}
                        </h3>
                        <p className="text-gray-600">
                          {component.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-4xl font-bold text-[#041e72] mb-12 text-center"
                variants={fadeInUp}
              >
                BENEFITS OF DIGITAL MARKETING
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300"
                      variants={fadeInUp}
                    >
                      <div className="w-16 h-16 bg-[#f8bd0a] rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#041e72] mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* How Elite Filing Can Help */}
              <motion.div className="mt-16" variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-[#041e72] mb-8 text-center">
                  HOW ELITE FILING CAN HELP
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <p className="text-lg text-gray-700 mb-6 text-center">
                    At <span className="text-[#f8bd0a] font-semibold">Elite Filing</span>, we offer <span className="text-[#f8bd0a] font-semibold">fast, reliable, and affordable digital marketing services</span> tailored to your business goals. Our approach combines:
                  </p>
                  <div className="grid md:grid-cols-1 gap-4">
                    {eliteServices.map((service, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="w-6 h-6 text-[#f8bd0a] flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">{service}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mt-6 text-center">
                    With us, your brand doesn't just get promoted – it gets positioned for <span className="text-[#f8bd0a] font-semibold">sustainable growth</span> in today's competitive marketplace.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Final Thoughts Section - Only in Benefits Tab */}
          <motion.div 
            className="py-20 bg-[#f8bd0a] mt-20 rounded-2xl mx-4 sm:mx-6 lg:mx-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div className="text-center" variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-white mb-8">
                  FINAL THOUGHTS
                </h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <p className="text-xl text-white mb-6">
                    Digital marketing and promotion are no longer optional – they're the backbone of modern business success. By leveraging the right mix of strategies, businesses can boost awareness, drive sales, and build long-term customer loyalty.
                  </p>
                  <p className="text-lg text-white">
                    With Elite Filing as your digital partner, you can confidently take your brand to new heights.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* One Response */}
              <motion.div className="mb-16" variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-[#041e72] mb-12 text-center">
                  ONE RESPONSE
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold">W</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-[#041e72]">A WordPress Commenter</h3>
                        <span className="text-sm text-gray-500">says</span>
                        <span className="text-sm text-gray-500">December 24, 2024 at 8:01 pm</span>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Hi, this is a comment.
                      </p>
                      <p className="text-gray-700 mb-4">
                        To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Commenter avatars come from <a href="https://gravatar.com" className="text-[#f8bd0a] hover:underline" target="_blank" rel="noopener noreferrer">Gravatar</a>.
                      </p>
                      <button className="text-[#f8bd0a] hover:underline text-sm font-semibold">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Leave a Reply Form */}
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-[#041e72] mb-8 text-center">
                  LEAVE A REPLY
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent resize-none"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8bd0a] focus:border-transparent"
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
                        className="w-4 h-4 text-[#f8bd0a] border-gray-300 rounded focus:ring-[#f8bd0a]"
                      />
                      <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                        Save my name, email, and website in this browser for the next time I comment.
                      </label>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="bg-[#f8bd0a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e6a809] transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post Comment
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-[#041e72] to-[#1e40af]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let Elite Filing help you build a powerful digital marketing strategy that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-[#f8bd0a] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e6a809] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
              <motion.button
                className="bg-white text-[#041e72] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Our Experts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default DigitalMarketing;