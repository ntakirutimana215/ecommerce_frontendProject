import React from "react";
import { Heart, ShoppingCart, Eye, Layers } from "lucide-react"; // icons for actions

const BestSellingProducts: React.FC = () => {
  const products = [
    {
      name: "Apple Watch Series 5",
      price: "$499.00 – $599.00",
      discount: "17% OFF",
      oldPrice: "",
      img: "https://i.pinimg.com/1200x/a1/3d/a6/a13da6ea12e0308d2e11620d242a2d36.jpg",
    },
    {
      name: "Microsoft Xbox One Wireless",
      price: "$25.00",
      oldPrice: "$45.00",
      discount: "44% OFF",
      img: "https://i.pinimg.com/1200x/0e/c5/c8/0ec5c85862768b6176908ad9dcb1b0e2.jpg",
    },
    {
      name: "JBL On-Ear Headphones",
      price: "$124.00",
      discount: "FEATURED",
      img: "https://i.pinimg.com/736x/8e/f7/3f/8ef73f93acc68bf1f8661b9dedb09c33.jpg",
    },
    {
      name: "Samsung Virtual Reality Headset",
      price: "$18.00",
      discount: "",
      img: "https://i.pinimg.com/736x/4c/1e/5e/4c1e5eba65d86da95ee5375fc5561546.jpg",
    },
    {
      name: "Apple Watch Series 5 Black Milanese",
      price: "$599.00",
      discount: "",
      img: "https://i.pinimg.com/736x/ee/7c/12/ee7c12ba5266b77fb83806c8f5bc0da2.jpg",
    },
    {
      name: "Samsung Gear 360 Camera",
      price: "$29.00",
      oldPrice: "$48.00",
      discount: "40% OFF",
      img: "https://i.pinimg.com/1200x/08/08/f3/0808f386826f6154ddb736d0bd464b3f.jpg",
    },
  ];

  return (
    <section className="px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-lg font-bold text-gray-900 relative">
          BEST SELLING PRODUCTS
          <span className="absolute bottom-0 left-0 w-20 h-0.5 bg-yellow-500"></span>
        </h2>
        <div className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded shadow cursor-pointer">
          VIEW ALL
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="border bg-white p-4 rounded-lg shadow-md relative 
                       transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            {/* Discount / Featured Badge */}
            {item.discount && (
              <span
                className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded ${
                  item.discount.includes("OFF")
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                {item.discount}
              </span>
            )}

            {/* Wishlist Icon */}
            <div className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer">
              <Heart size={18} />
            </div>

            {/* Image */}
            <div className="flex justify-center mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-80 h-40 object-contain rounded-md transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Info */}
            <p className="text-xs text-gray-500 uppercase">ELECTRONICS</p>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {item.name}
            </h3>

            {/* Prices */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-bold">{item.price}</span>
              {item.oldPrice && (
                <span className="text-gray-400 line-through text-sm">
                  {item.oldPrice}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center space-x-2 mt-4">
              <div className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-2 rounded cursor-pointer">
                <ShoppingCart size={16} />
              </div>
              <div className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-2 rounded cursor-pointer">
                <Eye size={16} />
              </div>
              <div className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-2 rounded cursor-pointer">
                <Layers size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellingProducts;
