import React from 'react';
import { Link } from 'react-router-dom';
import USFlag from '../../assets/us.jpg';
import UKFlag from '../../assets/UK.png';
import DigitalMarketingImg from '../../assets/dim.png';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "COMPANY FILING IN US",
      subtitle: "The Complete Guide to Company Filing in the US",
      image: USFlag,
      date: "August 26, 2025",
      readMore: "Read More",
      route: "/blogs/company-filing-us",
      description: "Learn everything about incorporating your business in the United States, including legal requirements, documentation, and step-by-step processes."
    },
    {
      id: 2,
      title: "COMPANY FILING IN UK",
      subtitle: "The Complete Guide to Company Filing in the UK",
      image: UKFlag,
      date: "August 26, 2025",
      readMore: "Read More",
      route: "/blogs/company-filing-uk",
      description: "Comprehensive guide to UK company registration, including Companies House requirements, legal structures, and compliance obligations."
    },
    {
      id: 3,
      title: "DIGITAL MARKETING",
      subtitle: "Digital Marketing and Promotion: Driving Growth in the Digital...",
      image: DigitalMarketingImg,
      date: "December 24, 2024",
      readMore: "Read More",
      route: "/blogs/digital-marketing",
      description: "Explore modern digital marketing strategies, SEO techniques, social media marketing, and online promotion methods to grow your business."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <span className="px-10 py-3 rounded-full text-xl font-black tracking-widest uppercase shadow-2xl border-4" style={{
              background: 'linear-gradient(135deg, #f8bd0a, #ffd700)',
              color: '#041e72',
              borderColor: '#041e72',
              fontWeight: '300',
              letterSpacing: '0.15em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              boxShadow: '0 8px 32px rgba(248,189,10,0.6), 0 0 0 4px rgba(4,30,114,0.3)'
            }}>
              BLOGS
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-5" style={{ color: '#041e72' }}>
            LATEST INSIGHTS &
            <br />
            <span style={{ color: '#f8bd0a' }}>INDUSTRY UPDATES</span>
          </h2>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Stay informed with our latest articles on business formation, compliance, 
            and digital marketing strategies.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const isDigitalMarketing = post.id === 3;
            
            return (
              <div 
                key={post.id} 
                className="group relative overflow-hidden rounded-3xl cursor-pointer transform shadow-xl transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-3 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  borderTop: `6px solid ${index % 2 === 0 ? '#f8bd0a' : '#041e72'}`,
                  minHeight: '400px'
                }}
              >
                {/* Blog Image */}
               <div className="relative h-28 md:h-32 overflow-hidden rounded-t-3xl bg-white flex items-center justify-center p-3">
  <img 
    src={post.image} 
    alt={post.title}
    className={`max-h-full max-w-full transition-all duration-500 group-hover:scale-105 ${
      isDigitalMarketing ? 'opacity-70 filter brightness-90 object-cover' : 'object-contain'
    }`}
  />
                  
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f8bd0a' : '#041e72',
                        color: index % 2 === 0 ? '#041e72' : '#ffffff'
                      }}
                    >
                      {post.id === 3 ? 'Marketing' : 'Business'}
                    </span>
                  </div>
                </div>
                
                {/* Blog Content */}
                <div className="p-6 flex flex-col justify-between h-52">
                  <div>
                    <h3 
                      className="text-lg font-bold mb-3 leading-tight group-hover:scale-105 transition-transform duration-300"
                      style={{ color: '#041e72' }}
                    >
                      {post.title}
                    </h3>
                    <p 
                      className="text-sm font-medium mb-4 leading-relaxed"
                      style={{ color: '#f8bd0a' }}
                    >
                      {post.subtitle}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {post.description}
                    </p>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <Link 
                      to={post.route}
                      className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: '#041e72',
                        color: '#ffffff',
                        border: '2px solid #041e72'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f8bd0a';
                        e.target.style.color = '#041e72';
                        e.target.style.borderColor = '#f8bd0a';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#041e72';
                        e.target.style.color = '#ffffff';
                        e.target.style.borderColor = '#041e72';
                      }}
                    >
                      <span>{post.readMore}</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    
                    <span className="text-gray-500 text-xs flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 transition-opacity duration-700 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ filter: 'blur(1px)' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Blogs;