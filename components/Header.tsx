"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu as LucidMenu, X as LucidX, Search as LucidSearch, ShoppingCart as LucidShoppingCart, User as LucidUser } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent text-[#800000] transition-all duration-300"
    >
      <div className="w-full flex justify-between items-center h-[60px] px-4 md:px-6">
        {/* Hamburger Menu */}
        <button
          className="md:hidden bg-transparent border-none p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <LucidX size={26} /> : <LucidMenu size={26} />}
        </button>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image
              src="/logo-dark.png" // Replace with your logo path
              alt="Sakhi Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <LucidSearch size={20} className="text-black" />
          <LucidShoppingCart size={20} className="text-black" />
          <LucidUser size={20} className="text-black" />
        </div>
      </div>

      {/* Mobile Menu (only visible on small screens) */}
      {menuOpen && (
        <div
          className="md:hidden bg-transparent text-[#800000] px-4 pb-4 w-full"
        >
          <Link
            href="/shop"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/profile"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/cart"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            href="/login"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
