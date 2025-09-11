import React, { useEffect, useState, useRef } from 'react';
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  CubeIcon, 
  GlobeEuropeAfricaIcon, 
  CalculatorIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const OurServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    
    // Intersection Observer for staggered card animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.cardIndex);
            
            // Add delay based on card index for staggered effect
            setTimeout(() => {
              setVisibleCards(prev => {
                if (!prev.includes(cardIndex)) {
                  return [...prev, cardIndex];
                }
                return prev;
              });
            }, cardIndex * 150); // 150ms delay between each card
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all card elements
    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      clearTimeout(timer);
      currentCardRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Company Incorporation",
      description: "Launching your business in the USA, UK, or Canada has never been simpler. At Elite Filing, we streamline the entire process of company incorporation, managing all legal requirements with precision and efficiency.",
      icon: BuildingOfficeIcon,
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "from-blue-100 to-blue-200",
      accentColor: "#f8bd0a",
      borderColor: "#f8bd0a",
      delay: "0ms",
      animationDelay: "0.1s"
    },
    {
      id: 2,
      title: "ITIN Services",
      description: "Need an ITIN? We've got you covered. Our streamlined process makes obtaining your Individual Taxpayer Identification Number quick and efficient, ensuring your needs are met promptly.",
      icon: DocumentTextIcon,
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "from-gray-100 to-gray-200",
      accentColor: "#041e72",
      borderColor: "#041e72",
      delay: "100ms",
      animationDelay: "0.2s"
    },
    {
      id: 3,
      title: "Complete Package",
      description: "Our complete business package offers company incorporation, tax services, trademark registration, banking assistance, and more for entrepreneurs. Focus on your vision while we handle compliance.",
      icon: CubeIcon,
      gradient: "from-yellow-50 to-yellow-100",
      hoverGradient: "from-yellow-100 to-yellow-200",
      accentColor: "#f8bd0a",
      borderColor: "#f8bd0a",
      delay: "200ms",
      animationDelay: "0.3s"
    },
    {
      id: 4,
      title: "UK Services",
      description: "Elite Filing simplifies UK business incorporation. We support incorporation, tax services, and compliance. Tailored for entrepreneurs, we ensure seamless market entry while maintaining sustainable growth.",
      icon: GlobeEuropeAfricaIcon,
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "from-gray-100 to-gray-200",
      accentColor: "#041e72",
      borderColor: "#041e72",
      delay: "300ms",
      animationDelay: "0.4s"
    },
    {
      id: 5,
      title: "Tax Services",
      description: "Elite Filing offers comprehensive tax services for individuals and businesses. From simple ITIN applications to complex business solutions, we ensure your tax needs are efficient & compliant.",
      icon: CalculatorIcon,
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "from-blue-100 to-blue-200",
      accentColor: "#f8bd0a",
      borderColor: "#f8bd0a",
      delay: "400ms",
      animationDelay: "0.5s"
    },
    {
      id: 6,
      title: "Trademark Registration",
      description: "Safeguard your brand with Elite Filing's trademark registration services. Our team protects your business name, logo, and identity from infringement, ensuring long-term security and peace of mind.",
      icon: ShieldCheckIcon,
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "from-gray-100 to-gray-200",
      accentColor: "#041e72",
      borderColor: "#041e72",
      delay: "500ms",
      animationDelay: "0.6s"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden" 
      style={{
        background: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
       <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block mb-8">
            <span className="px-10 py-3 rounded-full text-xl font-black tracking-widest uppercase shadow-2xl border-4" style={{
              background: 'linear-gradient(135deg, #f8bd0a, #ffd700)',
              color: '#041e72',
              borderColor: '#041e72',
              fontWeight: '300',
              letterSpacing: '0.15em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              boxShadow: '0 8px 32px rgba(248,189,10,0.6), 0 0 0 4px rgba(4,30,114,0.3)'
            }}>
              OUR SERVICES
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-5" style={{ color: '#041e72' }}>
            LEGAL AND REGISTRATION
            <br />
            <span style={{ color: '#f8bd0a' }}>COMPLIANCE SERVICES</span>
          </h2>
          
         <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            At Elite Filing, we offer a comprehensive range of services designed to meet your 
            business needs with precision, efficiency, and unmatched expertise.
          </p>

          <div className="animate-bounce cursor-pointer group transition-all duration-300 hover:scale-110">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{
              background: 'linear-gradient(135deg, #f8bd0a, #ffd700)',
              boxShadow: '0 6px 20px rgba(248,189,10,0.4)'
            }}>
              <svg className="w-7 h-7 transition-transform duration-300 group-hover:translate-y-1" style={{ color: '#041e72' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>


        {/* Services Grid with Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isCardVisible = visibleCards.includes(index);
            
            return (
              <div
                key={service.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-card-index={index}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transform shadow-xl transition-all duration-700 ease-out ${
                  isCardVisible 
                    ? 'opacity-100 translate-y-0 scale-100 hover:scale-105 hover:-translate-y-3 hover:shadow-2xl' 
                    : 'opacity-0 translate-y-20 scale-95'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${service.gradient.replace('from-', '').replace(' to-', ', ')})`,
                  borderTop: `6px solid ${service.borderColor}`,
                  minHeight: '280px',
                  transitionDelay: isCardVisible ? '0ms' : `${index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  if (isCardVisible) {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${service.hoverGradient.replace('from-', '').replace(' to-', ', ')})`;
                    e.currentTarget.style.transform = 'scale(1.08) translateY(-12px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isCardVisible) {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${service.gradient.replace('from-', '').replace(' to-', ', ')})`;
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                  }
                }}
              >
                <div className="relative p-6 text-center z-10 h-full flex flex-col justify-center">
                  {/* Icon with enhanced hover effect */}
                  <div className="flex justify-center mb-5">
                    <div 
                      className={`w-18 h-18 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                        isCardVisible ? 'group-hover:scale-110 group-hover:rotate-6' : ''
                      }`}
                      style={{
                        background: service.accentColor,
                        boxShadow: `0 8px 25px ${service.accentColor}40`
                      }}
                    >
                      <IconComponent 
                        className={`w-9 h-9 transition-all duration-300 ${
                          isCardVisible ? 'group-hover:scale-110' : ''
                        }`}
                        style={{
                          color: service.accentColor === '#f8bd0a' ? '#041e72' : '#ffffff'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Text with staggered animation */}
                  <h3 className={`text-lg font-bold mb-3 transition-all duration-500 text-gray-900 leading-tight ${
                    isCardVisible ? 'group-hover:scale-105' : ''
                  }`}
                  style={{
                    transitionDelay: isCardVisible ? '100ms' : '0ms'
                  }}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed transition-all duration-500 text-gray-700 font-medium ${
                    isCardVisible ? 'group-hover:scale-105' : ''
                  }`}
                  style={{
                    transitionDelay: isCardVisible ? '200ms' : '0ms'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Enhanced shimmer effect */}
                <div className={`absolute inset-0 transition-opacity duration-700 overflow-hidden rounded-3xl ${
                  isCardVisible ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                }`}>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ filter: 'blur(1px)' }}
                  ></div>
                </div>

                {/* Pulse animation on card appearance */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  isCardVisible ? 'animate-pulse opacity-0' : 'opacity-0'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${service.accentColor}20, transparent)`,
                  animationDuration: '0.6s',
                  animationIterationCount: '1'
                }}></div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default OurServices;