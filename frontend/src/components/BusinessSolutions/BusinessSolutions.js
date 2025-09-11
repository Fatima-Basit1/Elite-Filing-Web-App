import React from 'react';
import companyFormationImage from '../../assets/IMG_4295 (1).png';
import virtualServicesImage from '../../assets/IMG-20250826-WA0048.jpg';

const BusinessSolutions = () => {
  return (
    <section className="py-32 relative overflow-hidden" style={{backgroundColor: "rgb(6, 30, 68)"}}>
      {/* Background Wave Effect */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,120L1200,0C1000,40 800,80 600,60C400,40 200,20 0,40Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-6">
            BUSINESS START-UP SOLUTIONS
          </h2>
          <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
            Elite Filing is offering comprehensive business start-up solutions designed to meet your business needs.
            Our experienced team provides tailored services to ensure seamless and efficient business formation.
          </p>
        </div>

        {/* Services Layout */}
        <div className="space-y-12">
          {/* Company Formation Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Company Formation Image */}
            <div className="relative">
              <div className="border-4 border-yellow-500 rounded-lg overflow-hidden">
                <img 
                  src={companyFormationImage}
                  alt="Company Formation Services" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            
            {/* Company Formation Content */}
            <div className="text-white">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                COMPANY FORMATION
              </h3>
              <p className="text-white leading-relaxed text-sm">
                Elite Filing provides UK Limited Company Formation with a professional 
                approach and competitive prices. Our experienced process ensures 
                seamless and efficient business formation. From your idea to future 
                growth, we ensure a seamless registration experience through our fully 
                approved Company Package.
              </p>
            </div>
          </div>

          {/* Virtual Services Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Virtual Services Content */}
            <div className="text-white lg:order-1">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                VIRTUAL SERVICES
              </h3>
              <p className="text-white leading-relaxed text-sm">
                Elite Filing offers virtual office rental services with a professional 
                business address and mail forwarding. Our mail forwarding service 
                enhances your business credibility while you run your business from 
                anywhere. Enhance your business credibility with a prestigious UK 
                address while managing your operations remotely.
              </p>
            </div>
            
            {/* Virtual Services Image */}
            <div className="relative lg:order-2">
              <div className="border-4 border-yellow-500 rounded-lg overflow-hidden">
                <img 
                  src={virtualServicesImage}
                  alt="Virtual Office Services" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default BusinessSolutions;