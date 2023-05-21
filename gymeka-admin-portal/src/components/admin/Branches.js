import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BranchPopup from './BranchPopup';

function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [branchesPerPage] = useState(10); // Number of branches to display per page
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/branches', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBranches(response.data.branches);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (branch) => {
    setSelectedBranches([]);
    setPopupOpen(true);
  };

  const handleDelete = async (branchId) => {
    try {
      await axios.delete(`http://localhost:8005/api/branches/${branchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh branches list
      fetchBranches();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const branchIds = selectedBranches.map((branch) => branch._id);

      await axios.delete('http://localhost:8005/api/branches/deleteAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          branchIds,
        },
      });

      // Refresh branches list
      fetchBranches();
      setSelectedBranches([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBranch = () => {
    setSelectedBranches([]);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopupSave = async (branchData) => {
    try {
      if (selectedBranches.length > 0) {
        // Handle batch update
        // You can perform batch update logic here if needed
      } else if (selectedBranches.length === 1) {
        // Update branch
        const selectedBranch = selectedBranches[0];
        await axios.put(`http://localhost:8005/api/branches/${selectedBranch._id}`, branchData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add branch
        await axios.post('http://localhost:8005/api/branches', branchData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      // Refresh branches list
      fetchBranches();
      setPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectBranch = (branch) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(selectedBranches.filter((selectedBranch) => selectedBranch !== branch));
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  // Filter branches based on the search term
  const filteredBranches = branches.filter((branch) => {
    return branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate pagination indexes
  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = filteredBranches.slice(indexOfFirstBranch, indexOfLastBranch);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='bg-gray-800 min-h-screen p-2'>
      <h1 className='text-2xl font-bold text-white mb-4'>All Branches</h1>
      <div className='flex justify-between items-center mb-4'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddBranch}
        >
          Add Branch
        </button>
        {selectedBranches.length > 0 && (
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        )}
        <div>
          <input
            type='text'
            className='bg-gray-900 text-white py-2 px-4 rounded'
            placeholder='Search by branch code...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {filteredBranches.length === 0 && (
        <div className='text-white mb-4'>No branches found.</div>
      )}
      {filteredBranches.length > 0 && (
        <table className='w-full bg-gray-900 text-white'>
          <thead>
            <tr>
              <th className='py-2 px-4'></th>
              <th className='py-2 px-4'>Branch Code</th>
              <th className='py-2 px-4'>Location</th>
              <th className='py-2 px-4'>Open Time</th>
              <th className='py-2 px-4'>Close Time</th>
              <th className='py-2 px-4'>Manager Name</th>
              <th className='py-2 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBranches.map((branch) => (
              <tr
                key={branch._id}
                className={`hover:bg-gray-700 ${selectedBranches.includes(branch) ? 'bg-gray-700' : ''}`}
              >
                <td className='py-2 px-4 border'>
                  <input
                    type='checkbox'
                    checked={selectedBranches.includes(branch)}
                    onChange={() => handleSelectBranch(branch)}
                  />
                </td>
                <td className='py-2 px-4 border'>{branch.branchCode}</td>
                <td className='py-2 px-4 border'>{branch.location}</td>
                <td className='py-2 px-4 border'>{branch.openTime}</td>
                <td className='py-2 px-4 border'>{branch.closeTime}</td>
                <td className='py-2 px-4 border'>{branch.managerName}</td>
                <td className='py-2 px-4 border'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2'
                    onClick={() => handleUpdate(branch)}
                  >
                    Update
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                    onClick={() => handleDelete(branch._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredBranches.length > branchesPerPage && (
        <div className='flex justify-center mt-4'>
          <nav>
            <ul className='flex items-center'>
              {Array.from({ length: Math.ceil(filteredBranches.length / branchesPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`py-1 px-3 mx-1 rounded ${
                      currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {isPopupOpen && (
        <BranchPopup
          branch={selectedBranches.length === 1 ? selectedBranches[0] : null}
          onClose={handlePopupClose}
          onSave={handlePopupSave}
        />
      )}
    </div>
  );
}

export default BranchesPage;
