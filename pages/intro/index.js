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
        <div className="h-screen overflow-y-auto ml-[96px]">
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
            <LockIcon />
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
                    <div className="border-b border-b-[#CCCCCC]">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
                      >
                        <RightcircleIcon />
                      </button>
                    </div>
                    <div className="sm:px-[35px] px-[16px] py-[29px]">
                      <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
                        Create New Project
                      </h1>
                      <div className="sm:mt-[53px] mt-[10px]">
                        <label
                          for="name"
                          className="text-[#252525] font-medium text-[14px] font-Inter"
                        >
                          Name of Project
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter"
                          placeholder="NegotiationGPT"
                        />
                        <p className="text-[#68727D] font-normal text-[14px] font-Inter">
                          Enter name of Project
                        </p>
                      </div>
                      <div className="mt-[36px]">
                        <label
                          for="name"
                          className="text-[#252525] font-medium text-[14px] font-Inter"
                        >
                          Description of Project
                        </label>
                        <textarea
                          type="text"
                          name="message"
                          id="message"
                          className="h-[122px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter"
                          placeholder="Input Text"
                        />
                        <p className="text-[#68727D] font-normal text-[14px] font-Inter">
                          Give a clear Description of the Project you want to
                          start
                        </p>
                      </div>
                      <div className="sm:mt-[45px] mt-[35px] sm:mb-[61px] mb-[30px]">
                        <div className="flex items-center justify-between">
                          <label
                            for="tag"
                            className="text-[#252525] font-medium text-[14px] font-Inter"
                          >
                            Tags
                          </label>
                          <p className="text-[#68727D] font-semibold text-[14px] font-Inter">
                            Clear
                          </p>
                        </div>
                        <div className="h-[48px] gap-[10px] border px-[10px] border-[#EAEBF0] my-[8px] rounded w-full flex items-center font-medium text-[15px] font-Inter">
                          <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
                            <p className="text-[#0D859A]">Law</p>
                            <ClosecrossIcon />
                          </div>
                          <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
                            <p className="text-[#0D859A]">GPT</p>
                            <ClosecrossIcon />
                          </div>
                          <div className="flex dap-[10px] bg-[#dbedf0] py-[6px] px-[8px] rounded-md w-fit items-center gap-[4px]">
                            <p className="text-[#0D859A]">Eval</p>
                            <ClosecrossIcon />
                          </div>
                        </div>
                        <p className="text-[#68727D] font-normal text-[14px] font-Inter">
                          Enter meaningful tags to ensure proper filtering later
                        </p>
                      </div>
                      <div className="flex gap-[16px] sm:flex-row flex-col">
                        <div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="hs-basic-with-description-checked"
                              className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent  rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                              disabled:opacity-50  checked:bg-none checked:text-[#0D859A] dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-600 before:inline-block 
                              before:w-6 before:h-6 before:bg-white checked:before:bg-[#fff] before:translate-x-0 checked:before:translate-x-full before:rounded-full"
                              checked
                            />
                          </div>
                        </div>
                        <div>
                          <h1 className="font-semibold text-[16px] font-Inter text-[#252525]">
                            Activate Retention
                          </h1>
                          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
                            Tracing Data will only be kept for the given period
                          </p>
                        </div>
                        <div class="slidecontainer">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            defaultValue="50"
                            className="slider"
                            id="myRange"
                          />
                          <p className="text-[#68727D] font-medium text-[14px] pl-[34px] mt-[4px] font-Inter">
                            15 page
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center sm:mt-[77px] mt-[50px]">
                        <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]">
                          <FiPlus />
                          Save Project
                        </button>
                      </div>
                    </div>
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
              <div className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]">
                <div className="flex items-center gap-[8px]">
                  <PlusIcon />
                  <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                    New Evaluation Run
                  </h2>
                </div>
                <p className="font-Archivo lg:text-[13px] text-[11px] font-light text-[#000] mt-[10px]">
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
