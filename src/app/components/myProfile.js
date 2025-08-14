import { useState } from "react";
import { User, Tag, Phone, Mail, Calendar, Globe, MapPin } from "lucide-react";

const MyProfileSection = ({ profile }) => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      alert("Profile submitted!");
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
      <h2 className="text-xl font-bold">My Profile</h2>
      <p className="text-sm text-gray-600">
        Please update your real photo and info. The account may be disabled if
        any discrepancy is found.
      </p>

      {step === 1 && (
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-500">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>

          <div className="flex flex-col space-y-2 text-base">
            <div className="flex items-center">
              <User size={18} className="mr-3 text-blue-600" />
              <span className="font-semibold">Name:</span>&nbsp;{profile.name}
            </div>
            <div className="flex items-center">
              <Tag size={18} className="mr-3 text-pink-600" />
              <span className="font-semibold">Gender:</span>&nbsp;
              {profile.gender}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <div className="flex items-center">
            <Phone size={18} className="mr-3 text-green-600" />
            <span className="font-semibold">Mobile:</span>&nbsp;{profile.mobile}
          </div>
          <div className="flex items-center">
            <Mail size={18} className="mr-3 text-purple-600" />
            <span className="font-semibold">Email:</span>&nbsp;{profile.email}
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-3 text-orange-600" />
            <span className="font-semibold">DOB:</span>&nbsp;{profile.dob}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <div className="flex items-center">
            <Globe size={18} className="mr-3 text-yellow-600" />
            <span className="font-semibold">Country:</span>&nbsp;
            {profile.country}
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-red-600" />
            <span className="font-semibold">State:</span>&nbsp;{profile.state}
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-teal-600" />
            <span className="font-semibold">District:</span>&nbsp;
            {profile.district}
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-gray-600" />
            <span className="font-semibold">Pin Code:</span>&nbsp;
            {profile.pinCode}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-indigo-600" />
            <span className="font-semibold">Place:</span>&nbsp;{profile.place}
          </div>
          <div className="flex items-center">
            <Tag size={18} className="mr-3 text-blue-500" />
            <span className="font-semibold">Languages:</span>&nbsp;
            {profile.languages}
          </div>
          <div className="flex items-center">
            <Tag size={18} className="mr-3 text-gray-500" />
            <span className="font-semibold">ReferID:</span>&nbsp;
            {profile.referId}
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-between">
        {step > 1 && (
          <button
            onClick={goToPreviousStep}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-5 py-2 text-sm font-medium transition-colors"
          >
            Previous
          </button>
        )}

        <button
          onClick={goToNextStep}
          className={`${
            step < 4
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white rounded-lg px-5 py-2 text-sm font-medium transition-colors ml-auto`}
        >
          {step < 4 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfileSection;
