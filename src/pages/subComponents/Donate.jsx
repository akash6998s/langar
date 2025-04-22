import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Donate = () => {
  return (
    <div>
      <Navbar />
      <section className="py-12 text-center bg-yellow-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Support the Langar</h2>
        <p className="text-lg text-gray-600 mb-6">
          Your donation helps us serve meals to the needy. Every little contribution makes a big difference.
        </p>
        <a href="donation-link" className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg">Donate Now</a>
      </section>
      <Footer />
    </div>
  );
};

export default Donate;
