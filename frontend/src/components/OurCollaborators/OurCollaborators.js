import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const OurCollaborators = () => {
  const scrollContainerRef = useRef(null);
  // Removed canScrollLeft and canScrollRight states since buttons are always enabled

  const collaborators = [
    {
      name: "Stripe",
      logo: (
        <img src="/images/stripe1.png" alt="Stripe" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Payoneer",
      logo: (
        <img src="/images/payoneer.png" alt="Payoneer" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Meezan Bank",
      logo: (
        <img src="/images/Meezan.png" alt="Meezan Bank" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Bank Al Habib",
      logo: (
        <img src="/images/BankAlHabib.png" alt="Bank Al Habib" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Tide",
      logo: (
        <img src="/images/tide.png" alt="Tide" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "HBL",
      logo: (
        <img src="/images/HBL.png" alt="HBL" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Bank of America",
      logo: (
        <img src="/images/BankofAmerica.png" alt="Bank of America" className="h-16 w-auto object-contain" />
      )
    },
    {
      name: "Monzo",
      logo: (
        <img src="/images/Monzo.png" alt="Monzo" className="h-16 w-auto object-contain" />
      )
    }
  ];

  const [isPaused, setIsPaused] = useState(false);

  // Removed checkScrollButtons function since buttons are always enabled

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth } = container;
      
      // If at the beginning, jump to the middle (50% position)
      if (scrollLeft <= 0) {
        container.scrollLeft = scrollWidth / 2;
      }
      
      container.scrollBy({ left: -300, behavior: 'smooth' });
      
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // If near the end, jump back to the middle (50% position)
      if (scrollLeft >= scrollWidth - clientWidth - 50) {
        container.scrollLeft = scrollWidth / 2;
      }
      
      container.scrollBy({ left: 300, behavior: 'smooth' });
      
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  };

  // Removed useEffect for button checking since buttons are always enabled

  return (
    <section className="pt-8 pb-8 bg-gray-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
         <h2 className="text-4xl font-roboto font-bold mb-3 text-[rgb(4,30,114)]">
  OUR COLLABORATORS
</h2>
          <div className="w-24 h-0.5 mx-auto mb-6 bg-[rgb(4,30,114)]"></div>
        </div>
        
        {/* Scrollable Container with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:-left-12 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer bg-white/80 md:bg-transparent rounded-full p-1 md:p-0"
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:-right-12 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer bg-white/80 md:bg-transparent rounded-full p-1 md:p-0"
          >
            <ChevronRightIcon className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          {/* Scrollable Content with Animation */}
          <div 
            ref={scrollContainerRef}
            className="overflow-hidden scrollbar-hide px-4 md:px-12 h-24 md:h-32"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`flex whitespace-nowrap ${!isPaused ? 'animate-scroll' : ''}`}>
              {/* First set of logos */}
              {collaborators.map((collaborator, index) => (
                <div key={index} className="flex-shrink-0 mx-3 md:mx-8 text-center">
                  <div className="mb-1 md:mb-2 flex justify-center items-center h-12 md:h-16 transform transition-all duration-200 hover:scale-110">
                    {collaborator.logo}
                  </div>
                  <p className="text-gray-600 font-medium text-xs hidden md:block">{collaborator.name}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {collaborators.map((collaborator, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 mx-3 md:mx-8 text-center">
                  <div className="mb-1 md:mb-2 flex justify-center items-center h-12 md:h-16 transform transition-all duration-200 hover:scale-110">
                    {collaborator.logo}
                  </div>
                  <p className="text-gray-600 font-medium text-xs hidden md:block">{collaborator.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        

      </div>
      
      {/* CSS Animation and Scrollbar Hide */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        

      `}</style>
    </section>
  );
};

export default OurCollaborators;