import Apimanagement from "@/components/Pageprofiledata/Apimanagement";
import Billing from "@/components/Pageprofiledata/Billing";
import Profile from "@/components/Pageprofiledata/Profile";
import Usage from "@/components/Pageprofiledata/Usage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { LockIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useState } from "react";

const Pageprofile = () => {
  const [tab, setTab] = useState("Profile");
  return (
    <>
      <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
        <div className="flex items-center gap-[5px]">
          <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
            COAL
          </h1>
          <RightIcon />
          <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
            User Profile
          </h1>
          <RightIcon />
          <h1 className="font-[Archivo] text-[12px] font-normal text-[#000]">
            User 1
          </h1>
        </div>
        <LockIcon />
      </div>

      <div className="sm:px-[22px] px-[16px] ">
        <div className="mt-[18px] flex  gap-[10px] items-center sm:justify-start justify-between">
          <button
            onClick={() => setTab("Profile")}
            className={`${
              tab === "Profile"
                ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
            } pb-3  border-b-2`}
          >
            Profile
          </button>
          <button
            onClick={() => setTab("Apimanagement")}
            className={`${
              tab === "Apimanagement"
                ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
            } pb-3  border-b-2`}
          >
            API-Management
          </button>
          <button
            onClick={() => setTab("Usage")}
            className={`${
              tab === "Usage"
                ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
            } pb-3  border-b-2`}
          >
            Usage
          </button>
          <button
            onClick={() => setTab("Billing")}
            className={`${
              tab === "Billing"
                ? "font-bold border-[#0D859A] sm:text-[14px] text-[12px] text-[#0D859A]"
                : "sm:text-[14px] text-[12px] font-medium font-Inter text-[#464F60] border-transparent"
            } pb-3  border-b-2`}
          >
            Billing
          </button>
        </div>
        <div className="sm:mt-[34px] mt-[10px] w-full overflow-x-auto">
          {tab === "Profile" && <Profile />}
          {tab === "Apimanagement" && <Apimanagement />}
          {tab === "Usage" && <Usage />}
          {tab === "Billing" && <Billing />}
        </div>
      </div>
    </>
  );
};

export default Pageprofile;
