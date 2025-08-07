"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isCrmListOpen, setIsCrmListOpen] = useState(false);
  const [isCrmListDropdownOpen, setIsCrmListDropdownOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMartOpen, setIsMartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest('#logo-sidebar') && !event.target.closest('#hamburger-button')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      x: isMobile ? -320 : -256,
      opacity: isMobile ? 0 : 1,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    },
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        id="hamburger-button"
        onClick={toggleSidebar}
        className="fixed top-23 left-4 z-[60] md:hidden p-2 text-gray-600 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200
"
        aria-label="Toggle sidebar"
      >
        <motion.div
          variants={hamburgerVariants}
          animate={isSidebarOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </motion.div>
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-[45]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            id="logo-sidebar"
            className={`fixed ${
              isMobile ? 'top-35' : 'top-23'
            } left-0 z-[50] w-64 h-128 lg:h-screen transition-transform ${
              isMobile ? '' : 'md:translate-x-0'
            } `}
            aria-label="Sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 shadow-lg">
              {/* Mobile header with close button */}
              {isMobile && (
                <div className="flex items-center justify-between mb-4 pt-2">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded z-[60]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <ul className="space-y-2 font-medium">
                <li>
                  <button
                    onClick={toggleCrmMenu}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
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
                      isCrmOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <li>
                      <button
                        onClick={() => setIsCrmListOpen(!isCrmListOpen)}
                        className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
                      >
                        <span className="ms-3">CRM List</span>
                        <svg
                          className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                            isCrmListOpen ? "rotate-180" : ""
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
                          isCrmListOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <li>
                          <button
                            onClick={() => setIsCrmListDropdownOpen(!isCrmListDropdownOpen)}
                            className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
                          >
                            <span className="ms-3">List Options</span>
                            <svg
                              className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                                isCrmListDropdownOpen ? "rotate-180" : ""
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
                            className={`pl-6 mt-2 space-y-1 text-xs text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
                              isCrmListDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <li>
                              <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                ➕ Add List
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                ➕ Add Data
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                ➖ Remove Data
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                📧 Verify Emails
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                📋 Manage Lists
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        CRM Template
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Email CRM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        WhatsApp CRM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        SMS CRM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Calls CRM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Social CRM
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Unified CRM
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="space-y-2 font-medium mt-4">
                <li>
                  <button
                    onClick={toggleToolsMenu}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
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
                      isToolsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Tool 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Tool 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Tool 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="space-y-2 font-medium mt-4">
                <li>
                  <button
                    onClick={toggleServiceMenu}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
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
                      isServiceOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Service 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Service 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Service 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="space-y-2 font-medium mt-4">
                <li>
                  <button
                    onClick={toggleMartMenu}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
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
                      isMartOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Mart 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Mart 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Mart 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="space-y-2 font-medium mt-4">
                <li>
                  <button
                    onClick={toggleLoginMenu}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
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
                      isLoginOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Login 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Login 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                        Login 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;