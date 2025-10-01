// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { cartService } from "../services/cartService";
import type { CartProduct } from "../services/cartService";
import { useNavigate } from "react-router-dom";

// Using CartProduct from cartService

interface CartContextType {
  cartCount: number;
  totalPrice: number;
  cartItems: CartProduct[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const cart = await cartService.getCart();
      const items: CartProduct[] = (cart.products || []).filter(item => item.product && item.product._id);
      setCartItems(items);

      const count = items.reduce((sum, p) => sum + p.quantity, 0);
      const total = items.reduce((sum, p) => sum + p.quantity * (p.product?.price || 0), 0);

      setCartCount(count);
      setTotalPrice(total);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };


// Add product to cart with optimistic updates
const addToCart = async (productId: string, quantity: number = 1) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // First, sync with backend
    const response = await cartService.addToCart(productId, quantity);
    
    // Then update UI with the response from backend
    const items: CartProduct[] = (response.products || []).filter(item => item.product && item.product._id);
    setCartItems(items);

    const count = items.reduce((sum, p) => sum + p.quantity, 0);
    const total = items.reduce((sum, p) => sum + p.quantity * (p.product?.price || 0), 0);

    setCartCount(count);
    setTotalPrice(total);
    
  } catch (err:any) {
    // If unauthorized, navigate to login
    if (err?.response?.status === 401) {
      console.warn("Add to cart unauthorized:", err?.response?.data);
      navigate("/login");
      return;
    }
    console.error("Add to cart error:", err);
    // Refresh cart state on error
    await fetchCart();
  }
};

  // Remove product from cart with optimistic updates
  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Optimistic update - remove from UI immediately
      const newItems = cartItems.filter(item => item.product._id !== productId);
      setCartItems(newItems);
      const newCount = newItems.reduce((sum, p) => sum + p.quantity, 0);
      const newTotal = newItems.reduce((sum, p) => sum + p.quantity * (p.product?.price || 0), 0);
      setCartCount(newCount);
      setTotalPrice(newTotal);

      // Then sync with backend (don't update UI)
      await cartService.removeFromCart(productId);
    } catch (err) {
      console.error("Remove from cart error:", err);
      // Revert optimistic update on error
      await fetchCart();
    }
  };

  // Update quantity with optimistic updates
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Optimistic update - update UI immediately
      const newItems = cartItems.map(item => 
        item.product._id === productId 
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      setCartItems(newItems);
      const newCount = newItems.reduce((sum, p) => sum + p.quantity, 0);
      const newTotal = newItems.reduce((sum, p) => sum + p.quantity * (p.product?.price || 0), 0);
      setCartCount(newCount);
      setTotalPrice(newTotal);

      // Then sync with backend (don't update UI)
      if (quantity <= 0) {
        await cartService.removeFromCart(productId);
      } else {
        await cartService.updateCartItem(productId, quantity);
      }
    } catch (err) {
      console.error("Update quantity error:", err);
      // Revert optimistic update on error
      await fetchCart();
    }
  };

  useEffect(() => {
    // Only fetch cart if user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, totalPrice, cartItems, fetchCart, addToCart, removeFromCart, updateQuantity, setCartItems, setCartCount, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

