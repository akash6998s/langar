import React, { useState } from "react";
import {Menu, X } from "lucide-react"; // For icons. You can use others if needed.
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-yellow-100 py-4">
  <div className="mx-auto px-4 flex items-center justify-between">
    <div className="flex items-center">
      <img
        className="h-8 w-auto"
        src="your-temple-logo-url"
        alt="Shri Sidhdata Aashram"
      />
    </div>
    <div className="hidden sm:flex space-x-6">
    <Link to="/" className="text-gray-700 text-lg">Home</Link>
    <Link to="/about" className="text-gray-700 text-lg">About Us</Link>
    <Link to="/" className="text-gray-700 text-lg">Join Us</Link>
    <Link to="/" className="text-gray-700 text-lg">Donate</Link>
    <Link to="/contactusform" className="text-gray-700 text-lg">Contact Us</Link>
    <Link to="/loginpage" className="text-gray-700 text-lg">Admin</Link>
    </div>
    <div className="sm:hidden">
      <button onClick={toggleMenu} className="text-gray-700">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
