import React, { useState, useEffect } from 'react';

const OurCollaborators = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const collaborators = [
    // First group of 4
    {
      name: "Tide",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-bold text-xl">tide</span>
          </div>
        </div>
      )
    },
    {
      name: "Bank of America",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="flex space-x-1">
              <div className="w-2 h-6 bg-red-600"></div>
              <div className="w-2 h-6 bg-red-500"></div>
              <div className="w-2 h-6 bg-blue-600"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      name: "MindBridge",
      logo: (
        <div className="w-32 h-20 bg-gray-800 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-cyan-400 transform rotate-45 mr-2"></div>
            <div className="w-6 h-6 bg-yellow-400 transform rotate-45 mr-2"></div>
            <div className="w-6 h-6 bg-green-400 transform rotate-45"></div>
          </div>
        </div>
      )
    },
    {
      name: "HBL",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <span className="text-teal-600 font-bold text-2xl">HBL</span>
        </div>
      )
    },
    // Second group of 4
    {
      name: "Standard Chartered",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-800 rounded-full mr-2"></div>
            <span className="text-blue-800 font-semibold text-sm">Standard<br/>Chartered</span>
          </div>
        </div>
      )
    },
    {
      name: "HSBC",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-600 mr-2"></div>
            <span className="text-red-600 font-bold text-xl">HSBC</span>
          </div>
        </div>
      )
    },
    {
      name: "Citibank",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-blue-600 font-bold text-lg">Citi</span>
          </div>
        </div>
      )
    },
    {
      name: "JPMorgan Chase",
      logo: (
        <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-900 mr-2"></div>
            <span className="text-blue-900 font-bold text-sm">JPMorgan<br/>Chase</span>
          </div>
        </div>
      )
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Split collaborators into two groups
  const firstGroup = collaborators.slice(0, 4);
  const secondGroup = collaborators.slice(4, 8);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 mb-8">OUR COLLABORATORS</h2>
        </div>
        
        {/* Slider Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0">
            {/* First Group */}
            <div 
              className={`absolute inset-0 flex justify-center items-center space-x-8 md:space-x-16 transition-all duration-1200 ease-out ${
                currentSlide === 0 
                  ? 'opacity-100 scale-100 blur-0 z-10' 
                  : 'opacity-0 scale-95 blur-sm z-0'
              }`}
              style={{
                transform: currentSlide === 0 ? 'translateY(0) rotateX(0deg)' : 'translateY(-20px) rotateX(-5deg)',
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {firstGroup.map((collaborator, index) => (
                <div 
                  key={index} 
                  className="text-center transform transition-all duration-700 ease-out"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: currentSlide === 0 ? `morphIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` : 'none',
                    transform: currentSlide === 0 ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(15deg)'
                  }}
                >
                  <div className="mb-4 flex justify-center transform transition-all duration-500 hover:scale-110">
                    {collaborator.logo}
                  </div>
                  <p className="text-gray-600 font-medium text-sm transition-all duration-300">{collaborator.name}</p>
                </div>
              ))}
            </div>
            
            {/* Second Group */}
            <div 
              className={`absolute inset-0 flex justify-center items-center space-x-8 md:space-x-16 transition-all duration-1200 ease-out ${
                currentSlide === 1 
                  ? 'opacity-100 scale-100 blur-0 z-10' 
                  : 'opacity-0 scale-95 blur-sm z-0'
              }`}
              style={{
                transform: currentSlide === 1 ? 'translateY(0) rotateX(0deg)' : 'translateY(-20px) rotateX(-5deg)',
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {secondGroup.map((collaborator, index) => (
                <div 
                  key={index + 4} 
                  className="text-center transform transition-all duration-700 ease-out"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: currentSlide === 1 ? `morphIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` : 'none',
                    transform: currentSlide === 1 ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(15deg)'
                  }}
                >
                  <div className="mb-4 flex justify-center transform transition-all duration-500 hover:scale-110">
                    {collaborator.logo}
                  </div>
                  <p className="text-gray-600 font-medium text-sm transition-all duration-300">{collaborator.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes morphIn {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(40px) rotateY(25deg) rotateX(10deg);
            filter: blur(8px);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.8) translateY(20px) rotateY(15deg) rotateX(5deg);
            filter: blur(4px);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.05) translateY(-5px) rotateY(-2deg) rotateX(-1deg);
            filter: blur(1px);
          }
          80% {
            opacity: 0.9;
            transform: scale(0.98) translateY(2px) rotateY(1deg) rotateX(0deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotateY(0deg) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
          }
        }
        
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        /* Modern blur backdrop effect */
        .collaborator-backdrop {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default OurCollaborators;