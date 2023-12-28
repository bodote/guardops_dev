import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const DeleteDatasetModal = ({
  open,
  setOpen,
  selectedProjectForDelete,
  handleProjectDelete,
}) => {
  const [chekval, setChekval] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setChekval}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg border-[#BDBDBD] border-[1px] bg-white text-left transition-all sm:w-[442px]">
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none ">
                    <div className="relative w-full  mx-auto max-w-[470px]">
                      <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none  sm:px-[41px] px-[15px]">
                        <h3 className="text-[14px] font-medium font-Inter text-[#000000] pb-[12px] pt-[16px] text-center">
                          Delete selected API-Key
                        </h3>
                        <p className="text-left text-[14px] font-medium font-Inter text-[#68727D] ">
                          The project you are trying to delete has 20 traces in
                          it. Do you want to delete them or move them to a
                          different project?
                        </p>
                        <input
                          type="text"
                          name="projectName"
                          id="projectName"
                          placeholder={selectedProjectForDelete.name}
                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                          disabled
                        />

                        <div className="flex justify-center my-[12px] sm:gap-[16px] gap-[8px] flex-wrap">
                          <button
                            onClick={() => {
                              handleProjectDelete("delete");
                              setOpen(false);
                            }}
                            className=" bg-[#E33B32] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => setOpen(false)}
                            className=" bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
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

export default DeleteDatasetModal;
