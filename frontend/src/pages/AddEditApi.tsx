import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEditAPI: React.FC = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    description: "",
    pricing: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // If editing, fetch the API details
      const fetchAPI = async () => {
        try {
          const response = await axios.get(`/api/admin/apis/${id}`);
          setApiData(response.data);
        } catch (err) {
          setError("Failed to load API details.");
        }
      };
      fetchAPI();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/admin/apis/${id}`, apiData);
      } else {
        await axios.post("/api/admin/apis", apiData);
      }
      navigate("/admin/dashboard"); // Redirect to admin dashboard after success
    } catch (err) {
      setError("Failed to save API. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800">{id ? "Edit API" : "Add API"}</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="API Name"
          value={apiData.name}
          onChange={handleChange}
          className="p-3 rounded-lg border shadow-md"
          required
        />

        <textarea
          name="description"
          placeholder="API Description"
          value={apiData.description}
          onChange={handleChange}
          className="p-3 rounded-lg border shadow-md"
          required
        />

        <input
          type="text"
          name="pricing"
          placeholder="Pricing (Free, $10/month, etc.)"
          value={apiData.pricing}
          onChange={handleChange}
          className="p-3 rounded-lg border shadow-md"
          required
        />

        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
          disabled={loading}
        >
          {loading ? "Saving..." : id ? "Update API" : "Add API"}
        </button>
      </form>
    </div>
  );
};

export default AddEditAPI;
