import React from 'react';
import { Link } from 'react-router-dom';

const CompanyFormationHome = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Company Formation</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Choose your region to explore company formation services tailored to your needs.
          </p>
        </header>

        <nav aria-label="Company formation regions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/company-formation/usa" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">USA</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Form LLCs, apply for ITIN, file taxes, and more.</p>
          </Link>

          <Link to="/company-formation/uk" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">United Kingdom</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Register companies, file accounts, VAT, and more.</p>
          </Link>

          <Link to="/company-formation/pakistan/secp" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Pakistan</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">SECP, PSEB, FBR registrations and compliance.</p>
          </Link>

          <Link to="/company-formation/uae/spc-free-zone" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">UAE</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">SPC Free Zone formation and services.</p>
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default CompanyFormationHome;