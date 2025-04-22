import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const JoinUs = () => {
  return (
    <div>
      <Navbar />
      <section className="py-12 text-center bg-yellow-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Seva (Selfless Service)</h2>
        <p className="text-lg text-gray-600 mb-6">
          Volunteering at the langar is an act of devotion. You can contribute by serving food, cooking, cleaning, or assisting in other ways.
        </p>
        <a href="/donate" className="mt-6 inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg">Donate to Langar</a>
      </section>
      <Footer />
    </div>
  );
};

export default JoinUs;
