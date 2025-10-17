import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const PRICES = {
  'LLC formation': 99,
  'EIN registration': 470,
  'Registered Agent Service': 300,
  'Bank Account': 95,
  'Business Address': 499,
  'Phone Number': 90,
  'Resale Certificate': 70,
};

const INDIVIDUAL_SERVICES = [
  'LLC formation',
  'EIN registration',
  'Registered Agent Service',
  'Bank Account',
  'Business Address',
  'Phone Number',
  'Resale Certificate',
];

export default function LLCPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedServices = (location.state && location.state.services) || [];

  const hasCompletePackage = selectedServices.includes('Complete Package');
  const itemizedServices = hasCompletePackage ? INDIVIDUAL_SERVICES : selectedServices;

  const subtotal = itemizedServices.reduce((sum, svc) => sum + (PRICES[svc] || 0), 0);
  const discount = hasCompletePackage ? Math.round(subtotal * 0.10 * 100) / 100 : 0;
  const total = Math.round((subtotal - discount) * 100) / 100;

  const handleBack = () => navigate('/USA/LLC-Formation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="mb-6">
          <button onClick={handleBack} className="text-blue-600 hover:text-blue-800">&larr; Back to form</button>
        </div>
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-sm rounded-lg p-6"
        >
          <h1 className="text-2xl font-semibold text-gray-900">LLC Formation Payment</h1>
          <p className="mt-1 text-sm text-gray-600">Review your selected services and charges below.</p>

          {itemizedServices.length === 0 ? (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-4">
              <p>No services selected. Please go back and choose your services.</p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="divide-y divide-gray-200 border border-gray-200 rounded">
                {itemizedServices.map((svc) => (
                  <div key={svc} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-900">{svc}</span>
                    </div>
                    <div className="text-gray-900 font-medium">${PRICES[svc] || 0}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-gray-50">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-semibold">${subtotal}</span>
                </div>
                {hasCompletePackage && (
                  <div className="flex items-center justify-between p-4 bg-green-50 text-green-800">
                    <span>Complete Package discount (10%)</span>
                    <span className="font-semibold">- ${discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                  <span className="font-semibold">Total Due</span>
                  <span className="font-bold">${total}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => alert('Payment processing not yet integrated.')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Confirm and Pay
                </button>
              </div>
            </div>
          )}
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}