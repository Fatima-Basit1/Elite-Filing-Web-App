import React from 'react';

const FormLaunchGrow = () => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Elite Filing offers fast, reliable, and affordable website design and development services. As a trusted digital partner, we ensure a seamless online presence through our fully customized, data-driven, and high-performance websites.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23374151'/%3E%3Crect x='20' y='20' width='260' height='160' rx='8' fill='%23111827'/%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ef4444'/%3E%3Ccircle cx='55' cy='40' r='4' fill='%23f59e0b'/%3E%3Ccircle cx='70' cy='40' r='4' fill='%2310b981'/%3E%3Crect x='30' y='60' width='240' height='100' fill='%231f2937'/%3E%3Ctext x='150' y='90' text-anchor='middle' fill='%23fbbf24' font-size='14'%3EWEB%3C/text%3E%3Ctext x='150' y='110' text-anchor='middle' fill='%23fbbf24' font-size='14'%3EDEVELOPER%3C/text%3E%3Ccircle cx='60' cy='130' r='8' fill='%23f59e0b'/%3E%3Ctext x='60' y='135' text-anchor='middle' fill='white' font-size='8'%3EJS%3C/text%3E%3Ccircle cx='90' cy='130' r='8' fill='%2306b6d4'/%3E%3Ctext x='90' y='135' text-anchor='middle' fill='white' font-size='8'%3ECSS%3C/text%3E%3Ccircle cx='120' cy='130' r='8' fill='%23e11d48'/%3E%3Ctext x='120' y='135' text-anchor='middle' fill='white' font-size='8'%3EH%3C/text%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: 2,
      title: "Search Engine Optimization",
      description: "Elite Filing offers fast, reliable, and affordable SEO optimization services. As a trusted digital partner, we ensure a seamless ranking boost through our fully customized, data-driven, and high-performance strategies.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='200' height='100' rx='8' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ctext x='150' y='80' text-anchor='middle' fill='%234285f4' font-size='24' font-weight='bold'%3ESEO%3C/text%3E%3Ccircle cx='200' cy='120' r='20' fill='none' stroke='%23374151' stroke-width='3'/%3E%3Cpath d='m215 135 10 10' stroke='%23374151' stroke-width='3' stroke-linecap='round'/%3E%3Crect x='70' y='110' width='80' height='4' fill='%23e2e8f0'/%3E%3Crect x='70' y='120' width='60' height='4' fill='%23e2e8f0'/%3E%3Crect x='70' y='130' width='70' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Elite Filing offers fast, reliable, and affordable digital marketing services. As a trusted growth partner, we ensure a seamless brand presence through our fully customized, data-driven, and high-performance campaigns.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23164e63'/%3E%3Ctext x='150' y='40' text-anchor='middle' fill='%23fbbf24' font-size='12'%3EDigital Marketing%3C/text%3E%3Crect x='30' y='60' width='40' height='30' fill='%23fbbf24'/%3E%3Crect x='80' y='70' width='40' height='20' fill='%23f59e0b'/%3E%3Crect x='130' y='50' width='40' height='40' fill='%23dc2626'/%3E%3Crect x='180' y='65' width='40' height='25' fill='%2306b6d4'/%3E%3Crect x='230' y='55' width='40' height='35' fill='%2310b981'/%3E%3Ccircle cx='60' cy='120' r='8' fill='%23fbbf24'/%3E%3Ccircle cx='100' cy='130' r='6' fill='%23f59e0b'/%3E%3Ccircle cx='140' cy='125' r='7' fill='%23dc2626'/%3E%3Ccircle cx='180' cy='135' r='5' fill='%2306b6d4'/%3E%3Ccircle cx='220' cy='120' r='9' fill='%2310b981'/%3E%3Cpath d='M60 120 L100 130 L140 125 L180 135 L220 120' stroke='%23fbbf24' stroke-width='2' fill='none'/%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: 4,
      title: "Lead Generation",
      description: "Elite Filing offers fast, reliable, and affordable lead generation services. As a trusted growth partner, we ensure a seamless growth channel through our fully customized, data-driven, and high-converting campaigns.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23f97316'/%3E%3Crect x='50' y='50' width='200' height='100' rx='8' fill='%23374151'/%3E%3Ctext x='150' y='80' text-anchor='middle' fill='%23fbbf24' font-size='16'%3ELEADS%3C/text%3E%3Ccircle cx='80' cy='110' r='8' fill='%2306b6d4'/%3E%3Ccircle cx='120' cy='110' r='8' fill='%2306b6d4'/%3E%3Ccircle cx='160' cy='110' r='8' fill='%2306b6d4'/%3E%3Ccircle cx='200' cy='110' r='8' fill='%2306b6d4'/%3E%3Cpath d='M80 110 L120 110 M120 110 L160 110 M160 110 L200 110' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpolygon points='210,110 200,105 200,115' fill='%23fbbf24'/%3E%3Crect x='220' y='100' width='20' height='20' fill='%2310b981'/%3E%3Ctext x='230' y='113' text-anchor='middle' fill='white' font-size='10'%3E$%3C/text%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: 5,
      title: "Affiliate Marketing",
      description: "Elite Filing offers fast, reliable, and affordable affiliate marketing services. As a trusted revenue partner, we ensure a seamless growth channel through our fully customized, data-driven, and high-converting strategies.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23164e63'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23374151'/%3E%3Ctext x='150' y='85' text-anchor='middle' fill='%23fbbf24' font-size='10'%3EAFFILIATE%3C/text%3E%3Ctext x='150' y='100' text-anchor='middle' fill='%23fbbf24' font-size='10'%3ENETWORK%3C/text%3E%3Ctext x='150' y='115' text-anchor='middle' fill='%23fbbf24' font-size='10'%3EMARKETING%3C/text%3E%3Ccircle cx='80' cy='60' r='15' fill='%2306b6d4'/%3E%3Ccircle cx='220' cy='60' r='15' fill='%2306b6d4'/%3E%3Ccircle cx='80' cy='140' r='15' fill='%2306b6d4'/%3E%3Ccircle cx='220' cy='140' r='15' fill='%2306b6d4'/%3E%3Cpath d='M95 70 L135 90' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M165 90 L205 70' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M95 130 L135 110' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M165 110 L205 130' stroke='%23fbbf24' stroke-width='2'/%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: 6,
      title: "Logo Designing & Branding",
      description: "Elite Filing offers fast, reliable, and affordable logo designing and branding services. As a trusted creative partner, we ensure a seamless brand identity through our fully customized, professional, and high-impact designs.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='none'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Crect x='50' y='50' width='200' height='100' rx='8' fill='white' stroke='%23e5e7eb'/%3E%3Ctext x='150' y='80' text-anchor='middle' fill='%23374151' font-size='12'%3ELogo Design%3C/text%3E%3Ccircle cx='120' cy='110' r='15' fill='%23ef4444'/%3E%3Ccircle cx='150' cy='110' r='15' fill='%23f59e0b'/%3E%3Ccircle cx='180' cy='110' r='15' fill='%2310b981'/%3E%3Cpath d='M120 110 Q135 95 150 110' fill='%238b5cf6' fill-opacity='0.3'/%3E%3Cpath d='M150 110 Q165 95 180 110' fill='%23ec4899' fill-opacity='0.3'/%3E%3Crect x='100' y='130' width='100' height='4' fill='%23d1d5db'/%3E%3Crect x='110' y='140' width='80' height='3' fill='%23e5e7eb'/%3E%3C/svg%3E",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-8">
            FORM, LAUNCH, GROW
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${service.bgColor} ${service.borderColor} border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              {/* Service Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-yellow-500 mb-4 text-center">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormLaunchGrow;