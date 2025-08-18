"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";

const ManageLists = ({
  onAddListClick = () => {},
  onAddDataClick = () => {},
  onRemoveDataClick = () => {},
  onVerifyEmailsClick = () => {},
  onManageListsClick = () => {},
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]); // kept from original, unused but harmless
  const [selectedLists, setSelectedLists] = useState([]);
  const [activeSection, setActiveSection] = useState("merge");

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

  // edit modal state
  const [editModal, setEditModal] = useState({ isOpen: false, index: null });
  const [editFormData, setEditFormData] = useState({
    listStatus: "",
    records: "",
    name: "",
    emails: "",
    whatsapp: "",
    mobile: "",
    bounced: "",
    unsubscribed: "",
  });

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLists = lists.slice(startIndex, startIndex + itemsPerPage);

  const handleCheckboxChange = (index) => {
    const globalIndex = startIndex + index;
    setSelectedLists((prev) => {
      if (prev.includes(globalIndex)) {
        return prev.filter((item) => item !== globalIndex);
      } else {
        return [...prev, globalIndex];
      }
    });
  };

  const handleSelectAll = () => {
    const currentPageIndices = currentLists.map((_, index) => startIndex + index);
    const allSelected = currentPageIndices.every((index) => selectedLists.includes(index));

    if (allSelected) {
      setSelectedLists((prev) => prev.filter((item) => !currentPageIndices.includes(item)));
    } else {
      setSelectedLists((prev) => [...new Set([...prev, ...currentPageIndices])]);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(lists.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
  };

  const handleDeleteList = (indexToDelete) => {
    const globalIndex = startIndex + indexToDelete;
    setLists((prev) => prev.filter((_, idx) => idx !== globalIndex));
    setSelectedLists((prev) => prev.filter((item) => item !== globalIndex));
    showToast("List deleted successfully", "success");
  };

  const handleMerge = () => {
    if (selectedLists.length < 2) {
      showToast("Please select at least 2 lists to merge", "error");
      return;
    }
    showToast(`Merged ${selectedLists.length} lists successfully`, "success");
    setSelectedLists([]);
  };

  const handleRemove = () => {
    if (selectedLists.length !== 2) {
      showToast("Please select exactly 2 lists to remove duplicates", "error");
      return;
    }
    showToast("Lists processed and duplicates removed successfully", "success");
    setSelectedLists([]);
  };

  const handleDuplicate = () => {
    if (selectedLists.length !== 2) {
      showToast("Please select exactly 2 lists to find duplicates", "error");
      return;
    }
    showToast("Duplicate records found and displayed", "success");
    setSelectedLists([]);
  };

  // edit modal handlers
  const openEditModal = (index) => {
    const globalIndex = startIndex + index;
    const row = lists[globalIndex];
    if (!row) return;
    setEditFormData({ ...row });
    setEditModal({ isOpen: true, index: globalIndex });
  };

  const closeEditModal = () => setEditModal({ isOpen: false, index: null });

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = () => {
    setLists((prev) =>
      prev.map((item, idx) => (idx === editModal.index ? { ...editFormData } : item))
    );
    showToast("List updated successfully", "success");
    closeEditModal();
  };

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
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const getSectionContent = () => {
    switch (activeSection) {
      case "merge":
        return {
          title: "1.1.7.1 + Manage Lists -> Merge",
          description:
            "Select two or more lists and merge their records to create a NEW List. Remove the Duplicate records.",
          buttonText: "Merge Lists",
          action: handleMerge,
          minSelection: 2,
        };
      case "remove":
        return {
          title: "1.1.7.2 + Manage Lists -> Remove",
          description:
            "Select two lists and remove merge their records to create a NEW List. Remove the Duplicate records.",
          buttonText: "Remove Duplicates",
          action: handleRemove,
          minSelection: 2,
          maxSelection: 2,
        };
      case "duplicate":
        return {
          title: "1.1.7.3 + Manage Lists -> Duplicate",
          description:
            "Select two lists, find common email, mobile, WhatsApp records. No NEW List. Remove the Duplicate records.",
          buttonText: "Find Duplicates",
          action: handleDuplicate,
          minSelection: 2,
          maxSelection: 2,
        };
      default:
        return {
          title: "1.1.7.1 + Manage Lists -> Merge",
          description:
            "Select two or more lists and merge their records to create a NEW List. Remove the Duplicate records.",
          buttonText: "Merge Lists",
          action: handleMerge,
          minSelection: 2,
        };
    }
  };

  const sectionContent = getSectionContent();

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
            1.1.7 + Manage Lists
          </h1>

          {/* Section Selection Buttons */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-wrap gap-4">
              {[
                { key: "merge", label: "Merge", color: "bg-green-200 hover:bg-green-300" },
                { key: "remove", label: "Remove", color: "bg-yellow-200 hover:bg-yellow-300" },
                { key: "duplicate", label: "Duplicate", color: "bg-blue-200 hover:bg-blue-300" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setSelectedLists([]);
                  }}
                  className={`${item.color} ${
                    activeSection === item.key ? "ring-2 ring-gray-400" : ""
                  } text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Current Section Info */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {sectionContent.title}
            </h2>
            <p className="text-gray-600 text-sm">{sectionContent.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  Selected Lists: {selectedLists.length}
                  {sectionContent.minSelection && ` (Min: ${sectionContent.minSelection})`}
                  {sectionContent.maxSelection && ` (Max: ${sectionContent.maxSelection})`}
                </span>
              </div>
              <button
                onClick={sectionContent.action}
                className="bg-gradient-to-l from-green-500/70 to-green-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform h-12 w-auto"
              >
                {sectionContent.buttonText}
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

          {/* Lists Table */}
          <motion.div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">📄 Manage Lists</h2>
            </div>

            <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                <tr>
                  <th className="p-3 border-b text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        currentLists.length > 0 &&
                        currentLists.every((_, index) =>
                          selectedLists.includes(startIndex + index)
                        )
                      }
                      className="rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
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
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white divide-y divide-gray-100"
              >
                {currentLists.map((row, i) => (
                  <tr
                    key={i}
                    className={`text-center align-middle ${
                      selectedLists.includes(startIndex + i) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedLists.includes(startIndex + i)}
                        onChange={() => handleCheckboxChange(i)}
                        className="rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
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
                          onClick={() => openEditModal(i)}
                          title="Edit"
                        />
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleDeleteList(i)}
                          title="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div className="w-full px-4 sm:px-6 py-10 bg-gray-100">
        <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
          <div>
            Showing {lists.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, lists.length)} of {lists.length} records
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(lists.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Edit Modal (styling exactly as requested, fields mapped to table structure) */}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">✏️ Edit List</h2>
                <button
                  onClick={closeEditModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* listStatus */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      List Status (e.g., ✅ List2)
                    </label>
                    <input
                      type="text"
                      placeholder="✅ List2"
                      value={editFormData.listStatus}
                      onChange={(e) => handleEditChange("listStatus", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      autoFocus
                    />
                  </div>

                  {/* records */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Records
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.records}
                      onChange={(e) => handleEditChange("records", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* emails */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Emails
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.emails}
                      onChange={(e) => handleEditChange("emails", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* whatsapp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.whatsapp}
                      onChange={(e) => handleEditChange("whatsapp", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* mobile */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.mobile}
                      onChange={(e) => handleEditChange("mobile", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* bounced */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Bounced
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.bounced}
                      onChange={(e) => handleEditChange("bounced", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* unsubscribed */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Unsubscribed
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.unsubscribed}
                      onChange={(e) => handleEditChange("unsubscribed", e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition-opacity"
                  >
                    Update List
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
    </div>
  );
};

export default ManageLists;
