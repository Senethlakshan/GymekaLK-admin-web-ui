import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    // Redirect to login page if user is not authenticated
    if (!role || !token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='bg-blue-300 min-h-screen'>
      <h1>AdminPanel</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPanel;
