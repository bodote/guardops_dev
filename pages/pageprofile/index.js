import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getUserRole } from "@/helper/getRole";
import Apimanagement from "@/components/Pageprofiledata/Apimanagement";
import Billing from "@/components/Pageprofiledata/Billing";
import Profile from "@/components/Pageprofiledata/Profile";
import PlaygroundSettings from "@/components/Pageprofiledata/PlaygroundSettings";
import Logout from "@/components/Logout/Logout";
import { LockIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";

const Pageprofile = () => {
  const [tab, setTab] = useState("Profile");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const roles = await getUserRole();
      if (roles) {
        setRole(roles);
        setLoader(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px] bg-slate-50">
          {/* Header */}
          <div className="flex justify-between items-center bg-white shadow-sm border-b border-slate-200 sm:px-[22px] px-[16px] py-4">
            <div className="flex items-center gap-2">
              <h1 className="font-Archivo text-sm font-medium text-slate-600">
                COAI
              </h1>
              <RightIcon className="w-3 h-3 text-slate-400" />
              <h1 className="font-Archivo text-sm font-medium text-slate-600">
                User Profile
              </h1>
              <RightIcon className="w-3 h-3 text-slate-400" />
              <h1 className="font-Archivo text-sm font-semibold text-slate-900">
                User 1
              </h1>
            </div>
            <Logout />
          </div>

          {/* Main Content Container */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="font-Archivo text-3xl font-bold text-slate-900 mb-2">
                User Profile
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-white px-8 py-6">
                <div className="flex justify-center items-center">
                  <div className="flex gap-2 bg-slate-100/80 backdrop-blur-sm rounded-xl p-1.5 shadow-inner">
                    <button
                      onClick={() => setTab("Profile")}
                      className={`relative px-8 py-3 rounded-lg font-Archivo text-sm font-semibold transition-all duration-300 ${tab === "Profile"
                        ? "bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 text-black shadow-lg shadow-[#D4DB33]/25 transform scale-105"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm"
                        }`}
                    >
                      {tab === "Profile" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 rounded-lg blur opacity-20"></div>
                      )}
                      <span className="relative">Profile</span>
                    </button>
                    {role.includes("Brandad") && (
                      <button
                        onClick={() => setTab("Apimanagement")}
                        className={`relative px-8 py-3 rounded-lg font-Archivo text-sm font-semibold transition-all duration-300 ${tab === "Apimanagement"
                          ? "bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 text-black shadow-lg shadow-[#D4DB33]/25 transform scale-105"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm"
                          }`}
                      >
                        {tab === "Apimanagement" && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 rounded-lg blur opacity-20"></div>
                        )}
                        <span className="relative">API Management</span>
                      </button>
                    )}
                    <button
                      onClick={() => setTab("PlaygroundSettings")}
                      className={`relative px-8 py-3 rounded-lg font-Archivo text-sm font-semibold transition-all duration-300 ${tab === "PlaygroundSettings"
                        ? "bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 text-black shadow-lg shadow-[#D4DB33]/25 transform scale-105"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm"
                        }`}
                    >
                      {tab === "PlaygroundSettings" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 rounded-lg blur opacity-20"></div>
                      )}
                      <span className="relative">Playground Settings</span>
                    </button>
                    <button
                      onClick={() => setTab("Billing")}
                      className={`relative px-8 py-3 rounded-lg font-Archivo text-sm font-medium transition-all duration-300 ${tab === "Billing"
                        ? "bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 text-black shadow-lg shadow-[#D4DB33]/25 transform scale-105"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm"
                        }`}
                    >
                      {tab === "Billing" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4DB33] to-[#D4DB33]/90 rounded-lg blur opacity-20"></div>
                      )}
                      <span className="relative">Billing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              {tab === "Profile" && <Profile />}
              {tab === "Apimanagement" && <Apimanagement />}
              {tab === "PlaygroundSettings" && <PlaygroundSettings />}
              {tab === "Billing" && <Billing />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pageprofile;
