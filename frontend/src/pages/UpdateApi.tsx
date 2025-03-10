import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export interface APIData {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  usage?: string;
  documentationUrl: string;
  endpoint: string;
  provider: string;
}

const EditApiPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Attempt to get API data from navigation state
  const stateApi = location.state?.api as APIData | undefined;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    usage: "",
    documentationUrl: "",
    endpoint: "",
    provider: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (stateApi) {
      setFormData({
        name: stateApi.name || "",
        category: stateApi.category || "",
        price: String(stateApi.price || ""),
        usage: stateApi.usage || "",
        documentationUrl: stateApi.documentationUrl || "",
        endpoint: stateApi.endpoint || "",
        provider: stateApi.provider || "",
        description: stateApi.description || "",
      });
      setLoading(false);
    } else {
      setError("No API details available. Please return to My APIs and try again.");
      setLoading(false);
    }
  }, [stateApi]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const dataToSend = { ...formData, price: Number(formData.price) };
      await axiosClient.put(`/admin/updateApi/${id}`, dataToSend);
      setSuccess("API updated successfully!");
      setTimeout(() => {
        navigate("/admin/my-apis");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update API");
    }
  };

  const handleCancel = () => {
    navigate("/admin/my-apis");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <p>Loading API details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-navy-blue to-purple-600 p-8 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Edit API</h1>
      

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6"
      >
        {/* First row: API Name & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">API Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="API Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Second row: Price & Usage */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Usage (Optional)</label>
            <input
              type="text"
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              placeholder="Usage (Optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Third row: Documentation URL & Endpoint */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Documentation URL</label>
            <input
              type="url"
              name="documentationUrl"
              value={formData.documentationUrl}
              onChange={handleChange}
              placeholder="Documentation URL"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Endpoint</label>
            <input
              type="text"
              name="endpoint"
              value={formData.endpoint}
              onChange={handleChange}
              placeholder="Endpoint"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Fourth row: Provider */}
        <div>
          <label className="block mb-1 text-gray-800 font-semibold">Provider</label>
          <input
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            placeholder="Provider"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            required
          />
        </div>

        {/* Description: Full width Textarea */}
        <div>
          <label className="block mb-1 text-gray-800 font-semibold">API Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="API Description (Write a detailed description of your API)"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            Update API
          </button>
          <button
            type="button"
            onClick={() => handleCancel()}
            className="w-full py-3 mt-4 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Message Div */}
      {error && <div className="mt-4 text-center text-lg text-red-500">{error}</div>}
      {success && <div className="mt-4 text-center text-lg text-green-500">{success}</div>}
    </div>
  );
};

export default EditApiPage;
