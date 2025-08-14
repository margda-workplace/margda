"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  SquareCheckBig,
  Search,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [tableData, setTableData] = useState([
    {
      selected: false,
      name: "Debarghya",
      email: "sesde**********.com",
      mobile: "9190***********",
      location: {
        country: "N/A",
        state: "N/A",
        district: "N/A",
        pincode: "N/A",
        address: "N/A",
      },
      status: {
        workSeeker: "Work Seeker",
        workSeekerStatus: "Work Seeker",
        u: "U",
      },
    },
    
  ]);

  const itemsPerPage = show;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleCheckboxChange = (index) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      const globalIndex = startIndex + index;
      newData[globalIndex] = {
        ...newData[globalIndex],
        selected: !newData[globalIndex].selected,
      };
      return newData;
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="flex-grow px-4 sm:px-6 py-10">
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={variants}
          className="max-w-full mx-auto space-y-8"
        >
          {/* Top Header with Action Buttons */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
            {/* First row of buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform flex items-center gap-1 w-full sm:w-auto justify-center">
                <Search size={16} /> Search Data
              </button>
              <button className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform flex items-center gap-1 w-full sm:w-auto justify-center">
                <UserPlus size={16} /> Add Data
              </button>
              <button className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform flex items-center gap-1 w-full sm:w-auto justify-center">
                <SquareCheckBig size={16} /> Verify Data
              </button>
              <button className="bg-gradient-to-l from-gray-700/70 to-gray-600/60 text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform flex items-center gap-1 w-full sm:w-auto justify-center">
                <Upload size={16} /> Upload CSV
              </button>
              <button className="bg-gradient-to-l from-green-500/70 to-green-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform w-full sm:w-auto">
                Shortlist
              </button>
              <button className="bg-gradient-to-l from-orange-500/70 to-orange-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform w-full sm:w-auto">
                Task
              </button>
              <button className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:scale-105 transition-transform w-full sm:w-auto">
                Sample CSV
              </button>
            </div>
            {/* Second row of buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center">
                <Mail size={16} className="text-gray-500" /> Email
              </button>
              <button className="flex items-center gap-1 bg-green-500 text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-green-600 transition-colors w-full sm:w-auto justify-center">
                <MessageCircle size={16} /> WhatsApp
              </button>
              <button className="flex items-center gap-1 bg-blue-500 text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center">
                <Phone size={16} /> Call
              </button>
              <button className="flex items-center gap-1 bg-red-500 text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-red-600 transition-colors w-full sm:w-auto justify-center">
                <Phone size={16} /> SMS
              </button>
              <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center">
                <UserPlus size={16} className="text-gray-500" /> Add to User
              </button>
              <button className="flex items-center gap-1 bg-black text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
                <SquareCheckBig size={16} /> Verify Email
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-wrap items-center gap-2 sm:gap-4">
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Data Type</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Country</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>State</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>District</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Pin Code</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>All Data</option>
            </select>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              Show
              <input
                type="number"
                value={show}
                onChange={(e) => setShow(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              Records
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 border border-gray-300 rounded-md p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Main Data Table */}
          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <motion.table
              key={currentPage}
              className="min-w-full text-sm text-left border rounded-xl overflow-hidden"
            >
              <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                <tr>
                  <th className="p-4 border-b">
                    <input type="checkbox" className="accent-blue-600 mr-2" /> Selected (0)
                  </th>
                  <th className="p-4 border-b">
                    <div className="flex items-center gap-1">
                      <UserPlus size={16} /> Action
                    </div>
                  </th>
                  <th className="p-4 border-b">
                    <div className="flex items-center gap-1">
                      <Mail size={16} /> Data
                    </div>
                  </th>
                  <th className="p-4 border-b">
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} /> Location
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentData.map((row, i) => (
                  <tr key={i} className="align-top">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleCheckboxChange(i)}
                        className="accent-blue-600"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-600 p-2 rounded-full">
                          <SquareCheckBig size={18} />
                        </div>
                        <div className="bg-green-100 text-green-600 p-2 rounded-full">
                          <SquareCheckBig size={18} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-800">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-blue-500" />
                          <span className="font-bold">{row.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-pink-500" />
                          <span>{row.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-pink-500" />
                          <span>{row.mobile}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle size={16} className="text-green-500" />
                          <span>N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-pink-500" />
                          <span>N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <SquareCheckBig
                            size={16}
                            className="text-gray-500"
                          />
                          <span className="font-medium text-gray-600">
                            {row.status.workSeeker}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserPlus size={16} className="text-gray-500" />
                          <span>{row.status.u}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">📍</span>
                          <span>Country: {row.location.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">📍</span>
                          <span>State: {row.location.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">📍</span>
                          <span>District: {row.location.district}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">📍</span>
                          <span>Pincode: {row.location.pincode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">📍</span>
                          <span>Address: {row.location.address}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 mt-6 gap-4">
            <div>
              Showing {tableData.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, tableData.length)} of{" "}
              {tableData.length} Records
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-white text-gray-800 rounded-lg px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="bg-purple-600 text-white rounded-lg px-4 py-2 font-medium shadow-sm">
                {currentPage}
              </span>
              <button
                className="bg-white text-gray-800 rounded-lg px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center p-4 bg-gray-100 text-purple-600 font-semibold text-sm">
        © 2025 Digital Softech. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Dashboard;