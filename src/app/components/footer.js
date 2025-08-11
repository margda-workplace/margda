import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-screen bg-gray-50 border-t border-gray-200 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1 - Company Info */}
          <div className="space-y-4 lg:mx-[-30px]">
            <img src="logo.webp" alt="Margda Logo" className="h-auto w-max mx-[-40px]" />
            
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>🏠 92 Deepali Bldg, Nehru Place, New Delhi</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Upli Odan, Nathdwara, Rajasthan</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>02953358562</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>8130960040</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>+919212401007</span>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>work@margda.com</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:mx-9">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Feedback and Complaints",
                "Privacy Statement",
                "Terms of Service",
                "Refund Policy",
                "Pay Online",
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Social */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-pink-500 rounded-full text-white hover:bg-pink-600"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-black rounded-full text-white hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-700 rounded-full text-white hover:bg-blue-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-6">
        <p className="text-center text-sm text-gray-600">
          <span className="text-blue-600 font-medium lg:text-lg md:text-lg">
            © 2025 Margda Workplace 
          </span>
          <span className="text-orange-500 ml-1 lg:text-lg md:text-lg">All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
