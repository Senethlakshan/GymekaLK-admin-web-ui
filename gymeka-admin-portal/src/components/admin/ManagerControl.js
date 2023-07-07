import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagerControlPopup from './popupbox/ManagerControlPopup';


function ManagerControl() {
  const [managers, setManagers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [managersPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/managers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setManagers(response.data.managers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (managerId) => {
    try {
      await axios.delete(`http://localhost:8005/api/manager/${managerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Manager deleted successfully.');
      fetchManagers();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleEdit = (manager) => {
    setSelectedManager(manager);
    setPopupOpen(true);
  };

  const handleAddManager = () => {
    setSelectedManager(null);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedManager(null);
    setPopupOpen(false);
  };

  const handlePopupSave = async (managerData) => {
    try {
      if (selectedManager) {
        await axios.put(
          `http://localhost:8005/api/managers/${selectedManager._id}`,
          managerData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Manager updated successfully.');
      } else {
        await axios.post('http://localhost:8005/api/manager/register', managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Manager added successfully.');
      }
      fetchManagers();
      setPopupOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredManagers = managers.filter((manager) =>
      manager.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setManagers(filteredManagers);
  };

  const filteredManagers = managers.filter((manager) => {
    return manager.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = filteredManagers.slice(
    indexOfFirstManager,
    indexOfLastManager
  );

  const totalPages = Math.ceil(managers.length / managersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white min-h-screen p-4">
    <h1 className='text-2xl font-bold text-white mb-4 text-center rounded-xl p-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>Manager Management</h1>


      <div className="flex justify-between items-center mb-4">
      <button
        onClick={handleAddManager}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
      >
        Add Manager
      </button>
        <form onSubmit={handleSearchSubmit} className='flex'>
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
      
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentManagers.map((manager) => (
            <tr key={manager._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{manager._id}</td>
              <td className="border px-4 py-2">{manager.username}</td>
              <td className="border px-4 py-2">{manager.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(manager)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(manager._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`px-3 py-1 bg-blue-500 text-white rounded-md mx-1 hover:bg-blue-600 focus:outline-none ${
                currentPage === pageNumber ? 'font-bold' : ''
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
      {isPopupOpen && (
        <ManagerControlPopup
          initialManager={selectedManager}
          onSave={handlePopupSave}
          onClose={handlePopupClose}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default ManagerControl;
