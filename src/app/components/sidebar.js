"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMartOpen, setIsMartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleCrmMenu = () => {
    setIsCrmOpen(!isCrmOpen);
  };

  const toggleToolsMenu = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  const toggleServiceMenu = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const toggleMartMenu = () => {
    setIsMartOpen(!isMartOpen);
  };

  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const sidebarVariants = {
    hidden: {
      x: -256,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween", // Changed to "tween" for smoother animation
        duration: 0.4, // Adjusted duration
        ease: "easeInOut", // Added easeInOut for a more natural feel
      },
    },
  };

  return (
    <>
      <motion.aside
        id="logo-sidebar"
        className="fixed top-24 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0"
        aria-label="Sidebar"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <img src="/logo.webp" className="h-10 me-3 sm:h-7" alt="Logo" />
          </a>

          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={toggleCrmMenu}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3H3v2h7V3zm0 6H3v2h7V9zm0 6H3v2h7v-2zm7-9h-5v2h5V6zm0 6h-5v2h5v-2z" />
                </svg>
                <span className="ms-3">CRM</span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    isCrmOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`pl-6 mt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                  isCrmOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    CRM List
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    CRM Template
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Email CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    WhatsApp CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    SMS CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Calls CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Social CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Unified CRM
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={toggleToolsMenu}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3H3v2h7V3zm0 6H3v2h7V9zm0 6H3v2h7v-2zm7-9h-5v2h5V6zm0 6h-5v2h5v-2z" />
                </svg>
                <span className="ms-3">Tools</span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    isToolsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`pl-6 mt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                  isToolsOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Tool 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Tool 2
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Tool 3
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={toggleServiceMenu}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3H3v2h7V3zm0 6H3v2h7V9zm0 6H3v2h7v-2zm7-9h-5v2h5V6zm0 6h-5v2h5v-2z" />
                </svg>
                <span className="ms-3">Service</span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    isServiceOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`pl-6 mt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                  isServiceOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Service 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Service 2
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Service 3
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={toggleMartMenu}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3H3v2h7V3zm0 6H3v2h7V9zm0 6H3v2h7v-2zm7-9h-5v2h5V6zm0 6h-5v2h5v-2z" />
                </svg>
                <span className="ms-3">Mart</span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    isMartOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`pl-6 mt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                  isMartOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Mart 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Mart 2
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Mart 3
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={toggleLoginMenu}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3H3v2h7V3zm0 6H3v2h7V9zm0 6H3v2h7v-2zm7-9h-5v2h5V6zm0 6h-5v2h5v-2z" />
                </svg>
                <span className="ms-3">Login</span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    isLoginOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`pl-6 mt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                  isLoginOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Login 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Login 2
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 rounded hover:bg-gray-100">
                    Login 3
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
