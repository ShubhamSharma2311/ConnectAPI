

const LearnMorePage = () => {
  return (
    <div>
  
  <nav className="w-full flex justify-between items-center p-4 fixed top-0 transition-all duration-300 bg-transparent hover:bg-opacity-90 backdrop-blur-md">
        <div className="text-3xl font-bold">
          <span className="text-yellow-300">Connect</span>
          <span className="text-white">API</span>
        </div>
        
      </nav>

      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mt-24 px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          Learn More About ConnectAPI
        </h1>
        <p className="text-lg text-gray-200 mb-8 text-center">
          ConnectAPI simplifies API discovery and integration by connecting API providers and consumers through intelligent, AI-powered recommendations.
        </p>
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-2">Our Motive</h2>
            <p className="text-lg text-gray-200">
              Our primary motive is to streamline the process of finding and integrating APIs, reducing complexity and empowering developers and businesses to innovate faster. We bridge the gap between API providers and consumers, making technology more accessible and easier to use.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-2">Advantages</h2>
            <ul className="list-disc list-inside text-lg text-gray-200">
              <li>AI-powered recommendations for personalized API discovery.</li>
              <li>Intuitive, modern user interface for a seamless experience.</li>
              <li>Secure and efficient integration between API providers and consumers.</li>
              <li>Robust analytics and management tools to track API performance.</li>
              <li>Scalable architecture built with modern technologies for future growth.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-2">Why Choose ConnectAPI?</h2>
            <p className="text-lg text-gray-200">
              With ConnectAPI, you save time and avoid the hassle of navigating through countless API options. Our platform delivers data-driven insights, allowing you to make informed decisions and integrate APIs effortlessly—whether you're building a new application or enhancing an existing one.
            </p>
          </section>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default LearnMorePage;
