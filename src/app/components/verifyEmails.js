"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

// Toast component
const Toaster = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`px-4 py-2 rounded-lg shadow-lg text-white ${
          type === "error" ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

// EditModal Component - Fixed to match data tables
const EditModal = ({ isOpen, itemData, onClose, onSave, itemType }) => {
  const [editedItem, setEditedItem] = useState({});

  // Initialize form data based on item type
  useEffect(() => {
    if (isOpen && itemData) {
      if (itemType === "list") {
        // For list items - matching the lists table structure
        setEditedItem({
          listStatus: itemData.listStatus || "",
          records: itemData.records || "",
          name: itemData.name || "",
          emails: itemData.emails || "",
          whatsapp: itemData.whatsapp || "",
          mobile: itemData.mobile || "",
          bounced: itemData.bounced || "",
          unsubscribed: itemData.unsubscribed || "",
          originalIndex: itemData.originalIndex,
        });
      } else {
        // For result items - matching the results table structure
        setEditedItem({
          sno: itemData.sno || "",
          name: itemData.name || "",
          email: itemData.email || "",
          mobile: itemData.mobile || "",
          whatsapp: itemData.whatsapp || "",
          status: itemData.status || "Valid",
          originalIndex: itemData.originalIndex,
        });
      }
    }
  }, [isOpen, itemData, itemType]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSave(editedItem, itemType);
    },
    [editedItem, onSave, itemType]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Edit {itemType === "list" ? "List" : "Record"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {itemType === "list" ? (
            // List item form fields
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  List Status
                </label>
                <select
                  name="listStatus"
                  value={editedItem.listStatus || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="✅ List1">✅ List1</option>
                  <option value="✅ List2">✅ List2</option>
                  <option value="❌ List1">❌ List1</option>
                  <option value="❌ List2">❌ List2</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Records
                </label>
                <input
                  type="number"
                  name="records"
                  value={editedItem.records || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="number"
                  name="name"
                  value={editedItem.name || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Emails
                </label>
                <input
                  type="number"
                  name="emails"
                  value={editedItem.emails || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="number"
                  name="whatsapp"
                  value={editedItem.whatsapp || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={editedItem.mobile || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Bounced
                </label>
                <input
                  type="number"
                  name="bounced"
                  value={editedItem.bounced || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Unsubscribed
                </label>
                <input
                  type="number"
                  name="unsubscribed"
                  value={editedItem.unsubscribed || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </>
          ) : (
            // Result item form fields
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Serial No.
                </label>
                <input
                  type="number"
                  name="sno"
                  value={editedItem.sno || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedItem.name || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedItem.email || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={editedItem.mobile || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={editedItem.whatsapp || ""}
                  onChange={handleChange}
                  placeholder="—"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={editedItem.status || "Valid"}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Valid">Valid</option>
                  <option value="Bad/Dead">Bad/Dead</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>
            </>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const VerifyEmails = ({
  sidebarCollapsed,
  onAddListClick,
  onAddDataClick,
  onRemoveDataClick,
  onVerifyEmailsClick,
  onManageListsClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPageList, setCurrentPageList] = useState(1);
  const [currentPageResults, setCurrentPageResults] = useState(1);
  const [showResults, setShowResults] = useState(false);
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemData, setModalItemData] = useState(null);
  const [modalItemType, setModalItemType] = useState("result"); // 'list' or 'result'

  const itemsPerPage = 4;

  // Memoized calculations
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const currentLists = useMemo(
    () => lists.slice(startIndex, startIndex + itemsPerPage),
    [lists, startIndex, itemsPerPage]
  );
  const startIndexResults = useMemo(
    () => (currentPageResults - 1) * itemsPerPage,
    [currentPageResults, itemsPerPage]
  );
  const currentResults = useMemo(
    () => results.slice(startIndexResults, startIndexResults + itemsPerPage),
    [results, startIndexResults, itemsPerPage]
  );

  useEffect(() => setMounted(true), []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const handleRemove = useCallback(() => {
    if (!selectedList) {
      showToast("Please select a list to remove", "error");
      return;
    }
    setLists((prev) => prev.filter((list) => list.name !== selectedList));
    setSelectedList("");
    showToast("List removed successfully", "success");
  }, [selectedList, showToast]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < Math.ceil(lists.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
  }, [currentPage, lists.length, itemsPerPage]);

  const handleDeleteList = useCallback(
    (indexToDelete) => {
      const globalIndex = (currentPageList - 1) * itemsPerPage + indexToDelete;
      setLists((prev) => prev.filter((_, idx) => idx !== globalIndex));
      showToast("List deleted successfully", "success");
    },
    [currentPageList, itemsPerPage, showToast]
  );

  const handleDeleteResult = useCallback(
    (indexToDelete) => {
      const globalIndex =
        (currentPageResults - 1) * itemsPerPage + indexToDelete;
      setResults((prev) => prev.filter((_, idx) => idx !== globalIndex));
      showToast("Result deleted successfully", "success");
    },
    [currentPageResults, itemsPerPage, showToast]
  );

  // Modal handlers - updated to handle item type
  const handleOpenEditModal = useCallback(
    (item, type, originalIndex = null) => {
      setModalItemData({ ...item, originalIndex });
      setModalItemType(type);
      setIsModalOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalItemData(null);
    setModalItemType("result");
  }, []);

  const handleSaveEdit = useCallback(
    (editedItem, itemType) => {
      if (itemType === "list") {
        // Update list item
        const globalIndex =
          editedItem.originalIndex !== null
            ? editedItem.originalIndex
            : lists.findIndex(
                (item) => item.listStatus === editedItem.listStatus
              );

        setLists((prevLists) =>
          prevLists.map((item, index) =>
            index === globalIndex ? { ...editedItem } : item
          )
        );
      } else {
        // Update result item
        setResults((prevResults) =>
          prevResults.map((item) =>
            item.sno === editedItem.sno ? { ...editedItem } : item
          )
        );
      }

      handleCloseModal();
      showToast(
        `${itemType === "list" ? "List" : "Record"} updated successfully`,
        "success"
      );
    },
    [lists, handleCloseModal, showToast]
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

          {/* Select List to verify email */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Select List to Verify email
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="w-full sm:w-2/3">
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
              <button
                className="bg-gradient-to-l from-green-500/70 to-green-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform h-12 w-auto "
                type="submit"
                onClick={handleRemove}
              >
                Verify
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
                              onClick={() =>
                                handleOpenEditModal(row, "list", startIndex + i)
                              }
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
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              row.status === "Valid"
                                ? "bg-green-100 text-green-700"
                                : row.status === "Unverified"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center gap-3">
                            <Pencil
                              size={18}
                              className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleOpenEditModal(row, "result")}
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

      {/* Pagination */}
      <motion.div className="w-full px-4 sm:px-6 py-10 bg-gray-100">
        <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
          <div>
            Showing {lists.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, lists.length)} of{" "}
            {lists.length} records
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
      <Toaster
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        itemData={modalItemData}
        itemType={modalItemType}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default VerifyEmails;
