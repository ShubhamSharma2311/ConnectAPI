import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import MyApiListItem, { APIData } from "../components/MyApiListItem";
import DeleteConfirmationModal from "../components/DeleteConformation";

const MyAPIs: React.FC = () => {
  const [apis, setApis] = useState<APIData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchApis = async () => {
    try {
      const res = await axiosClient.get("/admin/my-apis");
      console.log("Response from /admin/my-apis:", res.data);
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

  // Edit functionality remains unchanged.
  const handleEdit = (api: APIData) => {
    console.log("Edit API:", api);
    // Your existing edit navigation logic (already implemented in MyApiListItem)
  };

  // When the delete button is clicked, set the deleteId to show the confirmation modal.
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  // On confirming deletion, send a DELETE request and update state.
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axiosClient.delete(`/admin/deleteApi/${deleteId}`);
      setApis((prev) => prev.filter((api) => api._id !== deleteId));
      setDeleteId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete API");
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
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
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Render the delete confirmation modal if deleteId is set */}
      {deleteId && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this API? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default MyAPIs;
