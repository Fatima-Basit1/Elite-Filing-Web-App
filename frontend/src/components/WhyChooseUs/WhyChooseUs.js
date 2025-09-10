import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="32" rx="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
          <rect x="12" y="20" width="8" height="6" fill="#F59E0B"/>
          <rect x="12" y="28" width="12" height="2" fill="#F59E0B"/>
          <rect x="12" y="32" width="16" height="2" fill="#F59E0B"/>
          <rect x="12" y="36" width="10" height="2" fill="#F59E0B"/>
          <circle cx="44" cy="32" r="8" fill="#10B981" stroke="#059669" strokeWidth="2"/>
          <path d="M40 32l3 3 6-6" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: 'RELIABLE',
      description: 'Our process is designed with precision, guaranteeing seamless accuracy and transparency at every stage of your business registration.'
    },
    {
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="24" fill="#10B981" stroke="#059669" strokeWidth="2"/>
          <circle cx="32" cy="32" r="16" fill="#34D399"/>
          <rect x="28" y="20" width="8" height="24" fill="#059669"/>
          <rect x="20" y="28" width="24" height="8" fill="#059669"/>
          <circle cx="32" cy="32" r="4" fill="white"/>
        </svg>
      ),
      title: 'TRUSTED',
      description: 'Hundreds of entrepreneurs and businesses choose Elite Filing because we combine expertise, professionalism, and exceptional service.'
    },
    {
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="24" fill="#10B981" stroke="#059669" strokeWidth="2"/>
          <path d="M20 32l8 8 16-16" stroke="white" strokeWidth="3" fill="none"/>
        </svg>
      ),
      title: 'AUTHORIZED',
      description: 'Elite Filing is officially authorized by compliance review ensuring our clients complete formation is carried out under strict approval and with complete credibility.'
    },
    {
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="20" width="48" height="24" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
          <rect x="12" y="24" width="8" height="16" fill="#60A5FA"/>
          <rect x="24" y="28" width="8" height="12" fill="#60A5FA"/>
          <rect x="36" y="26" width="8" height="14" fill="#60A5FA"/>
          <rect x="48" y="30" width="8" height="10" fill="#60A5FA"/>
          <circle cx="52" r="6" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
          <circle cx="52" cy="8" r="2" fill="#F59E0B"/>
        </svg>
      ),
      title: 'EFFICIENT',
      description: 'With our advanced technological systems, we provide a seamless experience that saves you time and paperwork and accelerates company setup.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 mb-8">WHY CHOOSE US</h2>
        </div>
        
        {/* Top row - Reliable and Trusted */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 max-w-4xl mx-auto">
          {features.slice(0, 2).map((feature, index) => (
            <div key={index} className="text-center px-4">
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Video Section */}
        <div className="flex justify-center mb-16">
          <div className="relative w-80 h-64 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-4 bg-black rounded-lg overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Professional woman in business attire"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-2 left-2 text-white text-xs">
                0:01 / 0:17
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom row - Authorized and Efficient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {features.slice(2, 4).map((feature, index) => (
            <div key={index + 2} className="text-center px-4">
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;