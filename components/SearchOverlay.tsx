'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X as CloseIcon, Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products'; // <-- real products

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const results = term
      ? products.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        )
      : [];
    setSearchResults(results);
  };

  const handleProductClick = (slug: string) => {
    onClose(); // close the search overlay
    router.push(`/products/${slug}`); // navigate to product page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // onSearch(searchTerm);
      setSearchTerm('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-[100px]">
      <div className="bg-[#550000] p-8 rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#F6F1E7] text-xl font-bold">Search</h2>
          <button
            onClick={onClose}
            className="text-[#F6F1E7] hover:text-white"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-4 rounded bg-white/10 text-[#F6F1E7] placeholder-[#F6F1E7]/60 outline-none focus:ring-2 focus:ring-[#F6F1E7]/50"
            autoComplete="off"
            autoFocus
          />
        </form>

        {/* Search Results */}
        <div className="mt-6">
          {searchTerm && (
            <h2 className="text-sm text-gray-500 mb-4">
              {searchResults.length} results for "{searchTerm}"
            </h2>
          )}
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                onClick={() => handleProductClick(result.slug)}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
              >
                <div className="w-16 h-16 bg-gray-200 rounded mr-4" />
                <div>
                  <h3 className="font-medium">{result.name}</h3>
                  <p className="text-gray-600">₹{result.price}</p>
                </div>
              </div>
            ))}
          </div>

          {searchTerm && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No results found for "{searchTerm}"
            </div>
          )}
          {!searchTerm && (
            <div className="text-center py-8 text-gray-500">
              Start typing to search for products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
