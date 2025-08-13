"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Database,
  Briefcase,
  Wallet,
  CreditCard,
  TrendingUp,
  PlusCircle,
  Calendar,
  Share2,
  Lock,
  Crown,
  Key,
  Mail,
  QrCode,
  Gift,
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import ManageLists from "./manageLists";

const Sidebar = ({
  onAddListClick,
  onAddDataClick,
  onRemoveDataClick,
  onVerifyEmailsClick,
  onManageListsClick,
  onDataExtractorClick,
  onEmailTemplateClick,
  onSidebarStateChange,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1025;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (onSidebarStateChange) {
      onSidebarStateChange(isSidebarOpen, isMobile);
    }
  }, [isSidebarOpen, isMobile, onSidebarStateChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        !event.target.closest("#logo-sidebar") &&
        !event.target.closest("#sidebar-toggle-btn") &&
        !event.target.closest("#mobile-hamburger-btn") &&
        !event.target.closest("#mobile-close-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menu)) {
        // Close this menu and all its children
        const menusToClose = Array.from(newSet).filter((m) =>
          m.startsWith(menu)
        );
        menusToClose.forEach((m) => newSet.delete(m));
      } else {
        // Open this menu
        newSet.add(menu);
      }
      return newSet;
    });
  };

  const sidebarVariants = {
    hidden: { x: isMobile ? -320 : -80, opacity: isMobile ? 0 : 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const menuItems = [
    {
      title: "CRM",
      icon: Briefcase,
      children: [
        {
          title: "Contact List",
          children: [
            { title: "➕ Add List", action: onAddListClick },
            { title: "➕ Data Extractor", action: onDataExtractorClick },
            { title: "➕ Add Data", action: onAddDataClick },
            { title: "➖ Remove Data", action: onRemoveDataClick },
            { title: "📧 Verify Emails", action: onVerifyEmailsClick },
            { title: "📋 Manage Lists", action: onManageListsClick },
          ],
        },
        { title: "Message Template",
          icon: "",
          children:[
            {title: "📧 Email Template", action: onEmailTemplateClick},
            {title: "📋 A/B Test", action:""}
          ]
         },
        { title: "Settings" },
        { title: "Unified CRM" },
        { title: "Reports" },
      ],
    },
    {
      title: "Tools",
      icon: Key,
      children: [{ title: "Tool 1" }, { title: "Tool 2" }, { title: "Tool 3" }],
    },
    {
      title: "Service",
      icon: Crown,
      children: [
        { title: "Service 1" },
        { title: "Service 2" },
        { title: "Service 3" },
      ],
    },
    {
      title: "Mart",
      icon: Wallet,
      children: [{ title: "Mart 1" }, { title: "Mart 2" }, { title: "Mart 3" }],
    },
    {
      title: "Login",
      icon: Lock,
      children: [
        { title: "Login 1" },
        { title: "Login 2" },
        { title: "Login 3" },
      ],
    },
  ];

  const handleMenuClick = (e, key, hasChildren, action) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasChildren) {
      toggleMenu(key);
    } else if (action) {
      action();
    }
  };

  const renderMenu = (items, parentKey = "", level = 0) =>
    items.map((item, index) => {
      const key = `${parentKey}${item.title}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const Icon = item.icon;
      const isOpen = openMenus.has(key);

      return (
        <li key={key} className="w-full">
          <button
            type="button"
            onClick={(e) => handleMenuClick(e, key, hasChildren, item.action)}
            className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 group relative ${
              level > 0 ? "text-sm" : ""
            }`}
          >
            {Icon && <Icon className="w-5 h-5 text-blue-500" />}
            {isSidebarOpen && (
              <>
                <span
                  className={`flex-1 text-left ${
                    Icon ? "ml-3" : level > 0 ? "ml-4" : ""
                  }`}
                >
                  {item.title}
                </span>
                {hasChildren && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </>
            )}
            {!isSidebarOpen && (
              <span className="absolute left-12 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {item.title}
              </span>
            )}
          </button>
          {hasChildren && isSidebarOpen && isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`mt-1 space-y-1 overflow-hidden ${
                level === 0 ? "pl-6" : "pl-8"
              }`}
            >
              {renderMenu(item.children, `${key}-`, level + 1)}
            </motion.ul>
          )}
        </li>
      );
    });

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && !isSidebarOpen && (
        <button
          id="mobile-hamburger-btn"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-[60] p-2 rounded-md bg-white shadow-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile Overlay */}
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
            className={`fixed top-0 left-0 z-[100] h-screen bg-white shadow-lg
    ${isSidebarOpen ? "w-64" : isMobile ? "w-0" : "md:w-0 lg:w-20"} 
    transition-all duration-300`}
            aria-label="Sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="h-full overflow-y-auto space-y-4 pt-6">
              {/* Logo + Toggle Button */}
              <div className="flex items-center justify-between px-3 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {isSidebarOpen ? (
                    <img
                      src="/logo.webp"
                      alt="Margda Logo"
                      className="h-8 w-auto"
                    />
                  ) : (
                    ""
                  )}
                </div>
                {/* Close button for mobile */}
                {isMobile && isSidebarOpen ? (
                  <button
                    id="mobile-close-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={20} />
                  </button>
                ) : (
                  <button
                    id="sidebar-toggle-btn"
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {isSidebarOpen ? (
                      <ChevronLeft size={20} />
                    ) : (
                      <Menu size={20} />
                    )}
                  </button>
                )}
              </div>

              {/* Account Info */}
              {isSidebarOpen && (
                <div className="bg-white px-4 py-3 rounded-lg shadow space-y-2 text-sm">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
                    Messages: 0
                  </div>
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-2 text-purple-500" />
                    Data: ₹0
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-yellow-500" />
                    Business: ₹0
                  </div>
                  <div className="flex items-center">
                    <Wallet className="w-4 h-4 mr-2 text-orange-500" />
                    Wallet: ₹0.00
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-pink-500" />
                    Account: ₹0.00
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    Income: ₹0.00
                  </div>
                  <div className="flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2 text-indigo-500" />
                    Recharge: ₹0.00
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    Validity: 9/8/2025
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bg-white p-4 rounded-lg shadow">
                <ul className="space-y-1 text-sm">
                  {[
                    {
                      icon: Share2,
                      color: "text-blue-500",
                      title: "Data Share",
                    },
                    {
                      icon: Lock,
                      color: "text-red-500",
                      title: "Authorisation",
                    },
                    {
                      icon: Crown,
                      color: "text-yellow-500",
                      title: "Knowledge Royalty",
                    },
                    {
                      icon: Key,
                      color: "text-purple-500",
                      title: "Credential",
                    },
                    {
                      icon: Mail,
                      color: "text-green-500",
                      title: "Email App Password",
                    },
                    {
                      icon: QrCode,
                      color: "text-indigo-500",
                      title: "WhatsApp Scan",
                    },
                    {
                      icon: Gift,
                      color: "text-pink-500",
                      title: "Refer Code DOELN",
                    },
                  ].map(({ icon: Icon, color, title }) => (
                    <li
                      key={title}
                      className="flex items-center p-2 hover:bg-gray-100 rounded group relative"
                    >
                      <Icon className={`w-4 h-4 ${color}`} />
                      {isSidebarOpen && <span className="ml-2">{title}</span>}
                      {!isSidebarOpen && (
                        <span className="absolute left-12 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                          {title}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Menu */}
              <div className="bg-white p-4 rounded-lg shadow">
                <ul className="space-y-1 text-sm">
                  {renderMenu(menuItems, "", 0)}
                </ul>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
