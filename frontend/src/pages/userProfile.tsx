import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  purchasedAPIs: { _id: string; name: string; description: string }[];
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <h2 className="mt-6 text-2xl font-semibold">Purchased APIs</h2>
      <div className="mt-4">
        {user?.purchasedAPIs.length ? (
          user.purchasedAPIs.map((api) => (
            <div key={api._id} className="p-3 border rounded-lg shadow my-2">
              <p className="font-semibold">{api.name}</p>
              <p className="text-sm text-gray-600">{api.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No APIs purchased yet.</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
