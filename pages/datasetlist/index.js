import React, { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { LockIcon, PlusIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import Intromodel from "@/components/modal/AddProjectModal";
import Link from "next/link";
import DatasetSection from "@/components/DatasetSection/DatasetSection";

const DatasetList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

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

  return (
    <>
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
                Projects
              </h1>
            </div>
            <a href="/api/auth/logout">
              <LockIcon />
            </a>
          </div>
          <DatasetSection />
        </div>
      </div>
    </>
  );
};

export default DatasetList;
