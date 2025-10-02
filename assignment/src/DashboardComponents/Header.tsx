import { Search, Bell, User, LogOut, Settings, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [user, setUser] = useState<{ fullname: string; email: string; role: string } | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    authService.logout();
    setShowUserDropdown(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      {/* Left side - Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search bar (hidden on mobile) */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search stock, order, etc"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-72 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            aria-label="User menu"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.fullname || "Admin"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Admin"}</p>
            </div>
          </button>

          {/* Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.fullname || "Admin"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || "admin@example.com"}</p>
              </div>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings size={16} /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for dropdown close */}
      {showUserDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setShowUserDropdown(false)} />
      )}
    </header>
  );
}
