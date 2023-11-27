import { PlusIcon, RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

const Usage = () => {
  const [open, setopen] = useState(true);
  const [click, setClick] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      <div>
        <p className="sm:text-[16px] text-[14px] font-normal font-Archivo text-[#000000] mt-[10px] max-w-[820px]">
          Enter the API keys of each Model Provider, which you want to use in
          the the playground of coai monitoring solution. The API keys are not
          stored server side, rather are stored on client side. The api will be
          directly provided to the model provider not to coai. Only the Input
          and Response is stored on coai servers for tracing and versioning.
        </p>

        <div className="sm:w-[465px] w-auto mt-[60px]">
          <div className="">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              OPENAI
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap ">
              <div className="sm:w-[360px] w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full  mx-auto max-w-[470px]">
                      <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none border border-[#ccc] px-[41px]">
                        <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                          Generated API-KEY
                        </h3>
                        <p className="text-left text-[16px] font-light font-Inter text-[#454B54] ">
                          The following API-KEY was created. Be Sure that this
                          key will only be shown once. Copy it. If you forget
                          it, please recreate a new one.
                        </p>
                        <input
                          type="text"
                          name="emailaddresss"
                          id="emailaddresss"
                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                          placeholder="coai-ske234fsf3-4refrwqr-213-err3"
                        />

                        <div className="flex justify-center my-[18px] gap-[36px]">
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Copy key to clipboard
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for openAI.
            </p>
          </div>
          <div className="my-[31px]">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Huggingface
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap">
              <div className="sm:w-[360px]  w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full  mx-auto max-w-[470px]">
                      <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none border border-[#ccc] px-[41px]">
                        <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                          Generated API-KEY
                        </h3>
                        <p className="text-left text-[16px] font-light font-Inter text-[#454B54] ">
                          The following API-KEY was created. Be Sure that this
                          key will only be shown once. Copy it. If you forget
                          it, please recreate a new one.
                        </p>
                        <input
                          type="text"
                          name="emailaddresss"
                          id="emailaddresss"
                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                          placeholder="coai-ske234fsf3-4refrwqr-213-err3"
                        />

                        <div className="flex justify-center my-[18px] gap-[36px]">
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Copy key to clipboard
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for Huggingface.
            </p>
          </div>
          <div className="">
            <label
              for="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Together.ai
            </label>
            <div className="flex items-center sm:gap-[22px] gap-[0px] flex-wrap">
              <div className="sm:w-[360px]  w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************************"
                  class="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full   font-normal text-[15px] font-Inter"
                  required=""
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
              >
                <FiPlus /> Save
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full  mx-auto sm:max-w-[470px] max-w-[270px]">
                      <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none border border-[#ccc] sm:px-[41px] px-[20px]">
                        <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                          Generated API-KEY
                        </h3>
                        <p className="text-left text-[16px] font-light font-Inter text-[#454B54] ">
                          The following API-KEY was created. Be Sure that this
                          key will only be shown once. Copy it. If you forget
                          it, please recreate a new one.
                        </p>
                        <input
                          type="text"
                          name="emailaddresss"
                          id="emailaddresss"
                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                          placeholder="coai-ske234fsf3-4refrwqr-213-err3"
                        />

                        <div className="flex justify-center my-[18px] gap-[36px] flex-wrap">
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Copy key to clipboard
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Enter the API-Key for Togehter.ai.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usage;
