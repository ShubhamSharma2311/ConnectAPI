import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const AdminListApiPage: React.FC = () => {
  // Form state for API details
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto my-6 sm:my-8 md:my-10">
        <div
          className="bg-gray-300 bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-4 sm:mb-6">
            List Your API Here
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* First Row: API Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="API Name"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
            </div>
            {/* Second Row: Price & Usage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                placeholder="Usage (Optional)"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
            </div>
            {/* Third Row: Documentation URL & Endpoint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="url"
                name="documentationUrl"
                value={formData.documentationUrl}
                onChange={handleChange}
                placeholder="Documentation URL"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                name="endpoint"
                value={formData.endpoint}
                onChange={handleChange}
                placeholder="Endpoint"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              />
            </div>
            {/* Description: Full width Textarea */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="API Description (Write a detailed description of your API)"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm sm:text-base"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-2/3 md:w-1/2 py-2 sm:py-3 mt-2 sm:mt-3 bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-base sm:text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                List API
              </button>
            </div>
          </form>
          {/* Message Div */}
          <div className="mt-3 sm:mt-4 text-center text-base sm:text-lg text-yellow-300">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminListApiPage;
