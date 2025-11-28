'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const paymentData = {
    status: searchParams.get('status') || '',
    orderId: searchParams.get('orderId') || '',
    amount: searchParams.get('amount') || '',
    message: searchParams.get('message') || '',
    trackingId: searchParams.get('trackingId') || ''
  };



  const getStatusConfig = () => {
    switch (paymentData.status) {
      case 'success':
        return {
          icon: '✓',
          title: 'Payment Successful',
          bgColor: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'failed':
        return {
          icon: '✕',
          title: 'Payment Failed',
          bgColor: 'bg-red-50',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      case 'cancelled':
        return {
          icon: '!',
          title: 'Payment Cancelled',
          bgColor: 'bg-yellow-50',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          icon: '?',
          title: 'Payment Status Unknown',
          bgColor: 'bg-gray-50',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`min-h-screen ${statusConfig.bgColor} flex items-center justify-center p-4`}>
      <div className={`max-w-lg w-full bg-white rounded-xl shadow-xl border ${statusConfig.borderColor} overflow-hidden`}>
        {/* Header */}
        <div className={`${statusConfig.bgColor} px-8 py-6 border-b ${statusConfig.borderColor}`}>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${statusConfig.iconBg} rounded-full mb-4`}>
              <span className={`text-2xl font-bold ${statusConfig.iconColor}`}>{statusConfig.icon}</span>
            </div>
            <h1 className={`text-2xl font-bold ${statusConfig.titleColor}`}>{statusConfig.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {paymentData.message && (
            <div className="mb-6 text-center">
              <p className="text-gray-700">{paymentData.message}</p>
            </div>
          )}

          {paymentData.orderId && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Order ID</span>
                  <span className="font-mono text-sm font-medium text-gray-900">{paymentData.orderId}</span>
                </div>
                {paymentData.amount && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Amount</span>
                    <span className="font-semibold text-lg text-gray-900">₹{paymentData.amount}</span>
                  </div>
                )}
                {paymentData.trackingId && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Transaction ID</span>
                    <span className="font-mono text-sm font-medium text-gray-900">{paymentData.trackingId}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Date & Time</span>
                  <span className="text-sm text-gray-900">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {/* <button
              onClick={() => window.location.href = '/'}
              className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
                paymentData.status === 'success' 
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {paymentData.status === 'success' ? 'Continue Shopping' : 'Try Again'}
            </button> */}
            
            <button
              onClick={() => window.close()}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close Window
            </button>
          </div>
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