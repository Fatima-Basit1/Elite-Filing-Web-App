import React from 'react';
import backgroundImage from '../../assets/bg.jpg';

const Hero = () => {
  return (
    <div 
      className="hero-container"
      style={{ '--hero-bg-image': `url(${backgroundImage})` }}
    >
      {/* Enhanced Background Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Animated Background Pattern */}
      <div className="hero-background-pattern">
        <div className="hero-pattern-circle w-32 h-32 top-20 left-10" style={{ animationDelay: '0s' }}></div>
        <div className="hero-pattern-circle w-24 h-24 top-40 right-20" style={{ animationDelay: '1s' }}></div>
        <div className="hero-pattern-circle w-16 h-16 bottom-32 left-1/4" style={{ animationDelay: '2s' }}></div>
        <div className="hero-pattern-circle w-20 h-20 bottom-20 right-1/3" style={{ animationDelay: '1.5s' }}></div>
        <div className="hero-pattern-circle w-28 h-28 top-1/3 left-1/2" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="hero-content">
       <h1 className="hero-title">
          <span style={{color: '#f8bd0a'}}>ELITE FILING</span>{' '}
          <span className="block mt-4 text-white" style={{lineHeight: '1.2'}}>
            <span className="text-white-400">SIMPLIFYING AND</span> 
          </span>
          <span className="block text-white" style={{lineHeight: '1.2'}}>
            <span className="text-white-400">ENHANCING YOUR BUSINESS PATH</span> 
          </span>
        </h1>
        
        <p className="hero-subtitle" style={{color: 'rgba(255, 255, 255, 0.95)'}}>
          Elite Filing simplifies your business operations with expert solutions in incorporation, 
          taxation, trademarks, and more—ensuring a smooth and stress-free path to success. 
          Rely on us to manage the complexities while you concentrate on driving growth.
        </p>
        
        <button className="hero-cta-button group" style={{color: 'white'}}>
          <span className="mr-3" style={{color: 'white'}}>BEGIN YOUR BUSINESS TODAY</span>
          <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-1/4 right-10 transform -translate-y-1/2 z-20">
        <div className="hero-floating-card">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-2xl">★</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-10 transform translate-y-1/2 z-20">
        <div className="hero-floating-card">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modern Navigation Arrows */}
      <button className="hero-nav-button absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button className="hero-nav-button absolute right-6 top-1/2 transform -translate-y-1/2 z-20">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Floating Elements for Modern Look */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
      
      <div className="absolute bottom-32 right-1/4 z-10">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;