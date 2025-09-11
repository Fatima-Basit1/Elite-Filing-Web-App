import React, { useState, useEffect } from 'react';

const OurCollaborators = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const collaborators = [
    // First group of 4
    {
      name: "Stripe",
      logo: (
        <img src="/images/stripe1.png" alt="Stripe" className="h-12 w-auto object-contain" />
      )
    },
    {
      name: "Payoneer",
      logo: (
        <img src="/images/payoneer.png" alt="Payoneer" className="h-12 w-auto object-contain" />
      )
    },
    {
      name: "Meezan Bank",
      logo: (
        <img src="/images/Meezan.png" alt="Meezan Bank" className="h-14 w-auto object-contain" />
      )
    },
    {
      name: "Bank Al Habib",
      logo: (
        <img src="/images/BankAlHabib.png" alt="Bank Al Habib" className="h-14 w-auto object-contain" />
      )
    },
    // Second group of 4
    {
      name: "Tide",
      logo: (
        <img src="/images/tide.png" alt="Tide" className="h-20 w-auto object-contain" />
      )
    },
    {
      name: "HBL",
      logo: (
        <img src="/images/HBL.png" alt="HBL" className="h-20 w-auto object-contain" />
      )
    },
    {
      name: "Bank of America",
      logo: (
        <img src="/images/BankofAmerica.png" alt="Bank of America" className="h-20 w-auto object-contain" />
      )
    },
    {
      name: "Monzo",
      logo: (
        <img src="/images/Monzo.png" alt="Monzo" className="h-20 w-auto object-contain" />
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
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0">
            {/* First Group */}
            <div 
              className={`absolute inset-0 flex justify-center items-center space-x-12 md:space-x-20 transition-all duration-1200 ease-out ${
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
              className={`absolute inset-0 flex justify-center items-center space-x-12 md:space-x-20 transition-all duration-1200 ease-out ${
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