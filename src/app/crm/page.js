"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddList from "../components/addList";
import AddData from "../components/addData";
import RemoveData from "../components/removeData";
import CrmNavbar from "../components/crmNavbar";

const Page = () => {
  const [showAddList, setShowAddList] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle sidebar state changes
  const handleSidebarStateChange = (isOpen, mobile) => {
    setSidebarCollapsed(!isOpen && !mobile);
    setIsMobile(mobile);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <CrmNavbar sidebarCollapsed={sidebarCollapsed} />

      {/* Sidebar */}
      <Sidebar
        onAddListClick={() => setShowAddList(true)}
        onSidebarStateChange={handleSidebarStateChange}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isMobile
            ? "ml-0" // Mobile view: sidebar overlays, so no margin
            : sidebarCollapsed
            ? "ml-0 md:ml-20" // Collapsed sidebar on tablet/desktop
            : "ml-0 md:ml-64" // Expanded sidebar on tablet/desktop
        }`}
        style={{ paddingTop: "80px" }} // Account for fixed navbar
      >
        {/* Only render AddList if showAddList is true */}
        {showAddList && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative">
              <AddList onClose={() => setShowAddList(false)} />
            </div>
          </div>
        )}

        <RemoveData sidebarCollapsed={sidebarCollapsed} />
      </main>
    </div>
  );
};

export default Page;
