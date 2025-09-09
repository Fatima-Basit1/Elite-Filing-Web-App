import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "ACCOUNTANCY SOLUTIONS",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elite Filing offers expert accountancy solutions to help your business thrive. Our dedicated and experienced team provides efficient, reliable, and personalized financial services tailored to your unique needs. We ensure full compliance while optimizing your financial performance. Whether you're a start-up or an established enterprise, we are here to support your growth and goals."
    },
    {
      id: 2,
      title: "UK LTD COMPANY FORMATION",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elite Filing is proud to be officially authorized by Companies House for the submission and formation of UK Limited companies. With our in-house software thoroughly tested and approved by Companies House, we offer a smooth, reliable process for your company registration. Elite Filing handles all the complexities of company incorporation."
    },
    {
      id: 3,
      title: "UK LTD FORMATION & EXPERT FINANCIAL SERVICES",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive UK Ltd formation services combined with expert financial guidance to ensure your business starts on the right foundation and continues to grow successfully."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white">
              {/* Service Image */}
              <div className="relative mb-6">
                <div className="border-4 border-yellow-500 rounded-lg overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Service Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;