import { useState, useEffect } from 'react';
import type { Address, NewAddress } from '@/db/schema';

export function useAddresses(userId: string) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/addresses?userId=${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch addresses');
      }
      
      setAddresses(data.addresses || []);
    } catch (err) {
      console.error('Fetch addresses error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async (addressData: NewAddress) => {
    try {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      await fetchAddresses();
      return data.address;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to save address');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  return { addresses, loading, error, saveAddress, fetchAddresses };
}