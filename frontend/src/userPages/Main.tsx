import React, { useState, useEffect, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import {jwtDecode} from "jwt-decode";
import UserNavbar from "../UserComponents/userNavbar";
import SearchBar from "../UserComponents/SearchBar";
import UserApiListItem, { APIData } from "../UserComponents/ApiList";

interface UserToken {
  id: string;
  role: string;
  name: string;
}

const UserPage: React.FC = () => {
  const [userName, setUserName] = useState("User");
  const [searchResults, setSearchResults] = useState<APIData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Decode the user token once on mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        if (decoded?.name) {
          setUserName(decoded.name);
        }
      } catch (error) {
        console.error("Error decoding user token:", error);
      }
    }
  }, []);

  // Wrap the search function to ensure stable reference
  const handleSearch = useCallback(async (query: string) => {
    // Clear previous results immediately when a new search is initiated
    setSearchResults([]);
    setLoading(true);
    setSearchError("");
    setSearchMessage("");
    try {
      const res = await axiosClient.post("/user/search", { query });
      console.log("Search response:", res.data);
      // Expected response: { message: "...", apis: [ ... ] }
      if (res.data && Array.isArray(res.data.apis)) {
        if (res.data.apis.length === 0) {
          setSearchMessage(res.data.message || "No APIs found.");
        } else {
          setSearchResults(res.data.apis);
          setSearchMessage("");
        }
      } else {
        setSearchMessage(res.data.message || "No APIs found.");
      }
    } catch (err: any) {
      console.error("Search error:", err.response?.data?.message || err.message);
      setSearchError(err.response?.data?.message || "Search failed");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Wrap the toggle function to prevent unnecessary re-renders
  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <main className="pt-20 p-4 flex-grow">
        {/* Hero Section */}
        <section className="text-center p-4">
          <h1 className="text-5xl font-bold">Welcome, {userName}!</h1>
        </section>

        {/* Search Section */}
        <section>
          <SearchBar onSearch={handleSearch} />
          {loading && <p className="text-center mt-4">Searching...</p>}
          {searchError && <p className="text-center mt-4 text-red-500">{searchError}</p>}
          {!loading && searchResults.length === 0 && searchMessage && (
            <p className="text-center mt-4">{searchMessage}</p>
          )}
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-4">
              {searchResults.map((api) => (
                <UserApiListItem
                  key={api._id}
                  api={api}
                  isExpanded={expandedId === api._id}
                  onToggle={() => toggleExpanded(api._id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-gray-800 text-center">
        <p>© 2025 ConnectAPI. Created by Shubham Sharma.</p>
      </footer>
    </div>
  );
};

export default UserPage;
