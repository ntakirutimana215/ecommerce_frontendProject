// Footer.tsx
import React from "react";
import { Home, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b2738] text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Column 1: Brand & Contact */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">kapee.</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Home size={18} /> Lorem Ipsum, 2046 Lorem Ipsum
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> 576-245-2478
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> info@kapee.com
            </li>
            <li className="flex items-center gap-2">
              <Clock size={18} /> Mon - Fri / 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 className="font-bold mb-4 uppercase tracking-wide">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/store-location" className="hover:underline hover:text-yellow-400">Store Location</Link></li>
            <li><Link to="/contact" className="hover:underline hover:text-yellow-400">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:underline hover:text-yellow-400">Shipping & Delivery</Link></li>
            <li><Link to="/news" className="hover:underline hover:text-yellow-400">Latest News</Link></li>
            <li><Link to="/sitemap" className="hover:underline hover:text-yellow-400">Our Sitemap</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Service */}
        <div>
          <h3 className="font-bold mb-4 uppercase tracking-wide">Our Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:underline hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline hover:text-yellow-400">Terms of Sale</Link></li>
            <li><Link to="/customer-service" className="hover:underline hover:text-yellow-400">Customer Service</Link></li>
            <li><Link to="/delivery" className="hover:underline hover:text-yellow-400">Delivery Information</Link></li>
            <li><Link to="/payments" className="hover:underline hover:text-yellow-400">Payments</Link></li>
            <li><Link to="/saved-cards" className="hover:underline hover:text-yellow-400">Saved Cards</Link></li>
          </ul>
        </div>

        {/* Column 4: My Account */}
        <div>
          <h3 className="font-bold mb-4 uppercase tracking-wide">My Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/account" className="hover:underline hover:text-yellow-400">My Account</Link></li>
            <li><Link to="/shop" className="hover:underline hover:text-yellow-400">My Shop</Link></li>
            <li><Link to="/cart" className="hover:underline hover:text-yellow-400">My Cart</Link></li>
            <li><Link to="/checkout" className="hover:underline hover:text-yellow-400">Checkout</Link></li>
            <li><Link to="/wishlist" className="hover:underline hover:text-yellow-400">My Wishlist</Link></li>
            <li><Link to="/tracking" className="hover:underline hover:text-yellow-400">Tracking Order</Link></li>
          </ul>
        </div>

        {/* Column 5: Newsletter & Social Icons */}
        <div>
          <h3 className="font-bold mb-2">Newsletter</h3>
          <p className="text-sm mb-2">
            Subscribe to our mailing list to get new updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 rounded-md flex-1 text-black"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-200">
              SIGN UP
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 flex-wrap">
            <div className="bg-blue-800 w-8 h-8 flex items-center justify-center rounded">F</div>
            <div className="bg-black w-8 h-8 flex items-center justify-center rounded">X</div>
            <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded">in</div>
            <div className="bg-pink-600 w-8 h-8 flex items-center justify-center rounded">I</div>
            <div className="bg-pink-500 w-8 h-8 flex items-center justify-center rounded">F</div>
            <div className="bg-orange-500 w-8 h-8 flex items-center justify-center rounded">RSS</div>
            <div className="bg-red-600 w-8 h-8 flex items-center justify-center rounded">YT</div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        <p>Kapee © 2025 by PressLayouts. All Rights Reserved.</p>
        <div className="flex justify-center flex-wrap gap-3 mt-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          <img src="https://i.pinimg.com/736x/7d/70/2a/7d702aa95f90e7042be4bc93fe41d4d0.jpg" alt="Discover" className="h-6" />
          <img src="https://i.pinimg.com/1200x/3c/83/9c/3c839c72dac5bfe0dca769abb1ae6020.jpg" alt="Maestro" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
