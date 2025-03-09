import { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState("user");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4">
      {/* Glassmorphism Card */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[400px] border border-white/30">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Role Toggle Slider */}
        <div className="relative w-full flex items-center justify-center mb-6">
          <div className="bg-gray-600 w-full flex rounded-full p-1 relative">
            <span
              className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                role === "admin" ? "translate-x-full" : "translate-x-0"
              }`}
            ></span>
            <button
              className={`w-1/2 py-2 text-lg font-semibold relative z-10 transition ${
                role === "user" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              className={`w-1/2 py-2 text-lg font-semibold relative z-10 transition ${
                role === "admin" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Password"
          />
          {isSignup && (
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              placeholder="Confirm Password"
            />
          )}
        </div>

        {/* Submit Button with Darker Gradient */}
        <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          {isSignup ? "Sign Up" : "Log In"} as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>

        {/* Toggle between Signup/Login */}
        <p className="text-center text-black mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-purple-400 font-semibold hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link to="/" className="text-purple-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
