// components/Navbar.js
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        ☕ Starbucks
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative bg-green-800 px-4 py-2 rounded-md hover:bg-green-900 transition"
      >
        🛒 Cart
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
