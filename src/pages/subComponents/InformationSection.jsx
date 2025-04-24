import React from "react";

const InformationSection = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  
      {/* <!-- Upcoming Events --> */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>🗓 25th April - Hanuman Jayanti Kirtan</li>
          <li>🗓 30th April - Monthly Satsang</li>
          <li>🗓 5th May - Maha Yagya</li>
        </ul>
      </div>
  
      {/* <!-- Latest News --> */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Latest News</h2>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>📢 New langar hall construction started</li>
          <li>📢 Blood donation camp on 1st May</li>
          <li>📢 Meditation workshops every Sunday</li>
        </ul>
      </div>
  
      {/* <!-- Register as Sewadar --> */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Become a Sewadar</h2>
        <p className="text-gray-600 text-sm mb-4">
          Join hands in selfless service. Fill out the form to register yourself as a Sewadar.
        </p>
        <a
          href="/register-sewadar"
          className="inline-block mt-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Register Now
        </a>
      </div>
  
      {/* <!-- Timings --> */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Temple Timings</h2>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>🕗 Morning: 5:00 AM - 12:00 PM</li>
          <li>🕔 Evening: 4:00 PM - 9:00 PM</li>
          <li>🧘 Meditation: Every Sunday, 6:00 AM</li>
        </ul>
      </div>
  
    </div>
  </div>
  
  );
};

export default InformationSection;
