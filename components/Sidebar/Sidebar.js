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
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const [role, setRole] = useState("");
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

  const dynamicClassName = `trans ${isHovered ? "hovered-class" : ""}`;
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
            <div
              className={
                open
                  ? "sm:pl-[21px] pl-[12px] group-hover:pr-[45px] trans opened"
                  : "sm:px-[21px] px-[12px] group-hover:pr-[45px] trans"
              }
            >
              <button
                onClick={() => setOpen(!open)}
                className="flex gap-[10px] items-center mt-[27px]"
              >
                <LeftIcon className="w-[24px] rotate-[180deg] group-hover:hidden trans" />
                <LeftIcon className="w-[24px] rotate-[0] group-hover:block hidden" />
                <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                  Close
                </p>
              </button>
              <div>
                {role?.includes("Full_Access") && (
                  <a
                    href="/projects"
                    className="flex gap-[10px] items-center mt-[47px]"
                  >
                    <HomeIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Home
                    </p>
                  </a>
                )}
                {(role?.includes("Projects") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/projectlist"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <ProjectIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Projects
                    </p>
                  </a>
                )}
                {(role?.includes("Datasets") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/datasetlist"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <DatasetIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Datasets
                    </p>
                  </a>
                )}
                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/playground"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <TraceIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Playground
                    </p>
                  </a>
                )}

  {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/prompting"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <PromptingIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Prompting
                    </p>
                  </a>
                )}
                {(role?.includes("Evaluation") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/evaluation"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <ChartIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Evaluation
                    </p>
                  </a>
                )}
                {(role?.includes("Monitoring") ||
                  role?.includes("Full_Access")) && (
                  <a
                    href="/monitoring"
                    className="flex gap-[10px] items-center mt-[30px]"
                  >
                    <MonitoringIcon className="w-[24px]" />
                    <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                      Monitoring
                    </p>
                  </a>
                )}
                {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                <a
                  href="/leaderboard"
                  className="flex gap-[10px] items-center mt-[30px]"
                >
                  <StarIcon className="w-[24px]" />
                  <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                    Leaderboard
                  </p>
                </a>
                  )}
                   {(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                <a
                  href="/prompthub"
                  className="flex gap-[10px] items-center mt-[30px]"
                >
                  <HubIcon className="w-[24px]" />
                  <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                    Prompt Hub
                  </p>
                </a>

              )}

{(role?.includes("Playground") ||
                  role?.includes("Full_Access")) && (
                <a
                  href="/knowledge"
                  className="flex gap-[10px] items-center mt-[30px]"
                >
                  <KnowledgeIcon className="w-[24px]" />
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
          <div
            className={
              open
                ? "mb-[50px] sm:px-[21px] px-[16px] group-hover:pr-[45px] trans opened"
                : "mb-[50px] sm:px-[21px] px-[16px] group-hover:pr-[45px] trans"
            }
          >
            <a href="/pageprofile" className="flex gap-[10px] items-center">
              <UserIcon className="w-[24px]" />
              <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                Account
              </p>
            </a>
            <a href="https://docs.co-ai.de/" className="flex gap-[10px] items-center">
            <div className="flex gap-[10px] items-center mt-[30px]">
              <SaleIcon className="w-[24px]" />
              <p className="text-[12px] font-Archivo font-normal leading-[normal] hidden">
                Docs
              </p>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
