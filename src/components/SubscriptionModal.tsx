import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'monthly' | 'yearly';
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          priceId: plan === 'monthly' 
            ? import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID 
            : import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
          plan
        })
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError('Failed to create checkout session');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const planDetails = {
    monthly: {
      price: '$3',
      period: 'month',
      total: '$3/month',
      description: 'Billed monthly'
    },
    yearly: {
      price: '$20',
      period: 'year',
      total: '$20/year',
      description: 'Billed annually • Save 44%'
    }
  };

  const details = planDetails[plan];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⭐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Go Premium
          </h2>
          <p className="text-gray-600">
            Unlock all 15 premium sounds
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-5xl font-bold text-gray-800">{details.price}</span>
            <span className="text-gray-600 ml-2">/{details.period}</span>
          </div>
          <p className="text-center text-purple-600 font-medium">{details.description}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Access to all 15 premium sounds</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Unlimited mixing and layering</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">High-quality audio files</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Cancel anytime</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold text-lg transition-all disabled:opacity-50 shadow-lg"
        >
          {loading ? 'Loading...' : 'Continue to Checkout'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};

export default SubscriptionModal;
