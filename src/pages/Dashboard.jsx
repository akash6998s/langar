import React, { useEffect, useState } from 'react';
import DonationsTable from './Dashboard/DonationsTable';
import AllExpensesTable from './Dashboard/AllExpensesTable';
import FinanceTable from './Dashboard/FinanceTable';
import { Link } from "react-router-dom";

const months = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const currentDate = new Date();
const currentMonth = months[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();
const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

const monthDays = {
  january: 31, february: 28, march: 31, april: 30, may: 31, june: 30,
  july: 31, august: 31, september: 30, october: 31, november: 30, december: 31
};

export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState({});
  const [members, setMembers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [view, setView] = useState('attendance'); // 'attendance', 'donations', 'expenses'

  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  useEffect(() => {
    if (view === 'attendance') {
      fetch('http://localhost:5000/attendance')
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) setAttendanceData(data[0]);
        });

      fetch('http://localhost:5000/member-full-details')
        .then(res => res.json())
        .then(setMembers);
    }
  }, [selectedMonth, selectedYear, view]);

  const renderAttendanceTable = () => {
    const yearData = attendanceData[selectedYear] || {};
    const monthData = yearData[selectedMonth] || {};
    const daysInMonth = selectedMonth === 'february' && isLeapYear(Number(selectedYear))
      ? 29 : monthDays[selectedMonth];
  
    // Create an array of dates and days
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(selectedYear, months.indexOf(selectedMonth), i + 1);
      const dayName = date.toLocaleString('default', { weekday: 'short' }); // 'Mon', 'Tue', etc.
      return `${i + 1} ${dayName}`; // e.g., '1 Mon', '2 Tue'
    });
  
    return (
      <div className="overflow-x-auto max-h-[70vh] bg-orange-50 rounded-lg shadow border border-orange-200 mb-10">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-orange-100 text-orange-900 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border sticky left-0 bg-orange-100 z-20">रोल नंबर</th>
              <th className="px-4 py-2 border sticky left-0 bg-orange-100 z-20">सेवक नाम</th>
              {days.map((day, index) => (
                <th key={index} className="px-2 py-1 border whitespace-nowrap">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.roll_no}>
                <td className="px-4 py-2 border font-semibold sticky left-0 bg-white">{member.roll_no}</td>
                <td className="px-4 py-2 border sticky left-0 bg-white">{member.name} {member.last_name}</td>
                {days.map((day, index) => {
                  const attended = monthData[`day${index + 1}`]?.[member.roll_no.toString()];
                  return (
                    <td key={index} className="px-2 py-1 border">
                      {attended === true ? '✅' : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {/* Superadmin Button */}
      <div className="flex justify-end my-4 px-4">
        <Link to="/superadminlogin" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold">
          Superadmin
        </Link>
      </div>

      <FinanceTable />

      <div className="p-6 max-w-7xl mx-auto font-sans text-[#4b2e00]">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setView('attendance')}
            className={`px-4 py-2 rounded font-semibold shadow ${view === 'attendance' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'}`}
          >
            🧘 उपस्थिति
          </button>
          <button
            onClick={() => setView('donations')}
            className={`px-4 py-2 rounded font-semibold shadow ${view === 'donations' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'}`}
          >
            💰 दान
          </button>
          <button
            onClick={() => setView('expenses')}
            className={`px-4 py-2 rounded font-semibold shadow ${view === 'expenses' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'}`}
          >
            📦 खर्च
          </button>
        </div>

        {/* Month-Year Selector (Only in Attendance View) */}
        {view === 'attendance' && (
          <div className="bg-gradient-to-br from-orange-100 to-yellow-50 p-3 rounded-lg shadow mb-3">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-800">
              🧘 सेवकों की उपस्थिति तालिका
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="p-2 border rounded bg-white shadow focus:outline-none"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="p-2 border rounded bg-white shadow focus:outline-none"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Render Views */}
        {view === 'attendance' && (
          <div className="mb-10">
            {renderAttendanceTable()}
          </div>
        )}

        {view === 'donations' && (
          <div className="mb-10">
            <DonationsTable />
          </div>
        )}

        {view === 'expenses' && (
          <div className="mb-10">
            <AllExpensesTable />
          </div>
        )}
      </div>
    </>
  );
}
