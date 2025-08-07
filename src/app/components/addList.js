"use client";
import { useState, useEffect } from "react";
import Button from "./button";
import { motion } from "framer-motion";

const AddList = () => {
  const [mounted, setMounted] = useState(false);
  const [listName, setListName] = useState("Enter List Name");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    <div className="overflow-x-hidden">
      {" "}
      {/* Prevent horizontal scroll globally */}
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-screen px-4 sm:px-6 lg:pl-[250px] lg:pr-10 py-10 bg-gray-100 mt-16"
      >
        <div className="max-w-[1440px] mx-auto space-y-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            📋 CRM List Manager
          </h1>

          {/* Section: Form */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              ➕ Create New List
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("form has been submitted");
              }}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor="listName"
                >
                  List Name
                </label>
                <input
                  type="text"
                  id="listName"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter list name"
                />
              </div>
              <Button
                bgColor="bg-gradient-to-l from-blue-500/50 to-blue-400/40"
                text="Submit"
              />
            </form>
          </motion.div>

          {/* Section: Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* Show Records */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium">Show</label>
              <input
                type="number"
                min={1}
                className="w-full sm:w-20 px-2 py-1 border rounded-md text-sm"
                placeholder="10"
              />
              <span className="text-sm">records</span>
            </div>

            {/* Date Range */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-sm font-medium">From</label>
                <input
                  type="date"
                  className="w-full sm:w-auto px-2 py-1 border rounded-md text-sm"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-sm font-medium">To</label>
                <input
                  type="date"
                  className="w-full sm:w-auto px-2 py-1 border rounded-md text-sm"
                />
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                className="w-full sm:w-auto px-2 py-1 border rounded-md text-sm"
                placeholder="Search..."
              />
              <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600">
                Search
              </button>
            </div>
          </motion.div>

          {/* Section: Quick Actions */}
          <motion.div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              ⚡ Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              {[
                { text: "➕ Add List", color: "blue" },
                { text: "➕ Add Data", color: "blue" },
                { text: "➖ Remove Data", color: "blue" },
                { text: "Verify Emails", color: "blue" },
                { text: "Manage Lists", color: "blue" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  className={`bg-gradient-to-l from-blue-500/70 to-blue-400/60 rounded-full px-5 py-2 text-sm font-medium text-white shadow hover:scale-105 transition-transform`}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Section: Table Toolbar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Show</label>
              <input
                type="number"
                min={1}
                className="w-20 px-2 py-1 border rounded-md text-sm"
                placeholder="10"
              />
              <span className="text-sm">records</span>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">From</label>
              <input
                type="date"
                className="px-2 py-1 border rounded-md text-sm"
              />
              <label className="text-sm font-medium">To</label>
              <input
                type="date"
                className="px-2 py-1 border rounded-md text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="px-2 py-1 border rounded-md text-sm"
                placeholder="Search..."
              />
              <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600">
                Search
              </button>
            </div>
          </motion.div> */}

          {/* Section: Table */}
          <motion.div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              📄 Lists Overview
            </h2>
            <div className="min-w-full">
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
                    ].map((header, idx) => (
                      <th key={idx} className="p-3 border-b">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { status: "✅ List2", records: 2 },
                    { status: "❌ List1", records: 100 },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${
                            i === 0 ? "green" : "red"
                          }-100 text-${i === 0 ? "green" : "red"}-700`}
                        >
                          {row.status}
                        </span>
                      </td>
                      {Array(7)
                        .fill(i === 0 ? 2 : 100 - i * 2)
                        .map((val, idx) => (
                          <td key={idx} className="p-3">
                            {val}
                          </td>
                        ))}
                      <td className="p-3 space-x-2">
                        <a href="#" className="text-blue-500 hover:underline">
                          Edit
                        </a>
                        <a href="#" className="text-red-500 hover:underline">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Section: Pagination */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
            <div>Showing 1 to 4 records</div>
            <div className="flex gap-2 items-center">
              <Button text="Previous" />
              <span>Page 1</span>
              <Button text="Next" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddList;
