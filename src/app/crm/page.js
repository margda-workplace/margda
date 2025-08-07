import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddList from "../components/addList";



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
      {/* form and dataTable */}
      <section className="w-screen h-auto flex justify-center items-center mx-30 mt-25 bg-gray-100">
        <AddList/>
      </section>
      
        <Sidebar/>
      
      
      
      
    </>
  );
};

export default page;
