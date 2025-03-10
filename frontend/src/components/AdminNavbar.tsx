import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface AdminToken {
  id: string;
  role: string;
  name: string;
}

const AdminNavbar: React.FC = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode<AdminToken>(token);
        if (decoded?.name) {
          setAdminName(decoded.name);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 fixed top-0 z-50 bg-navy-blue">
      <div className="text-3xl font-bold">
        <span className="text-yellow-300">Connect</span>
        <span className="text-white">API</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold focus:outline-none"
        >
          {adminName.charAt(0)}
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <div className="p-4 border-b">
              <p className="font-semibold">{adminName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left p-4 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
