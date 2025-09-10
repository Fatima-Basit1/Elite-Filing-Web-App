
import React from 'react';
import videoFile from '../../assets/IMG_8578.MOV'; // Make sure this path is correct

const WhyChooseUs = () => {
  const features = [
    {
      icon: "👍",
      title: "Reliable",
      description: "Our process is designed with utmost care, guaranteeing consistency, accuracy, and transparency at every step of your business registration."
    },
    {
      icon: "🏆",
      title: "Trusted",
      description: "Hundreds of entrepreneurs and businesses choose Elite Filing because we've built a reputation for reliability and exceptional service."
    },
    {
      icon: "✅",
      title: "Authorized",
      description: "Elite Filing is officially authorized by Companies House, ensuring that every company formation is carried out under legal guidance and with complete credibility."
    },
    {
      icon: "⚡",
      title: "Efficient",
      description: "With our advanced in-house system, we provide a streamlined experience that saves time, reduces paperwork, and accelerates company setup."
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)'
    }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{
          background: 'linear-gradient(135deg, #f8bd0a, #041e72)'
        }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full" style={{
          background: 'linear-gradient(135deg, #041e72, #f8bd0a)'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, #f8bd0a 0%, #041e72 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            WHY CHOOSE US
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{
            background: 'linear-gradient(90deg, #f8bd0a, #041e72)'
          }}></div>
        </div>

        {/* Content Arrangement: Features flanking the Video */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
          
          {/* Left Column - Features */}
          <div className="grid grid-cols-1 gap-8 w-full lg:w-1/3 xl:w-1/3">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #f8bd0a15, #f8bd0a25)' 
                    : 'linear-gradient(135deg, #041e7215, #041e7225)',
                  border: `2px solid ${index % 2 === 0 ? '#f8bd0a40' : '#041e7240'}`,
                  backdropFilter: 'blur(10px)'
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
                <div className="mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, #f8bd0a, #ffd700)' 
                        : 'linear-gradient(135deg, #041e72, #385cd4)',
                      color: '#ffffff'
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-2xl font-bold mb-4 transition-colors duration-300"
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
          <div className="w-full lg:w-1/2 xl:w-2/5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-400 to-blue-900 p-1">
              <div className="bg-black rounded-2xl overflow-hidden">
                <video 
                  className="w-full h-auto object-cover" // object-cover ensures the video scales correctly
                  controls
                  autoPlay // Added for immediate playback if desired, remove if not
                  muted // Muted by default for autoPlay, remove if you want sound on load
                  loop // Added for continuous playback if desired
                  playsInline // Important for mobile playback
                  style={{
                    minHeight: '200px', // Maintain a minimum height
                    maxHeight: '400px', // Allow video to be larger if needed
                    width: '100%' // Ensure it takes full width of its container
                  }}
                >
                  <source src={videoFile} type="video/mp4" />
                  <source src={videoFile} type="video/quicktime" /> 
                  {/* Add more sources if you have other formats */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-1 gap-8 w-full lg:w-1/3 xl:w-1/3">
            {features.slice(2, 4).map((feature, index) => (
              <div
                key={index + 2}
                className="group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #041e7215, #041e7225)' // Swapped for visual variety
                    : 'linear-gradient(135deg, #f8bd0a15, #f8bd0a25)', // Swapped for visual variety
                  border: `2px solid ${index % 2 === 0 ? '#041e7240' : '#f8bd0a40'}`, // Swapped for visual variety
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Accent Line */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(90deg, #041e72, #f8bd0a)' // Swapped for visual variety
                      : 'linear-gradient(90deg, #f8bd0a, #041e72)' // Swapped for visual variety
                  }}
                ></div>

                {/* Icon */}
                <div className="mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, #041e72, #385cd4)' // Swapped for visual variety
                        : 'linear-gradient(135deg, #f8bd0a, #ffd700)', // Swapped for visual variety
                      color: '#ffffff'
                    }}
                  >
                    {features[index + 2].icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 
                    className="text-2xl font-bold mb-4 transition-colors duration-300"
                    style={{
                      color: index % 2 === 0 ? '#f8bd0a' : '#041e72' // Swapped for visual variety
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
                      ? 'radial-gradient(circle at center, #041e72, transparent)' // Swapped for visual variety
                      : 'radial-gradient(circle at center, #f8bd0a, transparent)' // Swapped for visual variety
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