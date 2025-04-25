import React, { useEffect, useState } from 'react';

const DonationsTable = () => {
  const [donationData, setDonationData] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [tableData, setTableData] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0); // New state for total donations

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

      // Calculate total donations for the selected month
      const total = data.reduce((acc, row) => acc + row.amount, 0);
      setTotalDonations(total);

      setTableData(data);
    }
  }, [donationData, memberDetails, selectedYear, selectedMonth]);

  const years = Object.keys(donationData);
  const months = selectedYear ? Object.keys(donationData[selectedYear]) : [];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#fffaf3] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#6b2400] text-center mb-6">
        मासिक दान सूची (Monthly Donations)
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Year Selector */}
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth('');
            setTableData([]);
          }}
          className="border border-[#e3b04b] bg-[#fff5db] text-[#6b2400] px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-[#e3b04b] bg-[#fff5db] text-[#6b2400] px-4 py-2 rounded-lg shadow-sm"
          disabled={!selectedYear}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {tableData.length > 0 && (
        <div className="mb-6 text-center text-[#6b2400]">
          <h3 className="text-xl font-semibold">कुल दान राशि (Total Donations): ₹ {totalDonations}</h3>
        </div>
      )}

      {tableData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-[#e3b04b] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#fce6a4] text-[#6b2400] text-center">
                <th className="py-3 px-4 border">क्रम संख्या</th>
                <th className="py-3 px-4 border">सेवक का नाम</th>
                <th className="py-3 px-4 border">दान राशि</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.roll_no} className="text-center hover:bg-[#fdf4d7]">
                  <td className="py-2 px-4 border">{row.roll_no}</td>
                  <td className="py-2 px-4 border">{row.name}</td>
                  <td className="py-2 px-4 border">₹ {row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-[#a17400] mt-6">
          अभी कोई दान जानकारी उपलब्ध नहीं है।
        </p>
      )}
    </div>
  );
};

export default DonationsTable;
