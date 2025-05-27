'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';

const CartDrawer: FC = () => {
  const router = useRouter();
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay with zero opacity */}
      <div 
        className="fixed inset-0 bg-transparent z-[100]"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-[100%] lg:w-[50%] bg-[#550000] shadow-lg z-[200] flex flex-col">
        {/* Cart Header */}
        <div className="p-4 flex justify-between items-center border-b-2 border-[#F6F1E7] bg-[#550000]">
          <h2 className="text-[#F6F1E7] text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#F6F1E7]">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Cart Content with updated scrollbar */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#F6F1E7 transparent'
          }}
        >
          <div className="p-4 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4 p-2 bg-[#550000] rounded shadow-sm border border-[#F6F1E7]/20">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-[#F6F1E7] font-medium">{item.name}</h3>
                  <p className="text-[#F6F1E7]/80">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      className="px-2 py-1 bg-[#F6F1E7]/10 text-[#F6F1E7] rounded hover:bg-[#F6F1E7]/20"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="text-[#F6F1E7]">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 bg-[#F6F1E7]/10 text-[#F6F1E7] rounded hover:bg-[#F6F1E7]/20"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-[#F6F1E7] hover:text-[#C98B8B] transition-colors duration-200"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Checkout Section */}
        <div className="p-4 bg-[#550000] border-t border-[#F6F1E7]/20">
          <div className="flex justify-between mb-4">
            <span className="text-[#F6F1E7]">Total:</span>
            <span className="text-[#F6F1E7] font-bold">{formatPrice(total)}</span>
          </div>
          <button 
            className="w-full py-3 bg-[#F6F1E7] text-[#550000] rounded-md font-medium 
              border-2 border-[#F6F1E7] 
              hover:bg-[#550000] hover:text-[#F6F1E7] 
              transition-all duration-300"
            onClick={() => {
              router.push('/checkout');
              setIsCartOpen(false);
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;