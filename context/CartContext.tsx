'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  handleCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialItems = [
    {
      id: "1",
      name: "Traditional Silk Saree",
      price: 4999,
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
    {
      id: "2",
      name: "Designer Lehenga",
      price: 6999,
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
    {
      id: "3",
      name: "Embroidered Kurti",
      price: 1499,
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
    {
      id: "4",
      name: "Banarasi Saree",
      price: 5999,
      image: "https://via.placeholder.com/150",
      quantity: 1
    }
  ];

  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(current => {
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        return current.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      handleCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};