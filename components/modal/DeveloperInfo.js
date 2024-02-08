import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";

const DeveloperInfo = ({ active, setActive, name, selectedID }) => {
  const [userID, setUserID] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    let textToCopy;
    if (name === "dataset") {
      textToCopy = `import coai_eval as coai
from coai_eval.config.config import Config
from coai_eval.coai_datasets.dataset_manager import DatasetManager
Config.set_user_id("${userID}")

dataset_manager = DatasetManager()
dataset = dataset_manager.load_custom_dataset("${selectedID}")`;
    } else if (name === "project") {
      textToCopy = `import coai_eval as coai
from coai_eval.config.config import Config
Config.set_user_id("${userID}")
Config.set_project_id("${selectedID}")`;
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard");
        setCopied(true);
      })
      .catch((err) => {
        console.error("Unable to copy text: ", err);
        // Handle errors if copying fails
      });
  };

  useEffect(() => {
    const value = Cookies.get("user_id");
    setUserID(value);
  }, []);

  return (
    <>
      <Transition.Root show={active} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setActive}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[794px] sm:p-[10px_24px_17px_16px] p-[10px_24px_17px_6px]">
                  <div>
                    <h1 className="text-[14px] font-medium text-center">
                      {name === "dataset"
                        ? "Load this dataset"
                        : "Use this project"}{" "}
                      in the coai-eval Framework
                    </h1>
                    <div className="font-Azeret mt-[20px] p-[10px]">
                      <div className="flex gap-[16px]">
                        <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                          1
                        </p>
                        <p className="text-[#24292E] text-[13px]">
                          <span className="text-[#D73A49]">import</span>{" "}
                          coai_eval <span className="text-[#D73A49]">as</span>{" "}
                          coai
                        </p>
                      </div>
                      <div className="flex gap-[16px]">
                        <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                          2
                        </p>
                        <p className="text-[#24292E] text-[13px]">
                          <span className="text-[#D73A49]">from</span>{" "}
                          coai_eval.config.config import Config
                        </p>
                      </div>
                      {name === "project" && (
                        <>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              3
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              Config.set_user_id
                              <span className="text-[#032F62]">
                                {/* {`("<your_user_id>")`} */}
                                {`("${userID}")`}
                              </span>
                            </p>
                          </div>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              4
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              Config.set_project_id
                              <span className="text-[#032F62]">
                                {`("${selectedID}")`}
                              </span>
                            </p>
                          </div>
                        </>
                      )}
                      {name === "dataset" && (
                        <>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              3
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              <span className="text-[#D73A49]">from</span>{" "}
                              coai_eval.coai_datasets.dataset_manager import
                              DatasetManager
                            </p>
                          </div>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              4
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              Config.set_user_id
                              <span className="text-[#032F62]">
                                {`("${userID}")`}
                              </span>
                            </p>
                          </div>
                          <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                            5
                          </p>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              6
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              dataset_manager = DatasetManager()
                            </p>
                          </div>
                          <div className="flex gap-[16px]">
                            <p className="text-[rgba(36,41,46,.3)] text-[13px]">
                              7
                            </p>
                            <p className="text-[#24292E] text-[13px]">
                              dataset = dataset_manager.load_custom_dataset
                              <span className="text-[#032F62]">
                                {`("${selectedID}")`}
                              </span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleCopy}
                        className="bg-[#D4DB33] rounded-[6px] text-black w-[60px] h-[32px] text-[14px] flex justify-center items-center"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DeveloperInfo;
