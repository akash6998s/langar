import React from "react";

const mapLocation =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.3689782391625!2d77.28306957456492!3d28.438291592876585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cde07636e0a33%3A0xf8a8f9a44109921a!2sShri%20Sidhdata%20Ashram!5e0!3m2!1sen!2sin!4v1745318108548!5m2!1sen!2sin";

const Footer = () => {
  return (
    <footer className="bg-yellow-100 text-gray-700 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <img src="your-temple-logo-url" alt="Logo" className="h-10 w-auto mb-4" />
          <p className="text-sm">© 2025 Shri Sidhdata Aashram. All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <p className="text-sm">
            Shri Sidhdata Ashram,<br />
            New Delhi, India.
          </p>
          <div className="mt-4">
            <iframe
              src={mapLocation}
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
