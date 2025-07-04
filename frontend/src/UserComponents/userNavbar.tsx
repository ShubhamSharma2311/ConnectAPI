import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface UserToken {
  id: string;
  role: string;
  name: string;
}

const UserNavbar: React.FC = () => {
  const [userName, setUserName] = useState("User");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        if (decoded?.name) {
          setUserName(decoded.name);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full flex justify-between items-center p-6 fixed top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="text-3xl font-bold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Connect</span>
        <span className="text-white">API</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold focus:outline-none hover:scale-105 transition-transform text-white"
        >
          {userName.charAt(0)}
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/20">
            <div className="p-4 border-b border-white/20">
              <p className="font-semibold text-white">{userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left p-4 text-red-400 hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
