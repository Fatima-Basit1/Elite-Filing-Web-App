import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const UKFormationHome = () => {
  const services = [
    {
      title: 'Company Registration',
      description: 'Register your UK Limited company quickly and reliably with Companies House approval.',
      icon: BuildingOfficeIcon,
      link: '/company-formation/uk/company-registration',
      features: ['Fast Processing', 'Companies House Approved', 'Complete Compliance']
    },
    {
      title: 'Annual Accounts',
      description: 'File your annual accounts with full compliance and expert guidance.',
      icon: CurrencyDollarIcon,
      link: '/company-formation/uk/annual-accounts',
      features: ['HMRC Compliant', 'Expert Preparation', 'Deadline Management']
    },
    {
      title: 'Company Closure',
      description: 'Dissolve your company with expert guidance and proper documentation.',
      icon: ShieldCheckIcon,
      link: '/company-formation/uk/company-closure',
      features: ['Legal Process', 'Debt Clearance', 'Final Compliance']
    },
    {
      title: 'Name Change',
      description: 'Update your company name officially with proper documentation.',
      icon: IdentificationIcon,
      link: '/company-formation/uk/name-change',
      features: ['Official Change', 'Documentation Updates', 'Public Records']
    },
    {
      title: 'Structural Change',
      description: 'Modify shareholding or company structure with legal compliance.',
      icon: StarIcon,
      link: '/company-formation/uk/structural-change',
      features: ['Share Changes', 'Legal Documentation', 'Compliance Updates']
    },
    {
      title: 'Confirmation Statement',
      description: 'File your CS01 statement accurately and on time.',
      icon: CurrencyDollarIcon,
      link: '/company-formation/uk/confirmation-statement',
      features: ['Annual Filing', 'Information Updates', 'Compliance Tracking']
    },
    {
      title: 'EORI Application',
      description: 'Apply for your EORI number for international trade.',
      icon: IdentificationIcon,
      link: '/company-formation/uk/eori-application',
      features: ['EU Trade Registration', 'Customs Clearance', 'Import/Export Support']
    },
    {
      title: 'VAT Registration',
      description: 'Register for VAT hassle-free with expert guidance and ongoing support.',
      icon: ShieldCheckIcon,
      link: '/company-formation/uk/vat-registration',
      features: ['Threshold Guidance', 'Registration Process', 'Ongoing Support']
    },
    {
      title: 'VAT Return',
      description: 'File periodic VAT returns correctly and on time.',
      icon: CurrencyDollarIcon,
      link: '/company-formation/uk/vat-return',
      features: ['Quarterly Filing', 'Accurate Calculations', 'HMRC Compliance']
    },
    {
      title: 'UK Bank Accounts',
      description: 'Open UK business bank accounts with major UK banks.',
      icon: BuildingOfficeIcon,
      link: '/company-formation/uk/bank-accounts',
      features: ['Major UK Banks', 'Business Banking', 'Account Management']
    }
  ];

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-[#0c1a3a] via-[#1a237e] to-[#283593] text-white py-24 lg:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Professional background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f8bd0a] to-transparent opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-transparent opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Breadcrumb */}
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <nav className="flex items-center justify-center space-x-2 text-sm text-blue-200">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blogs/company-filing-uk" className="hover:text-white transition-colors">Company Filing UK</Link>
                <span>/</span>
                <span className="text-white">UK Formation</span>
              </nav>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <span className="text-white">UK Company</span>
              <br />
              <span className="text-[#f8bd0a]">Formation</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Professional UK company formation services with Companies House approval. Choose the service that fits your business needs and get started today.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                variants={fadeInUp}
              >
                <Link to={service.link} className="block p-8 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="h-12 w-12 text-[#041e72] group-hover:text-[#f8bd0a] transition-colors duration-300" />
                    <span className="text-[#f8bd0a] group-hover:translate-x-1 transition-transform duration-300 text-2xl">→</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#041e72] mb-3 group-hover:text-[#f8bd0a] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-[#f8bd0a] rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-[#0c1a3a] to-[#1a237e] text-white py-20"
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
            Join thousands of entrepreneurs who trust Elite Filing for their UK business formation.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Link 
              to="/contact" 
              className="bg-[#f8bd0a] hover:bg-yellow-500 text-[#041e72] font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
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
    </div>
  );
};

export default UKFormationHome;