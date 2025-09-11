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
      
      {/* Animated Background Pattern - Removed */}

      {/* Main Content */}
      <div className="hero-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:text-left">
            {/* Left Column - Text Content */}
            <div className="w-full max-w-4xl lg:max-w-none">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3" style={{color: '#f8bd0a', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em'}}>
                ELITE FILING
              </p>
              <h1 className="hero-title text-center lg:text-left">
                <span className="block text-white" style={{lineHeight: '1.1'}}>
                  SIMPLIFYING AND ENHANCING
                </span>
                <span className="block text-white" style={{lineHeight: '1.1'}}>
                  YOUR BUSINESS PATH
                </span>
              </h1>
              
              <p className="text-white text-xs sm:text-sm lg:text-base font-light mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left" style={{fontFamily: 'Inter, sans-serif', opacity: '0.9'}}>
                Elite Filing simplifies your business operations with expert solutions in incorporation, taxation, trademarks, and more, ensuring a smooth and stress-free path to success. Rely on us to manage the complexities while you concentrate on driving growth.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <button className="hero-cta-button group">
                  <span className="mr-2">Learn More</span>
                </button>
              </div>
            </div>
            

          </div>
        </div>
      </div>
      {/* Enhanced Decorative Elements - Removed */}

      {/* Modern Navigation Arrows - Removed */}

      {/* Floating Elements for Modern Look - Removed */}
    </div>
  );
};

export default Hero;