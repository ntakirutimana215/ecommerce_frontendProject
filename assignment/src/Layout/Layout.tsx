import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-50">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
