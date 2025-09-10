import React, { useState } from 'react';
import { ChevronDownIcon, Bars3Icon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { 
      name: 'BUSINESS SOLUTIONS', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Company Logo Creation', href: '#', icon: '🎨' },
        { name: 'Registered Agent Service', href: '#', icon: '👤' },
        { name: 'UK Shared Office', href: '#', icon: '🏢' },
        { name: 'Trademark Registration UK', href: '#', icon: '®️' }
      ]
    },
    { 
      name: 'COMPANY FORMATION', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'USA', 
          href: '#', 
          icon: '🇺🇸', 
          hasNested: true,
          nestedItems: [
            { name: 'LLC Formation', href: '#', icon: '🏛️' },
            { name: 'USA Tax', href: '#', icon: '📊' },
            { name: 'ITIN', href: '#', icon: '🆔' },
            { name: 'Trademark', href: '#', icon: '®️' },
            { name: 'Complete Package', href: '#', icon: '📦' }
          ]
        },
        { 
          name: 'UK', 
          href: '#', 
          icon: '🇬🇧', 
          hasNested: true,
          nestedItems: [
            { name: 'Company Registration', href: '#', icon: '🏢' },
            { name: 'Company Annual Accounts Filing', href: '#', icon: '📋' },
            { name: 'Company Closure Dissolution', href: '#', icon: '🔒' },
            { name: 'Company Name Change', href: '#', icon: '✏️' },
            { name: 'Company Structural Change', href: '#', icon: '🔄' },
            { name: 'Confirmation Statement Filing', href: '#', icon: '✅' },
            { name: 'EORI Number Application', href: '#', icon: '🆔' },
            { name: 'VAT Number Registration', href: '#', icon: '💰' },
            { name: 'VAT Return Filing', href: '#', icon: '📄' },
            { name: 'UK Bank Accounts', href: '#', icon: '🏦' }
          ]
        },
        { 
          name: 'Pakistan', 
          href: '#', 
          icon: '🇵🇰', 
          hasNested: true,
          nestedItems: [
            { name: 'SECP', href: '#', icon: '🏛️' },
            { name: 'PSEB', href: '#', icon: '⚡' },
            { name: 'FBR', href: '#', icon: '📊' }
          ]
        },
        { 
          name: 'UAE', 
          href: '#', 
          icon: '🇦🇪', 
          hasNested: true,
          nestedItems: [
            { name: 'SPC Free Zone', href: '#', icon: '🏢' }
          ]
        },
        { name: 'Canada (Coming Soon)', href: '#', icon: '🇨🇦', subtitle: 'Complete Package' },
        { name: 'Turkey (Coming Soon)', href: '#', icon: '🇹🇷', subtitle: 'Complete Package' }
      ]
    },
    { 
      name: 'ECOMMERCE', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Amazon', href: '#', icon: '📦' },
        { name: 'Walmart', href: '#', icon: '🛒' },
        { name: 'Etsy', href: '#', icon: '🎨' }
      ]
    },
    { name: 'CONTACT US', href: '#' },
    { name: 'ABOUT US', href: '#' }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-wrapper">
          {/* Enhanced Logo */}
          <div className="nav-logo-container">
            <div className="flex items-center">
              <div className="nav-logo-icon">
                <span className="text-white font-bold text-xl">EF</span>
              </div>
              <div>
                <div className="nav-logo-text">ELITE FILING</div>
                <div className="text-sm text-gray-500 font-medium tracking-wide">Business Solutions</div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Menu */}
          <div className="nav-menu">
            <div className="nav-menu-list">
              {menuItems.map((item, index) => (
                <div key={index} className="nav-menu-item">
                  <button
                    className={`nav-menu-button ${
                      activeDropdown === index ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-600' : ''
                    }`}
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                    onMouseLeave={() => !item.hasDropdown && setActiveDropdown(null)}
                    onClick={() => !item.hasDropdown && (window.location.href = item.href)}
                  >
                    <span className="tracking-wide">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDownIcon 
                        className={`nav-chevron ${
                          activeDropdown === index ? 'nav-chevron-active' : ''
                        }`} 
                      />
                    )}
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div 
                      className="nav-dropdown"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => {
                        setActiveDropdown(null);
                        setActiveNestedDropdown(null);
                      }}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {item.name}
                        </div>
                      </div>
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <div key={dropdownIndex} className="relative">
                          <a
                            href={dropdownItem.href}
                            className="nav-dropdown-item flex items-center justify-between"
                            onMouseEnter={() => dropdownItem.hasNested && setActiveNestedDropdown(dropdownIndex)}
                            onMouseLeave={() => !dropdownItem.hasNested && setActiveNestedDropdown(null)}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 text-lg">{dropdownItem.icon}</span>
                              <div>
                                <div className="font-semibold text-lg">{dropdownItem.name}</div>
                                <div className="text-sm text-gray-500">
                                  {dropdownItem.subtitle || 'Professional services'}
                                </div>
                              </div>
                            </div>
                            {dropdownItem.hasNested && (
                              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            )}
                          </a>
                          
                          {/* Nested Dropdown */}
                          {dropdownItem.hasNested && activeNestedDropdown === dropdownIndex && (
                            <div 
                              className="absolute left-full top-0 ml-2 w-64 py-3 bg-white rounded-xl shadow-2xl border border-gray-200 z-60"
                              onMouseEnter={() => setActiveNestedDropdown(dropdownIndex)}
                              onMouseLeave={() => setActiveNestedDropdown(null)}
                            >
                              {dropdownItem.nestedItems.map((nestedItem, nestedIndex) => (
                                <a
                                  key={nestedIndex}
                                  href={nestedItem.href}
                                  className="block px-6 py-3 text-base font-medium transition-all duration-300 flex items-center hover:bg-yellow-50 hover:text-yellow-600"
                                  style={{color: '#000E3D'}}
                                >
                                  <span className="mr-3 text-sm">{nestedItem.icon}</span>
                                  {nestedItem.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="px-4 py-3 border-t border-gray-100 bg-gradient-to-r from-yellow-50 to-yellow-100">
                        <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                          View All Services →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="nav-mobile-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced for nested items */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-b-xl border-t border-gray-100">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-2xl font-bold hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                    style={{color: '#000E3D'}}
                  >
                    {item.name}
                  </a>
                  {item.hasDropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <div key={dropdownIndex}>
                          <a
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-xl hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 flex items-center"
                            style={{color: '#000E3D'}}
                          >
                            <span className="mr-2 text-lg">{dropdownItem.icon}</span>
                            {dropdownItem.name}
                          </a>
                          {dropdownItem.hasNested && (
                            <div className="ml-6 space-y-1">
                              {dropdownItem.nestedItems.map((nestedItem, nestedIndex) => (
                                <a
                                  key={nestedIndex}
                                  href={nestedItem.href}
                                  className="block px-4 py-2 text-lg hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 flex items-center"
                                  style={{color: '#000E3D'}}
                                >
                                  <span className="mr-2 text-sm">{nestedItem.icon}</span>
                                  {nestedItem.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;