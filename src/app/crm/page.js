"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddList from "../components/addList";
import AddData from "../components/addData";
import RemoveData from "../components/removeData";

const Page = () => {
  const [showAddList, setShowAddList] = useState(false);

  const navItems = [
    { label: "CRM", icon: "service-tools-rmvd-bg.gif" },
    { label: "Tools", icon: "briefcase-rmvd-bg.gif" },
    { label: "Service", icon: "shopping-cart-rmvd-bg.gif" },
    { label: "Mart", icon: "shopping-cart-rmvd-bg.gif" },
    { label: "Login", icon: "login-rmvd-bg.gif" },
  ];

  return (
    <>
      <nav>
        <Navbar navItems={navItems} />
      </nav>
      <Sidebar onAddListClick={() => setShowAddList(true)} />

      {/* Only render AddList if showAddList is true */}
      {showAddList && <AddList />}
      {/* <AddData/> */}
      <RemoveData/>
    </>
  );
};

export default Page;
