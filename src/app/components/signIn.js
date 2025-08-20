import React, { useState } from "react";
import { Eye, EyeOff, Lock, Phone, User, MessageCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const SignIn = ({
  handleSubmit,
  loginData,
  handleInputChange,
  showPassword,
  agreedToTerms,
  setAgreedToTerms,
  setShowPassword,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ flag: 'in', code: '+91', name: 'India' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock users with WhatsApp numbers and tokens
  const mockUsers = [
    { whatsappNo: '9999999999', password: 'admin123', token: 'admin-token-123', name: 'Admin User' },
    { whatsappNo: '8888888888', password: 'user123', token: 'user-token-456', name: 'Test User' },
    { whatsappNo: '7777777777', password: 'demo', token: 'demo-token-789', name: 'Demo User' }
  ];

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

  const FlagIcon = ({ countryCode, className = "w-6 h-4" }) => (
    <img
      src={`https://flagpedia.net/data/flags/emoji/twitter/256x256/${countryCode}.png`}
      alt={`${countryCode} flag`}
      className={`${className} rounded-sm object-cover`}
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'inline';
      }}
    />
  );

  const tabVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const handleWhatsAppClick = () => {
    if (fullName.trim()) {
      const message = encodeURIComponent(`Hello, my name is ${fullName}. I would like to receive my login password.`);
      window.open(`https://wa.me/${selectedCountry.code.replace('+', '')}8130960040?text=${message}`, '_blank');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form
    if (!loginData.whatsappNo || !loginData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check mock credentials
      const user = mockUsers.find(u => u.whatsappNo === loginData.whatsappNo && u.password === loginData.password);
      
      if (user) {
        // Redirect to CRM with token
        router.push(`/crm/${user.token}`);
      } else {
        setError("Invalid WhatsApp number or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center lg:justify-end order-2 lg:order-2">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div
                key="login"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Login Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <img
                      src="margda-v.png"
                      alt="Margda Logo"
                      className="w-8 h-8 object-contain"
                    />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Login
                    </h1>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p><strong>Admin:</strong> 9999999999 / admin123</p>
                    <p><strong>User:</strong> 8888888888 / user123</p>
                    <p><strong>Demo:</strong> 7777777777 / demo</p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* WhatsApp Number Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      {/* Country Selector */}
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex items-center gap-2 pl-3 pr-2 py-3 border-r border-gray-300 hover:bg-gray-50 transition-colors"
                            disabled={loading}
                          >
                            <FlagIcon countryCode={selectedCountry.flag} />
                            <span className="text-sm text-gray-600">{selectedCountry.code}</span>
                            <ChevronDown className="h-3 w-3 text-gray-400" />
                          </button>
                          
                          {/* Dropdown */}
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
                        name="whatsappNo"
                        placeholder="WhatsApp Number"
                        value={loginData.whatsappNo || ''}
                        onChange={handleInputChange}
                        className="w-full pl-28 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white placeholder-gray-500"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white placeholder-gray-500"
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button                    
                    type="submit"
                    disabled={loading}
                    className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform shadow-lg flex items-center justify-center ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02]"
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging In...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  {/* Footer Links */}
                  <div className="flex justify-center items-center pt-4 border-t border-gray-200">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Register Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <img
                      src="margda-v.png"
                      alt="Margda Logo"
                      className="w-8 h-8 object-contain"
                    />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Register
                    </h1>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 text-center">
                    WhatsApp your Full Name to{" "}
                    <a 
                      href="https://wa.me/918130960040" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      +918130960040
                    </a>
                    <br />
                    To Receive the Login Password.
                  </p>
                </div>

                {/* Register Form */}
                <div className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    disabled={!fullName.trim()}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] transform shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Click to WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Navigation - Moved to Bottom */}
          <div className="flex mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 text-center font-semibold rounded-l-lg transition-colors ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 text-center font-semibold rounded-r-lg transition-colors ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;