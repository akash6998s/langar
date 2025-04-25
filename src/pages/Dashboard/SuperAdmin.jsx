import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const [attendanceData, setAttendanceData] = useState({
    attendance: {}, // Using an object to store attendance as key-value pairs (rollNo: true/false)
    month: '',
    year: '',
    day: '',
  });

  const [expenseData, setExpenseData] = useState({
    attendance: '',
    month: '',
    year: '',
  });

  const [donationData, setDonationData] = useState({
    attendance: '',
    month: '',
    year: '',
  });

  const [activeSection, setActiveSection] = useState('attendance'); // Default to 'attendance'

  const [showRollNumberPopup, setShowRollNumberPopup] = useState(false);
  const [availableRollNumbers, setAvailableRollNumbers] = useState([...Array(100).keys()].map(num => (num + 1).toString()));

  useEffect(() => {
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();

    setAttendanceData((prevData) => ({
      ...prevData,
      month,
      year,
      day: day.toString(),
    }));

    setExpenseData((prevData) => ({
      ...prevData,
      month,
      year,
    }));

    setDonationData((prevData) => ({
      ...prevData,
      month,
      year,
    }));
  }, []);

  const handleMonthYearChange = (type, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [type]: value,
      day: '1', // Reset day when month or year changes
    }));
  };

  const handleRollNoClick = (rollNo) => {
    setAttendanceData((prevData) => {
      const newAttendance = { ...prevData.attendance };
      if (newAttendance[rollNo] === true) {
        delete newAttendance[rollNo];
      } else {
        newAttendance[rollNo] = true; // Mark as present
      }
      return {
        ...prevData,
        attendance: newAttendance,
      };
    });
  };

  const addAttendance = async () => {
    const { attendance, month, year, day } = attendanceData;
  
    // Filter out any false/undefined values from the attendance object
    const filteredAttendance = Object.keys(attendance).filter(rollNo => attendance[rollNo] === true);
  
    if (filteredAttendance.length === 0) {
      alert('No Roll Numbers selected.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/update-attendance', {
        attendance: filteredAttendance, // Only send the roll numbers marked as true
        month,
        year: Number(year),
        day: Number(day),
      });
      alert(response.data.message);
  
      setAttendanceData((prev) => ({
        ...prev,
        attendance: {}, // Reset attendance data after submitting
      }));
    } catch (error) {
      console.error('Error posting attendance:', error);
      alert('Failed to add attendance.');
    }
  };
  
  

  const addExpense = async () => {
    const { attendance, month, year } = expenseData;

    if (!attendance.trim()) {
      alert('Roll Numbers field is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/add-expense', {
        attendance: attendance.split(',').map((rollNo) => rollNo.trim()),
        month,
        year: Number(year),
      });
      alert(response.data.message);
      setExpenseData((prev) => ({
        ...prev,
        attendance: '',
      }));
    } catch (error) {
      console.error('Error posting expense:', error);
      alert('Failed to add expense.');
    }
  };

  const addDonation = async () => {
    const { attendance, month, year } = donationData;

    if (!attendance.trim()) {
      alert('Roll Numbers field is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/update-donations', {
        attendance: attendance.split(',').map((rollNo) => rollNo.trim()),
        month,
        year: Number(year),
      });
      alert(response.data.message);
      setDonationData((prev) => ({
        ...prev,
        attendance: '',
      }));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to add donation.');
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">SuperAdmin Dashboard</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveSection('attendance')}
          className={`px-4 py-2 rounded ${activeSection === 'attendance' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveSection('expense')}
          className={`px-4 py-2 rounded ${activeSection === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Expense
        </button>
        <button
          onClick={() => setActiveSection('donation')}
          className={`px-4 py-2 rounded ${activeSection === 'donation' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Donation
        </button>
      </div>

      {/* Conditional Rendering of Forms */}
      {activeSection === 'attendance' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Attendance</h2>

          {/* Year Dropdown */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.year}
            onChange={(e) => handleMonthYearChange('year', e.target.value)}
          >
            {[...Array(10)].map((_, index) => {
              const yearOption = new Date().getFullYear() - 5 + index;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>

          {/* Month Dropdown (Text format) */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.month}
            onChange={(e) => handleMonthYearChange('month', e.target.value)}
          >
            {monthNames.map((monthName) => (
              <option key={monthName} value={monthName}>
                {monthName}
              </option>
            ))}
          </select>

          {/* Day Dropdown */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.day}
            onChange={(e) => setAttendanceData({ ...attendanceData, day: e.target.value })}
          >
            {Array.from({ length: daysInMonth(monthNames.indexOf(attendanceData.month) + 1, attendanceData.year) }).map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          {/* Roll Numbers Input with + Icon */}
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              placeholder="Selected Roll Numbers"
              className="w-full border px-3 py-2 rounded"
              value={Object.keys(attendanceData.attendance).join(', ')}
            />
            <button
              onClick={() => setShowRollNumberPopup(true)}
              className="ml-2 px-3 py-2 bg-green-600 text-white rounded"
            >
              +
            </button>
          </div>

          {/* Roll Numbers Popup */}
          {showRollNumberPopup && (
            <div className="absolute z-10 bg-white border p-4 rounded shadow-lg w-64 mt-2">
              <h3 className="font-semibold">Select Roll Numbers</h3>
              <div className="grid grid-cols-5 gap-2">
                {availableRollNumbers.map((rollNo) => (
                  <button
                    key={rollNo}
                    onClick={() => handleRollNoClick(rollNo)}
                    className={`px-2 py-1 border rounded ${attendanceData.attendance[rollNo] ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    {rollNo}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={addAttendance}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Attendance
          </button>
        </div>
      )}

      {activeSection === 'expense' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Expense</h2>

          {/* Year Dropdown */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={expenseData.year}
            onChange={(e) => setExpenseData({ ...expenseData, year: e.target.value })}
          >
            {[...Array(10)].map((_, index) => {
              const yearOption = new Date().getFullYear() - 5 + index;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>

          {/* Month Dropdown (Text format) */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={expenseData.month}
            onChange={(e) => setExpenseData({ ...expenseData, month: e.target.value })}
          >
            {monthNames.map((monthName) => (
              <option key={monthName} value={monthName}>
                {monthName}
              </option>
            ))}
          </select>

          {/* Roll Numbers Input */}
          <input
            type="text"
            placeholder="Enter Roll Numbers (comma separated)"
            className="w-full border px-3 py-2 rounded"
            value={expenseData.attendance}
            onChange={(e) => setExpenseData({ ...expenseData, attendance: e.target.value })}
          />

          {/* Submit Button */}
          <button
            onClick={addExpense}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Expense
          </button>
        </div>
      )}

      {activeSection === 'donation' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Donation</h2>

          {/* Year Dropdown */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={donationData.year}
            onChange={(e) => setDonationData({ ...donationData, year: e.target.value })}
          >
            {[...Array(10)].map((_, index) => {
              const yearOption = new Date().getFullYear() - 5 + index;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>

          {/* Month Dropdown (Text format) */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={donationData.month}
            onChange={(e) => setDonationData({ ...donationData, month: e.target.value })}
          >
            {monthNames.map((monthName) => (
              <option key={monthName} value={monthName}>
                {monthName}
              </option>
            ))}
          </select>

          {/* Roll Numbers Input */}
          <input
            type="text"
            placeholder="Enter Roll Numbers (comma separated)"
            className="w-full border px-3 py-2 rounded"
            value={donationData.attendance}
            onChange={(e) => setDonationData({ ...donationData, attendance: e.target.value })}
          />

          {/* Submit Button */}
          <button
            onClick={addDonation}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Donation
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
