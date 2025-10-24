import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import apiMethods from '../../services/api';
import { addNotification as addUiNotification } from '../../store/slices/uiSlice';

const DEFAULT_CURRENCY = 'USD';

const LLC_SERVICE_PRICES = {
  'LLC formation': 99,
  'EIN registration': 470,
  'Registered Agent Service': 300,
  'Bank Account': 95,
  'Business Address': 499,
  'Phone Number': 90,
  'Resale Certificate': 70,
  'Complete Package': 0,
};

function normalizeItemsFromServices(services = []) {
  const hasComplete = services.includes('Complete Package');
  const itemized = services
    .filter((s) => s !== 'Complete Package')
    .map((name) => ({ id: name, label: name, price: LLC_SERVICE_PRICES[name] || 0, qty: 1 }));
  return { items: itemized, hasCompletePackage: hasComplete };
}

function computeTotals(items, { hasCompletePackage, taxRate = 0, currency = DEFAULT_CURRENCY } = {}) {
  const subtotal = items.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);
  const discount = hasCompletePackage ? subtotal * 0.1 : 0;
  const taxedBase = Math.max(subtotal - discount, 0);
  const taxes = taxRate > 0 ? taxedBase * taxRate : 0;
  const total = Math.max(taxedBase + taxes, 0);
  return { currency, subtotal, discount, taxes, total };
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const {
    formType = 'USA LLC Formation',
    items: passedItems,
    currency = DEFAULT_CURRENCY,
    taxRate,
    backPath = '/USA/LLC-Formation',
    services,
  } = location.state || {};

  const { items: serviceItems, hasCompletePackage } = useMemo(() => normalizeItemsFromServices(services || []), [services]);

  const items = useMemo(() => {
    const base = Array.isArray(passedItems) ? passedItems : serviceItems;
    return base.map((it) => ({ ...it, price: Number(it.price) || 0, qty: Number(it.qty) || 1 }));
  }, [passedItems, serviceItems]);

  const currencySymbol = useMemo(() => {
    const fromState = location?.state?.currencySymbol;
    if (typeof fromState === 'string' && fromState.length > 0) return fromState;
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'AED': return 'د.إ';
      case 'PKR': return '₨';
      default: return '$';
    }
  }, [currency, location?.state?.currencySymbol]);

  const totals = useMemo(() => computeTotals(items, { hasCompletePackage, taxRate, currency }), [items, hasCompletePackage, taxRate, currency]);
  const [processing, setProcessing] = useState(false);

  function notify(severity, message) {
    dispatch(addUiNotification({ severity, message }));
  }

  function validate() {
    if (!auth?.isAuthenticated) {
      notify('warning', 'Please sign in to proceed with payment.');
      navigate('/login', { state: { redirectTo: location.pathname, payload: location.state } });
      return false;
    }
    if (!items || items.length === 0) {
      notify('error', 'No items selected. Please go back and select services.');
      return false;
    }
    const invalidItem = items.find((it) => !it.label || isNaN(it.price) || isNaN(it.qty));
    if (invalidItem) {
      notify('error', 'Invalid item detected. Please review your selections.');
      return false;
    }
    return true;
  }

  async function handleConfirmAndPay() {
    if (!validate()) return;
    setProcessing(true);
    try {
      const payload = {
        formType,
        currency,
        items: items.map((it) => ({ id: it.id, label: it.label, amount: it.price, qty: it.qty })),
        totals,
        hasCompletePackage,
      };
      const paymentsApi = apiMethods?.payments?.createCheckoutSession;
      if (typeof paymentsApi === 'function') {
        const res = await paymentsApi(payload);
        const url = res?.data?.url || res?.url;
        if (url) {
          window.location.assign(url);
          return;
        }
        notify('error', 'Payment provider did not return a redirect URL.');
      } else {
        notify('info', 'Payment processing not yet configured. Please contact support or try again later.');
      }
    } catch (err) {
      console.error('Payment error', err);
      notify('error', err?.response?.data?.message || err?.message || 'Payment processing failed.');
    } finally {
      setProcessing(false);
    }
  }

  const handleBack = () => navigate(backPath, { state: location.state });

  const itemizedServices = items.map((it) => it.label);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-6">
          <button onClick={handleBack} className="text-blue-600 hover:text-blue-800">&larr; Back to form</button>
        </div>
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900">{formType} Payment</h1>
          <p className="mt-1 text-sm text-gray-600">Review your selected services and charges below.</p>

          {itemizedServices.length === 0 ? (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-4">
              <p>No items selected. Please go back and choose your services.</p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="divide-y divide-gray-200 border border-gray-200 rounded">
                {items.map((it) => (
                  <div key={it.id || it.label} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-900">{it.label}</span>
                    </div>
                    <div className="text-gray-900 font-medium">{currencySymbol}{(it.price * it.qty).toFixed(2)} {currency}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-gray-50">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-semibold">{currencySymbol}{totals.subtotal.toFixed(2)} {currency}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 text-green-800">
                  <span>Discount{hasCompletePackage ? ' (Complete Package 10%)' : ''}</span>
                  <span className="font-semibold">- {currencySymbol}{totals.discount.toFixed(2)} {currency}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50">
                  <span>Taxes{typeof taxRate === 'number' && taxRate > 0 ? ` (${(taxRate * 100).toFixed(2)}%)` : ''}</span>
                  <span className="text-gray-900 font-semibold">{currencySymbol}{totals.taxes.toFixed(2)} {currency}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                  <span className="font-semibold">Total Due</span>
                  <span className="font-bold">{currencySymbol}{totals.total.toFixed(2)} {currency}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button onClick={handleBack} className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">Back to form</button>
                <button onClick={handleConfirmAndPay} disabled={processing || items.length === 0} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed">
                  {processing ? 'Processing...' : 'Confirm and Pay'}
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