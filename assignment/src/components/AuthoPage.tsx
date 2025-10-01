import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./loginPage";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-[22rem] p-6 border rounded shadow-md">
        {isLogin ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <LoginForm />
            <p className="mt-4 text-sm text-center">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <RegistrationForm />
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-600 hover:underline"
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
