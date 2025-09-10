
import React from 'react';
import videoFile from '../../assets/IMG_8578.MOV';
// Import icon files
import reliableIcon from '../../assets/reliable.gif';
import trustedIcon from '../../assets/trusted.gif';
import authorizedIcon from '../../assets/authorized.gif';
import efficientIcon from '../../assets/efficient.gif';

const WhyChooseUs = () => {
  const features = [
    {
      icon: reliableIcon,
      title: "Reliable",
      description: "Our process is designed with utmost care, guaranteeing consistency, accuracy, and transparency at every step of your business registration."
    },
    {
      icon: trustedIcon,
      title: "Trusted",
      description: "Hundreds of entrepreneurs and businesses choose Elite Filing because we've built a reputation for reliability and exceptional service."
    },
    {
      icon: authorizedIcon,
      title: "Authorized",
      description: "Elite Filing is officially authorized by Companies House, ensuring that every company formation is carried out under legal guidance and with complete credibility."
    },
    {
      icon: efficientIcon,
      title: "Efficient",
      description: "With our advanced in-house system, we provide a streamlined experience that saves time, reduces paperwork, and accelerates company setup."
    }
  ];

  return (
    <section className="py-3 px-2 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)'
    }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-5 left-5 w-20 h-20 rounded-full" style={{
          background: 'linear-gradient(135deg, #f8bd0a, #041e72)'
        }}></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full" style={{
          background: 'linear-gradient(135deg, #041e72, #f8bd0a)'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #f8bd0a 0%, #041e72 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            WHY CHOOSE US
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{
            background: 'linear-gradient(90deg, #f8bd0a, #041e72)'
          }}></div>
        </div>

        {/* Content Arrangement: Features flanking the Video */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2">
          
          {/* Left Column - Features */}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={index}
                className="group relative p-2 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden h-full aspect-square"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #f8bd0a15, #f8bd0a25)' 
                    : 'linear-gradient(135deg, #041e7215, #041e7225)',
                  border: `2px solid ${index % 2 === 0 ? '#f8bd0a40' : '#041e7240'}`,
                  backdropFilter: 'blur(10px)',
                  minHeight: 'auto'
                }}
              >
                {/* Accent Line */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(90deg, #f8bd0a, #041e72)' 
                      : 'linear-gradient(90deg, #041e72, #f8bd0a)'
                  }}
                ></div>

                {/* Icon */}
                <div className="mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, #f8bd0a, #ffd700)' 
                        : 'linear-gradient(135deg, #041e72, #385cd4)'
                    }}
                  >
                    <img 
                      src={feature.icon} 
                      alt={feature.title} 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-lg font-bold mb-1 transition-colors duration-300"
                    style={{
                      color: index % 2 === 0 ? '#041e72' : '#f8bd0a'
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: index % 2 === 0 
                      ? 'radial-gradient(circle at center, #f8bd0a, transparent)' 
                      : 'radial-gradient(circle at center, #041e72, transparent)'
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Center Column - Video */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full md:w-3/4 lg:w-2/3 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-yellow-400 to-blue-900 p-1" style={{
              minHeight: '500px'
            }}>
              <div className="bg-black rounded-xl overflow-hidden h-full flex items-center justify-center">
                <video 
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    minHeight: '490px',
                    maxHeight: '490px'
                  }}
                >
                  <source src={videoFile} type="video/mp4" />
                  <source src={videoFile} type="video/quicktime" />
                  <source src={require('../../assets/IMG_8578.MOV')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          {/* Right Column - Features */}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            {features.slice(2, 4).map((feature, index) => (
              <div
                key={index + 2}
                className="group relative p-2 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden h-full aspect-square"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #041e7215, #041e7225)'
                    : 'linear-gradient(135deg, #f8bd0a15, #f8bd0a25)',
                  border: `2px solid ${index % 2 === 0 ? '#041e7240' : '#f8bd0a40'}`,
                  backdropFilter: 'blur(10px)',
                  minHeight: 'auto'
                }}
              >
                {/* Accent Line */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(90deg, #041e72, #f8bd0a)'
                      : 'linear-gradient(90deg, #f8bd0a, #041e72)'
                  }}
                ></div>

                {/* Icon */}
                <div className="mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, #041e72, #385cd4)'
                        : 'linear-gradient(135deg, #f8bd0a, #ffd700)'
                    }}
                  >
                    <img 
                      src={features[index + 2].icon} 
                      alt={features[index + 2].title} 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-lg font-bold mb-1 transition-colors duration-300"
                    style={{
                      color: index % 2 === 0 ? '#f8bd0a' : '#041e72'
                    }}
                  >
                    {features[index + 2].title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {features[index + 2].description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: index % 2 === 0 
                      ? 'radial-gradient(circle at center, #041e72, transparent)'
                      : 'radial-gradient(circle at center, #f8bd0a, transparent)'
                  }}
                ></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;