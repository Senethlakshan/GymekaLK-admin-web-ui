import React, { useState } from 'react';

function BranchPopup({ branch, onClose, onSave }) {
  const [branchData, setBranchData] = useState({
    branchCode: branch ? branch.branchCode : '',
    location: branch ? branch.location : '',
    openTime: branch ? branch.openTime : '',
    closeTime: branch ? branch.closeTime : '',
    managerName: branch ? branch.managerName : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(branchData);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-50">
      <div className="bg-white w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">{branch ? 'Update Branch' : 'Add Branch'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="branchCode"
              name="branchCode"
              value={branchData.branchCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="location">
              Location
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="location"
              name="location"
              value={branchData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="openTime">
              Open Time
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="openTime"
              name="openTime"
              value={branchData.openTime}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="closeTime">
              Close Time
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="closeTime"
              name="closeTime"
              value={branchData.closeTime}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="managerName">
              Manager Name
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="managerName"
              name="managerName"
              value={branchData.managerName}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {branch ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BranchPopup;
