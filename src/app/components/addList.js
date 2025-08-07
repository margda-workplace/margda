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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="mx-auto p-4 sm:p-6 lg:p-8 lg:w-max mx-10 min-h-0"
      variants={containerVariants}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
    >
      <h2 className="text-xl mx-30 lg:mx-0 sm:text-md  mb-4 sm:mb-6 sm:mt-10 flex w-max">➕Add List</h2>

      {/* Form */}
      <motion.form
        variants={formVariants}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form has been submitted");
        }}
        className="mb-6 sm:mb-8"
      >
        <div className="mb-6">
          <label
            htmlFor="listName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            List Name:
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-all duration-200"
            placeholder="Enter list name"
          />
          <div className="buttonDiv my-4 w-full sm:w-max">
            <Button
              bgColor={"bg-gradient-to-l from-blue-500/50 to-blue-400/40"}
              text={"Submit"}
            />
          </div>
        </div>
      </motion.form>

      {/* Mobile Filter Toggle Button */}
      <motion.div
        className="md:hidden mb-4"
        variants={formVariants}
      >
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-between"
        >
          <span>Filters & Search</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              showMobileFilters ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        variants={formVariants}
        className={`${
          showMobileFilters ? "block" : "hidden"
        } md:block mb-4 sm:mb-6`}
      >
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-4 md:justify-between md:bg-transparent md:p-0">
          {/* Records selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label htmlFor="records" className="text-sm text-gray-700 whitespace-nowrap">
              Show
            </label>
            <select
              id="records"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 w-full sm:w-auto"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-sm text-gray-700 whitespace-nowrap">records</span>
          </div>

          {/* Date range */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-gray-700 whitespace-nowrap">From</span>
            <input
              type="date"
              className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:border-blue-500 w-full sm:w-auto"
            />
            <span className="text-sm text-gray-700 whitespace-nowrap">To</span>
            <input
              type="date"
              className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:border-blue-500 w-full sm:w-auto"
            />
          </div>

          {/* Search button */}
          <div className="w-full md:w-auto">
            <Button
              text="Search"
              bgColor="bg-gradient-to-l from-green-500/50 to-green-400/40"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Mobile Responsive */}
      <motion.div
        className="flex justify-center items-center gap-3  w-max"
        variants={buttonVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        {/* Desktop view - horizontal layout */}
        <div className="hidden lg:flex justify-center items-center gap-3 flex-wrap">
          <motion.button
            className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            variants={buttonItemVariants}
          >
            ➕Add List
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-green-500/70 to-green-400/60 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            variants={buttonItemVariants}
          >
            ➕Add Data
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-red-500/70 to-red-400/60 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            variants={buttonItemVariants}
          >
            ➖Remove Data
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-yellow-500/70 to-yellow-400/60 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            variants={buttonItemVariants}
          >
            Verify Emails
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-purple-500/70 to-purple-400/60 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            variants={buttonItemVariants}
          >
            Manage Lists
          </motion.button>
        </div>

        {/* Mobile and tablet view - grid layout */}
        <div className="md:mx-50 grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-2 sm:gap-3 w-max sm:mx-20 md:mx-20 ml-15">
          <motion.button
            className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 rounded-lg px-3 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 touch-manipulation"
            variants={buttonItemVariants}
          >
            ➕Add List
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-green-500/70 to-green-400/60 rounded-lg px-3 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 touch-manipulation"
            variants={buttonItemVariants}
          >
            ➕Add Data
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-red-500/70 to-red-400/60 rounded-lg px-3 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 touch-manipulation"
            variants={buttonItemVariants}
          >
            ➖Remove Data
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-yellow-500/70 to-yellow-400/60 rounded-lg px-3 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 touch-manipulation"
            variants={buttonItemVariants}
          >
            Verify Emails
          </motion.button>

          <motion.button
            className="bg-gradient-to-l from-purple-500/70 to-purple-400/60 rounded-lg px-3 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 touch-manipulation col-span-2 sm:col-span-1"
            variants={buttonItemVariants}
          >
            Manage Lists
          </motion.button>
        </div>
      </motion.div>

      {/* Data Table - Responsive */}
      <motion.div
        className="w-full mt-10"
        variants={tableVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full w-full leading-normal">
            <thead>
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
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { status: "✅ List2", records: 2 },
                { status: "❌ List1", records: 100 },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold text-${
                        i === 0 ? "green" : "red"
                      }-900 leading-tight`}
                    >
                      <span
                        className={`absolute inset-0 bg-${
                          i === 0 ? "green" : "red"
                        }-200 opacity-50 rounded-full`}
                        aria-hidden
                      ></span>
                      <span className="relative">
                        {row.status.includes("✅") ? "✅" : "❌"}{" "}
                        <input type="checkbox" /> {row.status.split(" ")[1]}
                      </span>
                    </span>
                  </td>
                  {Array(7)
                    .fill(i === 0 ? 2 : 100 - i * 2)
                    .map((val, idx) => (
                      <td
                        key={idx}
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {val}
                      </td>
                    ))}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </a>
                    <a href="#" className="text-red-500 hover:text-red-700">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {[
            { status: "✅ List2", records: 2, name: "Marketing List", emails: 2, whatsapp: 2, mobile: 2, bounced: 0, unsubscribed: 0 },
            { status: "❌ List1", records: 100, name: "Sales List", emails: 98, whatsapp: 95, mobile: 100, bounced: 2, unsubscribed: 3 },
          ].map((row, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-lg ${i === 0 ? "text-green-600" : "text-red-600"}`}>
                    {row.status.includes("✅") ? "✅" : "❌"}
                  </span>
                  <input type="checkbox" className="touch-manipulation" />
                  <span className="font-medium text-gray-900">{row.status.split(" ")[1]}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-medium touch-manipulation px-2 py-1">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium touch-manipulation px-2 py-1">
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Records:</span>
                  <span className="font-medium">{row.records}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emails:</span>
                  <span className="font-medium">{row.emails}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WhatsApp:</span>
                  <span className="font-medium">{row.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile:</span>
                  <span className="font-medium">{row.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bounced:</span>
                  <span className="font-medium">{row.bounced}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unsubscribed:</span>
                  <span className="font-medium">{row.unsubscribed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pagination - Responsive */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between mt-6 mb-4 text-sm text-gray-700 gap-4 sm:gap-2"
        variants={formVariants}
      >
        <div className="text-center sm:text-left">Showing 1 to 4 records</div>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <div className="touch-manipulation">
            <Button text="Previous" />
          </div>
          <span className="px-2">Page No</span>
          <div className="touch-manipulation">
            <Button text="Next" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddList;