import { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string }>({
    name: "",
    email: "",
    role: "Admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("/api/admin/profile");
        setAdmin(response.data);
      } catch (err) {
        setError("Failed to load profile.");
      }
    };
    fetchAdminProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/api/admin/profile", admin);
      setSuccess(true);
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800">Admin Profile</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">Profile updated successfully!</p>}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          value={admin.name}
          onChange={handleChange}
          className="p-3 rounded-lg border shadow-md"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={admin.email}
          onChange={handleChange}
          className="p-3 rounded-lg border shadow-md"
          required
          disabled
        />

        <input
          type="text"
          name="role"
          value={admin.role}
          className="p-3 rounded-lg border shadow-md bg-gray-200"
          disabled
        />

        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
