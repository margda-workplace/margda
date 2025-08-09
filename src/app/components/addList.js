"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button";
import Toaster from "./toaster";

const AddList = () => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [listName, setListName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lists, setLists] = useState([
    {
      listStatus: "✅ Marketing Campaign",
      records: "150",
      name: "John Doe",
      emails: "john@example.com",
      whatsapp: "+1234567890",
      mobile: "+1234567890",
      bounced: "5",
      unsubscribed: "2",
    },
    {
      listStatus: "✅ Customer List",
      records: "200",
      name: "Jane Smith",
      emails: "jane@example.com",
      whatsapp: "+1234567891",
      mobile: "+1234567891",
      bounced: "3",
      unsubscribed: "1",
    },
    {
      listStatus: "❌ Old Prospects",
      records: "89",
      name: "Bob Johnson",
      emails: "bob@example.com",
      whatsapp: "+1234567892",
      mobile: "+1234567892",
      bounced: "12",
      unsubscribed: "5",
    },
  ]);
  const itemsPerPage = 4;

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

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!listName.trim()) {
      showToast("Please enter a list name", "error");
      return;
    }
    
    const newList = {
      listStatus: "✅ " + listName,
      records: "0",
      name: "0",
      emails: "0",
      whatsapp: "0",
      mobile: "0",
      bounced: "0",
      unsubscribed: "0",
    };
    
    setLists([newList, ...lists]);
    setListName("");
    showToast("List created successfully");
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
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-full px-4 sm:px-6 py-10 bg-gray-100"
      >
        <div className="max-w-full mx-auto space-y-8">
          <h1 className="text-xl font-semibold text-gray-800">➕ Add List</h1>

          {/* Create New List Form */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Create New List
            </h2>
            <form onSubmit={handleCreateList} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  List Name
                </label>
                <input
                  type="text"
                  placeholder="Enter List Name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                bgColor="bg-gradient-to-l from-blue-500/50 to-blue-400/40"
                text="Create List"
                type="submit"
              />
            </form>
          </motion.div>

          {/* Filters Section */}
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

          {/* Actions Section */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-wrap gap-4 justify-start">
              {[
                "➕ Add List",
                "➕ Add Data",
                "➖ Remove Data",
                "✅ Verify Emails",
                "🛠️ Manage Lists",
              ].map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${
                    action === "➕ Add List"
                      ? "bg-green-100 text-green-800 ring-2 ring-green-200"
                      : "bg-blue-100 text-blue-800"
                  } rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform`}
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
                            {row.listStatus.replace("✅", "🟢").replace("❌", "🔴")}
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