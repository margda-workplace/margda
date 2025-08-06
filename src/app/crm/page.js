import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";


const page = () => {
  const navItems = [
    { label: "CRM", icon: "service-tools-rmvd-bg.gif" },
    { label: "Tools", icon: "briefcase-rmvd-bg.gif" },
    { label: "Service", icon: "shopping-cart-rmvd-bg.gif" },
    { label: "Mart", icon: "login-rmvd-bg.gif" },
    { label: "Login", icon: "login-rmvd-bg.gif" },
  ];

  return (
    <>
      <nav>
        <Navbar navItems={navItems} />
      </nav>
      <div className="container">
        <Sidebar/>
      </div>
      
      
      
    </>
  );
};

export default page;
