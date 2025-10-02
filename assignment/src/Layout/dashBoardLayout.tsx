import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardComponents/SideBar";
import Header from "../DashboardComponents/Header";

export default function DLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
