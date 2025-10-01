import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Box, Users, LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Dashboard", icon: <Home />, path: "/dashboard" },
  { label: "Orders", icon: <ShoppingCart />, path: "/dashboard/orders" },
  { label: "Products", icon: <Box />, path: "/dashboard/products" },
  { label: "Customers", icon: <Users />, path: "/dashboard/customers" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullname: string; email: string; role: string } | null>(null);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <aside className="w-60 bg-white shadow-md h-screen p-4 flex flex-col">
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
            end
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

      {/* Bottom section with settings and logout */}
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}