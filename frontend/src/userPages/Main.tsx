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

  // Wrap the search function to ensure a stable reference
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <main className="pt-20 p-4 flex-grow relative z-10">
        {/* Hero Section */}
        <section className="text-center p-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                Welcome back,
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {userName}!
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to discover amazing APIs? Search through our extensive collection.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="max-w-6xl mx-auto">
          <SearchBar onSearch={handleSearch} />
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center mt-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-lg text-gray-300 mt-4 animate-pulse">Searching for APIs...</p>
            </div>
          )}
          
          {/* Error State */}
          {searchError && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">Search Failed</h3>
                <p className="text-red-300">{searchError}</p>
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {!loading && searchResults.length === 0 && searchMessage && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No APIs Found</h3>
                <p className="text-gray-400">{searchMessage}</p>
                <p className="text-sm text-gray-500 mt-2">Try different keywords or browse our popular categories above.</p>
              </div>
            </div>
          )}
          
          {/* Results */}
          {searchResults.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Found {searchResults.length} API{searchResults.length !== 1 ? 's' : ''}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Click any card to expand details
                </div>
              </div>
              
              <div className="space-y-4">
                {searchResults.map((api, index) => (
                  <div 
                    key={api._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <UserApiListItem
                      api={api}
                      isExpanded={expandedId === api._id}
                      onToggle={() => toggleExpanded(api._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Connect</span>
                <span className="text-white">API</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Discover. Integrate. Build.</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 ConnectAPI. Crafted with ❤️ by Shubham & Harsh
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
