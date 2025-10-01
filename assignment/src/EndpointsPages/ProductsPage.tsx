import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { productService } from "../services/productService";
import type { Product } from "../services/productService";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product || product.stock <= 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }

    try {
      await addToCart(productId, 1);
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((item) => (
        <div key={item._id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {item.images && item.images.length > 0 && (
            <img 
              src={item.images[0]} 
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
            <p className="text-green-600 font-semibold text-lg mb-2">${item.price}</p>
            <p className="text-sm mb-3">
              {item.stock > 0 ? (
                <span className="text-gray-700">
                  In stock: {item.stock}
                </span>
              ) : (
                <span className="text-red-500 font-bold">Out of stock</span>
              )}
            </p>
            {item.sizes && item.sizes.length > 0 && (
              <p className="text-xs text-gray-500 mb-2">Sizes: {item.sizes.join(", ")}</p>
            )}
            {item.colors && item.colors.length > 0 && (
              <p className="text-xs text-gray-500 mb-3">Colors: {item.colors.join(", ")}</p>
            )}
            <button
              className={`w-full px-4 py-2 rounded text-white font-medium transition-colors ${
                item.stock > 0 
                  ? "oklch(90.5% 0.182 98.111) oklch(90.5% 0.182 98.111)" 
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => handleAddToCart(item._id)}
              disabled={item.stock <= 0}
            >
              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
