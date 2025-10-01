// Navbar.tsx
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./context/CartContext";

export default function Navbar() {
  const { cartCount, totalPrice } = useCart();

  return (
    <Link to="/CartPage" className="relative flex items-center cursor-pointer">
      <ShoppingCart aria-label="Cart" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 rounded-full">
          {cartCount}
        </span>
      )}
      <span className="ml-2 text-sm">${totalPrice.toFixed(2)}</span>
    </Link>
  );
}
