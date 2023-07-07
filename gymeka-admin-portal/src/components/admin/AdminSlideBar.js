import React, { useState } from 'react';
import Branches from './Branches';
import ManagerControl from './ManagerControl';
import UserPackages from './UserPackages';
import UserControl from './UserControl';
import { FaUser, FaDumbbell, FaStoreAlt, FaUserCog, FaUserCircle, FaThList,FaRegStar,FaUserFriends } from 'react-icons/fa';

function AdminSlideBar() {
  const [currentPage, setCurrentPage] = useState('branches');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-gray-900">
      {/* slide bar */}
      <div className="w-1/6 h-screen p-4 bg-gray-800">
        <h2 className="mb-4 flex items-center font-bold text-lg text-white">
          <FaThList className="mr-2" />
          Dashboard
        </h2>
        <ul>
          <li
            className={`flex p-4 rounded-full items-center cursor-pointer text-white hover:bg-gray-700 ${
              currentPage === 'branches' ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
            onClick={() => handlePageChange('branches')}
          >
            <FaStoreAlt className="mr-2" />
            Branches
          </li>
          <li
            className={`flex p-4 rounded-full items-center cursor-pointer text-white hover:bg-gray-700 ${
              currentPage === 'managercrtl' ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
            onClick={() => handlePageChange('managercrtl')}
          >
            <FaUserCog className="mr-2" />
            Managers
          </li>
          <li
            className={`flex p-4 rounded-full items-center cursor-pointer text-white hover:bg-gray-700 ${
              currentPage === 'userpackages' ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
            onClick={() => handlePageChange('userpackages')}
          >
            <FaRegStar className="mr-2" />
            Packages
          </li>
          <li
            className={`flex p-4 rounded-full items-center cursor-pointer text-white hover:bg-gray-700 ${
              currentPage === 'usercontrol' ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
            onClick={() => handlePageChange('usercontrol')}
          >
            <FaUserFriends className="mr-2" />
            Users
          </li>
        </ul>
      </div>
      <div className="flex-1 p-1">
        {currentPage === 'branches' && <Branches />}
        {currentPage === 'managercrtl' && <ManagerControl />}
        {currentPage === 'userpackages' && <UserPackages />}
        {currentPage === 'usercontrol' && <UserControl />}
      </div>
    </div>
  );
}

export default AdminSlideBar;
