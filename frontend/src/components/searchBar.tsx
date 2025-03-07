import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { apiState } from "../recoil/atoms/apiatoms";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setApis = useSetRecoilState(apiState);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setApis(response.data);
    } catch (error) {
      console.error("Error searching APIs:", error);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <input
        type="text"
        placeholder="Search for APIs..."
        className="w-96 px-4 py-2 rounded-lg text-black focus:outline-none shadow-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-3 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
