import React from "react";
import { useNavigate } from "react-router-dom";
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

interface MyApiListItemProps {
  api: APIData;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (api: APIData) => void;
  onDelete: (id: string) => void;
}

const MyApiListItem: React.FC<MyApiListItemProps> = ({
  api,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

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
            className={`w-6 h-6 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
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

      {/* Expanded Content (Only rendered when isExpanded is true) */}
      {isExpanded && (
        <div className="px-4 pb-4 text-gray-800">
          <p className="mb-2">
            <strong>Category:</strong> {api.category}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${api.price}
          </p>
          <p className="mb-2">
            <strong>Usage:</strong> {api.usage || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {api.description }
          </p>
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
          <p className="mb-2">
            <strong>Endpoint:</strong> {api.endpoint}
          </p>
          <p className="mb-2">
            <strong>Provider:</strong> {api.provider}
          </p>
          <div className="flex justify-center mt-4 gap-10">
            <button
              onClick={() => {
                onEdit(api);
                navigate(`update-api/${api._id}`, { state: { api } });
              }}
              className="px-6 py-2 bg-red-500 text-gray-800 text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(api._id)}
              className="px-4 py-2 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApiListItem;
