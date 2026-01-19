import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Heart, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate?success=true`,
      },
    });

    if (submitError) {
      setError(submitError.message);
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
        <div className="text-sm text-slate-600 mb-1">Your donation</div>
        <div className="text-3xl font-bold text-blue-600">${amount}</div>
      </div>

      <PaymentElement />

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="w-5 h-5 mr-2" />
            Donate ${amount}
          </>
        )}
      </Button>
    </form>
  );
}

export default function StripePaymentForm() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
      setCustomAmount(value);
    } else {
      setCustomAmount(value);
    }
  };

  const createPaymentIntent = async () => {
    setIsCreatingIntent(true);
    try {
      // Call your backend function to create a Stripe Payment Intent
      const response = await base44.integrations.Stripe.CreatePaymentIntent({
        amount: selectedAmount * 100, // Stripe uses cents
        currency: 'usd',
        description: 'Hope Bridge Donation'
      });
      
      setClientSecret(response.client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Unable to initialize payment. Please contact us directly.');
    } finally {
      setIsCreatingIntent(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">
          Thank you for your donation!
        </h3>
        <p className="text-slate-600 mb-6">
          Your generous contribution of ${selectedAmount} will help us support Asian teens in our community.
        </p>
        <Button
          onClick={() => {
            setPaymentSuccess(false);
            setClientSecret(null);
            setSelectedAmount(100);
          }}
          variant="outline"
        >
          Make Another Donation
        </Button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold text-slate-900 mb-4 block">
            Select Donation Amount
          </Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAmountSelect(amount)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedAmount === amount && !customAmount
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="font-bold">${amount}</div>
              </button>
            ))}
          </div>
          
          <div>
            <Label htmlFor="custom-amount" className="text-sm text-slate-600 mb-2 block">
              Or enter custom amount
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="pl-8 py-6 text-lg"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={createPaymentIntent}
          disabled={!selectedAmount || selectedAmount < 1 || isCreatingIntent}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg"
        >
          {isCreatingIntent ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Continue to Payment
              <span className="ml-2 font-bold">${selectedAmount}</span>
            </>
          )}
        </Button>

        <p className="text-xs text-center text-slate-500">
          Secure payment powered by Stripe • Tax-deductible donation
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb',
            borderRadius: '12px',
          },
        },
      }}
    >
      <CheckoutForm amount={selectedAmount} onSuccess={() => setPaymentSuccess(true)} />
    </Elements>
  );
}