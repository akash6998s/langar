import React, { useEffect, useState } from "react";

const DonationsTable = () => {
  const [donationData, setDonationData] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tableData, setTableData] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");




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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationRes, memberRes] = await Promise.all([
          fetch("https://langar-db-csvv.onrender.com/donations"),
          fetch("https://langar-db-csvv.onrender.com/member-full-details"),
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
          const firstYear = Object.keys(donationJson)[0] || "";
          const firstMonth = donationJson[firstYear]
            ? Object.keys(donationJson[firstYear])[0]
            : "";
          setSelectedYear(firstYear);
          setSelectedMonth(firstMonth);
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const monthData = donationData[selectedYear]?.[selectedMonth] || {};
      const data = memberDetails.map((member, index) => {
        const entry = monthData[index + 1] || 0;
        let donation = 0;
        let fine = 0;

        if (typeof entry === "object") {
          donation = entry.donation || 0;
          fine = entry.fine || 0;
        } else {
          donation = entry;
        }

        return {
          roll_no: index + 1,
          name: `${member.name} ${member.last_name}`,
          amount: donation,
          fine: fine,
        };
      });

      const total = data.reduce(
        (sum, item) => sum + item.amount + item.fine,
        0
      );
      setTableData(data);
      setTotalDonations(total);
    }
  }, [donationData, memberDetails, selectedYear, selectedMonth]);

  const years = Object.keys(donationData);
  const months = selectedYear ? Object.keys(donationData[selectedYear]) : [];

  return (
    <div className="px-4 py-8 bg-[#fff7eb] min-h-screen">

    {/* Header */}
    <h2 className="text-3xl font-bold text-center text-[#4b1c0d] mb-6 underline underline-offset-8 decoration-[#e3b04b]">
      सेवक दान विवरण
    </h2>
  
    {/* Year & Month Selectors */}
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <select
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setSelectedMonth("");
          setTableData([]);
        }}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#fff3d1] to-[#fce5b5] text-[#5c2d06] font-medium shadow-md border border-[#e3b04b] focus:outline-none focus:ring-2 focus:ring-[#e3b04b] w-full sm:w-52"
      >
        <option value="">वर्ष चुनें</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
  
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        disabled={!selectedYear}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#fff3d1] to-[#fce5b5] text-[#5c2d06] font-medium shadow-md border border-[#e3b04b] focus:outline-none focus:ring-2 focus:ring-[#e3b04b] w-full sm:w-52"
      >
        <option value="">माह चुनें</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  
    {/* Search Input */}
    {tableData.length > 0 && (
      <div className="mb-6 text-center">
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-[#4b1c0d]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="सेवक के नाम से खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-[#e3a857] rounded-md bg-[#fffaf0] text-[#4b1c0d] focus:outline-none focus:ring-2 focus:ring-[#e3a857]"
          />
        </div>
      </div>
    )}
  
    {/* Table Section */}
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl border border-[#f0d8b0] overflow-hidden">
      {/* Total Donations */}
      {tableData.length > 0 && (
        <div className="text-center bg-gradient-to-r from-[#fff4da] to-[#ffe6b3] py-5 px-4 text-[#4b1c0d] text-xl font-bold border-b-2 border-[#e0b973] shadow-md">
          इस महीने की कुल राशि:{" "}
          <span className="text-[#a05a2c]">₹ {totalDonations}</span>
        </div>
      )}
  
      {/* Table */}
      {tableData.length > 0 ? (
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-sm text-[#4b1c0d] border border-[#f2dbb5]">
            <thead className="bg-[#fff1d0] sticky top-0 z-10 text-base">
              <tr>
                <th className="py-3 px-4 border border-[#f2dbb5] text-left">
                  क्रम
                </th>
                <th className="py-3 px-4 border border-[#f2dbb5] text-left">
                  सेवक का नाम
                </th>
                <th className="py-3 px-2 border border-[#f2dbb5] text-left">
                  राशि
                </th>
                <th className="py-3 px-4 border border-[#f2dbb5] text-left">
                  जुर्माना
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((row) =>
                  row.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((row) => (
                  <tr
                    key={row.roll_no}
                    className="hover:bg-[#fff8e3] transition duration-150"
                  >
                    <td className="py-2 px-4 border border-[#f2dbb5]">
                      {row.roll_no}
                    </td>
                    <td className="py-2 px-4 border border-[#f2dbb5]">
                      {row.name}
                    </td>
                    <td className="py-2 px-2 border border-[#f2dbb5] text-green-700 font-semibold">
                      ₹ {row.amount}
                    </td>
                    <td className="py-2 px-4 border border-[#f2dbb5] text-red-600 font-semibold">
                      ₹ {row.fine}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-[#c97c00] py-12 italic text-lg">
          अभी कोई दान जानकारी उपलब्ध नहीं है।
        </p>
      )}
    </div>
  </div>
  
  );
};

export default DonationsTable;
