import React, { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  ClosecrossIcon,
  LockIcon,
  PlusIcon,
  RightIcon,
  RightcircleIcon,
} from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import Intromodel from "@/components/Intro/Intromodel";

const Intro = () => {
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
        <div className="h-screen overflow-y-auto ml-[96px] w-full">
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
            <a href="/">
        <LockIcon />
        </a>
          </div>
          <div className="sm:px-[55px] px-[16px]">
            <div>
              <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
                Projects
              </h1>
              <div className="flex xl:gap-[45px] sm:gap-[30px] gap-[10px] flex-wrap ">
                <a
                  href="/projects"
                  className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                      DIAS Assistant
                    </h2>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: 7245
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: 0,25
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: 28
                    </p>
                  </div>
                  <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: 2.425.453
                  </p>
                </a>
                <div className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                      PlantUML GPT
                    </h2>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: 2563
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: 0,25
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: 59
                    </p>
                  </div>
                  <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: 2.425.453
                  </p>
                </div>
                <div className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                      Simon Marius GPT
                    </h2>
                  </div>
                  <div className="flex sm:gap-[44px] gap-[20px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: -
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: -
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: -
                    </p>
                  </div>
                  <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: -
                  </p>
                </div>
                <div className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                      MDZ
                    </h2>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: 7245
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: 0,25
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: 28
                    </p>
                  </div>
                  <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: 2.425.453
                  </p>
                </div>
                <div
                  onClick={openModal}
                  className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                      New Project
                    </h2>
                  </div>
                  <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
                    Create a new Project for Logging and Tracing
                  </p>
                </div>
                {isModalOpen && (
                  <div
                    ref={modalRef}
                    className="modal sm:w-[600px] w-auto absolute bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto"
                  >
                    <Intromodel />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
                Datasets
              </h1>
              <div className="flex xl:gap-[45px] sm:gap-[30px] gap-[10px] flex-wrap ">
                <div className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px]  font-thin text-[#000]">
                      Eval-Dataset Conversations
                    </h2>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: 7245
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: 0,25
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: 28
                    </p>
                  </div>
                  <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: 2.425.453
                  </p>
                </div>
                <div className="hover:border-[#000] hover:bg-[#0D859A] group xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000]">
                      New Dataset
                    </h2>
                  </div>
                  <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
                    Create a Dataset for Finetuning, Evaluation and Curation
                  </p>
                </div>
              </div>
            </div>

            <div className=" lg:my-[142px] sm:my-[70px] my-0">
              <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
                Evaluations
              </h1>
              <div className=" hover:border-[#000] hover:bg-[#0D859A] group xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]">
                <div className="flex items-center gap-[8px]">
                  <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
                  <h2 className="group-hover:text-white font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                    New Evaluation
                  </h2>
                </div>
                <p className="group-hover:text-white font-Archivo lg:text-[13px] text-[11px] font-light text-[#000] mt-[10px]">
                  Create a Run for Evaluation your model using a Dataset
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
