import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Business Solutions', 
      href: '/business-solutions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Company Logo Creation', href: '/business-solutions/logo-creation' },
        { name: 'Registered Agent Services', href: '/business-solutions/registered-agent' },
        { name: 'UK Shared Offices', href: '/business-solutions/uk-shared-offices' },
        { name: 'Trademark Registration UK', href: '/business-solutions/trademark-uk' }
      ]
    },
    { 
      name: 'Company Formation', 
      href: '/company-formation',
      hasDropdown: true,
      hasNestedDropdown: true,
      dropdownItems: [
        { 
          name: 'USA', 
          href: '/company-formation/usa', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="us-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#us-flag)">
                <path fill="#bd3d44" d="M0 0h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z"/>
                <path fill="#fff" d="M0 37h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z"/>
                <path fill="#192f5d" d="M0 0h364v259H0z"/>
              </g>
            </svg>
          ),
          hasSubDropdown: true,
          subItems: [
            { name: 'LLC Formation', href: '/company-formation/usa/llc' },
            { name: 'USA Tax', href: '/company-formation/usa/tax' },
            { name: 'ITIN', href: '/company-formation/usa/itin' },
            { name: 'Trademark', href: '/company-formation/usa/trademark' },
            { name: 'Complete Package', href: '/company-formation/usa/complete-package' }
          ]
        },
        { 
          name: 'UK', 
          href: '/company-formation/uk', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="uk-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#uk-flag)">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#fff" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                <path fill="#c8102e" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l246-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                <path fill="#fff" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                <path fill="#c8102e" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
              </g>
            </svg>
          ),
          hasSubDropdown: true,
          subItems: [
            { name: 'Company Registration', href: '/company-formation/uk/registration' },
            { name: 'Company Annual Accounts Filing', href: '/company-formation/uk/annual-accounts' },
            { name: 'Company Closure Dissolution', href: '/company-formation/uk/closure' },
            { name: 'Company Name Change', href: '/company-formation/uk/name-change' },
            { name: 'Company Structural Change', href: '/company-formation/uk/structural-change' },
            { name: 'Confirmation Statement Filing', href: '/company-formation/uk/confirmation-statement' },
            { name: 'EORI Number Application', href: '/company-formation/uk/eori' },
            { name: 'VAT Number Registration', href: '/company-formation/uk/vat-registration' },
            { name: 'VAT Return Filing', href: '/company-formation/uk/vat-return' },
            { name: 'UK Bank Accounts', href: '/company-formation/uk/bank-accounts' }
          ]
        },
        { 
          name: 'Pakistan', 
          href: '/company-formation/pakistan', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="pk-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#pk-flag)">
                <path fill="#01411c" d="M0 0h640v480H0z"/>
                <path fill="#fff" d="M0 0h160v480H0z"/>
                <g fill="#fff">
                  <path d="m423 237 24 73h-76l62-46-62-46h76zm-81 91a50 50 0 1 1 0-100 50 50 0 0 1 0 100z"/>
                </g>
              </g>
            </svg>
          ),
          hasSubDropdown: true,
          subItems: [
            { name: 'SECP', href: '/company-formation/pakistan/secp' },
            { name: 'PSEB', href: '/company-formation/pakistan/pseb' },
            { name: 'FBR', href: '/company-formation/pakistan/fbr' }
          ]
        },
        { 
          name: 'UAE', 
          href: '/company-formation/uae', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="ae-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#ae-flag)">
                <path fill="#00732f" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#000" d="M0 320h640v160H0z"/>
                <path fill="#ce1126" d="M0 0h220v480H0z"/>
              </g>
            </svg>
          ),
          hasSubDropdown: true,
          subItems: [
            { name: 'SPC Free Zone', href: '/company-formation/uae/spc-free-zone' }
          ]
        },
        { 
          name: 'Canada (Coming Soon)', 
          href: '/company-formation/canada', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="ca-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#ca-flag)">
                <path fill="#fff" d="M0 0h640v480H0z"/>
                <path fill="#ff0000" d="M0 0h160v480H0zm480 0h160v480H480z"/>
                <path fill="#ff0000" d="m320 100-24 76h-32l24-76-24-76h32l24 76 24-76h32l-24 76 24 76h-32z"/>
              </g>
            </svg>
          ), 
          isDisabled: true 
        },
        { 
          name: 'Turkey (Coming Soon)', 
          href: '/company-formation/turkey', 
          flag: (
            <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
              <defs>
                <clipPath id="tr-flag">
                  <path d="M0 0h640v480H0z"/>
                </clipPath>
              </defs>
              <g clipPath="url(#tr-flag)">
                <path fill="#e30a17" d="M0 0h640v480H0z"/>
                <circle cx="200" cy="240" r="60" fill="#fff"/>
                <circle cx="220" cy="240" r="48" fill="#e30a17"/>
                <path fill="#fff" d="m280 200 15 46h48l-39 28 15 46-39-28-39 28 15-46-39-28h48z"/>
              </g>
            </svg>
          ), 
          isDisabled: true 
        }
      ]
    },
    { 
      name: 'E-commerce', 
      href: '/ecommerce',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Amazon', href: '/ecommerce/amazon' },
        { name: 'Walmart', href: '/ecommerce/walmart' },
        { name: 'Etsy', href: '/ecommerce/etsy' }
      ]
    },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' }
  ];

  return (
    <nav className="fixed top-0 sm:top-2 md:top-4 left-0 right-0 sm:left-2 sm:right-2 md:left-4 md:right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-50">
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-none sm:rounded-xl md:rounded-full border border-gray-200/50 px-3 sm:px-5 md:px-8 lg:px-10 py-2 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center h-10 sm:h-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
              <img 
                src={logo} 
                alt="Elite Filing Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight" style={{color: '#041e72'}}>Elite Filing</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      className="text-gray-600 hover:text-blue-700 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium flex items-center transition-all duration-300 hover:bg-blue-50 rounded-full"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-blue-700 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-full block"
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                        <div 
                          className="absolute top-full left-0 mt-3 w-64 md:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50"
                          onMouseEnter={() => setActiveDropdown(index)}
                          onMouseLeave={() => {
                            setActiveDropdown(null);
                            setActiveSubDropdown(null);
                          }}
                        >
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            item.hasNestedDropdown ? (
                              <div key={dropdownIndex} className="relative">
                                <div
                                  className={`flex items-center justify-between px-5 py-3 text-sm transition-all duration-300 cursor-pointer rounded-xl mx-2 ${
                                    dropdownItem.isDisabled 
                                      ? 'text-gray-400 cursor-not-allowed' 
                                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 hover:shadow-sm'
                                  }`}
                                  onMouseEnter={() => dropdownItem.hasSubDropdown && setActiveSubDropdown(dropdownIndex)}
                                  onClick={dropdownItem.isDisabled ? (e) => e.preventDefault() : undefined}
                                >
                                  <div className="flex items-center">
                                    {dropdownItem.flag && <div className="mr-3">{dropdownItem.flag}</div>}
                                    {dropdownItem.name}
                                  </div>
                                  {dropdownItem.hasSubDropdown && (
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  )}
                                </div>
                                
                                {dropdownItem.hasSubDropdown && activeSubDropdown === dropdownIndex && (
                                  <div className="absolute left-full top-0 ml-2 w-64 md:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50">
                                    {dropdownItem.subItems.map((subItem, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        to={subItem.href}
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-300 rounded-xl mx-2 hover:shadow-sm"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                className="block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-300 rounded-xl mx-2 hover:shadow-sm"
                              >
                                {dropdownItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button & Mobile menu button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:block">
              <Link
                  to="/get-started"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 md:px-7 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center min-w-[100px] sm:min-w-[120px]"
                >
                  Get Started
              </Link>
            </div>
            <div className="lg:hidden">
              <button 
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="text-gray-600 hover:text-gray-900 p-2 transition-colors duration-200"
>
  {isMobileMenuOpen ? (
    <XMarkIcon className="w-6 h-6" />
  ) : (
    <Bars3Icon className="w-6 h-6" />
  )}
</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation - Improved positioning and styling */}
      {isMobileMenuOpen && (
        <div className="fixed lg:hidden bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 mt-1 sm:mt-2 rounded-b-xl mx-0 sm:mx-2 left-0 right-0 sm:left-2 sm:right-2 md:left-4 md:right-4 lg:left-8 lg:right-8 z-40 max-w-[1400px] mx-auto">
          <div className="px-4 sm:px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className="w-full text-left text-gray-600 hover:text-blue-700 py-2.5 text-sm font-medium transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className="pl-4 space-y-1 mt-2 max-h-64 overflow-y-auto">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          item.hasNestedDropdown ? (
                            <div key={dropdownIndex}>
                              <div 
                                className={`flex items-center justify-between px-3 py-3 text-sm rounded-md transition-colors duration-200 cursor-pointer ${
                                  dropdownItem.isDisabled 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                }`}
                                onClick={() => {
                                  if (!dropdownItem.isDisabled && dropdownItem.hasSubDropdown) {
                                    setActiveSubDropdown(activeSubDropdown === dropdownIndex ? null : dropdownIndex);
                                  }
                                }}
                              >
                                <div className="flex items-center">
                                  {dropdownItem.flag && <div className="mr-3">{dropdownItem.flag}</div>}
                                  {dropdownItem.name}
                                </div>
                                {dropdownItem.hasSubDropdown && (
                                  <svg 
                                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                                      activeSubDropdown === dropdownIndex ? 'rotate-90' : ''
                                    }`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </div>
                              
                              {dropdownItem.hasSubDropdown && activeSubDropdown === dropdownIndex && (
                                <div className="pl-6 space-y-1 mt-2">
                                  {dropdownItem.subItems.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      to={subItem.href}
                                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.href} 
                    className="block text-gray-600 hover:text-blue-700 py-2.5 text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="pt-4 px-2">
              <Link
                to="/get-started"
                className="block w-full max-w-[280px] mx-auto text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;