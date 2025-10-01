import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardComponents/SideBar";
import Header from "../DashboardComponents/Header";

export default function DLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
