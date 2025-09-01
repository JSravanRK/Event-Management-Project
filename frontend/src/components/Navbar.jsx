import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true,
      });
      toast.success('Logged out');
      setUser(null);
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">EventPlatform</Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/create" className="hover:underline">Create Event</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}


export default Navbar;
