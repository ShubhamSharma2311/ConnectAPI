import { Link } from "react-router-dom";

interface APIProps {
  _id: string;
  name: string;
  description: string;
  pricing: string;
}

const APIcard: React.FC<APIProps> = ({ _id, name, description, pricing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="mt-2 font-semibold text-blue-500">{pricing}</p>
      <Link
        to={`/api/${_id}`}
        className="block mt-3 text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
      >
        View Details
      </Link>
    </div>
  );
};

export default APIcard;
