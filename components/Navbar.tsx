"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchOverlay } from "./SearchOverlay";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "../context/CartDrawer";

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const Navbar: FC = () => {
  const { setIsCartOpen } = useCart();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      setShowSearch(false);
      setSearchValue("");
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div>
        <div
          className={`fixed -left-[10px] -top-[10px] right-[5px] w-[calc(100%+10px)] h-auto bg-[#550000] shadow-lg z-0 transition-transform duration-300 ${
            showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative w-full">
            {/* Top bar with icons and logo */}
            <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto px-4 pt-[10px] h-[95px]">
              {/* Left side: Hamburger and Search */}
              <div className="flex-1 pt-[15px] pl-[10px] flex items-center">
                {/* Hamburger Menu Button (mobile only) */}
                <button
                  onClick={toggleMenu}
                  className="lg:hidden flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer"
                >
                  {isMenuOpen ? (
                    <X className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                  ) : (
                    <Menu className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                  )}
                </button>

                {/* Left side: Search Icon */}
                <div className="flex-1 pt-[7px] pl-[10px]">
                  <button
                    onClick={() => setShowSearch(true)}
                    className="flex items-center justify-center rounded-full w-[30px] h-[30px] ml-[15px] cursor-pointer
                hover:bg-[#F6F1E7]/10 active:bg-[#F6F1E7]/20 transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#F6F1E7]/50"
                    aria-label="Search"
                  >
                    <Search className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                  </button>
                </div>
              </div>

              {/* Center: Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 pt-[20px] pb-[20px] lg:pb-0">
                <Link href="/" className="cursor-pointer">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="h-[50px] w-[50px] object-contain"
                  />
                </Link>
              </div>

              {/* Mobile Icons */}
              <div className="flex lg:hidden flex-1 justify-end pt-[15px] pr-[20px] space-x-[10px]">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer
            hover:bg-[#F6F1E7]/10 active:bg-[#F6F1E7]/20 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#F6F1E7]/50"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                </button>
                <div className="flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer">
                  <User className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                </div>
              </div>

              {/* Desktop Icons */}
              <div className="hidden lg:flex flex-1 justify-end pt-[15px] pr-[20px] space-x-[10px]">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer
            hover:bg-[#F6F1E7]/10 active:bg-[#F6F1E7]/20 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#F6F1E7]/50"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                </button>

                <button
                  onClick={() => {
                    /* Add your user menu logic here */
                  }}
                  className="flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer
                hover:bg-[#F6F1E7]/10 active:bg-[#F6F1E7]/20 transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#F6F1E7]/50"
                  aria-label="User Account"
                >
                  <User className="h-[20px] w-[20px] text-[#F6F1E7] stroke-[3px]" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden bg-[#550000] absolute top-[95px] left-0 right-0 z-50 ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col items-center py-4">
                <a
                  href="/"
                  className="no-underline font-bold text-[16px] text-[#F6F1E7] px-3 py-4 w-full text-center hover:bg-[#600000] transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="no-underline font-bold text-[16px] text-[#F6F1E7] px-3 py-4 w-full text-center hover:bg-[#600000] transition-colors"
                >
                  About
                </a>
                <a
                  href="/services"
                  className="no-underline font-bold text-[16px] text-[#F6F1E7] px-3 py-4 w-full text-center hover:bg-[#600000] transition-colors"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="no-underline font-bold text-[16px] text-[#F6F1E7] px-3 py-4 w-full text-center hover:bg-[#600000] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block bg-[#550000] pb-3">
              <div className="flex flex-wrap justify-center space-x-[50px] px-2">
                <a
                  href="/"
                  className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
                >
                  About
                </a>
                <a
                  href="/services"
                  className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="no-underline font-bold text-[16px] lg:text-[22px] text-[#F6F1E7] px-3 py-2 rounded-md transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SearchOverlay
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        // onSearch={handleSearch}
      />
      <CartDrawer />
    </>
  );
};

export default Navbar;
