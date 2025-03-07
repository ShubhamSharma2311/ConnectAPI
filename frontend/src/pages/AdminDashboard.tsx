import { useEffect, useState } from "react";
import axios from "axios";
import APIcard from "../components/APIcard";
import { useNavigate } from "react-router-dom";

interface API {
  _id: string;
  name: string;
  description: string;
  pricing: string;
}

const AdminDashboard: React.FC = () => {
  const [apis, setApis] = useState<API[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminAPIs = async () => {
      try {
        const response = await axios.get("/api/admin/apis"); // Fetch only admin-specific APIs
        setApis(response.data);
      } catch (err) {
        setError("Failed to load APIs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAPIs();
  }, []);

  const handleAddAPI = () => {
    navigate("/admin/add-api");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>

      <button
        onClick={handleAddAPI}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
      >
        + Add New API
      </button>

      {loading && <p className="text-center mt-6 text-lg">Loading...</p>}
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {apis.map((api) => (
          <APIcard key={api._id} {...api} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
