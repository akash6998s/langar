import React, { useEffect, useState } from "react";
import AllExpensesTable from "../components/AllExpensesTable";
import DonationsTable from "../components/DonationsTable";
import FinanceTable from "../components/FinanceTable";
import { useNavigate } from "react-router-dom";

const getDaysInMonth = (year, monthName) => {
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, monthIndex, i);
    const day = date.toLocaleString("default", { weekday: "short" });
    days.push({ date: i, day });
  }

  return days;
};

export default function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("attendance");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true); // Indicate data loading has started

        // Fetch attendance data
        const attendanceRes = await fetch("https://langar-db-csvv.onrender.com/attendance");
        const attendance = await attendanceRes.json();
        const result = attendance[0];
        setAttendanceData(result);

        // Set default selected year and month based on current date
        const years = Object.keys(result);
        if (years.length > 0) {
          const currentYear = new Date().getFullYear().toString();
          const defaultYear = years.includes(currentYear)
            ? currentYear
            : years[0];
          const months = Object.keys(result[defaultYear]);
          const currentMonth = new Date().toLocaleString("default", {
            month: "long",
          });
          const defaultMonth = months.includes(currentMonth)
            ? currentMonth
            : months[0];

          setSelectedYear(defaultYear);
          setSelectedMonth(defaultMonth);
        }

        // Fetch member details and format them as roll_no => full name
        const membersRes = await fetch(
          "https://langar-db-csvv.onrender.com/member-full-details"
        );
        const members = await membersRes.json();
        const formatted = {};
        members.forEach((student) => {
          const fullName = `${student.name} ${student.last_name}`.trim();
          formatted[student.roll_no] = fullName;
        });
        setStudents(formatted);
      } catch (error) {
        console.error("Error fetching main data:", error);
      } finally {
        setLoading(false); // Data loading complete
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-blue-600 font-semibold text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const daysInMonth =
    selectedYear && selectedMonth
      ? getDaysInMonth(selectedYear, selectedMonth)
      : [];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br min-h-screen">
      {/* Super Admin Button */}
      <div className="w-full flex justify-end px-6 py-4 mb-6">
        <button
          onClick={() => navigate("/superadminlogin")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          Super Admin
        </button>
      </div>

      {/* Title Section */}
      <h1 className="text-2xl text-center font-bold text-orange-700 mb-6 underline decoration-orange-400">
        श्री सुदर्शन सेना भोजन वितरण
      </h1>

      {/* Finance Table */}
      <FinanceTable  />

      {/* Navigation Tabs for Attendance, Expenses, and Donations */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["attendance", "expenses", "donations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-2 border rounded-md w-24 sm:w-40 text-center ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Attendance Filters (Year and Month Selection) */}
      {activeTab === "attendance" && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select
            className="px-4 py-2 border border-[#e3b04b] rounded-lg w-full sm:w-48 bg-[#fff9ec] text-[#6b2400] shadow-sm focus:ring-2 focus:ring-[#e3b04b]"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Object.keys(attendanceData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-[#e3b04b] rounded-lg w-full sm:w-48 bg-[#fff9ec] text-[#6b2400] shadow-sm focus:ring-2 focus:ring-[#e3b04b]"
            value={selectedMonth}
            onChange={handleMonthChange}
            disabled={!selectedYear}
          >
            <option value="">Select Month</option>
            {selectedYear &&
              Object.keys(attendanceData[selectedYear]).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Render Table Based on Active Tab and Filters */}
      {activeTab === "attendance" && selectedYear && selectedMonth ? (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px] shadow-lg rounded-lg bg-white">
          <table className="w-full text-sm text-center border border-gray-300 bg-white rounded-lg">
            <thead className="bg-orange-100 text-orange-800">
              <tr>
                <th className="border border-gray-300 px-3 py-2 sticky top-0 left-0 bg-orange-100 z-10">
                  Roll No
                </th>
                <th className="border border-gray-300 px-3 py-2 sticky top-0 left-0 bg-orange-100 z-10">
                  Name
                </th>
                {daysInMonth.map(({ date, day }) => (
                  <th
                    key={date}
                    className="border border-gray-300 px-2 py-2 sticky top-0 bg-orange-100"
                  >
                    {date} <br /> ({day})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(students).map(([roll, name]) => (
                <tr
                  key={roll}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="border border-gray-200 px-2 py-2 sticky left-0 bg-white">
                    {roll}
                  </td>
                  <td className="border border-gray-200 px-2 py-2 font-medium text-left sticky left-0 bg-white">
                    {name}
                  </td>
                  {daysInMonth.map(({ date }) => {
                    const present =
                      attendanceData[selectedYear]?.[selectedMonth]?.[date] ||
                      {};
                    return (
                      <td
                        key={date}
                        className="border border-gray-100 px-2 py-2 text-green-600"
                      >
                        {present[roll] === "present" ? "✔️" : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeTab === "expenses" ? (
        <AllExpensesTable />
      ) : activeTab === "donations" ? (
        <DonationsTable />
      ) : (
        <p className="text-center text-orange-700 font-medium">
          ⏳ Loading data...
        </p>
      )}
    </div>
  );
}
