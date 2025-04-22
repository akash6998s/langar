import React, { useState } from "react";
import sewadars from '../data/members.json';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [showSummary, setShowSummary] = useState(false);

  const donations = 14500;
  const expenditure = 6200;
  const balance = donations - expenditure;
  const attendance = 89;

  const getDaysInMonth = (monthName) => {
    const monthIndex = new Date(`${monthName} 1, 2025`).getMonth();
    return new Date(2025, monthIndex + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const dates = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  const attendanceData = sewadars;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-900 mb-6">
        📿 मंदिर सेवा डैशबोर्ड
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="💰 कुल दान राशि" value={`₹${donations}`} color="bg-yellow-100" />
        <Card title="📉 कुल खर्च" value={`₹${expenditure}`} color="bg-red-100" />
        <Card title="📈 शेष राशि" value={`₹${balance}`} color="bg-green-100" />
        <Card title="🧍‍♂️ सेवादार उपस्थिति" value={`${attendance}%`} color="bg-blue-100" />
      </div>

      {/* Month Selector + Button */}
      <div className="mt-10 flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-orange-800">📋 सेवादार उपस्थिति सूची</h2>
        <div className="flex gap-4 items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-orange-300 rounded px-3 py-1 text-sm text-gray-700"
          >
            {Object.keys(sewadars).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowSummary((prev) => !prev)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded"
          >
            📊 {showSummary ? "View Full Attendance" : "Show Summary"}
          </button>
        </div>
      </div>

      {/* Attendance Section */}
      <div className="mt-6 bg-white shadow-xl rounded-xl overflow-x-auto">
        {showSummary ? (
          <table className="min-w-full border text-sm text-gray-800">
            <thead className="bg-orange-100 text-left">
              <tr>
                <th className="p-2 border">रोल नं</th>
                <th className="p-2 border">सेवादार नाम</th>
                <th className="p-2 border text-center">उपस्थिति दिन</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((sewadar, i) => {
                const present = dates.filter((d) => sewadars[sewadar.name] && sewadars[sewadar.name][d]).length;
                const absent = dates.length - present;
                const monthEndService = present;
                return (
                  <tr key={i} className="hover:bg-yellow-50">
                    <td className="p-2 border font-medium">{sewadar.roll_no}</td>
                    <td className="p-2 border font-medium">{sewadar.name} {sewadar.last_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full border text-sm text-gray-800">
            <thead className="bg-orange-100 text-left">
              <tr>
                <th className="p-2 border whitespace-nowrap sticky left-0 bg-orange-100 z-20">रोल नं</th>
                <th className="p-2 border whitespace-nowrap sticky left-0 bg-orange-100 z-20">सेवादार नाम</th>
                {dates.map((date) => (
                  <th key={date} className="p-2 border text-center whitespace-nowrap">
                    {date}
                  </th>
                ))}
                <th className="p-2 border text-center">महीने का अंत सेवा</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((sewadar, i) => (
                <tr key={i} className="hover:bg-yellow-50">
                  <td className="p-2 border font-medium whitespace-nowrap sticky left-0 bg-white z-10 shadow-md">{sewadar.roll_no}</td>
                  <td className="p-2 border font-medium whitespace-nowrap sticky left-0 bg-white z-10 shadow-md">{sewadar.name} {sewadar.last_name}</td>
                  {dates.map((date) => (
                    <td key={date} className="p-2 border text-center">
                      {sewadars[sewadar.name] && sewadars[sewadar.name][date] ? "✅" : "❌"}
                    </td>
                  ))}
                  <td className="p-2 border text-center">{dates.filter((date) => sewadars[sewadar.name] && sewadars[sewadar.name][date]).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`rounded-xl shadow-md p-6 ${color}`}>
    <h3 className="text-md font-medium text-gray-800">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Dashboard;
