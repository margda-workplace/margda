"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react"; // match verifyEmails action icons

// Self-contained Button component for the immersive
const Button = ({ bgColor, text, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    className={`w-full px-4 py-3 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap ${bgColor}`}
  >
    {text}
  </button>
);

// Self-contained Toaster component for the immersive
const Toaster = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const colorClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✔️' : '❌';

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-5 right-5 z-50 p-4 rounded-lg text-white shadow-lg flex items-center gap-3 ${colorClass}`}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </motion.div>
  );
};

// Main AddData component
const AddData = ({
  sidebarCollapsed,
  onAddListClick,
  onAddDataClick,
  onRemoveDataClick,
  onVerifyEmailsClick,
  onManageListsClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // original form state
  const [list, setList] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [txtInput, setTxtInput] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [editModal, setEditModal] = useState({ isOpen: false, index: null });

  // lists overview state (unchanged content)
  const [currentPage, setCurrentPage] = useState(1);

  const [editFormData, setEditFormData] = useState({
    sno: "",
    name: "",
    email: "",
    mobile: "",
    whatsapp: "",
    list: "",
  });

  const handleEdit = (index) => {
    const row = currentData[index];
    setEditFormData({
      sno: row.sno,
      name: row.name,
      email: row.email,
      mobile: row.mobile,
      whatsapp: row.whatsapp,
      list: row.list,
    });
    setEditModal({ isOpen: true, index: startIndexData + index });
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, index: null });
  };


  const handleEditSubmit = () => {
    // Corrected logic:
    // 1. Get the correct index from the editModal state.
    // 2. Create a new array and update the item at that index.
    // 3. Update the main dataEntries state with the new array.
    if (editModal.index !== null) {
      const updatedData = [...dataEntries];
      updatedData[editModal.index] = { ...editFormData };
      setDataEntries(updatedData);
      showToast("Data updated successfully", "success");
      closeEditModal();
    } else {
      showToast("Error: No item selected to edit", "error");
    }
  };

  const [lists, setLists] = useState([
    {
      listStatus: "✅ Sample List 1",
      records: "150",
      name: "John Doe",
      emails: "john@example.com",
      whatsapp: "+1234567890",
      mobile: "+1234567890",
      bounced: "5",
      unsubscribed: "2",
    },
    {
      listStatus: "✅ Sample List 2",
      records: "200",
      name: "Jane Smith",
      emails: "jane@example.com",
      whatsapp: "+1234567891",
      mobile: "+1234567891",
      bounced: "3",
      unsubscribed: "1",
    },
  ]);
  const itemsPerPage = 4;

  // data table mock data (always visible)
  const [currentPageData, setCurrentPageData] = useState(1);
  const [dataEntries, setDataEntries] = useState([
    {
      sno: 1,
      name: "Rohan",
      email: "rohan@gmail.com",
      mobile: "7878787878",
      whatsapp: "—",
      list: "Sample List 1",
    },
    {
      sno: 2,
      name: "Amit",
      email: "amit@example.com",
      mobile: "9876543210",
      whatsapp: "+919876543210",
      list: "Sample List 2",
    },
    {
      sno: 3,
      name: "Sara",
      email: "sara@example.com",
      mobile: "9123456789",
      whatsapp: "—",
      list: "Sample List 1",
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

  const showToast = (message, type = "success") => setToast({ message, type });

  // submit handlers: keep content/logic the same
  const handleSubmitOption1 = (e) => {
    e.preventDefault();
    if (!list || !name || !email) {
      showToast("Please fill in required fields", "error");
      return;
    }
    showToast("Data added successfully");
    setName("");
    setEmail("");
    setMobile("");
    setWhatsapp("");
  };

  const handleSubmitOption2 = (e) => {
    e.preventDefault();
    if (!txtInput.trim()) {
      showToast("Please paste TXT data", "error");
      return;
    }
    showToast("TXT data added successfully");
    setTxtInput("");
  };

  const handleSubmitOption3 = (e) => {
    e.preventDefault();
    if (!list || !csvFile) {
      showToast("Please select a list and upload CSV", "error");
      return;
    }
    showToast("CSV imported successfully");
    setCsvFile(null);
  };

  // lists overview helpers
  const handleDeleteListRow = (indexToDelete) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + indexToDelete;
    setLists((prev) => prev.filter((_, idx) => idx !== globalIndex));
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

  // data table helpers
  const handleDeleteDataRow = (indexToDelete) => {
    const globalIndex = (currentPageData - 1) * itemsPerPage + indexToDelete;
    setDataEntries((prev) => prev.filter((_, idx) => idx !== globalIndex));
    showToast("Row deleted successfully", "success");
  };

  const handlePreviousData = () => {
    if (currentPageData > 1) setCurrentPageData((prev) => prev - 1);
  };
  const handleNextData = () => {
    if (currentPageData < Math.ceil(dataEntries.length / itemsPerPage))
      setCurrentPageData((prev) => prev + 1);
  };
  const startIndexData = (currentPageData - 1) * itemsPerPage;
  const currentData = dataEntries.slice(
    startIndexData,
    startIndexData + itemsPerPage
  );

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-full px-4 sm:px-6 py-10 bg-gray-100 min-h-screen"
      >
        <div className="max-w-full mx-auto space-y-8">
          <h1 className="text-xl font-semibold text-gray-800">➕ Add Data</h1>

          {/* top action buttons (match verifyEmails) */}

          {/* filters card (exact classes as verifyEmails) */}
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

          {/* action shortcuts (no Show Lists / Show Data buttons) */}
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

          {/* add data (forms) */}
          <div className="space-y-8">
            {/* option 1 */}
            <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Option 1: Through Input Form
              </h2>
              <form onSubmit={handleSubmitOption1} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    List
                  </label>
                  <select
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select</option>
                    <option value="List1">List 1</option>
                    <option value="List2">List 2</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <Button
                  bgColor="bg-gradient-to-l from-blue-500/70 to-blue-400/60"
                  text="Submit"
                />
              </form>
            </motion.div>

            {/* option 2 */}
            <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Option 2: Paste TXT (Name & Email only)
              </h2>
              <form onSubmit={handleSubmitOption2} className="space-y-4">
                <textarea
                  value={txtInput}
                  onChange={(e) => setTxtInput(e.target.value)}
                  placeholder="Paste text data here..."
                  rows={5}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Button
                  bgColor="bg-gradient-to-l from-blue-500/50 to-blue-400/40"
                  text="Submit"
                />
              </form>
            </motion.div>

            {/* option 3 */}
            <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Option 3: Import CSV
              </h2>
              <form onSubmit={handleSubmitOption3} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    List
                  </label>
                  <select
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select</option>
                    <option value="List1">List 1</option>
                    <option value="List2">List 2</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <a
                    href="/sample.csv"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Download sample
                  </a>
                </div>
                <Button
                  bgColor="bg-gradient-to-l from-blue-500/50 to-blue-400/40"
                  text="Submit"
                />
              </form>
            </motion.div>
          </div>

          {/* data table (always visible) — styled like verifyEmails "Verification Results" */}
          <motion.div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              📊 Data Table
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
                    "List",
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
                key={currentPageData}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white divide-y divide-gray-100"
              >
                {currentData.map((row, i) => (
                  <tr key={i} className="text-center align-middle">
                    <td className="p-3">{row.sno}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.email}</td>
                    <td className="p-3">{row.mobile}</td>
                    <td className="p-3">{row.whatsapp}</td>
                    <td className="p-3">{row.list}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <Pencil
                          size={18}
                          className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleEdit(i)}
                        />
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleDeleteDataRow(i)}
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

      {/* pagination for lists (match verifyEmails look, correct handlers) */}

      {/* pagination for data table (same styling) */}
      <motion.div className="w-full px-4 sm:px-6 pb-10 bg-gray-100">
        <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
          <div>
            Showing {dataEntries.length === 0 ? 0 : startIndexData + 1} to{" "}
            {Math.min(startIndexData + itemsPerPage, dataEntries.length)} of{" "}
            {dataEntries.length} rows
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              onClick={handlePreviousData}
              disabled={currentPageData === 1}
            >
              Prev
            </button>
            <span>Page {currentPageData}</span>
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              onClick={handleNextData}
              disabled={
                currentPageData === Math.ceil(dataEntries.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
      {/* Edit Modal */}
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
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  ✏️ Edit Contact
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
                  {/* Sno. (read-only) */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Sno.
                    </label>
                    <input
                      type="text"
                      value={editFormData.sno}
                      readOnly
                      className="border border-gray-200 bg-gray-50 rounded-lg p-3 w-full text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter Name"
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      autoFocus
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      placeholder="email@example.com"
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      value={editFormData.mobile}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          mobile: e.target.value,
                        })
                      }
                      placeholder="+91-9876543210"
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={editFormData.whatsapp}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          whatsapp: e.target.value,
                        })
                      }
                      placeholder="+91-9876543210"
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* List */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      List
                    </label>
                    <input
                      type="text"
                      value={editFormData.list}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          list: e.target.value,
                        })
                      }
                      placeholder="Enter list name/category"
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition-opacity"
                  >
                    Update
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

      <Toaster
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
};

export default AddData;
