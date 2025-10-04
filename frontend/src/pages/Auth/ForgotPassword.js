import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { forgotPassword } from '../../store/slices/authSlice';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    try {
      const action = await dispatch(forgotPassword({ email: email.trim().toLowerCase() }));
      if (forgotPassword.fulfilled.match(action)) {
        setMessage(action.payload || 'If the email exists, a reset link was sent.');
      } else {
        setError(action.payload || 'Failed to process request');
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto max-w-md py-16 px-4">
        <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="you@example.com"
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {message && <p className="text-green-600 mb-2">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <button
          className="mt-4 text-blue-600"
          onClick={() => navigate('/get-started')}
        >
          Back to Sign In
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;