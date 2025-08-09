"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddList from "../components/addList";
import AddData from "../components/addData";
import RemoveData from "../components/removeData";
import CrmNavbar from "../components/crmNavbar";
import VerifyEmails from "../components/verifyEmails";

const Page = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Track which component to show
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle sidebar state changes
  const handleSidebarStateChange = (isOpen, mobile) => {
    setSidebarCollapsed(!isOpen && !mobile);
    setIsMobile(mobile);
  };

  // Handle component selection from sidebar
  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  // Render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'addList':
        return <AddList sidebarCollapsed={sidebarCollapsed} />;
      case 'addData':
        return <AddData sidebarCollapsed={sidebarCollapsed} />;
      case 'removeData':
        return <RemoveData sidebarCollapsed={sidebarCollapsed} />;
        case 'verifyEmail':
        return <VerifyEmails sidebarCollapsed={sidebarCollapsed}/>
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to CRM</h2>
              <p className="text-gray-500">Select an option from the sidebar to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <CrmNavbar sidebarCollapsed={sidebarCollapsed} />

      {/* Sidebar */}
      <Sidebar
        onAddListClick={() => handleComponentChange('addList')}
        onAddDataClick={() => handleComponentChange('addData')}
        onRemoveDataClick={() => handleComponentChange('removeData')}
        onVerifyEmailsClick = {()=> handleComponentChange('verifyEmail')}
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
        {/* Conditionally render components based on activeComponent state */}
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Page;