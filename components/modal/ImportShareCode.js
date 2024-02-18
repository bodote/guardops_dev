import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const ImportShareCode = ({ importShare, setImportShare, name }) => {
  const [code, setCode] = useState("");
  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/manageShareCode", {
        method: "POST",
        body: JSON.stringify({ code, name }),
      });

      if (response.ok) {
        toast.success("Project successfully imported !!");
        setImportShare(false);
      }
      if (!response.ok) {
        toast.error("Please check your share code");
      }
    } catch (error) {
      console.error("API request failed:", response.statusText);
    }
  };
  return (
    <div>
      <Transition.Root show={importShare} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setImportShare}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-0 pt-[34px] pb-[15px] px-[8px] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-[319px]">
                  <div className="max-w-[209px] mx-auto">
                    <Dialog.Title>
                      <p className="text-center text-[14px] font-medium">
                        Enter Share Code
                      </p>
                    </Dialog.Title>
                    <input
                      name="code"
                      id="code"
                      value={code}
                      placeholder="Share Code"
                      className="border-[#CCCCCC] border-[1px] text-center placeholder:text-[#464F60] text-[#464F60] mt-[18px] rounded-[6px] outline-none text-[12px] w-full py-[5px]"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <div className="mt-[30px] flex justify-center gap-[14px]">
                      <button
                        onClick={() => setImportShare(false)}
                        className=" bg-[#E33B32] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                      >
                        Confirm
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

export default ImportShareCode;
