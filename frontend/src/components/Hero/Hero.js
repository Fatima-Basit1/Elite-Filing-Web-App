import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="text-yellow-400">ELITE FILING</span>{' '}
          <span className="block mt-2">SIMPLIFYING AND</span>
          <span className="block">ENHANCING YOUR BUSINESS PATH</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Elite Filing simplifies your business operations with expert solutions in incorporation, taxation, trademarks, and more—ensuring a smooth and stress-free path to success. Rely on us to manage the complexities while you concentrate on driving growth.
        </p>
        
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          BEGIN YOUR BUSINESS TODAY ▶
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-20">
        <div className="w-24 h-24 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">★</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-yellow-400 transition-colors duration-300">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-yellow-400 transition-colors duration-300">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;