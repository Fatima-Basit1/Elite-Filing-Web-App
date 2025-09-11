import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

const servicesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const Statistics = () => {
  const [counts, setCounts] = useState({ clients: 0, projects: 0, advisors: 0 });
  const sectionRef = useRef(null);
  const servicesRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const servicesControls = useAnimation();

  const finalCounts = useMemo(() => ({
    clients: 150,
    projects: 400,
    advisors: 75
  }), []);

  // Trigger animations when sections come into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start('visible');
    }
  }, [servicesInView, servicesControls]);

  // Animate counters when visible
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          clients: Math.floor(finalCounts.clients * progress),
          projects: Math.floor(finalCounts.projects * progress),
          advisors: Math.floor(finalCounts.advisors * progress)
        });

        if (currentStep >= steps) {
          setCounts(finalCounts);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, finalCounts]);

  const stats = [
    {
      id: 1,
      number: counts.clients,
      suffix: '+',
      label: 'Happy Clients',
      color: 'text-blue-900'
    },
    {
      id: 2,
      number: counts.projects,
      suffix: '',
      label: 'Successful Projects',
      color: 'text-blue-900'
    },
    {
      id: 3,
      number: counts.advisors,
      suffix: '+',
      label: 'Advisors & Experts',
      color: 'text-blue-900'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Let the Numbers Speak */}
          <motion.div 
            className="text-center lg:text-left"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-yellow-500 leading-tight transition-all duration-500 hover:scale-105 hover:text-yellow-400">
              LET THE<br />
              NUMBERS<br />
              SPEAK
            </h2>
          </motion.div>

          {/* Right Side - Statistics Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id} 
                className="text-center p-6 bg-gray-50 rounded-lg shadow-sm"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "#fefce8",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Divider Line */}
                <motion.div 
                  className="w-12 h-1 bg-yellow-500 mx-auto mb-4"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                ></motion.div>
                
                {/* Label */}
                <div className="text-sm text-gray-600 mb-2 uppercase tracking-wide">
                  {stat.label}
                </div>
                
                {/* Animated Number */}
                <motion.div 
                  className={`text-4xl lg:text-5xl font-bold ${stat.color}`}
                  whileHover={{ scale: 1.2, color: "#eab308" }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}{stat.suffix}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Business Start-up Solutions Section */}
        <motion.div 
          ref={servicesRef} 
          className="mt-20"
          variants={servicesVariants}
          initial="hidden"
          animate={servicesControls}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-4"
              whileHover={{ scale: 1.05, color: "#fbbf24" }}
              transition={{ duration: 0.3 }}
            >
              BUSINESS START-UP SOLUTIONS
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Elite Filing, authorized by Companies House, ensures seamless and efficient company formation in the UK.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={servicesVariants}
          >
            {/* Company Formation */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                backgroundColor: "#fefce8",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23f3f4f6'/%3E%3Cpath d='M50 40h100v40H50z' fill='%23dc2626'/%3E%3Ctext x='100' y='65' text-anchor='middle' fill='white' font-size='12'%3ECOMPANY%3C/text%3E%3Ctext x='100' y='80' text-anchor='middle' fill='white' font-size='12'%3EFORMATION%3C/text%3E%3C/svg%3E" 
                  alt="Company Formation" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-yellow-500 mb-2"
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              >
                Company Formation
              </motion.h3>
              <p className="text-sm text-gray-600 mb-3">From Only £12.99</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Elite Filing offers the most comprehensive UK Limited Company formation services starting at just £12.99. As an authorized partner of Companies House, we ensure a seamless registration experience through our fully approved Company Package.
              </p>
            </motion.div>

            {/* Virtual Office Rental - Highlighted */}
            <motion.div 
              className="bg-yellow-500 border border-yellow-500 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                backgroundColor: "#fbbf24",
                boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23e5e7eb'/%3E%3Crect x='20' y='20' width='160' height='80' fill='%23374151'/%3E%3Crect x='40' y='40' width='30' height='20' fill='%23f59e0b'/%3E%3Crect x='80' y='40' width='30' height='20' fill='%23f59e0b'/%3E%3Crect x='120' y='40' width='30' height='20' fill='%23f59e0b'/%3E%3C/svg%3E" 
                  alt="Virtual Office" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-white mb-2"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Virtual Office Rental
              </motion.h3>
              <p className="text-sm text-white mb-3">From Only £8.88 (Inc. VAT)</p>
              <p className="text-xs text-white leading-relaxed">
                Elite Filing provides comprehensive virtual office rental services starting from just £8.88, including VAT. Enhance your business credibility with a prestigious UK address while managing your operations remotely. Our service includes secure mail handling.
              </p>
            </motion.div>

            {/* Free Multi-Currency Business Bank Accounts */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                backgroundColor: "#fefce8",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23f3f4f6'/%3E%3Ccircle cx='100' cy='60' r='30' fill='%23fbbf24'/%3E%3Ctext x='100' y='65' text-anchor='middle' fill='white' font-size='16'%3E£%3C/text%3E%3C/svg%3E" 
                  alt="Bank Accounts" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-yellow-500 mb-2"
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              >
                Free Multi-Currency Business Bank Accounts
              </motion.h3>
              <p className="text-sm text-gray-600 mb-3">With Up To £5k Cash Reward</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Streamline your international business with our multi-currency business bank accounts, making it easy to manage your finances and simplify global transactions. As a bonus, enjoy up to £5k in cash rewards upon successful account activation & qualifying transactions.
              </p>
            </motion.div>

            {/* Free Basic Accountancy Consultation */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                backgroundColor: "#fefce8",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23f3f4f6'/%3E%3Crect x='40' y='30' width='120' height='60' fill='%23374151'/%3E%3Crect x='60' y='45' width='80' height='8' fill='%23fbbf24'/%3E%3Crect x='60' y='60' width='60' height='6' fill='%23d1d5db'/%3E%3Crect x='60' y='72' width='40' height='6' fill='%23d1d5db'/%3E%3C/svg%3E" 
                  alt="Accountancy" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-yellow-500 mb-2"
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              >
                Free Basic Accountancy Consultation
              </motion.h3>
              <p className="text-sm text-gray-600 mb-3">For All Of Our Clients Who Incorporate A Company Through Us</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Elite Filing offers a free basic accountancy consultation service for all clients who incorporate a company through us. Get expert advice on financial management, tax compliance, and compliance to set your business on the right path from the start.
              </p>
            </motion.div>

            {/* Domain Names For Your Business - Highlighted */}
            <motion.div 
              className="bg-yellow-500 border border-yellow-500 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                backgroundColor: "#fbbf24",
                boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23374151'/%3E%3Ccircle cx='100' cy='60' r='25' fill='%23059669'/%3E%3Ctext x='100' y='50' text-anchor='middle' fill='white' font-size='10'%3E.com%3C/text%3E%3Ctext x='100' y='65' text-anchor='middle' fill='white' font-size='10'%3E.co.uk%3C/text%3E%3Ctext x='100' y='80' text-anchor='middle' fill='white' font-size='10'%3E.org%3C/text%3E%3C/svg%3E" 
                  alt="Domain Names" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-white mb-2"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Domain Names For Your Business
              </motion.h3>
              <p className="text-sm text-white mb-3">Free When You Purchase Any Company Formation</p>
              <p className="text-xs text-white leading-relaxed">
                Secure a free domain name for your business when you purchase any company formation or virtual office package from Elite Filing. Establish a strong online presence with a professional domain that perfectly represents your brand.
              </p>
            </motion.div>

            {/* Tax Filing And Audits */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6"
              variants={serviceCardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                backgroundColor: "#fefce8",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="mb-4 overflow-hidden rounded"
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='none'%3E%3Crect width='200' height='120' fill='%23f3f4f6'/%3E%3Crect x='50' y='20' width='100' height='80' fill='%23374151'/%3E%3Ctext x='100' y='45' text-anchor='middle' fill='%23fbbf24' font-size='14'%3ETax Filing%3C/text%3E%3Crect x='70' y='55' width='60' height='4' fill='%23d1d5db'/%3E%3Crect x='70' y='65' width='40' height='4' fill='%23d1d5db'/%3E%3Crect x='70' y='75' width='50' height='4' fill='%23d1d5db'/%3E%3C/svg%3E" 
                  alt="Tax Filing" 
                  className="w-full h-24 object-cover rounded"
                />
              </motion.div>
              <motion.h3 
                className="text-lg font-bold text-yellow-500 mb-2"
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              >
                Tax Filing And Audits
              </motion.h3>
              <p className="text-sm text-gray-600 mb-3">Free When You Purchase Any Company Formation</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                From accurate financial reporting and statutory audits to tax planning and advisory, we cover everything your company needs to stay compliant and financially healthy. We ensure your business — you build it on a foundation of compliance and trust.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;