"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  Play,
  Square,
  Download,
  MapPin,
  Globe,
  Users,
  Search,
  X,
} from "lucide-react";

const DataExtractor = ({
  sidebarCollapsed,
  onAddListClick ,
  onAddDataClick,
  onRemoveDataClick ,
  onVerifyEmailsClick,
  onManageListsClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSource, setActiveSource] = useState("google-maps");
  const [extractionData, setExtractionData] = useState({
    keyword: "",
    location: "",
    maxResults: 100,
    includeEmails: true,
    includePhones: true,
    includeWebsites: true,
    includeSocial: true,
  });
 

  const [isExtracting, setIsExtracting] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    list: null,
    index: null,
  });
  const [editFormData, setEditFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    source: "",
    status: "Verified",
  });
  const [extractedData, setExtractedData] = useState([
    {
      id: 1,
      businessName: "Tech Solutions Ltd",
      email: "contact@techsolutions.com",
      phone: "+1-555-0123",
      website: "www.techsolutions.com",
      address: "123 Tech Street, NY",
      source: "Google Maps",
      status: "Verified",
      extractedAt: "2024-01-15",
    },
    {
      id: 2,
      businessName: "Digital Marketing Pro",
      email: "info@digitalmarketing.com",
      phone: "+1-555-0456",
      website: "www.digitalmarketing.com",
      address: "456 Marketing Ave, CA",
      source: "Google My Business",
      status: "Pending",
      extractedAt: "2024-01-15",
    },
    {
      id: 3,
      businessName: "Creative Studios Inc",
      email: "hello@creativestudios.com",
      phone: "+1-555-0789",
      website: "www.creativestudios.com",
      address: "789 Creative Blvd, TX",
      source: "Web Scraping",
      status: "Verified",
      extractedAt: "2024-01-14",
    },
  ]);

  const handleEdit = (listIndex) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + listIndex;
    const listToEdit = extractedData[globalIndex];

    setEditModal({
      isOpen: true,
      list: { ...listToEdit },
      index: globalIndex,
    });

    setEditFormData({
      businessName: listToEdit.businessName,
      email: listToEdit.email,
      phone: listToEdit.phone,
      website: listToEdit.website,
      address: listToEdit.address,
      source: listToEdit.source,
      status: listToEdit.status,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      list: null,
      index: null,
    });
    setEditFormData({
      businessName: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      source: "",
      status: "Verified",
    });
  };

  const handleEditSubmit = () => {
    if (!editFormData.businessName.trim()) {
      showToast("Please enter a business name", "error");
      return;
    }

    const updatedData = [...extractedData];
    updatedData[editModal.index] = {
      ...updatedData[editModal.index],
      ...editFormData,
    };

    setExtractedData(updatedData);
    closeEditModal();
    showToast("Data updated successfully", "success");
  };

  const dataSources = [
    {
      key: "google-maps",
      label: "Google Maps",
      icon: MapPin,
      required: true,
      color: "bg-red-100 text-red-800",
    },
    {
      key: "google-business",
      label: "Google My Business",
      icon: MapPin,
      required: true,
      color: "bg-blue-100 text-blue-800",
    },
    {
      key: "web-scraping",
      label: "Web Scraping",
      icon: Globe,
      required: true,
      color: "bg-green-100 text-green-800",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Users,
      required: false,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: Users,
      required: false,
      color: "bg-blue-100 text-blue-800",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: Users,
      required: false,
      color: "bg-pink-100 text-pink-800",
    },
    {
      key: "instagram-hashtag",
      label: "Instagram Hashtag",
      icon: Search,
      required: false,
      color: "bg-purple-100 text-purple-800",
    },
    {
      key: "x-keyword",
      label: "X Keyword",
      icon: Search,
      required: false,
      color: "bg-gray-100 text-gray-800",
    },
    {
      key: "x-followers",
      label: "X Followers",
      icon: Users,
      required: false,
      color: "bg-gray-100 text-gray-800",
    },
    {
      key: "x-following",
      label: "X Following",
      icon: Users,
      required: false,
      color: "bg-gray-100 text-gray-800",
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: Play,
      required: false,
      color: "bg-red-100 text-red-800",
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: Play,
      required: false,
      color: "bg-black text-white",
    },
  ];

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = extractedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStartExtraction = () => {
    if (!extractionData.keyword.trim()) {
      showToast("Please enter a keyword", "error");
      return;
    }
    setIsExtracting(true);
    showToast(
      `Starting extraction from ${
        dataSources.find((s) => s.key === activeSource)?.label
      }...`,
      "success"
    );

    // Simulate extraction process
    setTimeout(() => {
      setIsExtracting(false);
      showToast("Data extraction completed successfully", "success");
    }, 3000);
  };

  const handleStopExtraction = () => {
    setIsExtracting(false);
    showToast("Data extraction stopped", "success");
  };

  const handleDeleteData = (indexToDelete) => {
    const globalIndex = startIndex + indexToDelete;
    setExtractedData((prev) => prev.filter((_, idx) => idx !== globalIndex));
    showToast("Data deleted successfully", "success");
  };

  const handleExportData = () => {
    showToast("Data exported successfully", "success");
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(extractedData.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
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

  const getSourceConfig = () => {
    const source = dataSources.find((s) => s.key === activeSource);
    return {
      ...source,
      fields: getFieldsForSource(activeSource),
    };
  };

  const getFieldsForSource = (sourceKey) => {
    switch (sourceKey) {
      case "google-maps":
      case "google-business":
        return [
          {
            key: "keyword",
            label: "Business Keyword",
            required: true,
            placeholder: "e.g., restaurants, dentists, lawyers",
          },
          {
            key: "location",
            label: "Location",
            required: true,
            placeholder: "e.g., New York, NY",
          },
        ];
      case "web-scraping":
        return [
          {
            key: "keyword",
            label: "Search Query",
            required: true,
            placeholder: "e.g., contact emails, business listings",
          },
          {
            key: "website",
            label: "Target Website",
            required: false,
            placeholder: "e.g., yellowpages.com",
          },
        ];
      case "linkedin":
        return [
          {
            key: "keyword",
            label: "Job Title/Industry",
            required: true,
            placeholder: "e.g., Software Engineer, Marketing Manager",
          },
          {
            key: "location",
            label: "Location",
            required: false,
            placeholder: "e.g., San Francisco, CA",
          },
        ];
      case "instagram":
      case "facebook":
        return [
          {
            key: "keyword",
            label: "Profile/Page Name",
            required: true,
            placeholder: "e.g., @username or business name",
          },
          {
            key: "category",
            label: "Category",
            required: false,
            placeholder: "e.g., Business, Personal",
          },
        ];
      case "instagram-hashtag":
        return [
          {
            key: "keyword",
            label: "Hashtag",
            required: true,
            placeholder: "e.g., #marketing #business",
          },
        ];
      case "x-keyword":
        return [
          {
            key: "keyword",
            label: "Search Keyword",
            required: true,
            placeholder: "e.g., startup founders, tech companies",
          },
        ];
      case "x-followers":
      case "x-following":
        return [
          {
            key: "keyword",
            label: "Username",
            required: true,
            placeholder: "e.g., @elonmusk, @openai",
          },
        ];
      case "youtube":
        return [
          {
            key: "keyword",
            label: "Channel/Video Keyword",
            required: true,
            placeholder: "e.g., tech reviews, cooking tutorials",
          },
        ];
      case "tiktok":
        return [
          {
            key: "keyword",
            label: "Hashtag/Creator",
            required: true,
            placeholder: "e.g., #fyp, @username",
          },
        ];
      default:
        return [
          {
            key: "keyword",
            label: "Keyword",
            required: true,
            placeholder: "Enter search keyword",
          },
        ];
    }
  };

  const sourceConfig = getSourceConfig();

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
            1.1.2 + Data Extractor
          </h1>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={
                isExtracting ? handleStopExtraction : handleStartExtraction
              }
              className={`${
                isExtracting
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-green-200 hover:bg-green-300"
              } text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform`}
            >
              {isExtracting ? (
                <>
                  <Square size={16} className="inline mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play size={16} className="inline mr-2" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={handleExportData}
              className="bg-blue-200 hover:bg-blue-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
            >
              <Download size={16} className="inline mr-2" />
              Export
            </button>
          </div>

          {/* Data Source Selection */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Select Data Source
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {dataSources.map((source) => {
                const IconComponent = source.icon;
                return (
                  <button
                    key={source.key}
                    onClick={() => {
                      setActiveSource(source.key);
                      setExtractionData({
                        ...extractionData,
                        keyword: "",
                        location: "",
                      });
                    }}
                    className={`${source.color} ${
                      activeSource === source.key
                        ? "ring-2 ring-gray-400 scale-105"
                        : ""
                    } p-3 rounded-lg text-xs font-medium shadow hover:scale-105 transition-all duration-200 flex flex-col items-center gap-2 min-h-[80px]`}
                  >
                    <IconComponent size={20} />
                    <span className="text-center leading-tight">
                      {source.label}
                      {source.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Extraction Configuration */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Configure Extraction - {sourceConfig?.label}
            </h2>
            <p className="text-sm text-gray-600">
              Get business data from {sourceConfig?.label} and save to contact
              lists
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sourceConfig?.fields?.map((field) => (
                <div key={field.key}>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={extractionData[field.key] || ""}
                    onChange={(e) =>
                      setExtractionData({
                        ...extractionData,
                        [field.key]: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Max Results
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={extractionData.maxResults}
                  onChange={(e) =>
                    setExtractionData({
                      ...extractionData,
                      maxResults: parseInt(e.target.value) || 100,
                    })
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Data to Extract
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { key: "includeEmails", label: "Emails" },
                    { key: "includePhones", label: "Phone Numbers" },
                    { key: "includeWebsites", label: "Websites" },
                    { key: "includeSocial", label: "Social Media" },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={extractionData[option.key]}
                        onChange={(e) =>
                          setExtractionData({
                            ...extractionData,
                            [option.key]: e.target.checked,
                          })
                        }
                        className="mr-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
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

          {/* Extracted Data Table */}
          <motion.div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                📊 Extracted Data
              </h2>
              {isExtracting && (
                <div className="flex items-center text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Extracting...
                </div>
              )}
            </div>

            <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                <tr>
                  {[
                    "Business Name",
                    "Email",
                    "Phone",
                    "Website",
                    "Address",
                    "Source",
                    "Status",
                    "Extracted At",
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
                {currentData.map((row, i) => (
                  <tr key={row.id} className="text-center align-middle">
                    <td className="p-3 font-medium">{row.businessName}</td>
                    <td className="p-3">{row.email}</td>
                    <td className="p-3">{row.phone}</td>
                    <td className="p-3">{row.website}</td>
                    <td className="p-3 max-w-xs truncate">{row.address}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {row.source}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">{row.extractedAt}</td>
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
                          onClick={() => handleDeleteData(i)}
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
            Showing {extractedData.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, extractedData.length)} of{" "}
            {extractedData.length} records
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
              disabled={
                currentPage === Math.ceil(extractedData.length / itemsPerPage)
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
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  ✏️ Edit Business Data
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
                  {/* Business Name */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Business Name"
                      value={editFormData.businessName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          businessName: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      autoFocus
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1-555-0123"
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      placeholder="www.example.com"
                      value={editFormData.website}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          website: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="123 Main Street, City, State"
                      value={editFormData.address}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Source
                    </label>
                    <select
                      value={editFormData.source}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          source: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Google Maps">Google Maps</option>
                      <option value="Google My Business">
                        Google My Business
                      </option>
                      <option value="Web Scraping">Web Scraping</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                  </div>

                  {/* Status */}
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
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>

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
    </div>
  );
};

export default DataExtractor;
