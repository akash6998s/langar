import React, { useEffect, useState } from "react";

const FinanceTable = ({setLoading}) => {
  const [summaryData, setSummaryData] = useState({
    totalDonations: 0,
    totalFines: 0,
    totalExpenses: 0,
    netAmount: 0,
  });
  const [additionalData, setAdditionalData] = useState(0); // Initialize with 0

  useEffect(() => {
    const fetchAllData = async () => {
      
      const summaryRes = await fetch("https://langar-db-csvv.onrender.com/overall-summary");
      const summary = await summaryRes.json();
      if (summary.success) {
        setSummaryData(summary.data);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const response = await fetch("https://langar-db-csvv.onrender.com/additional");
        const result = await response.json();
        setAdditionalData(result.donatedRemoved || 0); // Ensure a fallback value of 0 if undefined
      } catch (error) {
        console.error("Error fetching additional data:", error);
        setAdditionalData(0); // Fallback in case of error
      }
    };

    fetchAdditionalData();
    fetchAllData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="p-4 bg-orange-200 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-orange-800">
          Total Donations
        </h3>
        <p className="text-2xl text-green-600">
          {summaryData.totalDonations + additionalData + summaryData.totalFines}
        </p>
      </div>
      <div className="p-4 bg-orange-200 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-orange-800">
          Total Expenses
        </h3>
        <p className="text-2xl text-red-600">{summaryData.totalExpenses}</p>
      </div>
      <div className="p-4 bg-orange-200 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-orange-800">Net Amount</h3>
        <p className="text-2xl text-blue-600">
          {summaryData.netAmount + additionalData}
        </p>
      </div>
    </div>
  );
};

export default FinanceTable;
