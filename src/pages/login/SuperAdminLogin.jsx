import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import superadmin from '../../data/admin.json';

const SuperAdminLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const superAdminLogin = superadmin.superAdmin_login;

    if (superAdminLogin && emailOrPhone === superAdminLogin.id && password === superAdminLogin.password) {
      navigate("/superadmin");
    } else {
      setErrorMessage("❌ गलत जानकारी। कृपया सही आईडी और पासवर्ड दर्ज करें।");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-rose-100 to-orange-100 px-4 relative">
      
      {/* Background Om Symbol */}
      <img 
        src="/images/om-symbol.png" 
        alt="ॐ"
        className="absolute opacity-10 w-40 h-40 top-8 right-8 pointer-events-none"
      />
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-yellow-300">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-800 leading-snug">
            श्री सुदर्शन सेना<br />भोजन वितरण
          </h1>
          <p className="text-pink-700 mt-1 font-semibold text-sm">🙏 जय गुरुदेव नारायण हरि</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">📧 आईडी</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="आईडी दर्ज करें"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">🔐 पासवर्ड</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="********"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-700 transition font-semibold shadow"
          >
            🚪 लॉगिन करें
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
