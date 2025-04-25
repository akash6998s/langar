import React from "react";

const Footer = () => {
  return (
    <footer className="bg-yellow-100 text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <img
              src="your-temple-logo-url"
              alt="Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm">
              © 2025 Shri Sidhdata Aashram. All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-sm">
              Shri Sidhdata Ashram,
              <br />
              New Delhi, India.
            </p>
            
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">Phone: +91 9876543210</p>
            <p className="text-sm">Email: info@shrisidhdataaashram.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
