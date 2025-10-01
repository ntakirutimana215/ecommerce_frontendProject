import React, { useEffect, useState } from "react";
import { Search, Heart, User, ShoppingCart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useCart } from "../context/CartContext";

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

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState<{ fullname: string } | null>(null);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom select states
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("$ Dollar (US)");
  const [searchCategory, setSearchCategory] = useState("All Categories");

  useEffect(() => {
    const handleAuthChanged = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      setIsAuthenticated(!!token);
      setUser(userStr ? JSON.parse(userStr) : null);
    };
    handleAuthChanged();
    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  const handleMouseEnter = (menu: string) => setOpenDropdown(menu);
  const handleMouseLeave = () => setOpenDropdown(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal =
    cartItems
      .reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
      .toFixed(2) || "0.00";

  return (
    <header className="w-full shadow-md relative">
      {/* Top bar */}
      <div className="bg-yellow-500 text-white text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-2">
        <div className="flex space-x-4 sm:space-x-6">
          {/* Language */}
          <div className="relative">
            <span
              onClick={() => setShowLangDropdown((prev) => !prev)}
              className="cursor-pointer"
            >
              {language} ▼
            </span>
            {showLangDropdown && (
              <ul className="absolute mt-2 left-0 bg-white text-black shadow rounded z-50">
                {["English", "Kinyarwanda"].map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Currency */}
          <div className="relative">
            <span
              onClick={() => setShowCurrencyDropdown((prev) => !prev)}
              className="cursor-pointer"
            >
              {currency} ▼
            </span>
            {showCurrencyDropdown && (
              <ul className="absolute mt-2 left-0 bg-white text-black shadow rounded z-50">
                {["$ Dollar (US)", "€ Euro"].map((cur) => (
                  <li
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setShowCurrencyDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    {cur}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex space-x-4 sm:space-x-6 mt-2 sm:mt-0 text-center sm:text-left">
          <span className="hidden sm:block">WELCOME TO OUR STORE!</span>
          <Link to="/BlogsPage" className="hover:underline">
            BLOG
          </Link>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link to="/contact" className="hover:underline">
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">kapee.</div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center border rounded-md overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <div className="relative border-l px-3 text-gray-600 text-sm cursor-pointer">
            <span onClick={() => setShowSearchDropdown((prev) => !prev)}>
              {searchCategory} ▼
            </span>
            {showSearchDropdown && (
              <ul className="absolute mt-2 right-0 bg-white text-black shadow rounded w-40 z-50">
                {["All Categories", "Men", "Women", "Shoes"].map((cur) => (
                  <li
                    key={cur}
                    onClick={() => {
                      setSearchCategory(cur);
                      setShowSearchDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    {cur}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="bg-yellow-500 p-3 text-white cursor-pointer">
            <Search />
          </span>
        </div>

        {/* Icons + Hamburger */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-1 cursor-pointer"
            >
              <User />
              <span className="text-sm">
                HELLO,{" "}
                <span className="font-semibold">{user?.fullname || "USER"}</span>
              </span>
              <span className="text-sm ml-2 text-gray-500">|</span>
              <span className="text-sm ml-2 font-semibold text-red-600">
                LOG OUT
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center space-x-1 cursor-pointer"
            >
              <User />
              <span className="text-sm">
                HELLO, <span className="font-semibold">SIGN IN</span>
              </span>
            </Link>
          )}

          {/* Wishlist */}
          <div className="relative cursor-pointer">
            <Heart />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </div>

          {/* Cart */}
          <Link to="/CartPage" className="relative flex items-center cursor-pointer">
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
            <span className="hidden sm:inline ml-2 text-sm">${cartTotal}</span>
          </Link>

          {/* Mobile Hamburger */}
          <Menu
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="block md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Bottom nav (Desktop only) */}
      <nav className="hidden md:flex items-center bg-white border-t px-6 py-3">
        <span
          onClick={() => setShowCategories((prev) => !prev)}
          className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          <span className="mr-2 font-semibold">SHOP BY CATEGORIES</span>
          <Menu />
        </span>

        <ul className="flex space-x-6 ml-6 text-gray-700 font-medium">
          {/* HOME */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter("HOME")}
            onMouseLeave={handleMouseLeave}
          >
            <Link className="hover:text-yellow-500 flex items-center gap-1" to="/">
              HOME <span className="text-sm">▼</span>
            </Link>
            {openDropdown === "HOME" && (
              <ul className="absolute left-0 top-full w-40 bg-white shadow-lg rounded-md">
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/">Home 1</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/">Home 2</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/">Home 3</Link>
                </li>
              </ul>
            )}
          </li>

          {/* SHOP */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter("SHOP")}
            onMouseLeave={handleMouseLeave}
          >
            <span className="hover:text-yellow-500 flex items-center gap-1">
              SHOP <span className="text-sm">▼</span>
            </span>
            {openDropdown === "SHOP" && (
              <ul className="absolute left-0 top-full w-40 bg-white shadow-lg rounded-md">
                <li className="px-4 py-2 hover:bg-yellow-100">Shop Grid</li>
                <li className="px-4 py-2 hover:bg-yellow-100">Shop List</li>
                <li className="px-4 py-2 hover:bg-yellow-100">Single Product</li>
              </ul>
            )}
          </li>

          {/* PAGES */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter("PAGES")}
            onMouseLeave={handleMouseLeave}
          >
            <span className="hover:text-yellow-500 flex items-center gap-1">
              PAGES <span className="text-sm">▼</span>
            </span>
            {openDropdown === "PAGES" && (
              <ul className="absolute left-0 top-full w-40 bg-white shadow-lg rounded-md">
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            )}
          </li>

          {/* BLOG */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter("BLOG")}
            onMouseLeave={handleMouseLeave}
          >
            <span className="hover:text-yellow-500 flex items-center gap-1">
              BLOG <span className="text-sm">▼</span>
            </span>
            {openDropdown === "BLOG" && (
              <ul className="absolute left-0 top-full w-44 bg-white shadow-lg rounded-md">
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/BlogsPage">Blog Grid</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100">
                  <Link to="/blog/1">Single Blog</Link>
                </li>
              </ul>
            )}
          </li>

          {/* BUY NOW */}
          <li className="hover:text-yellow-500 cursor-pointer">
            <a href="#">BUY NOW</a>
          </li>
        </ul>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow px-6 py-4 space-y-3">
          <Link to="/" className="block hover:text-yellow-500">
            Home
          </Link>
          <Link to="/shop" className="block hover:text-yellow-500">
            Shop
          </Link>
          <Link to="/about" className="block hover:text-yellow-500">
            About
          </Link>
          <Link to="/BlogsPage" className="block hover:text-yellow-500">
            Blog
          </Link>
          <Link to="/contact" className="block hover:text-yellow-500">
            Contact
          </Link>
        </div>
      )}

      {/* CATEGORY SIDEBAR */}
      {showCategories && (
        <aside className="absolute left-0 top-full w-64 bg-white border shadow-md p-4 z-50">
          <ul className="space-y-3 text-gray-700">
            {categories.map((item, index) => (
              <li
                key={index}
                className="flex justify-between cursor-pointer hover:text-yellow-500"
              >
                {item} <span>›</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </header>
  );
};

export default Navbar;
