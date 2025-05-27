import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "../components/LayoutWrapper";

export const metadata = {
  title: "Sakhi",
  description: "Style Meets Sanskriti",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
