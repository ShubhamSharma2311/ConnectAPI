import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminMyAPIs: React.FC = () => {
  const [apis, setApis] = useState<{ _id: string; name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminAPIs = async () => {
      try {
        const response = await axios.get("/api/admin/apis"); // Fetch admin's APIs
        setApis(response.data);
      } catch (err) {
        setError("Failed to load your APIs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAPIs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/apis/${id}`);
      setApis((prev) => prev.filter((api) => api._id !== id));
    } catch (err) {
      alert("Error deleting API");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading your APIs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Your APIs</h1>
      <Link to="/admin/add-api" className="block my-4 px-4 py-2 text-white bg-green-600 rounded-md">
        + Add New API
      </Link>

      <div className="space-y-4 mt-4">
        {apis.map((api) => (
          <div key={api._id} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{api.name}</h2>
              <p className="text-gray-600">{api.description}</p>
            </div>
            <div className="space-x-2">
              <Link to={`/admin/edit-api/${api._id}`} className="px-4 py-2 text-white bg-blue-500 rounded-md">
                Edit
              </Link>
              <button onClick={() => handleDelete(api._id)} className="px-4 py-2 text-white bg-red-500 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMyAPIs;
