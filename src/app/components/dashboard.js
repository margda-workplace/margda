"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  SquareCheckBig,
  Search,
  ChevronLeft,
  ChevronRight,
  Upload,
  User,
  Info,
  Calendar,
  MapPin,
  List,
  GraduationCap,
  Briefcase,
  Paperclip,
  ScrollText,
  MessageSquare,
  Clock,
  ThumbsUp,
  Award,
  CircleDot,
  Check,
  Eye,
  Pencil,
  FileText,
  Clock1,
  UserRound,
  Users,
  Settings,
  MoreVertical,
  CircleArrowUp,
  FileBadge,
  FileDigit,
  Star,
  BookA,
  BookText,
  FileAudio,
  ClipboardList,
  Database,
  Share,
  Crown,
  ShieldCheck,
  AlertCircle,
  X,
  Globe,
  Tag,
} from "lucide-react";
import MyProfileSection from "./myProfile";
import MainDashboard from "./mainDashboard";
import CampaignDashboard from "./campaignDashboard";


const Dashboard = ({onAddListClick, onAddDataClick, onVerifyEmailsClick}) => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userManagementTab, setUserManagementTab] = useState("hierarchy");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUserForPermission, setSelectedUserForPermission] =
    useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "in",
    code: "+91",
    name: "India",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { flag: "in", code: "+91", name: "India" },
    { flag: "us", code: "+1", name: "United States" },
    { flag: "gb", code: "+44", name: "United Kingdom" },
    { flag: "ca", code: "+1", name: "Canada" },
    { flag: "au", code: "+61", name: "Australia" },
    { flag: "de", code: "+49", name: "Germany" },
    { flag: "fr", code: "+33", name: "France" },
    { flag: "jp", code: "+81", name: "Japan" },
    { flag: "cn", code: "+86", name: "China" },
    { flag: "br", code: "+55", name: "Brazil" },
    { flag: "sg", code: "+65", name: "Singapore" },
    { flag: "ae", code: "+971", name: "UAE" },
    { flag: "sa", code: "+966", name: "Saudi Arabia" },
    { flag: "za", code: "+27", name: "South Africa" },
    { flag: "ru", code: "+7", name: "Russia" },
  ];

  useEffect(() => setMounted(true), []);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [tableData, setTableData] = useState([
    {
      selected: false,
      action: {
        view: true,
        edit: true,
        source: "N/A",
        score: "N/A",
        cTask: true,
        cLead: true,
        sData: true,
        sLog: true,
      },
      data: {
        name: "Debarghya",
        whatsApp: "9190***********",
        mobile: "9190***********",
        email: "sesde**********.com",
        dataType: "Work Seeker",
        task: "N/A",
        user: "U",
      },
      location: {
        country: "N/A",
        state: "N/A",
        district: "N/A",
        pinCode: "N/A",
        place: "N/A",
      },
      details: {
        dob: "N/A",
        profession: "N/A",
        institute: "N/A",
        skills: "N/A",
        cvBio: "N/A",
      },
      status: {
        profile: "N/A",
        skillsTest: "N/A",
        qualification: "N/A",
        communication: "N/A",
        interview: "N/A",
        documents: "N/A",
        loi: "N/A",
      },
      logs: {
        followUpDate: "N/A",
        lateDays: 0,
        timeline: "N/A",
        remarks: "N/A",
      },
    },
    {
      selected: false,
      action: {
        view: true,
        edit: true,
        source: "LinkedIn",
        score: "85%",
        cTask: true,
        cLead: true,
        sData: true,
        sLog: true,
      },
      data: {
        name: "Ananya Sharma",
        whatsApp: "9187***********",
        mobile: "9187***********",
        email: "ananya**********.com",
        dataType: "Job Seeker",
        task: "Interview Scheduled",
        user: "A",
      },
      location: {
        country: "India",
        state: "Delhi",
        district: "New Delhi",
        pinCode: "110001",
        place: "Connaught Place",
      },
      details: {
        dob: "1995-03-14",
        profession: "Software Engineer",
        institute: "IIT Delhi",
        skills: "JavaScript, React, Node.js",
        cvBio: "Experienced full-stack developer.",
      },
      status: {
        profile: "Complete",
        skillsTest: "Passed",
        qualification: "B.Tech",
        communication: "Excellent",
        interview: "Pending",
        documents: "Verified",
        loi: "Pending",
      },
      logs: {
        followUpDate: "2025-08-20",
        lateDays: 0,
        timeline: "Active",
        remarks: "Very strong candidate",
      },
    },
    {
      selected: false,
      action: {
        view: true,
        edit: true,
        source: "Referral",
        score: "78%",
        cTask: true,
        cLead: true,
        sData: true,
        sLog: true,
      },
      data: {
        name: "Rohit Verma",
        whatsApp: "9170***********",
        mobile: "9170***********",
        email: "rohit**********.com",
        dataType: "Internship Seeker",
        task: "Task Assigned",
        user: "R",
      },
      location: {
        country: "India",
        state: "Maharashtra",
        district: "Mumbai",
        pinCode: "400001",
        place: "Churchgate",
      },
      details: {
        dob: "2000-11-22",
        profession: "Student",
        institute: "Mumbai University",
        skills: "Python, Data Analysis",
        cvBio: "Looking for internship in Data Science.",
      },
      status: {
        profile: "Incomplete",
        skillsTest: "Pending",
        qualification: "B.Sc IT",
        communication: "Good",
        interview: "N/A",
        documents: "Pending",
        loi: "N/A",
      },
      logs: {
        followUpDate: "2025-08-18",
        lateDays: 2,
        timeline: "Pending",
        remarks: "Waiting for assignment submission",
      },
    },
    {
      selected: false,
      action: {
        view: true,
        edit: true,
        source: "Website",
        score: "92%",
        cTask: true,
        cLead: true,
        sData: true,
        sLog: true,
      },
      data: {
        name: "Meera Iyer",
        whatsApp: "9168***********",
        mobile: "9168***********",
        email: "meera**********.com",
        dataType: "Work Seeker",
        task: "Offer Sent",
        user: "M",
      },
      location: {
        country: "India",
        state: "Karnataka",
        district: "Bengaluru",
        pinCode: "560001",
        place: "MG Road",
      },
      details: {
        dob: "1992-07-09",
        profession: "UX Designer",
        institute: "NID Ahmedabad",
        skills: "UI/UX, Figma, Prototyping",
        cvBio: "Creative designer with 5 years of experience.",
      },
      status: {
        profile: "Complete",
        skillsTest: "Passed",
        qualification: "M.Des",
        communication: "Excellent",
        interview: "Cleared",
        documents: "Verified",
        loi: "Sent",
      },
      logs: {
        followUpDate: "2025-08-15",
        lateDays: 0,
        timeline: "Hired",
        remarks: "Joining next month",
      },
    },
  ]);

  const [userHierarchyData] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Super Admin",
      status: "Active",
      permissions: ["all"],
      canManage: ["Team Admin", "User"],
      dataCount: 0,
      lastLogin: "2025-01-14 10:30 AM",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Team Admin",
      status: "Active",
      permissions: ["user_management", "data_view", "reports"],
      canManage: ["User"],
      dataCount: 0,
      lastLogin: "2025-01-14 09:15 AM",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@company.com",
      role: "User",
      status: "Active",
      permissions: ["data_entry", "data_view"],
      canManage: [],
      dataCount: 247,
      lastLogin: "2025-01-14 08:45 AM",
    },
  ]);

  const [masterTablesData] = useState([
    {
      id: 1,
      tableName: "Skills Database",
      addedBy: "Mike Wilson",
      records: 125,
      status: "Pending",
      dateAdded: "2025-01-14",
      duplicatesAllowed: true,
    },
    {
      id: 2,
      tableName: "Industry Categories",
      addedBy: "Sarah Johnson",
      records: 87,
      status: "Approved",
      dateAdded: "2025-01-13",
      duplicatesAllowed: true,
    },
    {
      id: 3,
      tableName: "Job Titles",
      addedBy: "Mike Wilson",
      records: 203,
      status: "Approved",
      dateAdded: "2025-01-12",
      duplicatesAllowed: true,
    },
  ]);

  const profile = {
    profilePicture: null,
    name: "N/A",
    gender: "N/A",
    mobile: "N/A",
    email: "N/A",
    dob: "N/A",
    country: "N/A",
    state: "N/A",
    district: "N/A",
    pinCode: "N/A",
    place: "N/A",
    languages: "N/A",
    referId: "N/A",
  };

  const itemsPerPage = show;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleCheckboxChange = (index) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      const globalIndex = startIndex + index;
      newData[globalIndex] = {
        ...newData[globalIndex],
        selected: !newData[globalIndex].selected,
      };
      return newData;
    });
  };

  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);

  const calculateMenuPosition = (buttonRect) => {
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const menuHeight = menuRef.current?.offsetHeight || 300; // Estimated height
    const menuWidth = menuRef.current?.offsetWidth || 192; // min-width is 12rem

    let top = buttonRect.bottom;
    let left = buttonRect.left;

    // Adjust position if it goes off-screen
    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      top = buttonRect.top - menuHeight;
    }

    if (left + menuWidth > window.innerWidth) {
      left = window.innerWidth - menuWidth - 16; // 16px for padding
    }

    setMenuPosition({ top, left });
  };

  const handleMenuToggle = (row, index) => {
    if (openMenu && openMenu.row.data.name === row.data.name) {
      setOpenMenu(null);
    } else {
      const buttonRect = buttonRefs.current[index]?.getBoundingClientRect();
      if (buttonRect) {
        calculateMenuPosition(buttonRect);
        setOpenMenu({ row, index });
      }
    }
  };

  // Re-calculate menu position on scroll or resize
  useEffect(() => {
    if (openMenu) {
      const handleScrollOrResize = () => {
        const buttonRect =
          buttonRefs.current[openMenu.index]?.getBoundingClientRect();
        if (buttonRect) {
          calculateMenuPosition(buttonRect);
        }
      };
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true);
        window.removeEventListener("resize", handleScrollOrResize);
      };
    }
  }, [openMenu]);

  useEffect(() => {
    setMounted(true);
    const closeMenus = (event) => {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
    };
  }, [openMenu]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="flex-grow px-4 sm:px-6 py-10">
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={variants}
          className="max-w-full mx-auto space-y-8"
        >
          {/* ProfileSection */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 space-y-4">
            <MyProfileSection profile={profile} />
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users size={24} className="text-purple-500" />
                User Management
              </h2>
            </div>

            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { key: "hierarchy", label: "Role Hierarchy", icon: Crown },
                  { key: "masters", label: "Master Tables", icon: Database },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setUserManagementTab(tab.key)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      userManagementTab === tab.key
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {userManagementTab === "hierarchy" && (
              <div className="space-y-6">
                {/* Hierarchy Info */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <Crown size={16} />
                    Access Control Hierarchy
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Crown size={16} className="text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-purple-700">
                          Super Admin
                        </div>
                        <div className="text-purple-600">
                          Gives feature access permissions to Team Admin and
                          Users
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={16} className="text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-700">
                          Team Admin
                        </div>
                        <div className="text-blue-600">
                          Gives feature access permissions (given by Super
                          Admin) to Users
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User size={16} className="text-green-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-green-700">User</div>
                        <div className="text-green-600">
                          Unique Data → Duplicates allowed → Added/Uploaded by
                          the Users
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                      <tr>
                        <th className="p-4 text-left">User Details</th>
                        <th className="p-4 text-left">Role & Access</th>
                        <th className="p-4 text-left">Data Contribution</th>
                        <th className="p-4 text-left">Last Activity</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {userHierarchyData.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                {user.role === "Super Admin" && (
                                  <Crown
                                    size={16}
                                    className="text-purple-500"
                                  />
                                )}
                                {user.role === "Team Admin" && (
                                  <ShieldCheck
                                    size={16}
                                    className="text-blue-500"
                                  />
                                )}
                                {user.role === "User" && (
                                  <User size={16} className="text-green-500" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-gray-500 text-xs">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.role === "Super Admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : user.role === "Team Admin"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {user.role}
                              </span>
                              {user.canManage.length > 0 && (
                                <div className="text-xs text-gray-600">
                                  Can manage: {user.canManage.join(", ")}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Database size={16} className="text-gray-500" />
                              <span className="font-medium">
                                {user.dataCount}
                              </span>
                              <span className="text-gray-500 text-xs">
                                records
                              </span>
                            </div>
                            {user.role === "User" && (
                              <div className="text-xs text-green-600 mt-1">
                                ✓ Duplicates allowed
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock size={14} />
                              <span className="text-xs">{user.lastLogin}</span>
                            </div>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedUserForPermission(user);
                                  setShowPermissionModal(true);
                                }}
                                className="bg-purple-100 text-purple-600 p-2 rounded-full hover:bg-purple-200 transition-colors"
                                title="Manage Permissions"
                              >
                                <Settings size={16} />
                              </button>
                              <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors">
                                <Eye size={16} />
                              </button>
                              <button className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors">
                                <Pencil size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {userManagementTab === "masters" && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Database size={16} />
                    Master Tables Management
                  </h4>
                  <p className="text-sm text-blue-700">
                    Users can add master table records. Admin will moderate
                    submissions. Duplicates are allowed for all user entries.
                  </p>
                </div>

                {/* Master Tables */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                      <tr>
                        <th className="p-4 text-left">Table Details</th>
                        <th className="p-4 text-left">Contributor</th>
                        <th className="p-4 text-left">Records</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Date Added</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {masterTablesData.map((table, index) => (
                        <tr key={table.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Database size={16} className="text-blue-500" />
                              <div>
                                <div className="font-medium">
                                  {table.tableName}
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                  ✓ Duplicates allowed
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-500" />
                              <span>{table.addedBy}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{table.records}</span>
                            <span className="text-gray-500 text-xs ml-1">
                              entries
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                table.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : table.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {table.status}
                            </span>
                            {table.status === "Pending" && (
                              <div className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                <AlertCircle size={12} />
                                Needs moderation
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {table.dateAdded}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors">
                                <Eye size={16} />
                              </button>
                              {table.status === "Pending" && (
                                <button className="bg-yellow-100 text-yellow-600 p-2 rounded-full hover:bg-yellow-200 transition-colors">
                                  <Check size={16} />
                                </button>
                              )}
                              <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors">
                                <Pencil size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Actions and Filters */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Hand Side (LHS) - Filters */}

            {/* Center Section - Main Dashboard Content */}
            <div className="w-full  space-y-8 relative">
              {/* Top Header with Action Buttons */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center" onClick={onAddDataClick}>
                    <UserPlus size={16} /> Add Data
                  </button>
                  <button className="bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center" onClick={onAddListClick}>
                    <Mail size={16} /> Campaign
                  </button>
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    <Phone size={16} /> Call
                  </button>
                  <button className="bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    <MessageCircle size={16} /> WhatsApp
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-800 rounded-lg px-4 sm:px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors w-full sm:w-auto flex items-center gap-2 justify-center" onClick={onVerifyEmailsClick}>
                    <Mail size={16} className="text-gray-500" />
                    Email
                  </button>
                  <button className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    RCM
                  </button>
                  <button className="bg-purple-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-purple-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    Meet
                  </button>
                  <button className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    Visit
                  </button>
                  <button className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center">
                    <FileText size={16} /> Work Report
                  </button>
                </div>
              </div>

              {/* Table Controls */}
              <MainDashboard
                show={show}
                search={search}
                motion={motion}
                setShow={setShow}
                currentData={currentData}
                currentPage={currentPage}
                setSearch={setSearch}
                openMenu={openMenu}
                tableData={tableData}
                startIndex={startIndex}
                itemsPerPage={itemsPerPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                totalPages={totalPages}
                buttonRefs={buttonRefs}
                handleMenuToggle={handleMenuToggle}
                menuRef={menuRef}
                menuPosition={menuPosition}
                
              />

              {/* <CampaignDashboard
                show={show}
                search={search}
                motion={motion}
                currentData={currentData}
                currentPage={currentPage}
                openMenu={openMenu}
                tableData={tableData}
                startIndex={startIndex}
                itemsPerPage={itemsPerPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                totalPages={totalPages}
                buttonRefs={buttonRefs}
                handleMenuToggle={handleMenuToggle}
                menuRef={menuRef}
                menuPosition={menuPosition}
                handleCheckboxChange={handleCheckboxChange}
                
                
              /> */}

              
            </div>
          </div>
        </motion.div>
      </div>

      {/* Permission Modal */}
      {showPermissionModal && selectedUserForPermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Manage Permissions - {selectedUserForPermission.name}
              </h3>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {selectedUserForPermission.role === "Super Admin" && (
                    <Crown size={16} className="text-purple-500" />
                  )}
                  {selectedUserForPermission.role === "Team Admin" && (
                    <ShieldCheck size={16} className="text-blue-500" />
                  )}
                  {selectedUserForPermission.role === "User" && (
                    <User size={16} className="text-green-500" />
                  )}
                  <span className="font-medium">
                    {selectedUserForPermission.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedUserForPermission.role === "Super Admin" &&
                    "Can manage all users and assign any permissions"}
                  {selectedUserForPermission.role === "Team Admin" &&
                    "Can manage Users with permissions granted by Super Admin"}
                  {selectedUserForPermission.role === "User" &&
                    "Can add unique data with duplicates allowed"}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Current Permissions:</h4>
                <div className="space-y-2">
                  {[
                    "Data Entry",
                    "Data View",
                    "User Management",
                    "Reports",
                    "Master Tables",
                  ].map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={selectedUserForPermission.permissions.includes(
                          permission.toLowerCase().replace(" ", "_")
                        )}
                        className="accent-purple-600"
                        disabled={
                          selectedUserForPermission.role === "Super Admin"
                        }
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full text-center p-4 bg-gray-100 text-purple-600 font-semibold text-sm">
        © 2025 Margda Workplace. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
