import { useState } from "react";

// Product type with category
type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  // Example payment methods (can also be passed as props)
  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "MasterCard", icon: "💳" },
    { name: "PayPal", icon: "🅿️" },
    { name: "Cash on Delivery", icon: "💵" },
  ];

  return (
    <>
      {/* Product Card */}
      <div className="border rounded-xl shadow p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover rounded-lg"
        />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Quick View
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Product details */}
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-sm text-blue-600 font-semibold mt-2">
              Category: {product.category}
            </p>
            <p className="text-lg font-semibold mt-4">${product.price}</p>

            {/* Payment methods */}
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method.name}
                    className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm"
                  >
                    {method.icon} {method.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button className="mt-6 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
