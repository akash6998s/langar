import React, { useEffect, useState } from 'react';

const months = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

const monthDays = {
  january: 31, february: 28, march: 31, april: 30, may: 31, june: 30,
  july: 31, august: 31, september: 30, october: 31, november: 30, december: 31
};

export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState({});
  const [members, setMembers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('january');
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  useEffect(() => {
    fetch('http://localhost:5000/attendance')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setAttendanceData(data[0]);
      });

    fetch('http://localhost:5000/member-full-details')
      .then(res => res.json())
      .then(setMembers);
  }, [selectedMonth, selectedYear]);

  const renderAttendanceTable = () => {
    const yearData = attendanceData[selectedYear] || {};
    const monthData = yearData[selectedMonth] || {};
    const daysInMonth = selectedMonth === 'february' && isLeapYear(Number(selectedYear))
      ? 29 : monthDays[selectedMonth];
    const days = Array.from({ length: daysInMonth }, (_, i) => `day${i + 1}`);

    return (
      <div className="overflow-auto max-h-[70vh] mb-10">
        <table className="min-w-full border text-sm bg-[#fffaf3] shadow border-orange-200">
          <thead className="bg-[#fff0cc] text-[#6b2400] sticky top-0">
            <tr>
              <th className="px-4 py-2 border">रोल नंबर</th>
              <th className="px-4 py-2 border">सेवक नाम</th>
              {days.map(day => (
                <th key={day} className="px-2 py-1 border whitespace-nowrap">
                  {day.replace('day', 'दिन ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.roll_no} className="text-center">
                <td className="px-4 py-2 border font-medium">{member.roll_no}</td>
                <td className="px-4 py-2 border">{member.name} {member.last_name}</td>
                {days.map(day => {
                  const attended = monthData[day]?.[member.roll_no.toString()];
                  return (
                    <td key={day} className="px-2 py-1 border">
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
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="p-2 border rounded bg-white"
        >
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="p-2 border rounded bg-white"
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {renderAttendanceTable()}
      <DonationsTable />
      <AllExpensesTable />
      <FinanceTable/>
    </div>
  );
}

const FinanceTable = () => {
  // State to store the data from the API
  const [data, setData] = useState({
    totalDonations: 0,
    totalExpenses: 0,
    netAmount: 0,
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/overall-summary');
        const result = await response.json();
        if (result.success) {
          setData(result.data); // Update the state with the data from API
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="finance-container">
      <div className="grid grid-cols-3 gap-4">
        {/* Total Donations Box */}
        <div className="box bg-blue-200 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-xl font-bold">{data.totalDonations} INR</p>
        </div>

        {/* Total Expenses Box */}
        <div className="box bg-red-200 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-xl font-bold">{data.totalExpenses} INR</p>
        </div>

        {/* Net Amount Box */}
        <div className="box bg-green-200 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Net Amount</h3>
          <p className="text-xl font-bold">{data.netAmount} INR</p>
        </div>
      </div>
    </div>
  );
};

const DonationsTable = () => {
  const [donationData, setDonationData] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [tableData, setTableData] = useState([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationRes, memberRes] = await Promise.all([
          fetch('http://localhost:5000/donations'),
          fetch('http://localhost:5000/member-full-details')
        ]);

        const donationJson = await donationRes.json();
        const memberJson = await memberRes.json();

        setDonationData(donationJson);
        setMemberDetails(memberJson);

        const now = new Date();
        const currYear = String(now.getFullYear());
        const currMonth = monthNames[now.getMonth()];

        if (donationJson[currYear]?.[currMonth]) {
          setSelectedYear(currYear);
          setSelectedMonth(currMonth);
        } else {
          const availableYears = Object.keys(donationJson);
          const firstYear = availableYears[0];
          const firstMonth = Object.keys(donationJson[firstYear])[0];
          setSelectedYear(firstYear);
          setSelectedMonth(firstMonth);
        }
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const monthData = donationData[selectedYear]?.[selectedMonth] || {};
      const data = memberDetails.map((member, index) => {
        const fullName = `${member.name} ${member.last_name}`;
        const amount = monthData[index + 1] || 0;
        return {
          roll_no: index + 1,
          name: fullName,
          amount
        };
      });
      setTableData(data);
    }
  }, [donationData, memberDetails, selectedYear, selectedMonth]);

  const years = Object.keys(donationData);
  const months = selectedYear ? Object.keys(donationData[selectedYear]) : [];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Monthly Donations</h2>
      <div className="flex gap-4 mb-4">
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth('');
            setTableData([]);
          }}
          className="border px-3 py-2"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2"
          disabled={!selectedYear}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {tableData.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{row.roll_no}</td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">₹ {row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No donation data available.</p>
      )}
    </div>
  );
};

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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Expense Records</h2>

      {expenses.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.year}</td>
                <td className="border px-4 py-2 capitalize">{item.month}</td>
                <td className="border px-4 py-2">₹ {item.amount}</td>
                <td className="border px-4 py-2">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No expenses available.</p>
      )}
    </div>
  );
};
