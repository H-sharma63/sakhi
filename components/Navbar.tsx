"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar: FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const lastScrollY = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      setShowSearch(false);
      setSearchValue("");
    }
  };

  return (
    <div>
      <div className="bg-blue-500 text-white p-4">Test Tailwind</div>
      <div
        className={`fixed -left-[10px] -top-[10px] right-[5px] w-[calc(100%+10px)] h-auto bg-[#550000] shadow-lg z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative w-full">
          <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto px-4 py-4 pt-[10px]">
            {/* Left side: Search Icon or Input */}
            <div className="flex-1 pt-[20px] pl-[10px]">
              {showSearch ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-white bg-opacity-90 rounded-full w-[200px] h-[30px] ml-[15px] px-2"
                >
                  <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-[#550000] px-2 text-[16px]"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="ml-1">
                    <Search className="h-4 w-4 text-[#550000]" />
                  </button>
                  <button
                    type="button"
                    className="ml-1 text-[#550000] font-bold"
                    onClick={() => setShowSearch(false)}
                    aria-label="Close search"
                  >
                    ×
                  </button>
                </form>
              ) : (
                <div
                  className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-[30px] h-[30px] ml-[15px] cursor-pointer hover:bg-opacity-90 transition-all duration-300"
                  onClick={() => setShowSearch(true)}
                  tabIndex={0}
                  aria-label="Open search"
                >
                  <Search className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
                </div>
              )}
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-[20px]">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-[40px] w-[40px] object-contain"
              />
            </div>

            {/* Cart & User Icons */}
            <div className="flex flex-1 justify-end pt-[20px] pr-[20px] space-x-[10px] items-center">
              <div className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-[30px] h-[30px] cursor-pointer hover:bg-opacity-90 transition-all duration-300">
                <ShoppingCart className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
              </div>
              <div className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-[30px] h-[30px] cursor-pointer hover:bg-opacity-90 transition-all duration-300">
                <User className="h-4 w-4 text-[#F6F1E7] stroke-[3px]" />
              </div>
            </div>
          </div>

          
          {/* Menu visible on all devices */}
          <div className="bg-[#550000] pt-[15px] pb-[10px]">
            <div className="flex flex-wrap justify-center items-center text-center space-x-[50px] py-3 px-2 w-full">
              <a
                href="/"
                className="no-underline font-bold text-[20px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="no-underline font-bold text-[20px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
              >
                About
              </a>
              <a
                href="/services"
                className="no-underline font-bold text-[20px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
              >
                Services
              </a>
              <a
                href="/contact"
                className="no-underline font-bold text-[20px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
