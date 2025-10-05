import React from 'react';
import { Link } from 'react-router-dom';

const UKFormationHome = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">UK Company Formation</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our UK company services and select the one that suits you best.
          </p>
        </header>

        <nav aria-label="UK formation services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/company-formation/uk/company-registration" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Company Registration</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Register your UK Limited company quickly and reliably.</p>
          </Link>
          <Link to="/company-formation/uk/annual-accounts" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Annual Accounts</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">File your annual accounts with full compliance.</p>
          </Link>
          <Link to="/company-formation/uk/company-closure" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Company Closure</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Dissolve your company with expert guidance.</p>
          </Link>
          <Link to="/company-formation/uk/name-change" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Name Change</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Update your company name officially.</p>
          </Link>
          <Link to="/company-formation/uk/structural-change" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Structural Change</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Modify shareholding or company structure.</p>
          </Link>
          <Link to="/company-formation/uk/confirmation-statement" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Confirmation Statement</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">File your CS01 statement accurately.</p>
          </Link>
          <Link to="/company-formation/uk/eori-application" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">EORI Application</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Apply for your EORI number.</p>
          </Link>
          <Link to="/company-formation/uk/vat-registration" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">VAT Registration</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Register for VAT hassle-free.</p>
          </Link>
          <Link to="/company-formation/uk/vat-return" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">VAT Return</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">File periodic VAT returns correctly.</p>
          </Link>
          <Link to="/company-formation/uk/bank-accounts" className="group bg-white rounded-2xl shadow p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">UK Bank Accounts</h2>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-2 text-gray-600">Open UK business bank accounts.</p>
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default UKFormationHome;