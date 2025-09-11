import React from 'react';
import bgVideo from '../../assets/bgvideo.mp4';

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Background Video */}
      <video 
        className="hero-video"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Enhanced Background Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Main Content */}
      <div className="hero-content">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <p 
                className="text-4xl sm:text-3xl lg:text-3xl font-semibold mb-4" 
                style={{color: '#f8bd0a', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em'}}
              >
                ELITE FILING
              </p>

              <h1 className="hero-title text-left">
                <span 
                  className="block text-white text-3xl sm:text-2xl lg:text-2xl" 
                  style={{lineHeight: '1.1'}}
                >
                  SIMPLIFYING AND ENHANCING
                </span>
                <span 
                  className="block text-white text-3xl sm:text-2xl lg:text-2xl" 
                  style={{lineHeight: '1.1'}}
                >
                  YOUR BUSINESS PATH
                </span>
              </h1>
              
              <p 
                className="text-lg sm:text-base lg:text-base font-light mb-8 leading-relaxed max-w-2xl text-white" 
                style={{fontFamily: 'Inter, sans-serif', opacity: '0.9'}}
              >
                Elite Filing simplifies your business operations with expert solutions in incorporation, 
                taxation, trademarks, and more, ensuring a smooth and stress-free path to success. 
                Rely on us to manage the complexities while you concentrate on driving growth.
              </p>
              
              <button className="hero-cta-button group text-lg sm:text-base lg:text-base">
                <span className="mr-2">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
