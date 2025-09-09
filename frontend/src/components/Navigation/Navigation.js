import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { 
      name: 'BUSINESS SOLUTIONS', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Business Registration', href: '#' },
        { name: 'Tax Services', href: '#' },
        { name: 'Legal Compliance', href: '#' }
      ]
    },
    { 
      name: 'COMPANY FORMATION', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'LLC Formation', href: '#' },
        { name: 'Corporation Setup', href: '#' },
        { name: 'Partnership Formation', href: '#' }
      ]
    },
    { 
      name: 'ECOMMERCE', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Online Store Setup', href: '#' },
        { name: 'Payment Processing', href: '#' },
        { name: 'Digital Marketing', href: '#' }
      ]
    },
    { name: 'CONTACT US', href: '#' },
    { name: 'ABOUT US', href: '#' }
  ];

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">EF</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">ELITE FILING</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                    onMouseLeave={() => !item.hasDropdown && setActiveDropdown(null)}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;