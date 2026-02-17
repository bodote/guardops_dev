import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserRole } from "@/helper/getRole";
import { FiUser, FiMail, FiPhone, FiShield, FiSave } from "react-icons/fi";

const Profile = () => {
  const { user, error, isLoading } = useUser();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [role, setRole] = useState("");
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  const handleOnChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const getRole = async () => {
    setIsRoleLoading(true);
    try {
      const roles = await getUserRole();
      setRole(Array.isArray(roles) && roles.length ? roles.join(", ") : "No role assigned");
    } finally {
      setIsRoleLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "",
        email: user.email || "",
        contact: "",
      });
    }
    getRole();
  }, [user]);

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4DB33]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#D4DB33] to-[#D4DB33]/80 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-10 h-10 text-black" />
        </div>
        <h2 className="font-Archivo text-2xl font-bold text-slate-900 mb-2">
          Personal Information
        </h2>
        <p className="text-slate-600">
          Manage your account details and contact information
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-slate-700 font-Archivo font-medium text-sm"
          >
            <FiUser className="w-4 h-4 text-[#0D859A]" />
            Full Name
          </label>
          <input
            className="w-full h-12 border border-slate-200 rounded-xl px-4 font-Archivo text-sm transition-all duration-200 focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] focus:outline-none bg-white hover:border-slate-300"
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleOnChange}
            value={userInfo.name}
          />
          <p className="text-slate-500 font-Archivo text-xs">
            This name will be displayed across your account
          </p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-slate-700 font-Archivo font-medium text-sm"
          >
            <FiMail className="w-4 h-4 text-[#0D859A]" />
            Email Address
          </label>
          <input
            className="w-full h-12 border border-slate-200 rounded-xl px-4 font-Archivo text-sm transition-all duration-200 focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] focus:outline-none bg-white hover:border-slate-300"
            type="email"
            placeholder="your.email@company.com"
            name="email"
            onChange={handleOnChange}
            value={userInfo.email}
          />
          <p className="text-slate-500 font-Archivo text-xs">
            Your primary email address for account notifications
          </p>
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact"
            className="flex items-center gap-2 text-slate-700 font-Archivo font-medium text-sm"
          >
            <FiPhone className="w-4 h-4 text-[#0D859A]" />
            Phone Number
          </label>
          <input
            className="w-full h-12 border border-slate-200 rounded-xl px-4 font-Archivo text-sm transition-all duration-200 focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] focus:outline-none bg-white hover:border-slate-300"
            type="tel"
            placeholder="+1 (555) 123-4567"
            name="contact"
            onChange={handleOnChange}
            value={userInfo.contact}
          />
          <p className="text-slate-500 font-Archivo text-xs">
            Optional contact number for account security
          </p>
        </div>

        {/* User Role Display */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <FiShield className="w-4 h-4 text-[#0D859A]" />
            <span className="text-slate-700 font-Archivo font-medium text-sm">
              Account Permissions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-Archivo text-sm">User Role:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#D4DB33]/10 text-[#D4DB33] border border-[#D4DB33]/20">
              {isRoleLoading ? "Loading..." : role}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <button className="inline-flex items-center gap-2 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white font-Archivo font-semibold text-sm py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]">
            <FiSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
