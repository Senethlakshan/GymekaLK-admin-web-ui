import React, { useEffect } from 'react';
import AdminSlideBar from './AdminSlideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {

  return (
    <div className='bg-blue-300 min-h-screen'>
      <AdminSlideBar/>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
