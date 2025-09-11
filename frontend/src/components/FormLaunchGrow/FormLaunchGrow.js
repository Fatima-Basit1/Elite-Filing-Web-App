import React from 'react';

// Import the actual image assets
import wdImage from '../../assets/wd.jpg';
import seoImage from '../../assets/seo.jpg';
import lgImage from '../../assets/lg.jpg';
import ldImage from '../../assets/ld.jpg';
import dimImage from '../../assets/dim.png';
import amImage from '../../assets/af.jpg';

const FormLaunchGrow = () => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      subtitle: "Professional Website Solutions",
      description: "Elite Filing offers fast, reliable, and affordable website design and development services. As a trusted digital partner, we ensure a seamless online presence through our fully customized, data-driven, and high-performance websites.",
      image: wdImage,
      variant: "yellow"
    },
    {
      id: 2,
      title: "Search Engine Optimization",
      subtitle: "Boost Your Online Visibility",
      description: "Elite Filing offers fast, reliable, and affordable SEO optimization services. As a trusted digital partner, we ensure a seamless ranking boost through our fully customized, data-driven, and high-performance strategies.",
      image: seoImage,
      variant: "blue"
    },
    {
      id: 3,
      title: "Lead Generation",
      subtitle: "Convert Visitors Into Customers",
      description: "Elite Filing offers fast, reliable, and affordable lead generation services. As a trusted growth partner, we ensure a seamless growth channel through our fully customized, data-driven, and high-converting campaigns.",
      image: lgImage,
      variant: "yellow"
    },
    {
      id: 4,
      title: "Logo Design & Branding",
      subtitle: "Create Your Brand Identity",
      description: "Elite Filing offers fast, reliable, and affordable logo designing and branding services. As a trusted creative partner, we ensure a seamless brand identity through our fully customized, professional, and high-impact designs.",
      image: ldImage,
      variant: "blue"
    },
    {
      id: 5,
      title: "Digital Marketing",
      subtitle: "Grow Your Digital Presence",
      description: "Elite Filing offers fast, reliable, and affordable digital marketing services. As a trusted growth partner, we ensure a seamless brand presence through our fully customized, data-driven, and high-performance campaigns.",
      image: dimImage,
      variant: "yellow"
    },
    {
      id: 6,
      title: "Affiliate Marketing",
      subtitle: "Maximize Revenue Streams",
      description: "Elite Filing offers fast, reliable, and affordable affiliate marketing services. As a trusted revenue partner, we ensure a seamless growth channel through our fully customized, data-driven, and high-converting strategies.",
      image: amImage,
      variant: "blue"
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
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              variant={service.variant}
            />
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

// Service Card Component - Modified color scheme for FormLaunchGrow
const ServiceCard = ({ image, title, subtitle, description, variant }) => {
  const isYellow = variant === 'yellow';

  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
      style={{
        // Inverted gradient intensity for differentiation
        background: isYellow
          ? 'linear-gradient(135deg, #f8bd0a25, #f8bd0a35)' // Stronger yellow gradient
          : 'linear-gradient(135deg, #041e7210, #041e7220)', // Lighter blue gradient
        border: `2px solid ${isYellow ? '#f8bd0a80' : '#041e7240'}`, // Different border opacity
        backdropFilter: 'blur(12px)', // Slightly more blur
        minHeight: '300px',
      }}
    >
      {/* Accent Line - Inverted gradient direction */}
      <div
        className="absolute top-0 left-0 w-full h-1.5 transition-all duration-300 group-hover:h-2"
        style={{
          background: isYellow
            ? 'linear-gradient(90deg, #041e72, #f8bd0a)' // Inverted from Statistics
            : 'linear-gradient(90deg, #f8bd0a, #041e72)', // Inverted from Statistics
        }}
      ></div>

      <div className="relative p-6 z-10 h-full flex flex-col">
        <div className="mb-4 flex justify-center items-center h-28">
          <img
            src={image}
            alt={title}
            className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex-1 text-center">
          <h3
            className="text-lg font-bold mb-1 transition-colors duration-300"
            style={{
              // Enhanced color saturation for better differentiation
              color: isYellow ? '#e6a800' : '#0a2d8a', // Slightly darker variations
            }}
          >
            {title}
          </h3>
          <p className="text-sm font-medium text-gray-700 mb-2">{subtitle}</p>
          <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>

      {/* Hover Glow Effect - Enhanced intensity */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"
        style={{
          background: isYellow
            ? 'radial-gradient(circle at center, #f8bd0a, transparent)'
            : 'radial-gradient(circle at center, #041e72, transparent)',
        }}
      ></div>
    </div>
  );
};

export default FormLaunchGrow;