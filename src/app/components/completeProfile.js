"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, User, Phone, MapPin, Briefcase, Eye } from "lucide-react";

const CompleteProfile = () => {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({ flag: 'in', code: '+91', name: 'India' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { flag: 'in', code: '+91', name: 'India' },
    { flag: 'us', code: '+1', name: 'United States' },
    { flag: 'gb', code: '+44', name: 'United Kingdom' },
    { flag: 'ca', code: '+1', name: 'Canada' },
    { flag: 'au', code: '+61', name: 'Australia' },
    { flag: 'de', code: '+49', name: 'Germany' },
    { flag: 'fr', code: '+33', name: 'France' },
    { flag: 'jp', code: '+81', name: 'Japan' },
    { flag: 'cn', code: '+86', name: 'China' },
    { flag: 'br', code: '+55', name: 'Brazil' },
    { flag: 'sg', code: '+65', name: 'Singapore' },
    { flag: 'ae', code: '+971', name: 'UAE' },
    { flag: 'sa', code: '+966', name: 'Saudi Arabia' },
    { flag: 'za', code: '+27', name: 'South Africa' },
    { flag: 'ru', code: '+7', name: 'Russia' },
  ];

  // Flag component
  const FlagIcon = ({ countryCode, className = "w-6 h-4" }) => (
    <img
      src={`https://flagpedia.net/data/flags/emoji/twitter/256x256/${countryCode}.png`}
      alt={`${countryCode} flag`}
      className={`${className} rounded-sm object-cover`}
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling && (e.target.nextSibling.style.display = 'inline');
      }}
    />
  );
  const [profileData, setProfileData] = useState({
    // Personal
    name: "",
    gender: "",
    profilePicture: null,
    
    // Contact
    mobile: "",
    whatsapp: "",
    email: "",
    dob: "",
    
    // Location
    country: "",
    state: "",
    district: "",
    pinCode: "",
    place: "",
    address: "",
    
    // Role
    roleType: "",
    // Job Seeker fields
    experience: "",
    skills: "",
    expectedSalary: "",
    // Student fields
    institution: "",
    course: "",
    year: "",
    // Business fields
    businessName: "",
    businessType: "",
    employeeCount: ""
  });

  const steps = [
    { number: 1, title: "Personal", icon: User },
    { number: 2, title: "Contact", icon: Phone },
    { number: 3, title: "Location", icon: MapPin },
    { number: 4, title: "Roles", icon: Briefcase },
    { number: 5, title: "Review", icon: Eye }
  ];

  useEffect(() => setMounted(true), []);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  // Personal Step Component
  const PersonalStep = () => (
    <motion.div
      key="personal"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="space-y-6"
    >
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-4 sm:px-5">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-blue-500 overflow-hidden ">
            {profileData.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Upload Profile Picture
        </button>
      </div>

      {/* Name and Gender Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User size={16} className="mr-2 text-blue-600" />
            Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User size={16} className="mr-2 text-blue-600" />
            Gender
          </label>
          <select
            value={profileData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  // Contact Step Component
  const ContactStep = () => (
    <motion.div
      key="contact"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mobile */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone size={16} className="mr-2 text-green-600" />
            Mobile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 pl-3 pr-2 py-3 border-r border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <FlagIcon countryCode={selectedCountry.flag} />
                  <span className="text-sm text-gray-600">{selectedCountry.code}</span>
                </button>
                
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {countries.map((country, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <FlagIcon countryCode={country.flag} />
                        <span className="text-sm text-gray-600 min-w-[3rem]">{country.code}</span>
                        <span className="text-sm text-gray-800">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <input
              type="tel"
              value={profileData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="w-full pl-24 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone size={16} className="mr-2 text-green-600" />
            WhatsApp Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="flex items-center gap-2 pl-3 pr-2 py-3 border-r border-gray-300 bg-gray-50">
                <FlagIcon countryCode={selectedCountry.flag} />
                <span className="text-sm text-gray-600">{selectedCountry.code}</span>
              </div>
            </div>
            <input
              type="tel"
              value={profileData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              className="w-full pl-24 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="WhatsApp number"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone size={16} className="mr-2 text-purple-600" />
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email address"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone size={16} className="mr-2 text-orange-600" />
            Date of Birth
          </label>
          <input
            type="date"
            value={profileData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="dd-mm-yyyy"
          />
        </div>
      </div>
    </motion.div>
  );

  // Location Step Component
  const LocationStep = () => (
    <motion.div
      key="location"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="mr-2 text-orange-600" />
            Country
          </label>
          <select
            value={profileData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
          </select>
        </div>

        {/* State */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="mr-2 text-green-600" />
            State
          </label>
          <select
            value={profileData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">State</option>
            <option value="westbengal">West Bengal</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>

        {/* District */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="mr-2 text-green-600" />
            District
          </label>
          <select
            value={profileData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">District</option>
            <option value="kolkata">Kolkata</option>
            <option value="howrah">Howrah</option>
            <option value="southparganas">South 24 Parganas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pin Code */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="mr-2 text-green-600" />
            Pin Code
          </label>
          <select
            value={profileData.pinCode}
            onChange={(e) => handleInputChange('pinCode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pin Code</option>
            <option value="700001">700001</option>
            <option value="700002">700002</option>
            <option value="700003">700003</option>
          </select>
        </div>

        {/* Place */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="mr-2 text-green-600" />
            Place
          </label>
          <input
            type="text"
            value={profileData.place}
            onChange={(e) => handleInputChange('place', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Place"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <MapPin size={16} className="mr-2 text-green-600" />
          Address
        </label>
        <textarea
          value={profileData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Address"
          rows="3"
        />
      </div>
    </motion.div>
  );

  // Roles Step Component
  const RolesStep = () => (
    <motion.div
      key="roles"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="space-y-6"
    >
      {/* Role Selection */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Briefcase size={16} className="mr-2 text-blue-600" />
          Select Role
        </label>
        <select
          value={profileData.roleType}
          onChange={(e) => handleInputChange('roleType', e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Role</option>
          <option value="jobseeker">Job Seeker</option>
          <option value="student">Student</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Dynamic Role Forms */}
      {profileData.roleType === 'jobseeker' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Job Seeker Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={profileData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Years of Experience"
              />
              <input
                type="text"
                value={profileData.expectedSalary}
                onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Expected Salary"
              />
            </div>
            <textarea
              value={profileData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Skills (comma separated)"
              rows="3"
            />
          </div>
      )}

      {profileData.roleType === 'student' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={profileData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Institution Name"
              />
              <input
                type="text"
                value={profileData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Current Year"
              />
            </div>
            <input
              type="text"
              value={profileData.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Course/Degree"
            />
          </div>
      )}

      {profileData.roleType === 'business' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={profileData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Business Name"
              />
              <input
                type="text"
                value={profileData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Number of Employees"
              />
            </div>
            <input
              type="text"
              value={profileData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Business Type"
            />
          </div>
      )}
    </motion.div>
  );

  // Review Step Component
  const ReviewStep = () => (
    <motion.div
      key="review"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-700">Review Your Information</h3>
      
      {/* Personal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Name:</span> {profileData.name || 'Not provided'}</div>
          <div><span className="font-medium">Gender:</span> {profileData.gender || 'Not provided'}</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Mobile:</span> {profileData.mobile || 'Not provided'}</div>
          <div><span className="font-medium">WhatsApp:</span> {profileData.whatsapp || 'Not provided'}</div>
          <div><span className="font-medium">Email:</span> {profileData.email || 'Not provided'}</div>
          <div><span className="font-medium">Date of Birth:</span> {profileData.dob || 'Not provided'}</div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Location Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Country:</span> {profileData.country || 'Not provided'}</div>
          <div><span className="font-medium">State:</span> {profileData.state || 'Not provided'}</div>
          <div><span className="font-medium">District:</span> {profileData.district || 'Not provided'}</div>
          <div><span className="font-medium">Pin Code:</span> {profileData.pinCode || 'Not provided'}</div>
          <div><span className="font-medium">Place:</span> {profileData.place || 'Not provided'}</div>
          <div className="md:col-span-2"><span className="font-medium">Address:</span> {profileData.address || 'Not provided'}</div>
        </div>
      </div>

      {/* Role Information */}
      {profileData.roleType && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Role Information</h4>
          <div className="text-sm">
            <div className="mb-2"><span className="font-medium">Role Type:</span> {profileData.roleType}</div>
            {profileData.roleType === 'jobseeker' && (
              <div className="space-y-1">
                <div><span className="font-medium">Experience:</span> {profileData.experience || 'Not provided'}</div>
                <div><span className="font-medium">Expected Salary:</span> {profileData.expectedSalary || 'Not provided'}</div>
                <div><span className="font-medium">Skills:</span> {profileData.skills || 'Not provided'}</div>
              </div>
            )}
            {profileData.roleType === 'student' && (
              <div className="space-y-1">
                <div><span className="font-medium">Institution:</span> {profileData.institution || 'Not provided'}</div>
                <div><span className="font-medium">Course:</span> {profileData.course || 'Not provided'}</div>
                <div><span className="font-medium">Year:</span> {profileData.year || 'Not provided'}</div>
              </div>
            )}
            {profileData.roleType === 'business' && (
              <div className="space-y-1">
                <div><span className="font-medium">Business Name:</span> {profileData.businessName || 'Not provided'}</div>
                <div><span className="font-medium">Business Type:</span> {profileData.businessType || 'Not provided'}</div>
                <div><span className="font-medium">Employee Count:</span> {profileData.employeeCount || 'Not provided'}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <PersonalStep />;
      case 2: return <ContactStep />;
      case 3: return <LocationStep />;
      case 4: return <RolesStep />;
      case 5: return <ReviewStep />;
      default: return <PersonalStep />;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Outer wrapper with slight rounding and light blue border */}
        <div className="border border-blue-200 rounded-lg p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="logo.webp" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">Help us know you better by filling out the details below.</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                      isActive ? 'bg-blue-600 text-white' : 
                      isCompleted ? 'bg-blue-600 text-white' : 
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-xs font-medium ${
                      isActive ? 'text-blue-600' : 
                      isCompleted ? 'text-blue-600' : 
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
            )}
            
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => alert('Profile completed!')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors ml-auto"
              >
                Submit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
