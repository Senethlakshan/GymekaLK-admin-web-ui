import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserPackagesPopup from './popupbox/UserPackagesPopup';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPackages() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(2);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/packages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages(response.data.packages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (selectedPackage) => {
    setSelectedPackages([selectedPackage]);
    setPopupOpen(true);
  };

  const handleDelete = async (packageId) => {
    try {
      await axios.delete(`http://localhost:8009/api/packages/${packageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Package deleted successfully.');
      fetchPackages();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const packageIds = selectedPackages.map((selectedPackage) => selectedPackage._id);

      await axios.delete('http://localhost:8009/api/packages/deleteAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          packageIds,
        },
      });
      toast.success(`All Packages deleted successfully.`);
      // Refresh packages list
      fetchPackages();
      setSelectedPackages([]);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleAddPackage = () => {
    setSelectedPackages([]);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopupSave = async (packageData) => {
    try {
      if (selectedPackages.length > 0) {
        await Promise.all(
          selectedPackages.map(async (selectedPackage) => {
            try {
              await axios.put(
                `http://localhost:8009/api/packages/${selectedPackage._id}`,
                packageData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.success(`Package "${selectedPackage.name}" updated successfully.`);
            } catch (error) {
              console.log(error);
              toast.error(
                `Failed to update package "${selectedPackage.name}". Please try again.`
              );
            }
          })
        );
      } else {
        await axios.post('http://localhost:8009/api/packages', packageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(`Package "${packageData.name}" added successfully.`);
      }
      fetchPackages();
      setPopupOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleCheckboxChange = (event, selectedPackage) => {
    if (event.target.checked) {
      setSelectedPackages((prevSelectedPackages) => [...prevSelectedPackages, selectedPackage]);
    } else {
      setSelectedPackages((prevSelectedPackages) =>
        prevSelectedPackages.filter((pkg) => pkg._id !== selectedPackage._id)
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredPackages = packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPackages(filteredPackages);
  };

  // Filter packages based on the search term
  const filteredPackages = packages.filter((pkg) => {
    return pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);

  const totalPages = Math.ceil(packages.length / packagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white min-h-screen p-2">
      <h1 className='text-2xl font-bold text-white mb-4 text-center rounded-xl p-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>Packages Management</h1>


      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddPackage}
          className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Package
        </button>
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            placeholder="Search Packages..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-r-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>

      <table className="w-full border">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b-2 border-l border-gray-200">Name</th>
      <th className="py-2 px-4 border-b-2 border-l border-gray-200">Price (Rs.)</th>
      <th className="py-2 px-4 border-b-2 border-l border-gray-200">Description</th>
      <th className="py-2 px-4 border-b-2 border-l border-gray-200">Actions</th>
      <th className="py-2 px-4 border-b-2 border-l border-r border-gray-200">Select</th>
    </tr>
  </thead>
  <tbody>
    {currentPackages.map((pkg) => (
      <tr key={pkg._id} className="hover:bg-gray-100">
        <td className="py-2 px-4 border-b border-l border-gray-200">{pkg.name}</td>
        <td className="py-2 px-4 border-b border-l border-gray-200">{pkg.price}</td>
        <td className="py-2 px-4 border-b border-l border-gray-200">{pkg.description}</td>
        <td className="py-2 px-4 border-b border-l border-gray-200">
          <button
            onClick={() => handleUpdate(pkg)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(pkg._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            <FaTrash />
          </button>
        </td>
        <td className="py-2 px-4 border-b border-l border-r border-gray-200">
          <input
            type="checkbox"
            checked={selectedPackages.some((selectedPkg) => selectedPkg._id === pkg._id)}
            onChange={(event) => handleCheckboxChange(event, pkg)}
            className="form-checkbox h-5 w-5 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>



      {packages.length === 0 && <p>No packages found.</p>}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              } px-4 py-2 border border-gray-300 rounded-md mx-1 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleDeleteSelected}
        disabled={selectedPackages.length === 0}
        className={`${selectedPackages.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500'
          } text-white px-4 py-2 rounded-md mt-4 mb-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500`}
      >
        Delete Selected
      </button>

      {isPopupOpen && (
        <UserPackagesPopup
          package={selectedPackages.length === 1 ? selectedPackages[0] : null}
          onClose={handlePopupClose}
          onSave={handlePopupSave}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default UserPackages;
