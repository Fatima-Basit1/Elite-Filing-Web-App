import React from 'react';
import { motion } from 'framer-motion';
import companyFormationImage from '../../assets/IMG_4295 (1).png';
import virtualServicesImage from '../../assets/IMG-20250826-WA0048.jpg';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const slideTextAfterImage = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 } }
};

const slideTextFirst = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 } }
};

const zoomHover = {
  rest: { scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: { scale: 1.05, boxShadow: '0px 8px 24px rgba(0,0,0,0.3)', transition: { duration: 0.3 } }
};

const BusinessSolutions = () => {
  return (
    <section
      className="pt-16 pb-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(6,30,68,1) 0%, rgba(10,40,90,1) 100%)'
      }}
    >
      {/* Background Wave Effect */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120L1200,120L1200,0C1000,40 800,80 600,60C400,40 200,20 0,40Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2
            className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-wide"
            style={{
              background: 'linear-gradient(135deg,rgb(225, 219, 201) 0%,rgb(237, 235, 221) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Business Start-Up Solutions
          </h2>
          <p
            className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              lineHeight: '1.7',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            Launch and grow your business with confidence.  
            We deliver tailored solutions — from company formation to digital office services —  
            designed to keep your operations seamless and future-ready.
          </p>
        </motion.div>

        {/* Services Layout */}
        <div className="space-y-16">
          {/* Company Formation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideFromRight}
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                variants={zoomHover}
                className="border-4 border-yellow-500 rounded-xl overflow-hidden"
              >
                <img
                  src={companyFormationImage}
                  alt="Company Formation"
                  className="w-full h-72 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="text-white"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideTextAfterImage}
            >
              <h3
                className="text-2xl lg:text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Inter, sans-serif',
                 
                }}
              >
                Company Formation
              </h3>
              <p
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: 'rgba(255, 255, 255, 0.92)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              >
                Fast, reliable, and stress-free registration for your UK Limited Company.  
                From paperwork to compliance, we handle the details so you can focus  
                on shaping your growth and strategy.
              </p>
            </motion.div>
          </div>

          {/* Virtual Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-white lg:order-1"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideTextFirst}
            >
              <h3
                className="text-2xl lg:text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '0 2px 4px rgba(248, 189, 10, 0.2)'
                }}
              >
                Virtual Services
              </h3>
              <p
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: 'rgba(255, 255, 255, 0.92)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              >
                A prestigious UK business address — without the overhead.  
                Manage operations remotely with secure mail forwarding and digital office support,  
                giving your brand instant credibility from anywhere in the world.
              </p>
            </motion.div>

            <motion.div
              className="relative lg:order-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideFromLeft}
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                variants={zoomHover}
                className="border-4 border-yellow-500 rounded-xl overflow-hidden"
              >
                <img
                  src={virtualServicesImage}
                  alt="Virtual Services"
                  className="w-full h-72 object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
