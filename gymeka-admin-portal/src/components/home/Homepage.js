import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

const Homepage = () => {


  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <SyncLoader size={10} color="#5305b3" />
          <p className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-md mt-2'>Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section className="bg-gray-800 text-white py-20 min-h-screen">
        <div className="container mx-5">
          <h1 className="text-4xl font-bold mb-4">Welcome to our Gym</h1>
          <p className="text-lg">Stay fit and healthy with our top-notch facilities</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto">
          <div className="flex justify-between m-4">
            {/* Help */}
            <div>
              <h2 className="text-lg font-bold mb-4">Help</h2>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
              </ul>
            </div>

            {/* Gym Details */}
            <div>
              <h2 className="text-lg font-bold mb-4">Gym Details</h2>
              <p className="text-gray-300">123 Main Street</p>
              <p className="text-gray-300">City, State 12345</p>
            </div>

            {/* Terms */}
            <div>
              <h2 className="text-lg font-bold mb-4">Terms</h2>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
