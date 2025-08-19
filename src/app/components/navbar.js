"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-3 flex items-center justify-between ${
          isTop ? "bg-transparent" : "bg-gray-100"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`group flex items-center 
                       ${isTop ? "bg-white" : "bg-transparent"}                       
                       rounded-2xl 
                       px-6 py-3 
                       shadow-lg                       
                       hover:scale-105 
                       hover:shadow-xl
                       hover:-translate-y-1
                       active:scale-100
                       active:translate-y-0
                       transition-all 
                       duration-300 
                       ease-out`}
        >
          <img
            src="/logo.webp"
            alt="Margda Workplace"
            className="h-8 sm:h-10 lg:h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex gap-4">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`group flex items-center gap-2 
             ${isTop ? "bg-white" : "bg-[linear-gradient(to_right,_#284E9E,_#6C17D3)] text-white"}
             rounded-xl 
             px-3 py-2 
             shadow-lg           
              
             hover:scale-105 
             hover:shadow-xl
             hover:-translate-y-1
             active:scale-100
             active:translate-y-0
             transition-all 
             duration-300 
             ease-out
             text-black
             font-medium`}
            >
              <span className="relative h-10 w-10 flex-shrink-0">
                <img src={item.icon} alt={item.label} className="h-10 w-auto" />
              </span>
              <span className="font-bold">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="xl:hidden flex items-center justify-center rounded-lg p-2 hover:bg-white/20 transition bg-gradient-to-l from-blue-500/70 to-blue-400/60
                backdrop-blur-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </motion.nav>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl bg-white transform transition-transform duration-300 ease-in-out z-[9999] xl:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4 h-full bg-white my-4">
          {/* Close Button */}
          <div className="flex justify-end">
            <div className="h-8 sm:h-10 lg:h-12 w-auto">
              <img src="/logo.webp" alt="logo" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center gap-2 
             bg-gradient-to-l from-orange-500/70 to-orange-400/60
             rounded-xl 
             px-3 py-2 
             shadow-lg             
             hover:from-white/30 hover:to-orange-400/40
             hover:scale-105 
             hover:shadow-xl
             hover:-translate-y-1
             active:scale-100
             active:translate-y-0
             transition-all 
             duration-300 
             ease-out
             text-black
             font-medium"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-10 w-10">
                <img src={item.icon} alt={item.label} className="h-10 w-auto" />
              </span>
              <span className="font-bold text-black">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

