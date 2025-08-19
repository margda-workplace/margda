"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";
import Toaster from "./toaster";

const AddList = ({
  onAddListClick = () => {},
  onAddDataClick = () => {},
  onRemoveDataClick = () => {},
  onVerifyEmailsClick = () => {},
  onManageListsClick = () => {},
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [listName, setListName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    list: null,
    index: null,
  });
  const [editFormData, setEditFormData] = useState({
    listName: "",
    status: "✅",
    records: "",
    name: "",
    emails: "",
    whatsapp: "",
    mobile: "",
    bounced: "",
    unsubscribed: "",
  });

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

  const handleEdit = (listIndex) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + listIndex;
    const listToEdit = lists[globalIndex];

    setEditModal({
      isOpen: true,
      list: { ...listToEdit },
      index: globalIndex,
    });

    // Extract the list name (remove the status emoji)
    const name = listToEdit.listStatus.replace(/^[✅❌]\s/, "");
    const status = listToEdit.listStatus.includes("✅") ? "✅" : "❌";

    setEditFormData({
      listName: name,
      status: status,
      records: listToEdit.records,
      name: listToEdit.name,
      emails: listToEdit.emails,
      whatsapp: listToEdit.whatsapp,
      mobile: listToEdit.mobile,
      bounced: listToEdit.bounced,
      unsubscribed: listToEdit.unsubscribed,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.listName.trim()) {
      showToast("Please enter a list name", "error");
      return;
    }

    const updatedLists = [...lists];
    updatedLists[editModal.index] = {
      listStatus: `${editFormData.status} ${editFormData.listName}`,
      records: editFormData.records,
      name: editFormData.name,
      emails: editFormData.emails,
      whatsapp: editFormData.whatsapp,
      mobile: editFormData.mobile,
      bounced: editFormData.bounced,
      unsubscribed: editFormData.unsubscribed,
    };

    setLists(updatedLists);
    closeEditModal();
    showToast("List updated successfully");
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, list: null, index: null });
    setEditFormData({
      listName: "",
      status: "✅",
      records: "",
      name: "",
      emails: "",
      whatsapp: "",
      mobile: "",
      bounced: "",
      unsubscribed: "",
    });
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
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  List Name
                </label>
                <div className="flex items-left w-full gap-3">
                  <input
                    type="text"
                    placeholder="Enter List Name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateList(e)}
                    className="border border-gray-300 rounded-lg p-3 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                
                <button
                  className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
                  onClick={handleCreateList}
                >
                  Create List
                </button>
                </div>
              </div>
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
                          <div className="flex justify-center gap-3">
                            <Pencil
                              size={18}
                              className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleEdit(i)}
                            />
                            <Trash2
                              size={18}
                              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleDelete(i)}
                            />
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
              <button
                className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={handleNext}
                disabled={
                  currentPage === Math.ceil(lists.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>
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
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  ✏️ Edit List
                </h2>
                <button
                  onClick={closeEditModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* List Name */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      List Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter List Name"
                      value={editFormData.listName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          listName: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      autoFocus
                    />
                  </div>

                  {/* List Status */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          status: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="✅">✅ Active</option>
                      <option value="❌">❌ Inactive</option>
                    </select>
                  </div>

                  {/* Records */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Records
                    </label>
                    <input
                      type="text"
                      placeholder="0"
                      value={editFormData.records}
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
                      Contact Name
                    </label>
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={editFormData.name}
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
                      type="email"
                      placeholder="email@example.com"
                      value={editFormData.emails}
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
                      type="tel"
                      placeholder="+1234567890"
                      value={editFormData.whatsapp}
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
                      type="tel"
                      placeholder="+1234567890"
                      value={editFormData.mobile}
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
                      placeholder="0"
                      min="0"
                      value={editFormData.bounced}
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
                      placeholder="0"
                      min="0"
                      value={editFormData.unsubscribed}
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

      {/* Toast Component (placeholder - you'll need to implement this) */}
      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}
    </div>
  );
};

export default AddList;
