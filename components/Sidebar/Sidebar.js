import React, { useEffect, useState } from "react";
import {
  ChartIcon,
  DatasetIcon,
  HomeIcon,
  HubIcon,
  LeftIcon,
  MonitoringIcon,
  ProjectIcon,
  SaleIcon,
  StarIcon,
  TraceIcon,
  UserIcon,
  KnowledgeIcon,
  PromptingIcon
} from "@/public/Assets/Icons/Allsvg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Cookies from "js-cookie";
import { getUserRole } from "@/helper/getRole";

const Sidebar = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const [role, setRole] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  // Load pinned state from localStorage on component mount
  useEffect(() => {
    const savedPinnedState = localStorage.getItem('sidebarPinned');
    if (savedPinnedState !== null) {
      setIsPinned(JSON.parse(savedPinnedState));
    }
  }, []);

  // Save pinned state to localStorage whenever it changes
  const togglePinned = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    localStorage.setItem('sidebarPinned', JSON.stringify(newPinnedState));
  };

  // Get current path on client side
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Helper function to check if a menu item is active
  const isActive = (path) => {
    return currentPath === path || currentPath.startsWith(path);
  };

  // Helper function to get menu item classes
  const getMenuItemClasses = (path) => {
    const baseClasses = "flex gap-[10px] items-center transition-all duration-200";
    const activeClasses = "bg-[#D4DB33]/10 border-r-2 border-[#D4DB33] text-[#0D859A]";
    const inactiveClasses = "hover:bg-slate-50";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const getRole = async () => {
    const roles = await getUserRole();
    if (roles) {
      setRole(roles);
    }
  };
  useEffect(() => {
    getRole();
  }, []);

  const isExpanded = isPinned || isHovered;
  const dynamicClassName = `trans ${isExpanded ? "hovered-class" : ""}`;

  return (
    <div>
      <div className="sm:p-[12px] p-[6px] flex flex-col justify-between gap-[40px] h-screen overflow-auto border-r-[#CCCCCC] border-r-[1px] w-fit cursor-pointer trans absolute left-0 bg-[#fff] z-10">
        <div
          className={dynamicClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/Assets/Images/Logo.png"
            alt="Logo"
            className="sm:w-auto w-[60px]"
          />
          <div className=" trans group">
            <div className="sm:px-[21px] px-[12px] group-hover:pr-[45px] trans">
              <button
                onClick={togglePinned}
                className={`flex gap-[10px] items-center mt-[27px] p-2 rounded-lg transition-all duration-200 ${isPinned
                  ? "bg-[#D4DB33]/20 text-[#0D859A]"
                  : "hover:bg-slate-100 text-slate-600"
                  }`}
                title={isPinned ? "Release sidebar" : "Fixate sidebar"}
              >
                {isPinned ? (
                  <LeftIcon className="w-[24px] rotate-[0deg] transition-all duration-200" />
                ) : (
                  <LeftIcon className="w-[24px] rotate-[180deg] transition-all duration-200" />
                )}
                <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                  {isPinned ? "Release" : "Fixate"}
                </p>
              </button>
              <div>
                {role?.includes("Full_Access") && (
                  <a
                    href="/projects"
                    className={`${getMenuItemClasses("/projects")} mt-[47px] py-2 px-3 rounded-r-lg -mr-3`}
                  >
                    <HomeIcon className={`w-[24px] ${isActive("/projects") ? "text-[#0D859A]" : ""}`} />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Home
                    </p>
                  </a>
                )}
                {(role?.includes("Projects") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/projectlist"
                      className={`${getMenuItemClasses("/projectlist")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <ProjectIcon className={`w-[24px] ${isActive("/projectlist") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Projects
                      </p>
                    </a>
                  )}
                {(role?.includes("Datasets") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/datasetlist"
                      className={`${getMenuItemClasses("/datasetlist")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <DatasetIcon className={`w-[24px] ${isActive("/datasetlist") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Datasets
                      </p>
                    </a>
                  )}
                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/playground"
                      className={`${getMenuItemClasses("/playground")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <TraceIcon className={`w-[24px] ${isActive("/playground") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Playground
                      </p>
                    </a>
                  )}

                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/prompting"
                      className={`${getMenuItemClasses("/prompting")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <PromptingIcon className={`w-[24px] ${isActive("/prompting") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Prompting
                      </p>
                    </a>
                  )}
                {(role?.includes("Evaluation") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/evaluation"
                      className={`${getMenuItemClasses("/evaluation")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <ChartIcon className={`w-[24px] ${isActive("/evaluation") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Evaluation
                      </p>
                    </a>
                  )}
                {(role?.includes("Monitoring") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/monitoring"
                      className={`${getMenuItemClasses("/monitoring")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <MonitoringIcon className={`w-[24px] ${isActive("/monitoring") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Monitoring
                      </p>
                    </a>
                  )}
                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/leaderboard"
                      className={`${getMenuItemClasses("/leaderboard")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <StarIcon className={`w-[24px] ${isActive("/leaderboard") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Leaderboard
                      </p>
                    </a>
                  )}
                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/prompthub"
                      className={`${getMenuItemClasses("/prompthub")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <HubIcon className={`w-[24px] ${isActive("/prompthub") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Prompt Hub
                      </p>
                    </a>

                  )}

                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                    <a
                      href="/knowledge"
                      className={`${getMenuItemClasses("/knowledge")} mt-[30px] py-2 px-3 rounded-r-lg -mr-3`}
                    >
                      <KnowledgeIcon className={`w-[24px] ${isActive("/knowledge") ? "text-[#0D859A]" : ""}`} />
                      <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                        Knowledge
                      </p>
                    </a>

                  )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={dynamicClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mb-[50px] sm:px-[21px] px-[16px] group-hover:pr-[45px] trans">
            <a href="/pageprofile" className={`${getMenuItemClasses("/pageprofile")} py-2 px-3 rounded-r-lg -mr-3`}>
              <UserIcon className={`w-[24px] ${isActive("/pageprofile") ? "text-[#0D859A]" : ""}`} />
              <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                Account
              </p>
            </a>
            <a href="https://docs.co-ai.de/" className="flex gap-[10px] items-center hover:bg-slate-50 transition-all duration-200 py-2 px-3 rounded-r-lg -mr-3 mt-[30px]">
              <SaleIcon className="w-[24px]" />
              <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                Docs
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
