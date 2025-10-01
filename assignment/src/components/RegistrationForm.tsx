import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

function RegisterModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onRegister = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        Notify.failure("Passwords do not match!");
        return;
      }

      const response = await authService.register({
        fullname: data.name,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmPassword,
        role: data.role,
      });

      Notify.success(response.message || "Registration successful!");

      reset();

      // Navigate based on role
      if (data.role === "admin") {
        navigate("/login?admin=true");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Registration failed.");
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">REGISTER HERE</h2>
            <p className="text-sm text-gray-600 mb-8">
              Create an account and get access to your Orders, Wishlist and Recommendations.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onRegister)}>
            <div>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                {...register("email", { required: true })}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                {...register("password", { required: true })}
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                {...register("confirmPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as:
              </label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                {...register("role", { required: true })}
                defaultValue="user"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded-md hover:bg-black transition-colors"
              >
                REGISTER
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-600 font-semibold hover:underline">
                  Back to login
                </Link>
              </p>
            </div>

            {/* Alternative Back Options */}
            <div className="text-center pt-4 border-t border-gray-200 space-y-2">
              <button
                type="button"
                onClick={handleBackToHome}
                className="block w-full text-sm text-gray-600 hover:text-gray-900 hover:underline py-1"
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

export default RegisterModal;