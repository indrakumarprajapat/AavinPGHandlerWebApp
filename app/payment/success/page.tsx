'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState({
    status: '',
    orderId: '',
    amount: '',
    message: '',
    trackingId: ''
  });

  useEffect(() => {
    setPaymentData({
      status: searchParams.get('status') || '',
      orderId: searchParams.get('orderId') || '',
      amount: searchParams.get('amount') || '',
      message: searchParams.get('message') || '',
      trackingId: searchParams.get('trackingId') || ''
    });
  }, [searchParams]);

  const getStatusIcon = () => {
    switch (paymentData.status) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'cancelled':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const getStatusColor = () => {
    switch (paymentData.status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'cancelled':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusMessage = () => {
    switch (paymentData.status) {
      case 'success':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      case 'cancelled':
        return 'Payment Cancelled';
      default:
        return 'Payment Status Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">
          {getStatusIcon()}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {getStatusMessage()}
        </h1>
        
        {paymentData.orderId && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Payment Details:</p>
            <p className="font-mono text-sm mb-1">Order ID: {paymentData.orderId}</p>
            {paymentData.amount && (
              <p className="font-mono text-sm mb-1">Amount: ₹{paymentData.amount}</p>
            )}
            {paymentData.trackingId && (
              <p className="font-mono text-sm mb-1">Tracking ID: {paymentData.trackingId}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Transaction processed at {new Date().toLocaleString()}
            </p>
          </div>
        )}
        
        {paymentData.message && (
          <p className="text-gray-600 mb-6">{paymentData.message}</p>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => window.close()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close Window
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}