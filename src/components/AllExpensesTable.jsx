import React, { useEffect, useState } from "react";

const AllExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://langar-db-csvv.onrender.com/expenses");
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
        console.error("Error fetching expense data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto bg-[#FFF9E6] rounded-2xl shadow-xl border border-orange-200">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center text-[#D97706] mb-10 tracking-wide">
        📜 सभी खर्चों की जानकारी
      </h2>

      {/* Display expenses if available */}
      {expenses.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-[#FDE68A] text-[#9A3412]">
              <tr>
                <th className="px-6 py-4 text-left">वर्ष</th>
                <th className="px-6 py-4 text-left">माह</th>
                <th className="px-6 py-4 text-left">राशि</th>
                <th className="px-6 py-4 text-left">विवरण</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {expenses.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#FEF3C7] transition-all duration-200"
                >
                  <td className="px-6 py-3 font-medium">{item.year}</td>
                  <td className="px-6 py-3 capitalize">{item.month}</td>
                  <td className="px-6 py-3 font-semibold text-[#15803D]">
                    ₹ {item.amount}
                  </td>
                  <td className="px-6 py-3 text-gray-700">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6 italic">
          कोई खर्चा रिकॉर्ड नहीं मिला।
        </p>
      )}
    </div>
  );
};

export default AllExpensesTable;
