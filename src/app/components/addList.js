"use client"
import { useState, useEffect } from "react";
import Button from "./button";
import { motion } from "framer-motion";

const AddList = () => {
  const buttonVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const buttonItemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">➕Add List</h2>

        {/* Form */}
        <form>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter list name"
            />
            <div className="buttonDiv my-4 w-max">
              <Button
                bgColor={"bg-gradient-to-l from-blue-500/50 to-blue-400/40"}
              />{" "}
              {/* Use Button component */}
            </div>
          </div>
        </form>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center mb-2">
            <label htmlFor="records" className="mr-2 text-sm text-gray-700">
              Show
            </label>
            <select
              id="records"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="ml-2 text-sm text-gray-700">records</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2 text-sm text-gray-700">From</span>
            <input
              type="date"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="mx-2 text-sm text-gray-700">To</span>
            <input
              type="date"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button
            text="Search"
            bgColor="bg-gradient-to-l from-green-500/50 to-green-400/40"
          />{" "}
          {/* Use Button component */}
        </div>

        {/* Quick Actions */}

        {/* Quick Actions */}
        <div className="mb-4 flex justify-center items-center w-max gap-3">
          {/* Quick Actions */}
          <div className="mb-4 flex justify-center items-center w-max gap-3">
            {/* Quick Actions */}
            <motion.div
              className="mb-4 flex flex-wrap gap-2 justify-center"
              variants={buttonVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
            >
              <motion.button
                className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                variants={buttonItemVariants}
              >
                ➕Add List
              </motion.button>
              <motion.button
                className="bg-gradient-to-l from-green-500/70 to-green-400/60 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                variants={buttonItemVariants}
              >
                ➕Add Data
              </motion.button>
              <motion.button
                className="bg-gradient-to-l from-red-500/70 to-red-400/60 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                variants={buttonItemVariants}
              >
                ➖Remove Data
              </motion.button>
              <motion.button
                className="bg-gradient-to-l from-orange-500/70 to-orange-400/60 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                variants={buttonItemVariants}
              >
                Verify Emails
              </motion.button>
              <motion.button
                className="bg-gradient-to-l from-orange-500/70 to-orange-400/60 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                variants={buttonItemVariants}
              >
                Manage Lists
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  List Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Emails
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  WhatsApp
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bounced
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unsubscribed
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">
                      ✅ <input type="checkbox" /> List2
                    </span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  2
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  2
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  2
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  0
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  0
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  0
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  0
                </td>
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
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">
                      ❌ <input type="checkbox" /> List1
                    </span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  100
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  98
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  100
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  98
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  98
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  2
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  1
                </td>
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
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-5 text-sm text-gray-700">
          <div>Showing 1 to 4 records</div>
          <div className="flex justify-center w-max gap-5">
            <Button text="Previous" />
            <span className="my-3">Page No</span>
            <Button text="Next" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddList;
