"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";
import Button from "./button";
import Toaster from "./toaster";

const RemoveData = ({
  sidebarCollapsed,
  onAddListClick,
  onAddDataClick,
  onRemoveDataClick,
  onVerifyEmailsClick,
  onManageListsClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [selectedList, setSelectedList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    {
      listStatus: "✅ Marketing List",
      records: "45",
      name: "43",
      emails: "45",
      whatsapp: "40",
      mobile: "40",
      bounced: "1",
      unsubscribed: "0",
    },
    {
      listStatus: "✅ Customer List",
      records: "78",
      name: "78",
      emails: "78",
      whatsapp: "75",
      mobile: "75",
      bounced: "3",
      unsubscribed: "2",
    },
  ]);
  const [editFormData, setEditFormData] = useState({});
  const [editModal, setEditModal] = useState({
    isOpen: false,
    index: null,
    data: null,
  });
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
  // FIX: Update the editFormData state when the user clicks the edit button
  const handleEditClick = (row, index) => {
    setEditFormData({ ...row });
    setEditModal({ isOpen: true, index, data: row });
  };
  const handleRemove = () => {
    if (!selectedList) {
      showToast("Please select a list", "error");
      return;
    }
    if (selectedItems.length === 0) {
      showToast("Please select items to remove", "error");
      return;
    }

    // Remove selected items
    const updatedLists = lists.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setLists(updatedLists);
    setSelectedItems([]);
    showToast(
      `${selectedItems.length} item(s) removed successfully`,
      "success"
    );
  };

  const handleDelete = (indexToDelete) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + indexToDelete;
    setLists((prevLists) =>
      prevLists.filter((_, index) => index !== globalIndex)
    );
    showToast("List deleted successfully", "success");
  };

  const handleCheckboxChange = (index, isChecked) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    if (isChecked) {
      setSelectedItems([...selectedItems, globalIndex]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== globalIndex));
    }
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, index: null, data: null });
    setEditFormData({});
  };

  // FIX: Update the lists state with the new form data
  const handleEditSubmit = () => {
    const updatedLists = [...lists];
    if (editModal.index !== null) {
      updatedLists[editModal.index] = editFormData;
      setLists(updatedLists);
      closeEditModal();
      showToast("List updated successfully", "success");
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allCurrentIndexes = currentLists.map(
        (_, index) => (currentPage - 1) * itemsPerPage + index
      );
      setSelectedItems([...new Set([...selectedItems, ...allCurrentIndexes])]);
    } else {
      const currentIndexes = currentLists.map(
        (_, index) => (currentPage - 1) * itemsPerPage + index
      );
      setSelectedItems(
        selectedItems.filter((item) => !currentIndexes.includes(item))
      );
    }
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
  const isAllCurrentSelected =
    currentLists.length > 0 &&
    currentLists.every((_, index) =>
      selectedItems.includes((currentPage - 1) * itemsPerPage + index)
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
            ➖ Remove Data
          </h1>

          {/* Remove Data Form */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Select List to Remove Data
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
              <Button
                bgColor="bg-gradient-to-l from-red-500/70 to-red-400/60"
                text="Remove"
                onClick={handleRemove}
              />
            </div>
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
              <button
                type="button"
                onClick={onAddListClick}
                className="bg-green-100 text-green-800 ring-2 ring-green-200 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➕ Add List
              </button>
              <button
                type="button"
                onClick={onAddDataClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➕ Add Data
              </button>
              <button
                type="button"
                onClick={onRemoveDataClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➖ Remove Data
              </button>
              <button
                type="button"
                onClick={onVerifyEmailsClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ✅ Verify Emails
              </button>
              <button
                type="button"
                onClick={onManageListsClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                🛠️ Manage Lists
              </button>
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
                    <th className="p-3 border-b text-center whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isAllCurrentSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded focus:ring-2 focus:ring-blue-400"
                      />
                    </th>
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
                    {currentLists.map((row, i) => {
                      const globalIndex = (currentPage - 1) * itemsPerPage + i;
                      const isSelected = selectedItems.includes(globalIndex);

                      return (
                        <tr
                          key={i}
                          className={`text-center align-middle ${
                            isSelected ? "bg-red-50" : ""
                          }`}
                        >
                          <td className="p-3 align-middle">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) =>
                                handleCheckboxChange(i, e.target.checked)
                              }
                              className="rounded focus:ring-2 focus:ring-blue-400"
                            />
                          </td>
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
                            <div className="flex justify-center gap-3">
                              <Pencil
                                size={18}
                                className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                                onClick={() =>
                                  handleEditClick(row, globalIndex)
                                }
                              />
                              <Trash2
                                size={18}
                                className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => handleDelete(i)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
                bgColor={"bg-gradient-to-l from-blue-500/70 to-blue-400/60"}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />
              <span>Page {currentPage}</span>
              <Button
                text="Next"
                bgColor={"bg-gradient-to-l from-blue-500/70 to-blue-400/60"}
                onClick={handleNext}
                disabled={
                  currentPage === Math.ceil(lists.length / itemsPerPage)
                }
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/*Edit Modal*/}

      <AnimatePresence>
        {editModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-300/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeEditModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  ✏️ Edit List Data
                </h2>
                <button
                  onClick={closeEditModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* List Status */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      List Status
                    </label>
                    <input
                      type="text"
                      placeholder="✅ or ❌ + List Name"
                      value={editFormData.listStatus || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          listStatus: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Records */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Records
                    </label>
                    <input
                      type="number"
                      value={editFormData.records || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          records: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="number"
                      value={editFormData.name || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Emails */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Emails
                    </label>
                    <input
                      type="number"
                      value={editFormData.emails || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          emails: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <input
                      type="number"
                      value={editFormData.whatsapp || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          whatsapp: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="number"
                      value={editFormData.mobile || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          mobile: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Bounced */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Bounced
                    </label>
                    <input
                      type="number"
                      value={editFormData.bounced || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          bounced: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Unsubscribed */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Unsubscribed
                    </label>
                    <input
                      type="number"
                      value={editFormData.unsubscribed || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          unsubscribed: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition-opacity"
                  >
                    Update Data
                  </button>
                  <button
                    onClick={closeEditModal}
                    className="flex-1 bg-gray-100 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <Toaster
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
};

export default RemoveData;
