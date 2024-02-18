import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const GenerateShareModal = ({
  shareModal,
  setShareModal,
  selectedProjectID,
  selectedDatasetID,
}) => {
  const [shareCode, setShareCode] = useState("");
  const [copied, setCopied] = useState(false);
  const handleGenerateCode = async () => {
    try {
      let formData = {};
      if (selectedProjectID) {
        formData = {
          project_id: selectedProjectID,
        };
      } else if (selectedDatasetID) {
        formData = {
          dataset_id: selectedDatasetID,
        };
      }

      const response = await fetch("/api/manageShareCode", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setShareCode(responseData.share_code);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(shareCode)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Unable to copy text: ", err);
      });
  };

  useEffect(() => {
    handleGenerateCode();
  }, []);

  return (
    <div>
      <Transition.Root show={shareModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShareModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#000] bg-opacity-[.4] transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-0 pt-[10px] pb-[16px] px-[8px] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-[442px]">
                  <div className="max-w-[360px] mx-auto">
                    <Dialog.Title>
                      <p className="text-center">Generated Share Code</p>
                    </Dialog.Title>
                    <p className="text-[#68727D] mt-[7px] mb-[6px] text-[14px]">
                      The following Share Code was created. Be Sure that this
                      code will only be shown once. Copy it. If you forget it,
                      please recreate a new one.{" "}
                    </p>
                    <div className="border-[#EAEBF0] border-[1px] bg-[#F7F7F8] text-[15px] rounded-md mt-[6px] text-center py-[9px]">
                      {shareCode}
                    </div>
                    <div className="mt-[13px] flex justify-center gap-[14px]">
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                      >
                        {copied ? "Text copied" : "Copy code"} to clipboard
                      </button>
                      <button
                        onClick={() => {
                          setShareModal(false);
                          setCopied(false);
                        }}
                        className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default GenerateShareModal;
