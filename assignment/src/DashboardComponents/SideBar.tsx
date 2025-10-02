import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Box, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { label: "Orders", icon: <ShoppingCart size={18} />, path: "/dashboard/orders" },
  { label: "Products", icon: <Box size={18} />, path: "/dashboard/products" },
  { label: "Customers", icon: <Users size={18} />, path: "/dashboard/customers" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean; toggleSidebar: () => void }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullname: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-60 bg-white shadow-md p-4 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-200 ease-in-out 
      md:translate-x-0 md:static md:h-screen z-50 flex flex-col overflow-y-auto`}
    >
      {/* Logo and User Info */}
      <div className="mb-6">
        <div className="text-xl font-bold text-orange-600 mb-2">Kapee</div>
        <div className="text-sm text-gray-600">
          Welcome, <span className="font-medium">{user?.fullname || "Admin"}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-600 hover:bg-orange-50"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="w-full flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
