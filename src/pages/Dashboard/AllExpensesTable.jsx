import React, { useEffect, useState } from 'react';

const AllExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/expenses');
        const json = await res.json();
        const parsedData = [];

        Object.values(json).forEach((yearObj) => {
          Object.entries(yearObj).forEach(([year, monthsObj]) => {
            Object.entries(monthsObj).forEach(([month, records]) => {
              records.forEach((record) => {
                parsedData.push({
                  year,
                  month,
                  amount: record.amount,
                  description: record.description,
                });
              });
            });
          });
        });

        setExpenses(parsedData);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-orange-50 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center text-orange-700 mb-6">
        📜 All Expense Records
      </h2>

      {expenses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-orange-800 text-sm uppercase">
                <th className="border border-orange-300 px-4 py-2">Year</th>
                <th className="border border-orange-300 px-4 py-2">Month</th>
                <th className="border border-orange-300 px-4 py-2">Amount</th>
                <th className="border border-orange-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item, index) => (
                <tr
                  key={index}
                  className={`text-center ${index % 2 === 0 ? 'bg-orange-50' : 'bg-orange-100'}`}
                >
                  <td className="border border-orange-200 px-4 py-2">{item.year}</td>
                  <td className="border border-orange-200 px-4 py-2 capitalize">{item.month}</td>
                  <td className="border border-orange-200 px-4 py-2 font-semibold text-green-700">
                    ₹ {item.amount}
                  </td>
                  <td className="border border-orange-200 px-4 py-2 text-gray-700">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-orange-600 mt-4 italic">
          कोई खर्चा रिकॉर्ड नहीं मिला।
        </p>
      )}
    </div>
  );
};

export default AllExpensesTable;
