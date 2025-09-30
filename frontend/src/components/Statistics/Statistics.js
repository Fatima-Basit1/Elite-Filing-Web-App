import React, { useState, useEffect, useRef, useMemo } from 'react';

// Import the service images
import cfImage from '../../assets/cf.png';
import voImage from '../../assets/vo.jpg';
import mcImage from '../../assets/mc.jpg';
import acImage from '../../assets/ac.jpg';
import dmImage from '../../assets/dm.jpg';
import taImage from '../../assets/ta.jpg';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, projects: 0, advisors: 0 });
  const sectionRef = useRef(null);

  const finalCounts = useMemo(() => ({
    clients: 150,
    projects: 400,
    advisors: 75,
  }), []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isVisible, finalCounts]);

  // Animate counters
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          clients: Math.floor(finalCounts.clients * progress),
          projects: Math.floor(finalCounts.projects * progress),
          advisors: Math.floor(finalCounts.advisors * progress),
        });

        if (currentStep >= steps) {
          setCounts(finalCounts);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, finalCounts]);

  const stats = [
    { id: 1, number: counts.clients, suffix: '+', label: 'Happy Clients' },
    { id: 2, number: counts.projects, suffix: '', label: 'Successful Projects' },
    { id: 3, number: counts.advisors, suffix: '+', label: 'Advisors & Experts' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Numbers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                background: 'linear-gradient(135deg, #f8bd0a 0%, #041e72 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LET THE NUMBERS SPEAK
              
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div
                  className="w-16 h-0.5 mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(90deg, #f8bd0a, #041e72)',
                  }}
                ></div>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                <div
                  className="text-4xl lg:text-5xl font-bold"
                  style={{ color: '#041e72' }}
                >
                  {stat.number}
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Start-up Solutions */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #f8bd0a 0%, #041e72 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BUSINESS START-UP SOLUTIONS
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Elite Filing, authorized by Companies House, ensures seamless and
              efficient company formation in the UK.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              image={cfImage}
              title="Company Formation"
              subtitle="From Only £12.99"
              description="Comprehensive UK Limited Company formation services with Companies House approval."
              variant="blue"
            />
            <ServiceCard
              image={voImage}
              title="Virtual Office Rental"
              subtitle="From Only £8.88 (Inc. VAT)"
              description="Prestigious UK address with secure mail handling to boost your business credibility."
              variant="yellow"
            />
            <ServiceCard
              image={mcImage}
              title="Multi-Currency Business Bank Accounts"
              subtitle="With Up To £5k Cash Reward"
              description="Manage global finances seamlessly and earn cash rewards on activation."
              variant="blue"
            />
            <ServiceCard
              image={acImage}
              title="Accountancy Consultation"
              subtitle="Free With Company Incorporation"
              description="Get expert financial advice, tax compliance, and business setup support."
              variant="yellow"
            />
            <ServiceCard
              image={dmImage}
              title="Domain Names"
              subtitle="Free With Any Company Formation"
              description="Secure a free professional domain name to establish your online presence."
              variant="blue"
            />
            <ServiceCard
              image={taImage}
              title="Tax Filing & Audits"
              subtitle="Free With Company Formation"
              description="From reporting to audits and tax planning, we keep your business compliant."
              variant="yellow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Updated Service Card Component
// Updated Service Card Component
const ServiceCard = ({ image, title, subtitle, description, variant }) => {
  const isYellow = variant === 'yellow';

  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
      style={{
        background: isYellow
          ? 'linear-gradient(135deg, #f8bd0a15, #f8bd0a25)'
          : 'linear-gradient(135deg, #041e7215, #041e7225)',
        border: `1.5px solid ${isYellow ? '#f8bd0a60' : '#041e7260'}`,
        backdropFilter: 'blur(10px)',
        minHeight: '300px',
      }}
    >
      {/* Accent Line */}
      <div
        className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
        style={{
          background: isYellow
            ? 'linear-gradient(90deg, #f8bd0a, #041e72)'
            : 'linear-gradient(90deg, #041e72, #f8bd0a)',
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
              color: isYellow ? '#f8bd0a' : '#041e72', // ✅ Better readability
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

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
        style={{
          background: isYellow
            ? 'radial-gradient(circle at center, #f8bd0a, transparent)'
            : 'radial-gradient(circle at center, #041e72, transparent)',
        }}
      ></div>
    </div>
  );
};

export default Statistics;