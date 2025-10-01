// src/pages/CartPage.tsx
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";

export default function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, setCartItems, setCartCount, setTotalPrice } = useCart();
  const navigate = useNavigate();

  // Increase quantity
  const increaseQty = async (productId: string, stock: number, currentQty: number) => {
    if (!productId) return;
    if (currentQty >= stock) {
      alert("Cannot add more than available stock!");
      return;
    }
    await updateQuantity(productId, currentQty + 1);
  };

  // Decrease quantity
  const decreaseQty = async (productId: string, currentQty: number) => {
    if (!productId) return;
    if (currentQty <= 1) {
      await removeFromCart(productId);
      return;
    }
    await updateQuantity(productId, currentQty - 1);
  };

  // Remove from cart (using context method)
  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
  };

  // Place Order
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    try {
      const response = await orderService.createOrderFromCart();
      alert(`Order placed successfully! Order ID: ${response.order._id}`);
      
      // Clear cart in frontend
      setCartItems([]);
      setCartCount(0);
      setTotalPrice(0);
      
      // Navigate to home page
      navigate("/");
    } catch (err: any) {
      console.error("Error placing order:", err);
      if (err.response?.status === 401) {
        alert("Please log in to place an order");
        navigate("/login");
      } else {
        alert("Failed to place order. Please try again.");
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
          <button onClick={() => navigate("/")} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate("/")} className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={item.product._id}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.product?.name || "Unknown Product"}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            ${(item.product?.price || 0).toFixed(2)} each
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.product?.stock || 0} in stock
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg"
                              onClick={() => decreaseQty(item.product?._id || "", item.quantity)}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg"
                              onClick={() => increaseQty(item.product?._id || "", item.product?.stock || 0, item.quantity)}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleRemoveFromCart(item.product?._id || "")}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      {index < cartItems.length - 1 && (
                        <hr className="mt-6 border-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={placeOrder}
                >
                  Place Order
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Secure checkout powered by SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}