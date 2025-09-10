import React from 'react';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "COMPANY FILING IN US",
      subtitle: "The Complete Guide to Company Filing in the US",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "August 26, 2025",
      readMore: "Read More"
    },
    {
      id: 2,
      title: "COMPANY FILING IN UK",
      subtitle: "The Complete Guide to Company Filing in the UK",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "August 26, 2025",
      readMore: "Read More"
    },
    {
      id: 3,
      title: "DIGITAL MARKETING",
      subtitle: "Digital Marketing and Promotion: Driving Growth in the Digital...",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "December 24, 2024",
      readMore: "Read More"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-6">
            BLOGS
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Blog Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <p className="text-yellow-500 text-sm font-medium mb-4">
                  {post.subtitle}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                    {post.readMore}
                  </button>
                  <span className="text-gray-500 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;