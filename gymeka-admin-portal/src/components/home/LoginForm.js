import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); // Default role is set to 'admin'
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state for the spinner
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Redirect to admin panel or manager panel if user is already logged in
        if (token) {
            if (role === 'admin') {
                navigate('/admin-panel');
            } else if (role === 'manager') {
                navigate('/manager-panel');
            }
        }
    }, [role, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Start the loading spinner

        try {
            const response = await axios.post(`http://localhost:8005/api/${role}/login`, {
                email,
                password
            });

            localStorage.setItem('role', role);
            localStorage.setItem('token', response.data.token);

            setEmail('');
            setPassword('');

            // Redirect to admin panel or manager panel based on the role
            if (role === 'admin') {
                navigate('/admin-panel');
            } else if (role === 'manager') {
                navigate('/manager-panel');
            }
        } catch (error) {
            setMessage(error.response.data.error);
            setIsLoading(false); // Stop the loading spinner on error
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 w-96 p-8 mb-20 rounded-lg">
                <h2 className="text-2xl text-white font-bold mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 rounded-md py-2 px-3 mt-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-200 rounded-md py-2 px-3 mt-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="text-white">Role:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-gray-200 rounded-md py-2 px-3 mt-2 w-full"
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="relative font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2 px-4 rounded-md w-full overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-violet-700 hover:scale-110"
                    >
                        {isLoading ? (
<SyncLoader size={10} color="#ffffff" /> // Show the spinner when loading
) : (
<>
Login
<span className="absolute top-0 right-0 h-2 w-2 bg-white rounded-full transform translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
</>
)}
</button>

                </form>
                {message && <p className="text-white mt-4">{message}</p>}
            </div>
        </div>

    );
};

export default LoginForm;
