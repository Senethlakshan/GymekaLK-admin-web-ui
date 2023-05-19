import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import banner from '../../assests/web-banner.jpeg';
import { FaUserCog, FaClipboardList, FaDumbbell, FaUsersCog } from 'react-icons/fa';

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
      <section className="bg-gray-800 text-white ">
        <img src={banner} alt='web banner' />
      </section>

      {/* Sidebar */}
      <aside className="bg-gray-900 py-8">
        <div className="container p-4">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-400 bg-blue-600 bg-opacity-50 p-4 rounded-lg">
            <FaUsersCog className='mr-2' /> Simplify your tasks with Power Management Tools.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 - Admin */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-md shadow p-6 flex items-center transform hover:scale-105 transition duration-500 ease-in-out">
              <FaUserCog className="w-8 h-8 mr-3  text-white" />
              <div className=' text-white'>
                <h3 className="text-lg font-bold mb-2">Admin</h3>
                <p>Access member management, attendance tracking, and billing tools.</p>
              </div>
            </div>
            {/* Card 2 - Manager */}
            <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-md shadow p-6 flex items-center transform hover:scale-105 transition duration-500 ease-in-out">
              <FaClipboardList className="w-8 h-8 mr-3 text-white" />
              <div className='text-white'>
                <h3 className="text-lg font-bold mb-2">Manager</h3>
                <p>Manage staff, schedule classes, and generate reports.</p>
              </div>
            </div>
            {/* Card 3 - Trainer */}
            <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md shadow p-6 flex items-center transform hover:scale-105 transition duration-500 ease-in-out">
              <FaDumbbell className="w-8 h-8 mr-3 text-white" />
              <div className='text-white'>
                <h3 className="text-lg font-bold mb-2">Trainer</h3>
                <p>View class schedules, track member progress, and communicate with members.</p>
              </div>
            </div>
            {/* Add more cards for other roles */}
          </div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-10">
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
