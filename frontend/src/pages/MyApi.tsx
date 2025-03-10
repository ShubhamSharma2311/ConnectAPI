import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import MyApiListItem, { APIData } from "../components/MyApiListItem";

const MyAPIs: React.FC = () => {
  const [apis, setApis] = useState<APIData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchApis = async () => {
    try {
      const res = await axiosClient.get("/admin/my-apis");
      console.log("Response from /admin/my-apis:", res.data);
      // Extract API array from res.data.data
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setApis(res.data.data);
      } else {
        setApis([]);
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching APIs:", err);
      setError(err.response?.data?.message || "Failed to fetch APIs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (api: APIData) => {
    console.log("Edit API:", api);
    // Implement navigation to the edit page or open a modal with api details.
  };

  const handleDelete = (id: string) => {
    console.log("Delete API with id:", id);
    // Implement deletion functionality (e.g., sending a DELETE request)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">My APIs</h1>
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : apis.length === 0 ? (
        <p className="text-center text-white">No APIs found.</p>
      ) : (
        <div className="space-y-4">
          {apis.map((api) => (
            <MyApiListItem
              key={api._id}
              api={api}
              isExpanded={expandedId === api._id}
              onToggle={() => toggleExpanded(api._id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAPIs;
