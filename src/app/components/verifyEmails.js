"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react"; // Lucide icons
import Button from "./button";
import Toaster from "./toaster";

const VerifyEmails = () => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPageList, setCurrentPageList] = useState(1);
  const [currentPageResults, setCurrentPageResults] = useState(1);
  const [showResults, setShowResults] = useState(false); // toggle results
  const [showLists, setShowLists] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedList, setSelectedList] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [lists, setLists] = useState([
    {
      listStatus: "✅ List2",
      records: "2",
      name: "2",
      emails: "2",
      whatsapp: "0",
      mobile: "0",
      bounced: "0",
      unsubscribed: "0",
    },
    {
      listStatus: "❌ List1",
      records: "100",
      name: "98",
      emails: "100",
      whatsapp: "98",
      mobile: "98",
      bounced: "2",
      unsubscribed: "1",
    },
  ]);

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLists = lists.slice(startIndex, startIndex + itemsPerPage);
  const isAllCurrentSelected =
    currentLists.length > 0 &&
    currentLists.every((_, index) =>
      selectedItems.includes((currentPage - 1) * itemsPerPage + index)
    );

  const handleRemove = () => {
    if (!selectedList) {
      showToast("Please select a list to remove", "error");
      return;
    }
    setLists((prev) => prev.filter((list) => list.name !== selectedList));
    setSelectedList("");
    showToast("List removed successfully", "success");
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(lists.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
  };

  const [results, setResults] = useState([
    {
      sno: 1,
      name: "Rohan",
      email: "rohan@gmail.com",
      mobile: "7878787878",
      whatsapp: "—",
      status: "Bad/Dead",
    },
    {
      sno: 2,
      name: "Amit",
      email: "amit@example.com",
      mobile: "9876543210",
      whatsapp: "+919876543210",
      status: "Valid",
    },
    {
      sno: 3,
      name: "Sara",
      email: "sara@example.com",
      mobile: "9123456789",
      whatsapp: "—",
      status: "Unverified",
    },
  ]);

  useEffect(() => setMounted(true), []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleDeleteList = (indexToDelete) => {
    const globalIndex = (currentPageList - 1) * itemsPerPage + indexToDelete;
    setLists((prev) => prev.filter((_, idx) => idx !== globalIndex));
    showToast("List deleted successfully", "success");
  };

  const handleDeleteResult = (indexToDelete) => {
    const globalIndex = (currentPageResults - 1) * itemsPerPage + indexToDelete;
    setResults((prev) => prev.filter((_, idx) => idx !== globalIndex));
    showToast("Result deleted successfully", "success");
  };

  const startIndexList = (currentPageList - 1) * itemsPerPage;

  const startIndexResults = (currentPageResults - 1) * itemsPerPage;
  const currentResults = results.slice(
    startIndexResults,
    startIndexResults + itemsPerPage
  );

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-full px-4 sm:px-6 py-10 bg-gray-100"
      >
        <div className="max-w-full mx-auto space-y-8">
          <h1 className="text-xl font-semibold text-gray-800">
            1.1.4 + Verify Emails
          </h1>

          {/* Top action buttons */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Start", color: "bg-green-200 hover:bg-green-300" },
              { label: "Stop", color: "bg-yellow-200 hover:bg-yellow-300" },
              { label: "Delete", color: "bg-red-200 hover:bg-red-300" },
            ].map((item) => (
              <button
                className={`${item.color} text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform`}
                key={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* //Select List to verify email */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Select List to Verify email
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="w-full sm:w-2/3">
                {" "}
                {/* This is the key change */}
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  List
                </label>
                <select
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select List</option>
                  <option value="List1">List 1</option>
                  <option value="List2">List 2</option>
                  <option value="MarketingList">Marketing List</option>
                  <option value="CustomerList">Customer List</option>
                </select>
              </div>
              {/* <Button
                bgColor="bg-gradient-to-l from-red-500/70 to-red-400/60"
                text="Remove"
                onClick={handleRemove}
              /> */}
              <button
                className="bg-gradient-to-l from-red-500/70 to-red-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform h-12 w-auto "
                type="submit"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  Show
                  <input
                    type="number"
                    min="1"
                    className="mx-2 w-16 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    defaultValue={10}
                  />
                  records
                </label>
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  From
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  To
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              </div>
              <div className="flex items-center gap-4 w-full lg:w-max">
                <input
                  type="text"
                  placeholder="🔍 Search"
                  className="flex-grow border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action shortcuts */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-wrap gap-4 justify-start">
              {[
                "➕ Add List",
                "➕ Add Data",
                "➖ Remove Data",
                "✅ Verify Emails",
                "🛠️ Manage Lists",
                "📊 Show Results",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    if (action === "✅ Verify Emails") {
                      setShowLists(true);
                      setShowResults(false);
                    }
                    if (action === "📊 Show Results") {
                      setShowLists(false);
                      setShowResults(true);
                    }
                  }}
                  className={`${
                    action === "✅ Verify Emails"
                      ? "bg-green-100 text-green-800 ring-2 ring-green-200"
                      : action === "📊 Show Results"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  } rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform`}
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Lists Overview */}
          <AnimatePresence mode="wait">
            {showLists && (
              <motion.div
                key="lists-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow overflow-x-auto"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  📄 Lists Overview
                </h2>
                <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                    <tr>
                      {[
                        "List Status",
                        "Records",
                        "Name",
                        "Emails",
                        "WhatsApp",
                        "Mobile",
                        "Bounced",
                        "Unsubscribed",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 border-b text-center whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <motion.tbody
                    key={currentPageList}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white divide-y divide-gray-100"
                  >
                    
                    {currentLists.map((row, i) => (                        
                      <tr key={i} className="text-center align-middle">
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              row.listStatus.includes("✅")
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {row.listStatus}
                          </span>
                        </td>
                        {[
                          "records",
                          "name",
                          "emails",
                          "whatsapp",
                          "mobile",
                          "bounced",
                          "unsubscribed",
                        ].map((key) => (
                          <td key={key} className="p-3">
                            {row[key]}
                          </td>
                        ))}
                        <td className="p-3">
                          <div className="flex justify-center gap-3">
                            <Pencil
                              size={18}
                              className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                            />
                            <Trash2
                              size={18}
                              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleDeleteList(i)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </motion.tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Results */}
          <AnimatePresence mode="wait">
            {showResults && (
              <motion.div
                key="results-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow overflow-x-auto"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  📊 Verification Results
                </h2>
                <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                    <tr>
                      {[
                        "Sno.",
                        "Name",
                        "Email",
                        "Mobile",
                        "WhatsApp",
                        "Status",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 border-b text-center whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <motion.tbody
                    key={currentPageResults}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white divide-y divide-gray-100"
                  >
                    {currentResults.map((row, i) => (
                      <tr key={i} className="text-center align-middle">
                        <td className="p-3">{row.sno}</td>
                        <td className="p-3">{row.name}</td>
                        <td className="p-3">{row.email}</td>
                        <td className="p-3">{row.mobile}</td>
                        <td className="p-3">{row.whatsapp}</td>
                        <td className="p-3">{row.status}</td>
                        <td className="p-3">
                          <div className="flex justify-center gap-3">
                            <Pencil
                              size={18}
                              className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                            />
                            <Trash2
                              size={18}
                              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleDeleteResult(i)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </motion.tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* //Pagination */}
      <motion.div className="w-full px-4 sm:px-6 py-10 bg-gray-100">
        <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
          <div>
            Showing {lists.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, lists.length)} of{" "}
            {lists.length} records
          </div>
          <div className="flex gap-2 items-center">
            {/* <Button
              text="Previous"
              bgColor={"bg-gradient-to-l from-blue-500/70 to-blue-400/60"}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            /> */}
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(lists.length / itemsPerPage)}
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            {/* <Button
            text="Next"
            bgColor={"bg-gradient-to-l from-blue-500/70 to-blue-400/60"}
            onClick={handleNext}
            disabled={currentPage === Math.ceil(lists.length / itemsPerPage)}
          /> */}
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(lists.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Toast */}
      <Toaster
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
};

export default VerifyEmails;
