import React, { useEffect, useState } from 'react';

const messages = [
  "Initializing server...",
  "Fetching resources...",
  "Almost ready, please wait...",
  "Finalizing startup..."
];

const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Spinning Loader Icon */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-xl font-medium">{messages[messageIndex]}</p>
    </div>
  );
};

export default Loader;
