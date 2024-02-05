import React, { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { LockIcon, PlusIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import ProjectSection from "@/components/ProjectSection/ProjectSection";
import DatasetSection from "@/components/DatasetSection/DatasetSection";
import EvaluationSection from "@/components/EvaluationSection/EvaluationSection";
import Logout from "@/components/Logout/Logout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Cookies from "js-cookie";

const projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUser, setUser] = useState("");
  const modalRef = useRef();

  const { user } = useUser();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const cookie = Cookies.get("user_id");
    if (cookie) {
      setUser(cookie);
    }
    if (!cookie && user) {
      Cookies.set("user_id", user?.sub);
      setUser(user?.sub);
    }
  }, [user]);

  return (
    <>
      {isUser && (
        <div className="flex">
          <Sidebar />
          <div className="h-screen overflow-y-auto sm:ml-[96px] ml-[72px] w-full">
            <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
              <div className="flex items-center gap-[5px]">
                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                  COAI
                </h1>
                <RightIcon />
                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                  Home
                </h1>
              </div>
              <Logout />
            </div>
            <div className="">
              <ProjectSection />
              <DatasetSection />
              <EvaluationSection />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default projects;
