'use client'

import React, { FC, useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed -left-[10px] -top-[10px] right-[5px] w-[calc(100%+10px)] h-auto bg-[#550000] shadow-lg">
      <div className="relative w-full">
        <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto px-4 py-4 pt-[10px]">
          {/* Left side: Search Icon */}
          <div className="flex-1 pt-[20px] pl-[10px]">
            <div className="flex items-center justify-center bg-white bg-opacity-70 rounded-full
              w-[30px] h-[30px] ml-[15px] cursor-pointer 
              hover:bg-opacity-90 transition-all duration-300">
              <Search className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 pt-[20px]">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-[40px] w-[40px] object-contain" 
            />
          </div>

          {/* Desktop Cart & User Icons */}
          <div className="flex flex-1 justify-end pt-[20px] pr-[20px] space-x-[10px]">
            <div className="flex items-center justify-center bg-white bg-opacity-70 rounded-full
              w-[30px] h-[30px] cursor-pointer 
              hover:bg-opacity-90 transition-all duration-300">
              <ShoppingCart className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
            </div>
            <div className="flex items-center justify-center bg-white bg-opacity-70 rounded-full
              w-[30px] h-[30px] cursor-pointer 
              hover:bg-opacity-90 transition-all duration-300">
              <User className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="bg-[#550000] pt-[15px] pb-[10px]">
          <div className="flex flex-wrap justify-center space-x-[50px] py-3 px-2">
            <a href="/" className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors">Home</a>
            <a href="/about" className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors">About</a>
            <a href="/services" className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors">Services</a>
            <a href="/contact" className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
