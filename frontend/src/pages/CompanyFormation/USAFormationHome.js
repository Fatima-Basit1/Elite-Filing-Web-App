import React from 'react';
import { Link } from 'react-router-dom';

const USAFormationHome = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">USA Company Formation</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our USA services and choose the option that fits your business.
          </p>
        </header>

        <nav aria-label="USA formation services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/company-formation/usa/llc-formation" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">LLC Formation</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Form your Limited Liability Company in the USA.</p>
          </Link>
          <Link to="/company-formation/usa/tax" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">USA Tax</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Navigate US tax requirements confidently.</p>
          </Link>
          <Link to="/company-formation/usa/itin" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">ITIN</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Apply for your Individual Taxpayer Identification Number.</p>
          </Link>
          <Link to="/company-formation/usa/trademark" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Trademark</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Protect your brand identity in the US.</p>
          </Link>
          <Link to="/company-formation/usa/complete-package" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Complete Package</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">All-in-one setup for your US company.</p>
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default USAFormationHome;