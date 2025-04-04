import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-3 md:p-4 fixed top-0 transition-all duration-300 bg-transparent hover:bg-opacity-90 backdrop-blur-md">
        <div className="text-2xl md:text-3xl font-bold">
          <span className="text-yellow-300">Connect</span>
          <span className="text-white">API</span>
        </div>
        <div className="flex flex-wrap items-center">
          <Link to="/signup">
            <button className="px-2 py-1 md:px-4 md:py-2 bg-blue-500 text-white font-semibold rounded-lg mx-1 md:mx-2 transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-blue-900 shadow-md hover:shadow-lg">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-2 py-1 md:px-4 md:py-2 bg-white text-purple-600 font-semibold rounded-lg mx-1 md:mx-2 transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-purple-900 shadow-md hover:shadow-lg">
              Log In
            </button>
          </Link>
        </div>
      </nav>

      
      <div className="text-center max-w-3xl mt-20 md:mt-24 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">Discover and Integrate APIs Effortlessly</h1>
        <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6">
          ConnectAPI is your one-stop platform to explore, search, and integrate APIs tailored to your needs. Whether you're a developer or a business, we simplify API discovery and usage with AI-powered recommendations.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Link to="/learn-more">
            <button className="px-3 py-2 md:px-4 md:py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-yellow-500 shadow-md hover:shadow-lg">
              Learn More
            </button>
          </Link>
          <Link to="/login">
            <button className="px-3 py-2 md:px-6 md:py-3 bg-white text-purple-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-purple-900 shadow-md hover:shadow-lg">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
