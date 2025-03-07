import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface API {
  _id: string;
  name: string;
  description: string;
  pricing: string;
  documentation: string;
}

const APIDetails: React.FC = () => {
  const { id } = useParams();
  const [api, setApi] = useState<API | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get(`/api/apis/${id}`);
        setApi(response.data);
      } catch (error) {
        console.error("Error fetching API details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!api) return <p className="text-center text-red-500">API not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">{api.name}</h1>
      <p className="text-gray-600 mt-2">{api.description}</p>
      <p className="mt-2 font-semibold text-blue-500">{api.pricing}</p>

      <a
        href={api.documentation}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all"
      >
        View Documentation
      </a>
    </div>
  );
};

export default APIDetails;
