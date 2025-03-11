import React from "react";
// import { useNavigate } from "react-router-dom";

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
  api?: APIData;  // made optional so we can check for empty data
  isExpanded: boolean;
  onToggle: () => void;
}

const UserApiListItem: React.FC<UserApiListItemProps> = ({
  api,
  isExpanded,
  onToggle,
}) => {
  // If no API data is provided, display a fallback message.
  if (!api || !api._id) {
    return (
      <div className="bg-white bg-opacity-20 text-black backdrop-blur-md rounded-2xl shadow-lg p-4 text-center">
        No API details available.
      </div>
    );
  }

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
          <p className="mb-2">
            <strong>Documentation:</strong>{" "}
            <a
              href={api.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {api.documentationUrl}
            </a>
          </p>
          <p className="mb-2"><strong>Endpoint:</strong> {api.endpoint}</p>
          <p className="mb-2"><strong>Provider:</strong> {api.provider}</p>
        </div>
      )}
    </div>
  );
};

export default UserApiListItem;
