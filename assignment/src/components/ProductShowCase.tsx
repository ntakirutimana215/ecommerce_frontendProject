import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const bottomCategories = [
  { name: "Beauty", tagline: "Beauty Tagline" },
  { name: "Design", tagline: "Design Tagline" },
  { name: "Dress", tagline: "Dress Tagline" },
  { name: "Fashion", tagline: "Fashion Tagline" },
  { name: "Jacket", tagline: "Jacket Tagline" },
  { name: "Shoes", tagline: "Shoes Tagline" },
  { name: "Watch", tagline: "Watch Tagline" },
];

const ProductShowcase: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  // Dynamically set visibleCount based on screen width
  const updateVisibleCount = () => {
    if (window.innerWidth < 640) setVisibleCount(2); // mobile
    else if (window.innerWidth < 1024) setVisibleCount(4); // tablet
    else setVisibleCount(6); // desktop
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else if (
      direction === "right" &&
      startIndex < bottomCategories.length - visibleCount
    ) {
      setStartIndex(startIndex + 1);
    }
  };

  // Render each product section
  const renderProductItem = (imgSrc: string, title: string, price: string, oldPrice?: string) => (
    <li className="flex items-center space-x-3">
      <div className="w-20 sm:w-24 lg:w-28 aspect-square">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <div>
        <p className="text-sm sm:text-base">{title}</p>
        <p className="font-semibold">
          {price} {oldPrice && <span className="line-through text-gray-400">{oldPrice}</span>}
        </p>
      </div>
    </li>
  );

  return (
    <div className="w-full bg-white py-10 px-2 sm:px-6">
      {/* ---- TOP ROW ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* FEATURED */}
        <div>
          <h3 className="font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-4">
            FEATURED
          </h3>
          <ul className="space-y-4">
            {renderProductItem(
              "https://i.pinimg.com/1200x/11/b2/c2/11b2c26e69f2bc7de9704b03b2fe5c9f.jpg",
              "Apple AirPods with Wireless…",
              "$85.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/736x/88/ca/24/88ca2472db2920fed4c870b192fda11d.jpg",
              "JBL Wireless Bluetooth Speaker",
              "$96.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/1200x/f0/dd/d9/f0ddd9eaccdb4539211f89480cbca00c.jpg",
              "JBL On-Ear Headphones",
              "$124.00"
            )}
          </ul>
        </div>

        {/* RECENT */}
        <div>
          <h3 className="font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-4">
            RECENT
          </h3>
          <ul className="space-y-4">
            {renderProductItem(
              "https://i.pinimg.com/736x/43/fd/59/43fd59e5a7c6adba1584ec69c515cf4e.jpg",
              "Apple iPhone 11 Pro Max 256…",
              "$199.00",
              "$254.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/736x/ea/bb/f0/eabbf08f39bc03872f152178c053eff7.jpg",
              "Apple AirPods with Wireless…",
              "$85.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/1200x/70/df/b5/70dfb5ca7f7a7ec1927694c80bd830cf.jpg",
              "Apple Watch Series 5",
              "$499.00 – $599.00"
            )}
          </ul>
        </div>

        {/* ON SALE */}
        <div>
          <h3 className="font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-4">
            ON SALE
          </h3>
          <ul className="space-y-4">
            {renderProductItem(
              "https://i.pinimg.com/1200x/bf/6f/35/bf6f35cc51890171cf54e43a463f19c5.jpg",
              "Apple iPhone 11 Pro Max 256…",
              "$199.00",
              "$254.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/1200x/70/df/b5/70dfb5ca7f7a7ec1927694c80bd830cf.jpg",
              "Apple Watch Series 5",
              "$499.00 – $599.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/1200x/03/1a/8a/031a8ae96dddf4134c81ddf215ffe7d0.jpg",
              "Samsung Gear 360 Camera",
              "$29.00",
              "$48.00"
            )}
          </ul>
        </div>

        {/* TOP RATED */}
        <div>
          <h3 className="font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-4">
            TOP RATED
          </h3>
          <ul className="space-y-4">
            {renderProductItem(
              "https://i.pinimg.com/1200x/3a/0e/84/3a0e842f2c250534316a424ef30e3e5e.jpg",
              "Samsung Virtual Reality Headset",
              "$18.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/1200x/13/c3/ce/13c3ce459751e601bba5f7c8da0a9b0a.jpg",
              "Microsoft Xbox One Wireless…",
              "$25.00",
              "$45.00"
            )}
            {renderProductItem(
              "https://i.pinimg.com/736x/cf/9f/85/cf9f852ef3d349d0d7295e8f01e9c36b.jpg",
              "Apple Watch Series 5 Black…",
              "$599.00"
            )}
          </ul>
        </div>
      </div>

      {/* ---- BOTTOM CAROUSEL ---- */}
      <div className="flex items-center justify-center mt-12 space-x-4 sm:space-x-6 overflow-x-auto px-2">
        <div
          onClick={() => handleScroll("left")}
          className="p-2 sm:p-3 rounded-full bg-gray-200 hover:bg-yellow-500 transition cursor-pointer flex-shrink-0"
        >
          <SlArrowLeft size={20} />
        </div>

        <div className="flex space-x-4 sm:space-x-6">
          {bottomCategories
            .slice(startIndex, startIndex + visibleCount)
            .map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[90px] sm:min-w-[120px] cursor-pointer hover:text-yellow-500 transition"
              >
                <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center border rounded-md shadow-md mb-2">
                  <span className="text-sm sm:text-lg font-bold">{cat.name[0]}</span>
                </div>
                <p className="font-semibold text-sm sm:text-base">{cat.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{cat.tagline}</p>
              </div>
            ))}
        </div>

        <div
          onClick={() => handleScroll("right")}
          className="p-2 sm:p-3 rounded-full bg-gray-200 hover:bg-yellow-500 transition cursor-pointer flex-shrink-0"
        >
          <SlArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
