import React from 'react';

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Company Incorporation",
      description: "Launching your business in the USA, UK, or Canada has never been simpler. At Elite Filing, we streamline the entire process of company incorporation, managing all legal requirements with precision and efficiency. From your idea to future.",
      icon: (
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-white",
      borderColor: "border-gray-300"
    },
    {
      id: 2,
      title: "ITIN Services",
      description: "Need an ITIN? We've got you covered. Our streamlined process makes obtaining your Individual Taxpayer Identification Number quick and efficient, ensuring your needs are met promptly and your privacy is always protected.",
      icon: (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500"
    },
    {
      id: 3,
      title: "Complete Package",
      description: "Our complete business package offers company incorporation, tax services, trademark registration, banking assistance, and more for entrepreneurs. It lets you focus on your vision while we handle the setup and compliance.",
      icon: (
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-white",
      borderColor: "border-gray-300"
    },
    {
      id: 4,
      title: "UK Services",
      description: "Elite Filing simplifies UK business incorporation. We support in incorporation, tax services, and compliance. Tailored for entrepreneurs, we ensure seamless market entry while maintaining sustainable growth.",
      icon: (
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-1a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-white",
      borderColor: "border-gray-300"
    },
    {
      id: 5,
      title: "Tax Services",
      description: "Elite Filing offers comprehensive tax services for individuals and businesses. From simple ITIN applications, tax advisory services, tax audit financial assistance, bookkeeping, and full accounting services to complex business efficient & compliant.",
      icon: (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500"
    },
    {
      id: 6,
      title: "Trademark Registration",
      description: "Safeguard your brand with Elite Filing's trademark registration services. Our team protects your business name, logo, and identity from infringement. We ensure long-term security, giving you complete peace of mind.",
      icon: (
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      bgColor: "bg-white",
      borderColor: "border-gray-300"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-yellow-500 font-semibold text-lg mb-2">OUR SERVICES</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            LEGAL AND REGISTRATION COMPLIANCE<br />SERVICES
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Elite Filing, we offer a wide range of services designed to meet your business needs.
          </p>
          
          {/* Down Arrow */}
          <div className="mt-8 flex justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${service.bgColor} ${service.borderColor} border-2 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-xl font-bold mb-4 ${
                service.bgColor === 'bg-yellow-500' ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>
              
              {/* Description */}
              <p className={`text-sm leading-relaxed ${
                service.bgColor === 'bg-yellow-500' ? 'text-white' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;