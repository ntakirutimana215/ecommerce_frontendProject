import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ContactForm from "./components/Hero";
import WelcomePage from "./components/WelcomePage";
import About from "./components/Aboutus";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import RegisterModal from "./components/RegistrationForm";
import HotDealsSection from "./components/Servises";
import BlogPages from "./components/BlogsPage";
import SingleBlogPage from "./components/singlePage";
import CartPage from "./EndpointsPages/CartPage";

import DashboardLayout from "./DashboardComponents/DashboardLayout"; // ✅ new layout
import DashboardHome from "./pages/Dashboard";      // ✅ new home page
import Customers from "./pages/Customers";
import Products from "./pages/ProductsTable";
import Orders from "./pages/Orders";

import LoginForm from "./components/loginPage";
import ForgotPassword from "./components/ForgetPassword";
import AuthPage from "./components/AuthoPage";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Import the CartProvider
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public site layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="services" element={<HotDealsSection />} />
            <Route path="BlogsPage" element={<BlogPages />} />
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            <Route path="get-in-touch" element={<Contact />} />
            <Route path="CartPage" element={<CartPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-20">
                  <h1 className="text-2xl">Page Not Found</h1>
                  <p>
                    Go back to <a href="/" className="text-blue-500">home</a>
                  </p>
                </div>
              }
            />
          </Route>

          {/* Dashboard layout - Protected for authenticated users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
          </Route>

          {/* Auth pages outside of main layout (no navbar/footer) */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/RegistrationForm" element={<RegisterModal />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
