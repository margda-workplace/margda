"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignIn from "../components/signIn";
import Navbar from "../components/navbar";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const navItems = [
    { label: "CRM", icon: "crm-rmvd-bg.gif",href: "/smart-tools" },
    { label: "Smart Tools", icon: "service-tools-rmvd-bg.gif",href: "/smart-tools" },
    { label: "Service Exchange", icon: "briefcase-rmvd-bg.gif",href: "/smart-tools" },
    { label: "Mart Seva", icon: "shopping-cart-rmvd-bg.gif",href: "/smart-tools" },
    { label: "Login", icon: "login-rmvd-bg.gif",href: "/login" },
  ];
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", loginData);
  };

  return (<>
  <Navbar navItems={navItems}/>
    <div className="min-h-screen bg-purple-200 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
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
          </div>

          {/* Right Side - Login Form */}
          <SignIn
            handleSubmit={handleSubmit}
            loginData={loginData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>

      {/* Floating Animation Styles */}
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
    </div>
    </>
  );
};

export default Page;
