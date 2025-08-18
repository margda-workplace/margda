import React from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  SquareCheckBig,
  Search,
  ChevronLeft,
  ChevronRight,
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
  Eye,
  Pencil,
  FileText,
  UserRound,
  Settings,
  MoreVertical,
  CircleArrowUp,
  FileBadge,
  FileDigit,
  Star,
  BookA,
  BookText,
  ClipboardList,
  Database,
  Share,
  current
} from "lucide-react";

const MainDashboard = ({
  show,
  search,
  motion,
  currentData,
  currentPage,
  openMenu,
  tableData,
  startIndex,
  itemsPerPage,
  handlePrevious,
  handleNext,
  totalPages,
  buttonRefs,
  handleMenuToggle,
  menuRef,
  menuPosition,
  
  
}) => {
  return (
    <>
    
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Shortlist</span>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-600 transition-colors">
              Task
            </button>
            <button className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors">
              Status
            </button>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors">
              Lead
            </button>
          </div>
          <span className="ml-4">Show</span>
          <input
            type="number"
            value={show}
            onChange={(e) => setShow(Number(e.target.value))}
            className="w-16 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          Records
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 border border-gray-300 rounded-md p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <motion.table
          key={currentPage}
          className="min-w-full text-sm text-left border rounded-xl overflow-hidden"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4 border-b">
                <input type="checkbox" className="accent-blue-600 mr-2" />
                Selected (0)
              </th>
              <th className="p-4 border-b text-center">
                <div className="flex items-center justify-center gap-1">
                  <UserPlus size={16} /> Action
                </div>
              </th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <Mail size={16} /> Data
                </div>
              </th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <MapPin size={16} /> Location
                </div>
              </th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <Info size={16} /> Details
                </div>
              </th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <ScrollText size={16} /> Status
                </div>
              </th>
              <th className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <MessageSquare size={16} /> Logs
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.map((row, i) => (
              <tr key={i} className="align-top">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleCheckboxChange(i)}
                    className="accent-blue-600"
                  />
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors">
                      <Pencil size={18} />
                    </button>
                    <div className="relative">
                      <button
                        ref={(el) => (buttonRefs.current[i] = el)}
                        onClick={() => handleMenuToggle(row, i)}
                        className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="font-bold">{row.data.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} className="text-green-500" />
                      <span>{row.data.whatsApp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-pink-500" />
                      <span>{row.data.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-500" />
                      <span>{row.data.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <List size={16} className="text-gray-500" />
                      <span>Type: {row.data.dataType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span>Task: {row.data.task}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span>User: {row.data.user}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span>Country: {row.location.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span>State: {row.location.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span>District: {row.location.district}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span>Pincode: {row.location.pinCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span>Place: {row.location.place}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-500" />
                      <span>DOB: {row.details.dob}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-orange-500" />
                      <span>Profession: {row.details.profession}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-blue-500" />
                      <span>Institute: {row.details.institute}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-yellow-500" />
                      <span>Skills: {row.details.skills}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} className="text-gray-500" />
                      <span>CV/Bio: {row.details.cvBio}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span>Profile: {row.status.profile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SquareCheckBig size={16} className="text-green-500" />
                      <span>Skills Test: {row.status.skillsTest}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-blue-500" />
                      <span>Qualification: {row.status.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-purple-500" />
                      <span>Communication: {row.status.communication}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={16} className="text-orange-500" />
                      <span>Interview: {row.status.interview}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} className="text-gray-500" />
                      <span>Documents: {row.status.documents}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ScrollText size={16} className="text-red-500" />
                      <span>LOI: {row.status.loi}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span>Follow up: {row.logs.followUpDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-red-500" />
                      <span>Late: {row.logs.lateDays} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <List size={16} className="text-gray-500" />
                      <span>Timeline: {row.logs.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-gray-500" />
                      <span>Remarks: {row.logs.remarks}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Menu rendered outside the table to prevent clipping */}
      {openMenu && (
        <div
          ref={menuRef}
          className="fixed w-max min-w-[12rem] bg-white border border-gray-200 rounded-md shadow-lg z-50"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          <ul className="py-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileText size={16} /> Passcode
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileBadge size={16} /> Invoice
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileDigit size={16} /> Receipt (if paid)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Star size={16} /> Skills test
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BookA size={16} /> Communication evaluation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UserRound size={16} /> HR interaction
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BookText size={16} /> Interview questions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <CircleArrowUp size={16} /> Document upload
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} /> Aptitude Assessment
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} /> Attitude Assessment
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} /> Ability Analyser
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ClipboardList size={16} /> Career Dashboard
              </a>
            </li>
            <hr className="my-1" />
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Database size={16} /> Source
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Star size={16} /> Score
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Pencil size={16} /> C-Task
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Pencil size={16} /> C-Lead
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Share size={16} /> S-Task
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Share size={16} /> S-Log
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 mt-6 gap-4">
        <div>
          Showing {tableData.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, tableData.length)} of{" "}
          {tableData.length} Records
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-white text-gray-800 rounded-lg px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-1"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="bg-purple-600 text-white rounded-lg px-4 py-2 font-medium shadow-sm">
            {currentPage}
          </span>
          <button
            className="bg-white text-gray-800 rounded-lg px-5 py-2 text-sm font-medium shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-1"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
