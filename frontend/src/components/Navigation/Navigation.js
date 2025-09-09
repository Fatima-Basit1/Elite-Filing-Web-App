import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { 
      name: 'BUSINESS SOLUTIONS', 
      href: '/business-solutions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Business Registration', href: '/business-solutions' },
        { name: 'Tax Services', href: '/business-solutions' },
        { name: 'Legal Compliance', href: '/business-solutions' }
      ]
    },
    { 
      name: 'COMPANY FORMATION', 
      href: '/company-services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'UK Ltd Formation', href: '/company-services' },
        { name: 'Corporation Setup', href: '/company-services' },
        { name: 'Partnership Formation', href: '/company-services' }
      ]
    },
    { 
      name: 'ECOMMERCE', 
      href: '/ecommerce',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Online Store Setup', href: '/ecommerce' },
        { name: 'Payment Processing', href: '/ecommerce' },
        { name: 'Digital Marketing', href: '/ecommerce' }
      ]
    },
    { name: 'CONTACT US', href: '/contact' },
    { name: 'ABOUT US', href: '/' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-50/95 via-white/95 to-gray-100/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 px-6 py-3">
          <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-200/30">
                <span className="text-white font-bold text-lg">EF</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800 drop-shadow-sm">ELITE FILING</div>
                <div className="text-xs text-blue-600 font-medium tracking-wide">Professional Services</div>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-semibold flex items-center transition-all duration-300 rounded-lg hover:bg-blue-50 relative overflow-hidden group"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg hover:bg-blue-50 relative overflow-hidden group block"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 py-2 z-50 transform transition-all duration-300 ease-out"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 mx-2 rounded-lg group backdrop-blur-sm"
                        >
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            {dropdownItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button & Mobile menu button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-blue-500/30"
                  >
                    Get Started
               </Link>
            </div>
            <div className="lg:hidden">
              <button className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;