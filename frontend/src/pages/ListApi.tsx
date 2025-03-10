import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import {jwtDecode} from "jwt-decode";

// Define an interface for the decoded admin token
interface AdminToken {
  id: string;
  role: string;
  name: string;
}

const AdminListApiPage = () => {
  const [adminName, setAdminName] = useState("Alice");
 
  
  // Decode token and set admin name
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode<AdminToken>(token);
        if (decoded && decoded.name) {
          setAdminName(decoded.name);
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  // Form state for API details (following your schema)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    usage: "",
    documentationUrl: "",
    endpoint: "",
    provider: "",
  });
  const [message, setMessage] = useState("");

  // Toggle sidebar open/close
  

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form and send POST request to create API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert price to a number and prepare data
      const dataToSend = { ...formData, price: Number(formData.price) };
      const res = await axiosClient.post("/admin/createApi", dataToSend);
      setMessage(res.data.message || "API listed successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        usage: "",
        documentationUrl: "",
        endpoint: "",
        provider: "",
      });
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to list API. Please try again."
      );
    }
  };

  // Logout handler: remove token and redirect
  

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-r from-navy-blue to-purple-600 text-white relative">
      {/* Navbar */}
      

      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="pt-5 pb-5">
        <div
          className="max-w-3xl mx-auto my-12 p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl overflow-y-auto hide-scrollbar"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {/* Heading */}
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            List Your API Here
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row: API Name & Category */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="API Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
            </div>
            {/* Second Row: Price & Usage */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
              <input
                type="text"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                placeholder="Usage (Optional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
            </div>
            {/* Third Row: Documentation URL & Endpoint */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="url"
                name="documentationUrl"
                value={formData.documentationUrl}
                onChange={handleChange}
                placeholder="Documentation URL"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
              <input
                type="text"
                name="endpoint"
                value={formData.endpoint}
                onChange={handleChange}
                placeholder="Endpoint"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
            </div>
            {/* Fourth Row: Provider (full width) */}
            <div>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Provider"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
            </div>
            {/* Description: Full width Textarea */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="API Description (Write a detailed description of your API)"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              List API
            </button>
          </form>
          {/* Message Div */}
          <div className="mt-4 text-center text-lg text-yellow-300">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminListApiPage;
