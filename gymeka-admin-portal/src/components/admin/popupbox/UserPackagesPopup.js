import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPackagesPopup({ package: initialPackage, onClose, onSave }) {
  const [packageData, setPackageData] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (initialPackage) {
      setPackageData({
        name: initialPackage.name,
        price: initialPackage.price,
        description: initialPackage.description,
      });
    }
  }, [initialPackage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackageData((prevPackageData) => ({
      ...prevPackageData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!packageData.name || !packageData.price || !packageData.description) {
      toast.error('Please fill in all fields.');
      return;
    }

    onSave(packageData);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-50">
         <div className="bg-white w-1/2 p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">{initialPackage ? 'Edit Package' : 'Add Package'}</h3>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={packageData.name}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Price (Rs.):
        <input
          type="text"
          name="price"
          value={packageData.price}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={packageData.description}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>
      <div className="flex justify-start mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
    </div>
   
  );
}

export default UserPackagesPopup;
