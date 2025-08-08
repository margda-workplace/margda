"use client";
import { useState, useEffect } from "react";
import Button from "./button";
import { motion, AnimatePresence } from "framer-motion";
import Toaster from "./toaster";

const AddList = () => {
  const [mounted, setMounted] = useState(false);
  const [listName, setListName] = useState("Enter List Name");
  const [lists, setLists] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
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

  const handleDelete = (indexToDelete) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + indexToDelete;
    setLists((prevLists) =>
      prevLists.filter((_, index) => index !== globalIndex)
    );
    showToast("List deleted successfully", "success");
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(lists.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLists = lists.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-hidden">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-screen px-4 sm:px-6 md:pl-[320px] md:pr-6 lg:pl-[300px] lg:pr-10 py-10 bg-gray-100 mt-16"
      >
        <div className="max-w-[1440px] mx-auto space-y-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            📋 CRM List Manager
          </h1>

          {/* Form */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              ➕ Create New List
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!listName.trim()) {
                  showToast("List name cannot be empty", "error");
                  return;
                }
                setLists([
                  ...lists,
                  {
                    listStatus: `✅ ${listName}`,
                    records: "testRecords",
                    name: "testName",
                    emails: "testemail",
                    whatsapp: "testWhatsapp",
                    mobile: "testmobile",
                    bounced: "testbounced",
                    unsubscribed: "testUnsubscribed",
                  },
                ]);
                setListName("");
                showToast("List added successfully", "success");
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
                  className="w-1/2 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter list name"
                />
              </div>
              <Button
                bgColor="bg-gradient-to-l from-blue-500/50 to-blue-400/40"
                text="Submit"
              />
            </form>
          </motion.div>

          {/* Filters Section */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm text-gray-700">
                  Show
                  <input
                    type="number"
                    min="1"
                    className="mx-2 w-16 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    defaultValue={10}
                  />
                  records
                </label>
                <label className="text-sm text-gray-700">
                  From
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  To
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="🔍 Search"
                  className="w-full lg:w-64 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Actions Section */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-wrap gap-4 justify-start">
              {["➕ Add List", "➕ Add Data", "➖ Remove Data", "✅ Verify Emails", "🛠️ Manage Lists"].map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Table */}
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
                      <th
                        key={idx}
                        className="p-3 border-b text-center whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Animate the tbody on page change */}
                <AnimatePresence mode="wait">
                  <motion.tbody
                    key={currentPage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white divide-y divide-gray-100"
                  >
                    {currentLists.map((row, i) => (
                      <tr key={i} className="text-center align-middle">
                        <td className="p-3 align-middle">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              row.listStatus.includes("✅")
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {row.listStatus
                              .replace("✅", "🟢")
                              .replace("❌", "🔴")}
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
                          <td key={key} className="p-3 align-middle">
                            {row[key]}
                          </td>
                        ))}
                        <td className="p-3 align-middle">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              className="bg-yellow-400 rounded-full px-5 py-2 text-sm font-medium text-white shadow hover:scale-105 transition-transform"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="bg-red-400 rounded-full px-5 py-2 text-sm font-medium text-white shadow hover:scale-105 transition-transform"
                              onClick={() => handleDelete(i)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>
          </motion.div>

          {/* Pagination */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
            <div>
              Showing {lists.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, lists.length)} of{" "}
              {lists.length} records
            </div>
            <div className="flex gap-2 items-center">
              <Button
                text="Previous"
                bgColor={
                  "bg-gradient-to-l from-blue-500/70 to-blue-400/60"
                }
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />
              <span>Page {currentPage}</span>
              <Button
                text="Next"
                bgColor={
                  "bg-gradient-to-l from-blue-500/70 to-blue-400/60"
                }
                onClick={handleNext}
                disabled={
                  currentPage === Math.ceil(lists.length / itemsPerPage)
                }
              />
            </div>
          </motion.div>
        </div>
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

export default AddList;