import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';

const About = () => {
  const teamMembers = [
    {
      name: "Aazan Shami",
      role: "Software Developer & Business Analyst",
      image: "/images/aazan.jpg"
    },
    {
      name: "Hajra Raja",
      role: "Business Developer & Market Research",
      image: "/images/hajra.png"
    },
    {
      name: "Alishba Gul",
      role: "Social Media Manager",
      image: "/images/alishba.png"
    },
    {
      name: "Rayyan Hasan",
      role: "Finance Manager",
      image: "/images/rayyan.png"
    },
    {
      name: "Shahmir Khan",
      role: "Social Media Marketing",
      image: "/images/shahmir.jpg"
    },
    {
      name: "Javaria Malik",
      role: "Sales Manager",
      image: "/images/javaria.png"
    },
    {
      name: "Hamza Bin Masood",
      role: "Business Developer & Marketing",
      image: "/images/hamza.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Page Title & Intro */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${bluebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 mt-20 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About{' '}
              <span className="text-yellow-400">Us</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
             Elite Filing is an authorized partner of Companies House, making UK Limited Company formation simple, fast, and compliant. With our reliable in-house system, we deliver seamless registrations, accurate documentation, and professional support that help entrepreneurs and businesses start strong with confidence.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* CEO Message Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* CEO Photo */}
            <motion.div 
              className="flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div 
                  className="w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
    src={`${process.env.PUBLIC_URL}/images/ceo.png`}
    alt="CEO - Elite Filing" 
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTAwQzE4MS4wNDMgMTAwIDIwMCAxMTguOTU3IDIwMCAxNDBDMjAwIDE2MS4wNDMgMTgxLjA0MyAxODAgMTYwIDE4MEM4OC45NTcgMTgwIDEyMCAxNjEuMDQzIDEyMCAxNDBDMTIwIDExOC45NTcgMTM4Ljk1NyAxMDAgMTYwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAyNDBDMTAwIDIxNS4xNDcgMTI1LjE0NyAxOTAgMTUwIDE5MEgxNzBDMTk0Ljg1MyAxOTAgMjIwIDIxNS4xNDcgMjIwIDI0MFYyNjBIMTAwVjI0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
    }}
/>
                  
                </motion.div>
              </div>
              
              {/* CEO Name and Title */}
              <motion.div 
                className="text-center mt-8 w-[400px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Muhammad Hasan</h3>
                <p className="text-lg text-yellow-600 font-semibold">Chief Executive Officer</p>
              </motion.div>
            </motion.div>
            
            {/* CEO Message Content */}
<motion.div 
  className="space-y-6"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
>
  <motion.h2 
    className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    CEO <span className="text-yellow-400">Message</span>
  </motion.h2>
  
  <motion.div 
    className="space-y-4 text-gray-700 leading-relaxed"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
  >
    <motion.p 
      className="text-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <strong className="text-blue-900">Vision:</strong> A world where launching, managing, and scaling a business is seamless through innovation, technology, and automation.
    </motion.p>
    
    <motion.p 
      className="text-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <strong className="text-blue-900">Mission:</strong> To remove the barriers of complexity, paperwork, and outdated processes by integrating intelligent systems, CRMs, and AI-driven automation that empower businesses with clarity, efficiency, and growth.
    </motion.p>
    
    <motion.div 
      className="bg-blue-50 p-6 rounded-lg border-l-4 border-yellow-400"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <p className="text-lg mb-4">
        <strong className="text-blue-900">Transformation:</strong> Turning "what if" into "what's next" through technology-driven support for:
      </p>
      <motion.ul 
        className="list-disc list-inside space-y-2 text-gray-700 ml-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >Entrepreneurs</motion.li>
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >Startups</motion.li>
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >Established businesses</motion.li>
      </motion.ul>
      <p className="mt-4 text-lg">
        Services now extend beyond registration, compliance, and growth by incorporating CRM integration, AI automation, and customized tech-based solutions to streamline every stage of business management.
      </p>
    </motion.div>
    
    <motion.p 
      className="text-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      Elite Filing is more than a service. It is a technology driven movement redefining how businesses start, operate, and scale in the modern world.
    </motion.p>
    
    <motion.p 
      className="text-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <strong className="text-blue-900">Core values:</strong> innovation, technology empowerment, and a vision driven approach that fuses human creativity with AI powered solutions.
    </motion.p>
    
    <motion.blockquote 
      className="text-xl font-semibold text-blue-900 italic border-l-4 border-yellow-400 pl-6 mt-8"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
    >
      "Together, let us build the future of business powered by innovation and intelligent automation."
      <footer className="text-gray-600 text-base mt-2 not-italic">CEO, Elite Filing</footer>
    </motion.blockquote>
  </motion.div>
</motion.div>


          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Team Behind Our <span className="text-yellow-400">Work</span>
            </h2>
          </motion.div>
          
          {/* Team Leader */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mb-6">
                <motion.div 
                  className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/images/mahjabeen.jpg" 
                    alt="Mahjabeen Shah - Country Head & Team Lead" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA0MEM3Mi44MzY2IDQwIDgwIDQ3LjE2MzQgODAgNTZDODAgNjQuODM2NiA3Mi44MzY2IDcyIDY0IDcyQzU1LjE2MzQgNzIgNDggNjQuODM2NiA0OCA1NkM0OCA0Ny4xNjM0IDU1LjE2MzQgNDAgNjQgNDBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4Ni4wNTg5IDQ4LjA1ODkgNzggNTggNzhINzBDNzkuOTQxMSA3OCA4OCA4Ni4wNTg5IDg4IDk2VjEwNEg0MFY5NloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                </motion.div>
              </div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Mahjabeen Shah
              </motion.h3>
              <motion.p 
                className="text-yellow-600 font-semibold text-lg mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Country Head & Team Lead
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Team Members Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-4">
                  <motion.div 
                    className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-yellow-400 shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCAzMEM1NC42Mjc0IDMwIDYwIDM1LjM3MjYgNjAgNDJDNjAgNDguNjI3NCA1NC42Mjc0IDU0IDQ4IDU0QzQxLjM3MjYgNTQgMzYgNDguNjI3NCAzNiA0MkMzNiAzNS4zNzI2IDQxLjM3MjYgMzAgNDggMzBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMCA3MkMzMCA2NC4yNjggMzYuMjY4IDU4IDQ0IDU4SDUyQzU5LjczMiA1OCA2NiA2NC4yNjggNjYgNzJWNzhIMzBWNzJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';
                      }}
                    />
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-lg font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: (index * 0.1) + 0.2 }}
                  viewport={{ once: true }}
                >
                  {member.name}
                </motion.h3>
                <motion.p 
                  className="text-yellow-600 font-medium text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
                  viewport={{ once: true }}
                >
                  {member.role}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default About;