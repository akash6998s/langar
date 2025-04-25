import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [expenseData, setExpenseData] = useState({
    amount: '',
    description: '',
    month: '',
    year: '',
  });

  const [donationData, setDonationData] = useState({
    amount: '',
    rollNo: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Set expense data
    setExpenseData((prevData) => ({
      ...prevData,
      month,
      year,
    }));

    // Set donation data
    setDonationData((prevData) => ({
      ...prevData,
      month,
      year,
    }));
  }, []);

  const addExpense = async () => {
    const { amount, description, month, year } = expenseData;

    if (!amount || !description.trim()) {
      alert('All fields are required. Please fill in every field.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/add-expense', {
        amount: Number(amount),
        description: description.trim(),
        month, // now sending text month
        year: Number(year),
      });
      alert(response.data.message);

      // Optionally clear inputs
      setExpenseData((prev) => ({
        ...prev,
        amount: '',
        description: '',
      }));
    } catch (error) {
      console.error('Error posting expense:', error);
      alert('Failed to add expense.');
    }
  };

  const addDonation = async () => {
    const { amount, rollNo, month, year } = donationData;

    if (!amount || !rollNo) {
      alert('All fields are required. Please fill in every field.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/update-donations', {
        amount: Number(amount),
        rollNo: Number(rollNo),
        month, // now sending text month
        year: Number(year),
      });

      // If the donation was successfully added
      alert(response.data.message);

      // Optionally clear inputs
      setDonationData((prev) => ({
        ...prev,
        amount: '',
        rollNo: '',
      }));
    } catch (error) {
      // Check if the error response has a message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show the error message returned by the backend
      } else {
        alert('Failed to add donation.');
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">SuperAdmin Dashboard</h1>

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

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded"
          value={expenseData.amount}
          onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
        />

        {/* Description Input */}
        <input
          type="text"
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={expenseData.description}
          onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
        />

        {/* Submit Button */}
        <button
          onClick={addExpense}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </div>

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

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded"
          value={donationData.amount}
          onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
        />

        {/* Roll Number Input */}
        <input
          type="Number"
          placeholder="Roll Number"
          className="w-full border px-3 py-2 rounded"
          value={donationData.rollNo}
          onChange={(e) => setDonationData({ ...donationData, rollNo: e.target.value })}
        />

        {/* Submit Button */}
        <button
          onClick={addDonation}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Donation
        </button>
      </div>
    </div>
  );
};

export default SuperAdmin;




