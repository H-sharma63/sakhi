// filepath: d:\Next Project\sakhi\components\CartDrawer.tsx
import React, { FC } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartDrawer: FC = () => {
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
      <div 
        className="fixed inset-0 bg-[#550000]/50 z-[100]"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#550000] shadow-lg z-[200]">
        <div className="p-4 flex justify-between items-center border-b-2 border-[#F6F1E7] bg-[#550000]">
          <h2 className="text-[#F6F1E7] text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#F6F1E7]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-200px)] p-4 bg-[#550000]">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 mb-4 p-2 bg-[#550000] rounded shadow-sm border border-[#F6F1E7]/20">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-[#F6F1E7] font-medium">{item.name}</h3>
                <p className="text-[#F6F1E7]/80">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-2 py-1 bg-[#F6F1E7]/10 text-[#F6F1E7] rounded hover:bg-[#F6F1E7]/20">-</button>
                  <span className="text-[#F6F1E7]">{item.quantity}</span>
                  <button className="px-2 py-1 bg-[#F6F1E7]/10 text-[#F6F1E7] rounded hover:bg-[#F6F1E7]/20">+</button>
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

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#550000] border-t border-[#F6F1E7]/20">
            <div className="flex justify-between mb-4">
              <span className="text-[#F6F1E7]">Total:</span>
              <span className="text-[#F6F1E7] font-bold">{formatPrice(total)}</span>
            </div>
            <button className="w-full py-3 bg-[#F6F1E7] text-[#550000] rounded-md font-medium hover:bg-[#F6F1E7]/90">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;