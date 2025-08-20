"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import AddList from "@/app/components/addList";
import AddData from "@/app/components/addData";
import RemoveData from "@/app/components/removeData";
import CrmNavbar from "@/app/components/crmNavbar";
import VerifyEmails from "@/app/components/verifyEmails";
import CompleteProfile from "@/app/components/completeProfile";
import ManageLists from "@/app/components/manageLists";
import DataExtractor from "@/app/components/dataExtractor";
import EmailTemplate from "@/app/components/emailTemplate";
import Dashboard from "@/app/components/dashboard";


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
      case "addList":
        return (
          <AddList
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );

      case "addData":
        return (
          <AddData
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "removeData":
        return (
          <RemoveData
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "verifyEmail":
        return (
          <VerifyEmails
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "manageLists":
        return (
          <ManageLists
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "dataExtractor":
        return (
          <DataExtractor
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "emailTemplate":
        return (
          <EmailTemplate
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onRemoveDataClick={() => handleComponentChange("removeData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
            onManageListsClick={() => handleComponentChange("manageLists")}
            onDataExtractorClick={() => handleComponentChange("dataExtractor")}
          />
        );
      case "updateProfile":
        return <CompleteProfile sidebarCollapsed={sidebarCollapsed} />;
      case "dashboard":
        return (
          <Dashboard
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
          />
        );
      default:
        return (          
          <Dashboard
            sidebarCollapsed={sidebarCollapsed}
            onAddListClick={() => handleComponentChange("addList")}
            onAddDataClick={() => handleComponentChange("addData")}
            onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <CrmNavbar
        onProfileClick={() => handleComponentChange("updateProfile")}
        onAddDataClick={() => handleComponentChange("addData")}
        sidebarCollapsed={sidebarCollapsed}
        onDashboardClick ={()=>handleComponentChange("dashboard")}
      />

      {/* Sidebar */}
      <Sidebar
        onAddListClick={() => handleComponentChange("addList")}
        onAddDataClick={() => handleComponentChange("addData")}
        onRemoveDataClick={() => handleComponentChange("removeData")}
        onVerifyEmailsClick={() => handleComponentChange("verifyEmail")}
        onManageListsClick={() => handleComponentChange("manageLists")}
        onDataExtractorClick={() => handleComponentChange("dataExtractor")}
        onEmailTemplateClick={() => handleComponentChange("emailTemplate")}
        onLogoClick={() => handleComponentChange("dashboard")}
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
