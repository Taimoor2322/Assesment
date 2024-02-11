import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <Link to="/" className="text-white font-semibold text-lg">Dashboard</Link>
            <Link to="/users" className="ml-4 text-white font-semibold text-lg">Users</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
