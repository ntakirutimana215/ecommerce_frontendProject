// src/pages/ShopPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { RefreshCw, ShoppingCart } from "lucide-react"; // icons

// ✅ Product Interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: { _id: string; name: string };
}

// ✅ API Response Type (handles both array or { products: [] })
type ProductsResponse = Product[] | { products: Product[] };

// ✅ Base API URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ProductsResponse>(`${API_BASE}/api/products`);

        // Normalize backend response (either [] or { products: [] })
        const data = Array.isArray(res.data) ? res.data : res.data.products;

        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Add to Cart handler
  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await addToCart(productId, 1);
      alert("✅ Product added to cart");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      console.error("Add to cart error:", err);
      alert("❌ Failed to add to cart");
    }
  };

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      {products.length === 0 ? (
        <p className="text-center text-red-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col relative group"
            >
              {/* Product Image */}
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg"
              />

              {/* Quick View & Compare */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => alert("Added to compare")}
                  className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                  title="Compare"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Product Details */}
              <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.category?.name}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-auto bg-yellow-500 text-white rounded-lg py-2 flex items-center justify-center space-x-2 hover:bg-blue-700"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
