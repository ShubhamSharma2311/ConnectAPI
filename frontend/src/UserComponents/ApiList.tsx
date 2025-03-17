import React from "react";

export interface APIData {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  usage?: string;
  documentationUrl: string;
  endpoint: string;
  provider: string;
}

interface UserApiListItemProps {
  api?: APIData; // Made optional to handle cases with no data
  isExpanded: boolean;
  onToggle: () => void;
}

const UserApiListItem: React.FC<UserApiListItemProps> = ({ api, isExpanded, onToggle }) => {
  // If no API data is provided, display a fallback message.
  if (!api || !api._id) {
    return (
      <div className="bg-white bg-opacity-20 text-black backdrop-blur-md rounded-2xl shadow-lg p-4 text-center">
        No API details available.
      </div>
    );
  }

  const handleViewDocs = () => {
    const confirmed = window.confirm("Do you want to visit the documentation page?");
    if (confirmed) {
      window.open(api.documentationUrl, "_blank");
    }
  };

  return (
    <div className="bg-white bg-opacity-20 text-black backdrop-blur-md rounded-2xl shadow-lg mb-4 transition-all duration-300">
      {/* Header (Always visible) */}
      <div
        className="px-4 py-3 cursor-pointer flex justify-between items-center"
        onClick={onToggle}
      >
        <h3 className="text-xl font-bold text-black">{api.name}</h3>
        <div className="text-gray-800">
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 text-gray-800">
          <p className="mb-2"><strong>Category:</strong> {api.category}</p>
          <p className="mb-2"><strong>Price:</strong> ${api.price}</p>
          <p className="mb-2"><strong>Usage:</strong> {api.usage || "N/A"}</p>
          <p className="mb-2"><strong>Description:</strong> {api.description}</p>
          <p className="mb-2"><strong>Endpoint:</strong> {api.endpoint}</p>
          <p className="mb-2"><strong>Provider:</strong> {api.provider}</p>
          <div className="mt-4 flex justify-center">
            <button 
              onClick={handleViewDocs} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              View Documentation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserApiListItem);
