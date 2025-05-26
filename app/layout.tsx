import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Sakhi",
  description: "Style Meets Sanskriti",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fdfcf5] text-black font-sans">
        <CartProvider>
          {/* Navbar Component */}
          <Navbar />
          {/* Add top padding to prevent content from hiding behind fixed nav */}
          <main className="pt-16">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
