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
          <div className="flex justify-center items-center min-h-[60vh]">
            {/* Centered Text Content */}
            <div className="text-left max-w-4xl">
              <p 
                className="text-6xl sm:text-5xl lg:text-6xl font-semibold mb-6" 
                style={{color: '#f8bd0a', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em'}}
              >
                ELITE FILING
              </p>

              <h1 className="hero-title text-left">
                <span 
                  className="block text-white text-5xl sm:text-4xl lg:text-5xl" 
                  style={{lineHeight: '1.1'}}
                >
                  SIMPLIFYING AND ENHANCING
                </span>
                <span 
                  className="block text-white text-5xl sm:text-4xl lg:text-5xl" 
                  style={{lineHeight: '1.1'}}
                >
                  YOUR BUSINESS PATH
                </span>
              </h1>
              
              <p 
                className="text-xl sm:text-lg lg:text-xl font-light mb-8 leading-relaxed max-w-3xl text-white" 
                style={{fontFamily: 'Inter, sans-serif', opacity: '0.9'}}
              >
                Elite Filing simplifies your business operations with expert solutions in incorporation, 
                taxation, trademarks, and more, ensuring a smooth and stress-free path to success. 
                Rely on us to manage the complexities while you concentrate on driving growth.
              </p>
              
              <button className="hero-cta-button group text-xl sm:text-lg lg:text-xl">
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
