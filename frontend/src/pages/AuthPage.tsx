import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Loader from "../pages/loader";

const AuthPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState("user");
  const [name, setName] = useState(""); // Name field for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Determine endpoint based on signup/login and role
    let endpoint = "";
    if (isSignup) {
      endpoint = role === "admin" ? "/admin/signup" : "/user/signup";
    } else {
      endpoint = role === "admin" ? "/admin/login" : "/user/login";
    }
    
    // For signup, include name; for login, send only email and password.
    const payload = isSignup ? { name, email, password } : { email, password };
    
    // Show loader when request is made
    setIsLoading(true);
    
    try {
      const res = await axiosClient.post(endpoint, payload);
      const token = res.data.token;
      
      // Store the token under a role-specific key and navigate accordingly
      if (role === "admin") {
        localStorage.setItem("adminToken", token);
        navigate("/admin", { replace: true });
      } else {
        localStorage.setItem("userToken", token);
        navigate("/user", { replace: true });
      }
    } catch (err: any) {
      console.error("Error from backend:", err.response?.data);
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Render loader while waiting for backend response
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4">
      {/* Glassmorphism Card */}
      <div className="bg-gray-200 bg-opacity-20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[400px] border border-white/30">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Role Toggle Slider */}
        <div className="relative w-full flex items-center justify-center mb-6">
          <div className="bg-gray-600 w-full flex rounded-full p-1 relative">
            <span
              className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-gray-400 transition-all duration-300 ${
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field appears only during signup */}
          {isSignup && (
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-gray-400 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            {isSignup
              ? `Sign Up as ${role.charAt(0).toUpperCase() + role.slice(1)}`
              : `Log In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
        </form>

        {error && (
          <p className="text-center text-red-500 mt-4">
            {error}
          </p>
        )}

        {/* Toggle between Signup/Login */}
        <p className="text-center text-black mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-purple-400 font-semibold hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
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
