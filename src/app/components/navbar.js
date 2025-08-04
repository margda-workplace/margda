"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-3 flex items-center justify-between  bg-white/10 backdrop-blur-sm">
        {/* Logo Button */}
        <button className="group flex items-center bg-white border border-white/30 rounded-2xl px-3 py-2 shadow-sm backdrop-blur-md hover:scale-105 hover:shadow-lg transition-all duration-300 mx-3">
          <img
            src="/logo.webp"
            alt="Margda Workplace"
            className="h-8 sm:h-10 lg:h-12 w-auto"
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden xl:flex gap-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="group flex items-center gap-2 bg-white border border-white/30 rounded-xl px-3 py-2 shadow-sm transition hover:scale-105 hover:shadow-lg duration-300"
            >
              <span className="relative h-10 w-10 flex-shrink-0">
                <img src={item.icon} alt={item.label} className="h-10 w-auto" />
              </span>
              <span className="font-bold">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="xl:hidden flex items-center justify-center rounded-lg p-2 hover:bg-white/20 transition bg-orange-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>

      {/* SIDEBAR - moved outside nav */}
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl bg-white transform transition-transform duration-300 ease-in-out z-[9999] xl:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4 h-full bg-white my-4">
          {/* Close Button */}
          <div className="flex justify-end">
            <div className="h-8 sm:h-10 lg:h-12 w-auto">
              <img src="/logo.webp"></img>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3 shadow-sm bg-white hover:scale-105 hover:shadow-lg transition-all duration-300 my-4"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-10 w-10">
                <img src={item.icon} alt={item.label} className="h-10 w-auto" />
              </span>
              <span className="font-bold text-black">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// Menu items
const menuItems = [
  { label: "Smart Tools", icon: "service-tools.gif" },
  { label: "Service Exchange", icon: "briefcase.gif" },
  { label: "Mart Seva", icon: "shopping-cart.gif" },
  { label: "Login", icon: "login.gif" },
];
