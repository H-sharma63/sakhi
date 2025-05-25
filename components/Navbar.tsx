"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search as LucidSearch,
  ShoppingCart as LucidShoppingCart,
  User as LucidUser,
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = scrolled ? "/logo-light.png" : "/logo-dark.png";
  const iconColor = scrolled ? "#000000" : "#800000";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#550000cc] text-black"
          : "bg-transparent text-[#800000]"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-full px-4 md:px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Sakhi Logo"
              width={110}
              height={35}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav Menu */}
        <nav className="md:flex space-x-6 text-lg font-medium">
          <Link
            href="/shop"
            className={`hover:text-[#560000] transition-colors ${
              scrolled ? "text-black" : "text-[#800000]"
            }`}
          >
            Shop
          </Link>
          <Link
            href="/profile"
            className={`hover:text-[#560000] transition-colors ${
              scrolled ? "text-black" : "text-[#800000]"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/cart"
            className={`hover:text-[#560000] transition-colors ${
              scrolled ? "text-black" : "text-[#800000]"
            }`}
          >
            Cart
          </Link>
          <Link
            href="/login"
            className={`hover:text-[#560000] transition-colors ${
              scrolled ? "text-black" : "text-[#800000]"
            }`}
          >
            Login
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <LucidSearch
            size={24}
            style={{ strokeWidth: 3, color: iconColor }}
          />
          <LucidShoppingCart
            size={24}
            style={{ strokeWidth: 3, color: iconColor }}
          />
          <LucidUser
            size={24}
            style={{ strokeWidth: 3, color: iconColor }}
          />
        </div>
      </div>
    </header>
  );
}
