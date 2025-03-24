import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface AdminToken {
  id: string;
  role: string;
  name: string;
}

const AdminHomePage: React.FC = () => {
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode<AdminToken>(token);
        if (decoded?.name) {
          setAdminName(decoded.name);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center p-4 sm:p-10">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-center">Welcome, {adminName}!</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-2 sm:px-4">
        {/* Card 1: List New API */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl hover:scale-105 transition transform">
          <div className="mb-4 flex justify-center">
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 text-center">List New API</h2>
          <p className="text-gray-800 text-sm sm:text-base text-center mb-4">
            Create a new API listing by providing all the necessary details.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/admin/create-api")}
              className="w-full mt-4 sm:mt-6 py-2 sm:py-3 bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-base sm:text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              Create API
            </button>
          </div>
        </div>
        {/* Card 2: My APIs */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl hover:scale-105 transition transform">
          <div className="mb-4 flex justify-center">
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 text-center">My APIs</h2>
          <p className="text-gray-800 text-sm sm:text-base text-center mb-4">
            View and manage your previously listed APIs.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/admin/my-apis")}
              className="w-full mt-4 sm:mt-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-gray-400 text-gray-800 text-base sm:text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              View APIs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
