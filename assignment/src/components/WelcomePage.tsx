import React, { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PromoSection from "./Section2";
import HotDealsSection from "./Servises";
import BestSellingProducts from "./BestSellProduct";
import ProductShowcase from "./ProductShowCase";
import ShopPage from "./shopPage";

const categories = [
  "Men’s Clothing",
  "Women’s Clothing",
  "Accessories",
  "Shoes",
  "Jewellery",
  "Bags & Backpacks",
  "Watches",
  "Dresses",
  "Shirts",
  "T-Shirts",
  "Jackets",
  "Sweaters",
  "Pants",
  "Shorts",
  "Suits",
];

const heroBlocks = [
  {
    title: "WIRELESS CHARGING STAND",
    subtitle: "BEST SMARTPHONE",
    discount: "Up To 70% Off",
    img: "https://i.pinimg.com/1200x/e7/b7/72/e7b772331f4704a1bac2f12d78f53167.jpg",
  },
  {
    title: "PERSONALIZED HEADPHONES",
    subtitle: "BEATS EP ON-EAR",
    discount: "Min. 40-80% Off",
    img: "https://i.pinimg.com/736x/97/6e/94/976e94818e08c43b618ea546edec4995.jpg",
  },
];

const WelcomePage: React.FC = () => {
  const [slideIn, setSlideIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroBlocks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroBlocks.length - 1 : prev - 1
    );
  };

  return (
    <div>
      {/* Layout wrapper */}
      <div className="flex flex-col md:flex-row min-h-screen mx-4 md:mx-6">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:block w-full md:w-1/5 bg-white border-r px-4 py-6 overflow-y-auto">
          <ul className="space-y-3 text-gray-700">
            {categories.map((item, index) => (
              <li
                key={index}
                className={`flex justify-between cursor-pointer hover:text-yellow-500 transform transition-all duration-500 ease-out ${
                  slideIn
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {item} <span>›</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center bg-gray-50 p-6 sm:p-10 relative overflow-hidden group">
          {/* Left Arrow */}
          <SlArrowLeft
            onClick={handlePrev}
            size={25}
            className="absolute left-3 sm:left-5 bg-white shadow p-2 rounded-full 
                       opacity-0 group-hover:opacity-70 hover:opacity-100
                       transition duration-300 cursor-pointer"
          />

          {/* Slide */}
          <div
            key={currentIndex}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 transform transition-all duration-700 ease-out ${
              slideIn ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            {/* Text */}
            <div className="space-y-3 sm:space-y-4 max-w-md text-center md:text-left">
              <h4 className="text-yellow-500 font-semibold text-sm sm:text-base">
                {heroBlocks[currentIndex].subtitle}
              </h4>
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                {heroBlocks[currentIndex].title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {heroBlocks[currentIndex].discount}
              </p>
              <span className="bg-yellow-500 text-black px-5 sm:px-6 py-2 sm:py-3 font-bold rounded shadow hover:bg-yellow-600 transition cursor-pointer inline-block text-sm sm:text-base">
                BUY NOW
              </span>
            </div>

            {/* Image */}
            <img
              src={heroBlocks[currentIndex].img}
              alt={heroBlocks[currentIndex].title}
              className="w-60 sm:w-72 md:w-80 lg:w-96 object-contain"
            />
          </div>

          {/* Right Arrow */}
          <SlArrowRight
            onClick={handleNext}
            size={25}
            className="absolute right-3 sm:right-5 bg-white shadow p-2 rounded-full 
                       opacity-0 group-hover:opacity-70 hover:opacity-100
                       transition duration-300 cursor-pointer"
          />
        </section>
      </div>

      {/* Other Sections */}
      <PromoSection />
      <HotDealsSection />
      <BestSellingProducts />
      <ProductShowcase />
      <ShopPage />
    </div>
  );
};

export default WelcomePage;
