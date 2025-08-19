import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {
  Database,
  Users,
  Settings,
  ShoppingCart,
  Headphones,
  Share2,
  Shield,
  Crown,
  User,
  Award,
  Mail,
  Grid3X3,
  Gift,
  LogOut,
  Menu,
  LayoutDashboard
} from 'lucide-react';

const CrmNavbar = ({ sidebarCollapsed, onToggleSidebar, onProfileClick, onAddDataClick, onDashboardClick }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((s) => !s);
    setIsNavDropdownOpen(false);
  };

  const toggleNavDropdown = () => {
    setIsNavDropdownOpen((s) => !s);
    setIsUserDropdownOpen(false);
  };

  const navItems = [
    {icon: LayoutDashboard , label:"Dashboard",  onClick: () => {onDashboardClick()}},
    { icon: Database, label: "Data", onClick: ()=>{onAddDataClick()}},
    { icon: Users, label: "Lead", onClick: ()=>{} },
    { icon: Settings, label: "Service", onClick: ()=>{}},
    { icon: ShoppingCart, label: "Mart", onClick: ()=>{} },
    { icon: Headphones, label: "Team-Support", onClick: ()=>{}  }
  ];

  const navClass = `fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm py-3 sm:py-3 transition-all duration-300`;

  return (
    <nav className={navClass}>
      <div className={`flex items-center justify-between h-16 px-4 md:px-6 transition-all duration-300
        ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        
        {/* Hamburger menu for small screens */}
        <div className="flex items-center md:hidden">
          <button
            onClick={onToggleSidebar}
            className="p-2 mr-2 text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-start min-w-0">
          {/* Desktop Navigation - Hidden on mobile, adjusted for tablet */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
              />
            ))}
          </div>
        </div>

        {/* Right side - Mobile Nav Menu Button + User Profile */}
        <div className="flex items-center space-x-3">
          {/* Mobile Navigation Menu Button */}
          {isMobile && (
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                onClick={toggleNavDropdown}
                aria-expanded={isNavDropdownOpen}
                aria-controls="mobile-nav-dropdown"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile Navigation Dropdown */}
              <div
                id="mobile-nav-dropdown"
                className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-70 transition-all duration-200 transform origin-top ${
                  isNavDropdownOpen
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className={`transition-opacity duration-200 ${isNavDropdownOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Navigation</h3>
                  </div>

                  <div className="py-2">
                    {navItems.map((item) => (
                      <MobileNavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        isActive={item.isActive}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer group shadow-sm"
              onClick={toggleUserDropdown}
              aria-expanded={isUserDropdownOpen}
              aria-controls="user-dropdown"
            >
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-500 font-semibold text-sm">D</span>
              </div>
              <span className="text-white font-medium text-sm hidden">Debarghya</span>
              <svg
                className={`w-4 h-4 text-white transition-all duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* User Dropdown Menu */}
            <div
              id="user-dropdown"
              className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-70 transition-all duration-200 transform origin-top ${
                isUserDropdownOpen
                  ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className={`transition-opacity duration-200 ${isUserDropdownOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">D</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Debarghya</div>
                      <div className="text-sm text-gray-500">secdeba@gmail.com</div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <DropdownItem icon={Share2} iconColor="text-pink-500" label="Data Share" />
                  <DropdownItem icon={Shield} iconColor="text-orange-500" label="Authorisation" />
                  <DropdownItem icon={Crown} iconColor="text-yellow-500" label="Knowledge Royalty" />
                  <DropdownItem icon={User} iconColor="text-purple-500" label="Profile" onClick={onProfileClick} />
                  <DropdownItem icon={Award} iconColor="text-amber-500" label="Credential" />
                  <DropdownItem icon={Mail} iconColor="text-blue-400" label="Email App Password" />
                  <DropdownItem icon={Grid3X3} iconColor="text-gray-600" label="WhatsApp Scan" />
                  <DropdownItem icon={Gift} iconColor="text-indigo-400" label="Refer Code DOELN" />
                  <div className="border-t border-gray-100 my-2" />
                  <Link href='/login'><DropdownItem icon={LogOut} iconColor="text-red-500" label="Logout" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon: Icon, label, isActive = false, onClick }) => {
  if (isActive) {
    return (
      <button className="flex items-center space-x-2 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-sm border border-orange-500" onClick={onClick}>
        <Icon className="w-4 h-4" />
        <span className="font-medium text-sm hidden lg:block">{label}</span>
      </button>
    );
  }

  return (
    <button className="group flex items-center space-x-2 bg-transparent hover:bg-orange-500 px-3 py-2 rounded-lg transition-all duration-200" onClick={onClick}>
      <Icon className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
      <span className="text-gray-700 group-hover:text-gray-900 font-medium text-sm hidden lg:block">
        {label}
      </span>
    </button>
  );
};

const DropdownItem = ({ icon: Icon, iconColor, label, onClick }) => (
  <div
    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
    onClick={onClick}
  >
    <Icon className={`w-4 h-4 ${iconColor}`} />
    <span className="text-gray-700 text-sm font-medium">{label}</span>
  </div>
);

const MobileNavItem = ({ icon: Icon, label, isActive = false }) => (
  <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-gray-600'}`} />
    <span className={`text-sm font-medium ${isActive ? 'text-orange-500' : 'text-gray-700'}`}>{label}</span>
    {isActive && <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />}
  </div>
);

export default CrmNavbar;
