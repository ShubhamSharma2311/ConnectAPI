import React, { useEffect, useRef } from "react";

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
  api?: APIData; // Optional to handle missing data
  isExpanded: boolean;
  onToggle: () => void;
}

const UserApiListItem: React.FC<UserApiListItemProps> = ({ api, isExpanded, onToggle }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close expanded view when clicking outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onToggle]);

  // Fallback if no API data is provided
  if (!api || !api._id) {
    return (
      <div className="bg-white bg-opacity-20 text-black backdrop-blur-xs rounded-2xl shadow-lg p-4 text-center">
        No API details available.
      </div>
    );
  }

  // Provider avatar: first letter of provider's name
  const providerAvatar = api.provider ? api.provider.charAt(0).toUpperCase() : "";

  // Summary card view (no width classes; let the parent container handle layout)
  const summaryCard = (
    <div
      className="bg-white bg-opacity-20 text-black backdrop-blur-md rounded-2xl shadow-lg p-4 transition-all duration-300 cursor-pointer"
      onClick={onToggle}
    >
      <h3 className="text-xl font-bold">{api.name}</h3>
      <div className="flex items-center mt-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold mr-2">
          {providerAvatar}
        </div>
        <span className="text-sm">{api.provider}</span>
      </div>
    </div>
  );

  // Expanded card view as a modal overlay with blurred background
  const expandedCard = (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-transparent">
      <div
        ref={modalRef}
        className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-2xl w-full transition-all duration-300 text-gray-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold">{api.name}</h3>
          <button onClick={onToggle} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold mr-3">
            {providerAvatar}
          </div>
          <span className="text-lg font-semibold">{api.provider}</span>
        </div>
        <p className="mb-2"><strong>Category:</strong> {api.category}</p>
        <p className="mb-2"><strong>Price:</strong> ${api.price}</p>
        <p className="mb-2"><strong>Usage:</strong> {api.usage || "N/A"}</p>
        <p className="mb-2"><strong>Description:</strong> {api.description}</p>
        <p className="mb-2">
          <strong>Endpoint:</strong>{" "}
          <a
            href={api.endpoint}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {api.endpoint}
          </a>
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              const confirmed = window.confirm("Do you want to visit the documentation page?");
              if (confirmed) {
                window.open(api.documentationUrl, "_blank");
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );

  return isExpanded ? expandedCard : summaryCard;
};

export default React.memo(UserApiListItem);
