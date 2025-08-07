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
      <Sidebar/>
      {/* form and dataTable */}
      <section className="w-max max-w-full bg-gray-100/20 overflow-x-hidden flex items-center justify-center mt-25 lg:mt-40 mx-auto  px-4 sm:px-2">
  <div className="w-max h-auto bg-grey-200 p-4 rounded">

    <AddList />
  </div>
</section>    
      
    </>
  );
};

export default page;
