"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "../components/signIn";
import Navbar from "../components/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

    const navItems = [
    { label: "CRM", icon: "crm-rmvd-bg.gif", href: "/login" },
    { label: "Smart Tools", icon: "service-tools-rmvd-bg.gif", href: "/login" },
    { label: "Service Exchange", icon: "briefcase-rmvd-bg.gif", href: "/login" },
    { label: "Mart Seva", icon: "shopping-cart-rmvd-bg.gif", href: "/login" },
    
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);

    // Trigger exit animation
    setIsExiting(true);

    // Wait for fade-out before navigating
    setTimeout(() => {
      router.push("/crm/123"); // replace with your tokenized route
    }, 600); // should match exit animation duration
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.8 },
    },
  };

  return (
    <>
      <Navbar navItems={navItems} />

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="login-page"
            className="min-h-screen bg-purple-200 flex flex-col justify-between pt-24 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Main content */}
            <motion.div
              className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12"
              variants={itemVariants}
            >
              <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image Section */}
                  <motion.div
                    className="flex justify-center lg:justify-start order-1 lg:order-1"
                    variants={imageVariants}
                  >
                    <div className="relative">
                      <Image
                        src="/lead-generation-new.png"
                        alt="Workplace Illustration"
                        width={600}
                        height={400}
                        className="w-full max-w-lg h-auto"
                        style={{ animation: "float 3s ease-in-out infinite" }}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Form Section */}
                  <motion.div
                    variants={formVariants}
                    className="order-2 lg:order-2"
                  >
                    <SignIn
                      handleSubmit={handleSubmit}
                      loginData={loginData}
                      handleInputChange={handleInputChange}
                      showPassword={showPassword}
                      agreedToTerms={agreedToTerms}
                      setAgreedToTerms={setAgreedToTerms}
                      setShowPassword={setShowPassword}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.footer className="bg-white" variants={footerVariants}>
              <div className="border-t border-gray-300">
                <div className="flex items-center justify-center h-16 px-4">
                  <p className="text-center text-sm md:text-lg text-gray-600 flex flex-wrap justify-center">
                    <span className="text-blue-600 font-medium">
                      © 2025 Margda Workplace
                    </span>
                    <span className="text-orange-500 ml-1">
                      All rights reserved.
                    </span>
                  </p>
                </div>
              </div>
            </motion.footer>

            <style jsx>{`
              @keyframes float {
                0%,
                100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
