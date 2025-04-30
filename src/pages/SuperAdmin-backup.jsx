import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperAdmin = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const [attendanceData, setAttendanceData] = useState({
    attendance: {},
    month: "",
    year: "",
    day: "",
  });

  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    month: "",
    year: "",
  });

  const [donationData, setDonationData] = useState({
    amount: "",
    rollNo: "",
    month: "",
    year: "",
  });

  const [activeSection, setActiveSection] = useState("attendance");
  const [showRollNumberPopup, setShowRollNumberPopup] = useState(false);
  const [availableRollNumbers, setAvailableRollNumbers] = useState([]);

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const response = await fetch(
          "https://langar-db-csvv.onrender.com/member-full-details"
        );
        const data = await response.json();
        const rollNumbers = data.map((member) => member.roll_no);
        setAvailableRollNumbers(rollNumbers);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
      }
    };

    fetchRollNumbers();
  }, []);

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
      day: "1",
    }));
  };

  const handleRollNoClick = (rollNo) => {
    setAttendanceData((prevData) => {
      const newAttendance = { ...prevData.attendance };
      if (newAttendance[rollNo]) {
        delete newAttendance[rollNo];
      } else {
        newAttendance[rollNo] = true;
      }
      return {
        ...prevData,
        attendance: newAttendance,
      };
    });
  };

  const addAttendance = async () => {
    const { attendance, month, year, day } = attendanceData;
    const filteredAttendance = Object.keys(attendance).filter(
      (rollNo) => attendance[rollNo]
    );

    if (filteredAttendance.length === 0) {
      alert("No Roll Numbers selected.");
      return;
    }

    try {
      const response = await axios.post(
        "https://langar-db-csvv.onrender.com/update-attendance",
        {
          attendance: filteredAttendance,
          month,
          year: Number(year),
          day: Number(day),
        }
      );
      alert(response.data.message);
      setAttendanceData((prev) => ({ ...prev, attendance: {} }));
    } catch (error) {
      console.error("Error posting attendance:", error);
      alert("Failed to add attendance.");
    }
  };

  const addExpense = async () => {
    const { amount, description, month, year } = expenseData;
    if (!amount || !description.trim()) {
      alert("Amount and Description are required.");
      return;
    }

    try {
      const response = await axios.post("https://langar-db-csvv.onrender.com/add-expense", {
        amount: Number(amount),
        description: description.trim(),
        month,
        year: Number(year),
      });
      alert(response.data.message);
      setExpenseData((prev) => ({ ...prev, amount: "", description: "" }));
    } catch (error) {
      console.error("Error posting expense:", error);
      alert("Failed to add expense.");
    }
  };

  const addDonation = async () => {
    const { amount, rollNo, month, year } = donationData;
    if (!rollNo.trim() || !amount || !month || !year) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://langar-db-csvv.onrender.com/update-donations",
        {
          year: Number(year),
          month,
          rollNo,
          amount: Number(amount),
        }
      );
      alert(response.data.message);
      setDonationData((prev) => ({
        ...prev,
        rollNo: "",
        amount: "",
      }));
    } catch (error) {
      console.error("Error posting donation:", error);
      alert("Failed to add donation.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">SuperAdmin Dashboard</h1>

      <div className="flex justify-center gap-4">
        {["attendance", "expense", "donation"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded ${
              activeSection === section
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Attendance Section */}
      {activeSection === "attendance" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Attendance</h2>
          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.year}
            onChange={(e) => handleMonthYearChange("year", e.target.value)}
          >
            {[...Array(10)].map((_, i) => {
              const y = new Date().getFullYear() - 5 + i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>

          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.month}
            onChange={(e) => handleMonthYearChange("month", e.target.value)}
          >
            {monthNames.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            className="w-full border px-3 py-2 rounded"
            value={attendanceData.day}
            onChange={(e) =>
              setAttendanceData({ ...attendanceData, day: e.target.value })
            }
          >
            {Array.from({
              length: daysInMonth(
                monthNames.indexOf(attendanceData.month) + 1,
                attendanceData.year
              ),
            }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              placeholder="Selected Roll Numbers"
              className="w-full border px-3 py-2 rounded"
              value={Object.keys(attendanceData.attendance).join(", ")}
            />
            <button
              onClick={() => setShowRollNumberPopup(true)}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              +
            </button>
          </div>

          {showRollNumberPopup && (
            <div className="absolute z-20 bg-white border p-4 rounded shadow-lg w-64 mt-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Select Roll Numbers</h3>
                <button
                  onClick={() => setShowRollNumberPopup(false)}
                  className="text-red-500 text-sm"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                {availableRollNumbers.map((rollNo) => (
                  <button
                    key={rollNo}
                    onClick={() => handleRollNoClick(rollNo)}
                    className={`px-2 py-1 border rounded text-sm ${
                      attendanceData.attendance[rollNo]
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {rollNo}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={addAttendance}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Attendance
          </button>
        </div>
      )}

      {/* Expense Section */}
      {activeSection === "expense" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Expense</h2>

          <select
            className="w-full border px-3 py-2 rounded"
            value={expenseData.year}
            onChange={(e) =>
              setExpenseData({ ...expenseData, year: e.target.value })
            }
          >
            {[...Array(10)].map((_, i) => {
              const y = new Date().getFullYear() - 5 + i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>

          <select
            className="w-full border px-3 py-2 rounded"
            value={expenseData.month}
            onChange={(e) =>
              setExpenseData({ ...expenseData, month: e.target.value })
            }
          >
            {monthNames.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full border px-3 py-2 rounded"
            value={expenseData.amount}
            onChange={(e) =>
              setExpenseData({ ...expenseData, amount: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Enter Description"
            className="w-full border px-3 py-2 rounded"
            value={expenseData.description}
            onChange={(e) =>
              setExpenseData({ ...expenseData, description: e.target.value })
            }
          />

          <button
            onClick={addExpense}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Expense
          </button>
        </div>
      )}

      {/* Donation Section */}
      {activeSection === "donation" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Donation</h2>

          <select
            className="w-full border px-3 py-2 rounded"
            value={donationData.year}
            onChange={(e) =>
              setDonationData({ ...donationData, year: e.target.value })
            }
          >
            {[...Array(10)].map((_, i) => {
              const y = new Date().getFullYear() - 5 + i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>

          <select
            className="w-full border px-3 py-2 rounded"
            value={donationData.month}
            onChange={(e) =>
              setDonationData({ ...donationData, month: e.target.value })
            }
          >
            {monthNames.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            className="w-full border px-3 py-2 rounded"
            value={donationData.rollNo}
            onChange={(e) =>
              setDonationData({ ...donationData, rollNo: e.target.value })
            }
          >
            <option value="">Select Roll Number</option>
            {availableRollNumbers.map((rollNo) => (
              <option key={rollNo} value={rollNo}>
                {rollNo}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full border px-3 py-2 rounded"
            value={donationData.amount}
            onChange={(e) =>
              setDonationData({ ...donationData, amount: e.target.value })
            }
          />

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
