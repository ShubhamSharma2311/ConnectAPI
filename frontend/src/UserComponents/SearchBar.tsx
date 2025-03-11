import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <input
        type="text"
        placeholder="Search for APIs..."
        className="w-96 px-4 py-2 bg-white rounded-lg text-black focus:outline-none shadow-lg "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-300 to-purple-300 text-white font-bold shadow-md hover:bg-red-500 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
