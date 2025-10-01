import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // removed { AxiosError }
import { Notify } from "notiflix";
import {useNavigate }from "react-router-dom"

interface FormData {
  email: string;
  otp?: string;
  newPassword?: string;
}

function ForgotPassword() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const requestOtp = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5000/api/reset/request-reset",
        { email: data.email }
      );
      Notify.success(res.data.message || "OTP sent to your email");
      setEmailForOtp(data.email);
      setStep("verify");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        Notify.failure(error.response.data?.message || "Failed to send OTP");
      } else {
        Notify.failure("Failed to send OTP");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5000/api/reset/reset-password",
        {
          email: emailForOtp,
          otp: data.otp,
          newPassword: data.newPassword,
        }
      );
      Notify.success(res.data.message || "Password reset successful!");
      reset();
      setStep("request");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        Notify.failure(error.response.data?.message || "Failed to reset password");
      } else {
        Notify.failure("Failed to reset password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      {step === "request" && (
        <>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit(requestOtp)} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("email", { required: true })}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-black transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </>
      )}

      {step === "verify" && (
        <>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("otp", { required: true })}
            />
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("newPassword", { required: true, minLength: 6 })}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded hover:bg-black transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
              
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
