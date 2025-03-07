import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/useratom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setUser({ isAuthenticated: false, user: null });
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          API Hub
        </Link>
        <div className="space-x-6">
          <Link to="/explore" className="text-white hover:text-gray-200">
            Explore APIs
          </Link>
          {user.isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded-lg shadow-md hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded-lg shadow-md hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
