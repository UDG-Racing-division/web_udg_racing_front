import React from 'react';
import '../styles/global.css';
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <ul className="flex justify-center space-x-8">
        <li>
        <a href="/" className="hover:text-blue-400 transition">
            Home
        </a>
        </li>
        <li>
          <a href="/posts" className="hover:text-blue-400 transition">
            Posts
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
