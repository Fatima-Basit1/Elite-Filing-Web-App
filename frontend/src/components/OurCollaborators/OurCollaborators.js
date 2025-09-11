import React from 'react';

const OurCollaborators = () => {
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

  return (
    <section className="pt-8 pb-8 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 text-yellow-400">
            OUR COLLABORATORS
          </h2>
          <div className="w-24 h-0.5 mx-auto mb-6 bg-yellow-400"></div>
        </div>
        
        {/* Scrolling Marquee */}
        <div className="relative h-32 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {/* First set of logos */}
            {collaborators.map((collaborator, index) => (
               <div key={index} className="flex-shrink-0 mx-8 text-center">
                 <div className="mb-2 flex justify-center items-center h-16 transform transition-all duration-200 hover:scale-110">
                   {collaborator.logo}
                 </div>
                 <p className="text-gray-600 font-medium text-xs">{collaborator.name}</p>
               </div>
             ))}
            {/* Duplicate set for seamless loop */}
            {collaborators.map((collaborator, index) => (
               <div key={`duplicate-${index}`} className="flex-shrink-0 mx-8 text-center">
                 <div className="mb-2 flex justify-center items-center h-16 transform transition-all duration-300 hover:scale-110">
                   {collaborator.logo}
                 </div>
                 <p className="text-gray-600 font-medium text-xs">{collaborator.name}</p>
               </div>
             ))}
          </div>
        </div>
        

      </div>
      
      {/* CSS Animation Keyframes */}
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
           animation: scroll 12s linear infinite;
         }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurCollaborators;