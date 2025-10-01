import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import type { LoginData } from "../services/authService";

interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    const isAdmin = searchParams.get('admin');
    if (isAdmin === 'true') {
      Notify.info("Admin registration successful! Please log in to access the dashboard.");
    }
  }, [searchParams]);

  const onLogin = async (data: FormData) => {
    try {
      const response = await authService.login(data as LoginData);

      Notify.success("Login successful!");

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      window.dispatchEvent(new Event("auth-changed"));

      reset();

      // Navigate based on user role
      if (response.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error:any) {
      Notify.failure(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md relative">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LOGIN</h2>
            <p className="text-sm text-gray-600 mb-8">
              Get access to your Orders, Wishlist and Recommendations.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onLogin)}>
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-yellow-500" {...register("rememberMe")} />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to ="/ForgotPassword">
              <a className="text-yellow-600 hover:underline">
                Lost your password?
              </a>
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded-md hover:bg-black transition-colors"
              >
                LOG IN
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/RegistrationForm" className="text-yellow-600 font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </div>

            {/* Alternative Back Option */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBackToHome}
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                ← Return to Home Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;