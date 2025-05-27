'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAddresses } from '@/hooks/useAddresses';
import { X, MoreVertical, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Notification } from '@/components/Notification';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useUserId } from '@/hooks/useUserId';

// Move interfaces to the top
interface CustomerDetails {
  name: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
}

interface Address extends CustomerDetails {
  id: string | number;
  isDefault?: boolean;
}

const CheckoutPage = () => {
  const { items } = useCart();
  const router = useRouter();
  const userId = useUserId();
  const { addresses, loading: addressLoading, saveAddress, fetchAddresses } = useAddresses(userId);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  
  const initialFormState: CustomerDetails = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  };

  const [formData, setFormData] = useState<CustomerDetails>(initialFormState);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Load saved customer details if they exist
  useEffect(() => {
    const savedDetails = localStorage.getItem('customerDetails');
    if (savedDetails) {
      setFormData(JSON.parse(savedDetails));
    }
  }, []);

  const resetForm = () => {
    setFormData(initialFormState);
  };

  useEffect(() => {
    const clearForm = () => {
      setFormData(initialFormState);
      localStorage.removeItem('customerDetails');
    };

    clearForm(); // Clear form on mount

    window.addEventListener('beforeunload', clearForm);
    return () => window.removeEventListener('beforeunload', clearForm);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await saveAddress({
        userId, // Make sure userId is included
        ...formData,
        isDefault: addresses.length === 0
      });

      setFormData(initialFormState);
      localStorage.removeItem('customerDetails');
      setNotification({
        message: 'Address saved successfully!',
        type: 'success'
      });
      await fetchAddresses();
    } catch (error) {
      console.error('Save error:', error);
      setNotification({
        message: error instanceof Error ? error.message : 'Failed to save address',
        type: 'error'
      });
    }
  };

  const handleUseAddress = (address: Address) => {
    // Ensure we're working with number type
    setSelectedAddress(Number(address.id));
    setFormData({
      name: address.name,
      email: address.email,
      mobile: address.mobile,
      address: address.address,
      pincode: address.pincode,
      city: address.city,
      state: address.state
    });
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      name: address.name,
      email: address.email,
      mobile: address.mobile,
      address: address.address,
      pincode: address.pincode,
      city: address.city,
      state: address.state
    });
    setSelectedAddress(null); // Clear selected address when editing
    setActiveDropdown(null);
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      // Compare with number type
      if (selectedAddress === Number(addressId)) {
        setSelectedAddress(null);
      }

      await fetchAddresses();
      setActiveDropdown(null);
      setNotification({
        message: 'Address deleted successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: error instanceof Error ? error.message : 'Failed to delete address',
        type: 'error'
      });
    }
    setConfirmDelete(null);
  };

  const handleDeleteClick = (addressId: number) => {
    setConfirmDelete(Number(addressId));
    setActiveDropdown(null);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const orderData = {
        customerDetails: selectedAddress ? 
          addresses.find(addr => addr.id === selectedAddress) : formData,
        items,
        total,
        orderDate: new Date().toISOString()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process order');
      }

      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (error) {
      console.error('Order error:', error);
      setError(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  // Add useEffect to load addresses on mount
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  // Wait for userId to be available before rendering
  if (!userId) {
    return <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#550000]"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#F6F1E7] py-12">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this address?"
          onConfirm={() => handleDeleteAddress(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <button 
        onClick={() => router.push('/')}
        className="fixed top-4 right-4 text-[#550000] hover:text-[#440000] transition-colors duration-300 z-50"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Section */}
          <div>
            {addresses.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-[#550000] mb-2">Saved Addresses</h3>
                <p className="text-sm text-gray-500 italic mb-4">Click an address to select it</p>
                <div className="grid gap-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id}
                      onClick={() => handleUseAddress(address)}
                      className={`p-4 border rounded-lg relative cursor-pointer ${
                        selectedAddress === Number(address.id)
                          ? 'border-[#550000] bg-[#550000]/5' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium">{address.name}</p>
                          <p className="text-sm text-gray-600">{address.address}</p>
                          <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                          {selectedAddress === address.id && (
                            <span className="text-sm text-[#550000] font-medium mt-2 block">Selected</span>
                          )}
                        </div>
                        
                        {/* Actions Dropdown */}
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === Number(address.id) ? null : Number(address.id));
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                          </button>
                          
                          {activeDropdown === Number(address.id) && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Address
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(Number(address.id));
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Address
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedAddress && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#550000]">Customer Details</h2>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#550000] text-[#F6F1E7] rounded-md font-medium 
                      hover:bg-[#440000] transition-colors duration-300"
                  >
                    Save Address
                  </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      required
                      pattern="[0-9]{10}"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        required
                        pattern="[0-9]{6}"
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        id="city"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      id="state"
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#550000] focus:border-[#550000]"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
            <h2 className="text-2xl font-bold text-[#550000] mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading || (!selectedAddress && !formData.address)}
              className={`w-full mt-6 py-3 ${
                isLoading || (!selectedAddress && !formData.address)
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#550000] hover:bg-[#440000]'
              } text-[#F6F1E7] rounded-md font-medium transition-colors duration-300`}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;