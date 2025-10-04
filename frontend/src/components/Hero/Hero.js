import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import bgVideo from '../../assets/bgvideo.mp4';
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      src: "/images/image-4L-SMBEE6Z-150x150-1.png",
      alt: "image-4L-SMBEE6Z-150x150"
    },
    {
      src: "/images/image-8L-SMBEE6Z-150x150-1.png",
      alt: "image-8L-SMBEE6Z-150x150"
    },
    {
      src: "/images/image-1L-SMBEE6Z-150x150-1.png",
      alt: "image-1L-SMBEE6Z-150x150"
    },
    {
      src: "/images/image-3L-SMBEE6Z-150x150-1.png",
      alt: "image-3L-SMBEE6Z-150x150"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);



  const scrollLeft = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const scrollRight = () => {
    setCurrentImageIndex((prev) => 
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="hero-container relative">
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
          <div className="flex justify-center items-start min-h-[60vh] pt-16">
            {/* Centered Text Content */}
            <div className="text-left max-w-4xl">
              <p 
                className="text-4xl sm:text-4xl lg:text-4xl font-semibold mb-2" 
                style={{color: '#f8bd0a', fontFamily: 'Monaco, monospace'}}
              >
                ELITE FILING
              </p>

              <h1 className="hero-title text-left mt-2">
                <span 
                  className="block text-white text-5xl sm:text-4xl lg:text-5xl" 
                  style={{lineHeight: '1.1', fontFamily: 'Monaco, monospace', fontWeight: '600'}}
                >
                  SIMPLIFYING AND ENHANCING YOUR BUSINESS PATH
                </span>
              </h1>
              
              <p 
                className="text-xl sm:text-lg lg:text-xl font-light mb-8 leading-relaxed max-w-3xl text-white" 
                style={{fontFamily: 'Inter, sans-serif', opacity: '0.9'}}
              >
                Elite Filing simplifies your business operations with expert solutions in incorporation, 
                taxation, trademarks, and more, ensuring a smooth and stress free path to success. 
                Rely on us to manage the complexities while you concentrate on driving growth.
              </p>
              
              <Link to="/sign-up">
              <button className="hero-cta-button group text-xl sm:text-lg lg:text-xl">
                <span className="mr-2">Start Your Business Today</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Display - Desktop */}
      <div className="absolute bottom-16 right-12 z-20 hidden md:block">
        <div className="relative w-32 h-24 flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer p-1"
          >
            <ChevronLeftIcon className="w-7 h-7 drop-shadow-lg" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer p-1"
          >
            <ChevronRightIcon className="w-7 h-7 drop-shadow-lg" />
          </button>

          {/* Logo Display */}
          <div className="w-50 h-50 flex items-center justify-center">
            <img 
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="h-20 w-20 object-contain rounded-lg bg-white/10 backdrop-blur-sm p-2 transition-all duration-500 hover:scale-110" 
            />
          </div>
        </div>
      </div>

      {/* Mobile Logo Display */}
        <div className="absolute bottom-8 right-6 z-20 block md:hidden">
         <div className="relative w-28 h-20 flex items-center justify-center">
           {/* Left Arrow */}
           <button
             onClick={scrollLeft}
             className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer p-1"
           >
             <ChevronLeftIcon className="w-6 h-6 drop-shadow-lg" />
           </button>
 
           {/* Right Arrow */}
           <button
             onClick={scrollRight}
             className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 text-yellow-400 hover:text-yellow-500 cursor-pointer p-1"
           >
             <ChevronRightIcon className="w-6 h-6 drop-shadow-lg" />
           </button>
 
           {/* Mobile Logo Display */}
           <div className="w-20 h-20 flex items-center justify-center">
             <img 
               src={heroImages[currentImageIndex].src}
               alt={heroImages[currentImageIndex].alt}
               className="h-16 w-16 object-contain rounded-lg bg-white/10 backdrop-blur-sm p-2 transition-all duration-500 hover:scale-110" 
             />
           </div>
         </div>
       </div>


    </div>
  );
};

export default Hero;
