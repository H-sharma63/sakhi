'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-[#550000] mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-2">
          Thank you for your purchase.
        </p>
        
        <p className="text-gray-600 mb-6">
          Your order ID: <span className="font-medium">{orderId}</span>
        </p>

        <Link 
          href="/"
          className="block w-full py-3 bg-[#550000] text-[#F6F1E7] rounded-md font-medium
            hover:bg-[#440000] transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}