"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Users,
  Settings,
  User,
  Shield,
  Database,
  Camera,
  Save,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Award,
  Briefcase,
  UserCog,
  Table,
  MessageCircle,
  BookOpen,
  PenTool,
  Trophy,
  Target,
  BarChart3,
  Share2,
  Edit3,
  Receipt,
  Key,
  CreditCard,
  Upload,
  FileCheck,
  MessageSquare,
  Video,
  Download
} from "lucide-react";
import CompleteProfile from "./completeProfile";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState("Super Admin"); // Super Admin, Team Admin, User
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data with all required fields
  const [userData, setUserData] = useState([
    {
      id: 1,
      source: "Website",
      score: 85,
      name: "John Doe",
      whatsapp: "+919876543210",
      mobile: "+919876543210",
      email: "john@example.com",
      dataType: "Lead",
      task: "Follow-up",
      user: "Admin",
      country: "India",
      state: "Maharashtra",
      district: "Mumbai",
      pincode: "400001",
      place: "Bandra",
      dob: "1990-05-15",
      profession: "Software Engineer",
      qualification: "B.Tech",
      institute: "IIT Mumbai",
      skills: ["React", "Node.js", "Python"],
      cvBio: "Experienced developer",
      profile: "Full Stack Developer",
      skillsTest: "Completed",
      communication: "Excellent",
      interview: "Scheduled",
      documents: "Uploaded",
      loi: "Pending",
      followUpDate: "2025-01-20",
      lateDays: 0,
      timeline: "On track",
      remarks: "Promising candidate",
      functionalArea: "IT",
      position: "Senior",
      industry: "Technology",
      education: ["B.Tech"],
      experienceType: "Experienced",
      experienceYears: 5,
      status: "Active",
      isPaid: true
    },
    {
      id: 2,
      source: "Referral",
      score: 92,
      name: "Jane Smith",
      whatsapp: "+919876543211",
      mobile: "+919876543211",
      email: "jane@example.com",
      dataType: "Prospect",
      task: "Interview",
      user: "Manager",
      country: "India",
      state: "Karnataka",
      district: "Bangalore",
      pincode: "560001",
      place: "Koramangala",
      dob: "1992-08-22",
      profession: "Data Scientist",
      qualification: "M.Tech",
      institute: "IISC Bangalore",
      skills: ["Machine Learning", "Python", "SQL"],
      cvBio: "ML expert with 3+ years experience",
      profile: "Senior Data Scientist",
      skillsTest: "Pending",
      communication: "Good",
      interview: "Completed",
      documents: "Pending",
      loi: "Sent",
      followUpDate: "2025-01-18",
      lateDays: 2,
      timeline: "Delayed",
      remarks: "Strong technical skills",
      functionalArea: "Analytics",
      position: "Senior",
      industry: "Technology",
      education: ["M.Tech"],
      experienceType: "Experienced",
      experienceYears: 3,
      status: "Pending",
      isPaid: false
    }
  ]);

  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    mobile: "",
    email: "",
    dob: "",
    country: "India",
    state: "",
    district: "",
    pincode: "",
    place: "",
    languages: [],
    referID: ""
  });

  // Filter states
  const [filters, setFilters] = useState({
    task: "Lead",
    status: "",
    date: "",
    skills: [],
    functionalArea: "",
    position: "",
    industry: "",
    education: [],
    institute: [],
    experience: [],
    experienceYearsFrom: "",
    experienceYearsTo: ""
  });

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredData = userData.filter(item => {
    const matchesFilter = selectedFilter === "All" || 
      (selectedFilter === "Self" && item.user === "Self") ||
      (selectedFilter === "Team" && item.user === "Team") ||
      (selectedFilter === "Other" && item.user === "Other");
    
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => setMounted(true), []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const rolePermissions = {
    "Super Admin": ["dashboard", "userManagement", "teamManagement", "masterTables", "profile", "permissions"],
    "Team Admin": ["dashboard", "teamManagement", "masterTables", "profile"],
    "User": ["dashboard", "profile", "myData"]
  };

  const getCurrentPermissions = () => rolePermissions[currentRole] || [];

  const handleProfileSave = () => {
    console.log("Profile saved:", profileData);
    // Save information in the table
  };

  const ActionDropdown = ({ item }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    
    return (
      <div className="relative sm:px-5">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical size={16} />
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-10 max-h-80 overflow-y-auto">
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <UserCog size={14} />
                Make User
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Key size={14} />
                Passcode
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Receipt size={14} />
                Invoice
              </button>
              {item.isPaid && (
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                  <CreditCard size={14} />
                  Receipt
                </button>
              )}
              <hr className="my-1" />
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <PenTool size={14} />
                Skills Test
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <MessageCircle size={14} />
                Communication Evaluation
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Users size={14} />
                HR Interaction
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <MessageSquare size={14} />
                Interview Questions
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Upload size={14} />
                Document Upload
              </button>
              <hr className="my-1" />
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Trophy size={14} />
                Student Contest
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Target size={14} />
                Aptitude Assessment
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Award size={14} />
                Attitude Assessment
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <BarChart3 size={14} />
                Ability Analyser
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                <Briefcase size={14} />
                Career Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };



  const LeftHandFilters = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="font-medium text-gray-800 mb-3">Data Filters</h4>
        <div className="space-y-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="Self">Self</option>
            <option value="Team">Team</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filters.task}
            onChange={(e) => setFilters({...filters, task: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Lead">Lead</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Interview">Interview</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="font-medium text-gray-800 mb-3">Location</h4>
        <div className="space-y-3">
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">District</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <input
            type="text"
            placeholder="Pin Code"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="font-medium text-gray-800 mb-3">Professional Filters</h4>
        <div className="space-y-3">
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Skills (multi selection)</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Functional Area</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Position</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Education (multi selection)</option>
            <option value="Bachelor">Bachelor&apos;s</option>
            <option value="Master">Master&apos;s</option>
            <option value="PhD">PhD</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Institute (multi selection)</option>
            <option value="IIT">IIT</option>
            <option value="IISC">IISC</option>
            <option value="University">University</option>
          </select>

          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Experience (multi selection)</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
            <option value="Expert">Expert</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="From"
              value={filters.experienceYearsFrom}
              onChange={(e) => setFilters({...filters, experienceYearsFrom: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-gray-500 text-sm">to</span>
            <input
              type="number"
              placeholder="To"
              value={filters.experienceYearsTo}
              onChange={(e) => setFilters({...filters, experienceYearsTo: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="space-y-6 p-6"
      >
        {/* Role & Section Selection */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                <span className="font-medium text-gray-700">Current Role:</span>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Team Admin">Team Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Quick Access:</span>
                <div className="flex flex-wrap gap-2">
                  {getCurrentPermissions().includes("dashboard") && (
                    <button
                      onClick={() => setActiveSection("dashboard")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === "dashboard" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Database size={16} />
                      Dashboard
                    </button>
                  )}
                  
                  {getCurrentPermissions().includes("profile") && (
                    <button
                      onClick={() => setActiveSection("profile")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === "profile" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <User size={16} />
                      My Profile
                    </button>
                  )}

                  {getCurrentPermissions().includes("userManagement") && (
                    <button
                      onClick={() => setActiveSection("users")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === "users" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <UserCog size={16} />
                      User Management
                    </button>
                  )}

                  {getCurrentPermissions().includes("masterTables") && (
                    <button
                      onClick={() => setActiveSection("master")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === "master" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Table size={16} />
                      Master Tables
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeSection === "profile" ? (
            <CompleteProfile />
          ) : activeSection === "users" ? (
            <motion.div
              key="users"
              initial="hidden"
              animate="visible"
              variants={variants}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <UserCog size={24} className="text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Permission Structure:</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Super Admin:</strong> Will give feature access permissions to Team Admin and Users</p>
                    <p><strong>Team Admin:</strong> Will give feature access permissions (given by Super Admin) to Users</p>
                    <p><strong>User:</strong> Unique Data → Duplicates allowed → Added/Uploaded by the Users</p>
                  </div>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>User management features will be implemented here.</p>
                </div>
              </div>
            </motion.div>
          ) : activeSection === "master" ? (
            <motion.div
              key="master"
              initial="hidden"
              animate="visible"
              variants={variants}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <Table size={24} className="text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Master Tables</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Master Tables Management:</h3>
                  <p className="text-sm text-gray-700">Users can add master table records. Admin will moderate it.</p>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Database size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Master tables management interface.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial="hidden"
              animate="visible"
              variants={variants}
              className="grid grid-cols-12 gap-6"
            >
              {/* Left Hand Side Filters */}
              <div className="col-span-12 lg:col-span-3">
                <LeftHandFilters />
              </div>

              {/* Center Content */}
              <div className="col-span-12 lg:col-span-9 space-y-6">
                {/* Action Buttons */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:scale-105 transition-transform flex items-center gap-2">
                        <Plus size={16} />
                        Add Data
                      </button>
                      <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:scale-105 transition-transform">
                        Campaign
                      </button>
                      <button className="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:scale-105 transition-transform">
                        &lt;10 Records&gt; Shortlist
                      </button>
                    </div>

                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                      Action Data
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                      Location Details
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                      Status
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                      Logs
                    </button>
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Data Records</h3>
                      <div className="text-sm text-gray-600">
                        * All default and option
                      </div>
                    </div>
                  </div>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold">
                      <tr>
                        <th className="p-4 text-left">
                          <input type="checkbox" className="rounded" />
                        </th>
                        <th className="p-4 text-left">Source</th>
                        <th className="p-4 text-left">Score</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Mobile</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Data Type *</th>
                        <th className="p-4 text-left">Task *</th>
                        <th className="p-4 text-left">User</th>
                        <th className="p-4 text-left">Country</th>
                        <th className="p-4 text-left">State</th>
                        <th className="p-4 text-left">District</th>
                        <th className="p-4 text-left">Pin Code</th>
                        <th className="p-4 text-left">Place</th>
                        <th className="p-4 text-left">DOB</th>
                        <th className="p-4 text-left">Profession</th>
                        <th className="p-4 text-left">Qualification</th>
                        <th className="p-4 text-left">Institute</th>
                        <th className="p-4 text-left">Skills</th>
                        <th className="p-4 text-left">CV/Bio</th>
                        <th className="p-4 text-left">Profile</th>
                        <th className="p-4 text-left">Skills Test</th>
                        <th className="p-4 text-left">Communication</th>
                        <th className="p-4 text-left">Interview</th>
                        <th className="p-4 text-left">Documents</th>
                        <th className="p-4 text-left">LOI</th>
                        <th className="p-4 text-left">Follow Up</th>
                        <th className="p-4 text-left">Late Days</th>
                        <th className="p-4 text-left">Timeline</th>
                        <th className="p-4 text-left">Remarks</th>
                        <th className="p-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {item.source}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-500 fill-current" />
                              {item.score}
                            </div>
                          </td>
                          <td className="p-4 font-medium">{item.name}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-green-600" />
                              {item.whatsapp}
                            </div>
                          </td>
                          <td className="p-4">{item.mobile}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-blue-600" />
                              {item.email}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {item.dataType}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              {item.task}
                            </span>
                          </td>
                          <td className="p-4">{item.user}</td>
                          <td className="p-4">{item.country}</td>
                          <td className="p-4">{item.state}</td>
                          <td className="p-4">{item.district}</td>
                          <td className="p-4">{item.pincode}</td>
                          <td className="p-4">{item.place}</td>
                          <td className="p-4">{item.dob}</td>
                          <td className="p-4">{item.profession}</td>
                          <td className="p-4">{item.qualification}</td>
                          <td className="p-4">{item.institute}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {item.skills.map((skill, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">{item.cvBio}</td>
                          <td className="p-4">{item.profile}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.skillsTest === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {item.skillsTest}
                            </span>
                          </td>
                          <td className="p-4">{item.communication}</td>
                          <td className="p-4">{item.interview}</td>
                          <td className="p-4">{item.documents}</td>
                          <td className="p-4">{item.loi}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar size={12} />
                              {item.followUpDate}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`flex items-center gap-1 text-xs ${
                              item.lateDays > 0 ? "text-red-600" : "text-green-600"
                            }`}>
                              <Clock size={12} />
                              ({item.lateDays})
                            </div>
                          </td>
                          <td className="p-4">{item.timeline}</td>
                          <td className="p-4">{item.remarks}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button 
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Change"
                              >
                                <Edit3 size={14} className="text-blue-600" />
                              </button>
                              <button 
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Share"
                              >
                                <Share2 size={14} className="text-green-600" />
                              </button>
                              <ActionDropdown item={item} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-white p-4 rounded-xl shadow">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} records
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md">
                        {currentPage}
                      </span>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;