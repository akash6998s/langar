import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-yellow-100 py-4 relative">
      <div className="mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-8 w-auto"
            src="your-temple-logo-url"
            alt="Shri Sidhdata Aashram"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="text-gray-700 text-lg">Home</Link>
          <Link to="/about" className="text-gray-700 text-lg">About Us</Link>
          <Link to="/" className="text-gray-700 text-lg">Join Us</Link>
          <Link to="/" className="text-gray-700 text-lg">Donate</Link>
          <Link to="/contactusform" className="text-gray-700 text-lg">Contact Us</Link>
          <Link to="/loginpage" className="text-gray-700 text-lg">Admin</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white opacity-100 shadow-md flex flex-col space-y-4 py-4 px-6 z-50">
          <Link to="/" className="text-gray-700 text-lg" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="text-gray-700 text-lg" onClick={toggleMenu}>About Us</Link>
          <Link to="/" className="text-gray-700 text-lg" onClick={toggleMenu}>Join Us</Link>
          <Link to="/" className="text-gray-700 text-lg" onClick={toggleMenu}>Donate</Link>
          <Link to="/contactusform" className="text-gray-700 text-lg" onClick={toggleMenu}>Contact Us</Link>
          <Link to="/loginpage" className="text-gray-700 text-lg" onClick={toggleMenu}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
