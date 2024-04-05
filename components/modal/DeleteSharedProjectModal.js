import React, { useState, Fragment } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";

const DeleteSharedProjectModal = ({
  open,
  setOpen,
  selectedProjectForDelete,
  selected,
  setSelected,
  people,
  handleProjectDelete,
}) => {
  const [moveToTraceModelOpen, setMoveToTraceModelOpen] = useState(false);
  const [chekval, setChekval] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
          onClose={setChekval}
        >
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
                          Delete selected Project{" "}
                        </h3>
                        <p className="text-left text-[14px] font-medium font-Inter text-[#68727D] ">
                          This is a shared project. 
                          You can delete it but all the traces can only be manipulated by the project owner.
                        </p>
                        <input
                          type="text"
                          name="emailaddresss"
                          id="emailaddresss"
                          placeholder={selectedProjectForDelete.name}
                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
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
      <Transition.Root show={moveToTraceModelOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
          onClose={setMoveToTraceModelOpen}
        >
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
                      <h1 className="text-[14px] text-black text-center font-medium mb-3 mt-[20px]">
                        Select Dataset to add to
                      </h1>
                      <Listbox value={selected} onChange={setSelected}>
                        {({ opens }) => (
                          <>
                            <div className="relative mt-2 max-w-[290px] w-full mx-auto">
                              <Listbox.Button className="relative w-full cursor-default rounded-[7px] bg-white pl-3 pr-10 text-left text-gray-900 border-[1px] border-[#ccc] sm:text-sm sm:leading-6 ">
                                <span className="flex items-center">
                                  <span className="ml-2 block truncate text-[12px]">
                                    {selected.name}
                                  </span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                  <IoChevronDownOutline
                                    className="text-[14px] text-black"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={opens}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-[8px] bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-[1px] border-[#ccc] shadow-none">
                                  {people.map((person) => (
                                    <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-[#eee]"
                                            : "text-gray-900",
                                          "relative cursor-default select-none py-[4px] pl-3 pr-9 text-[12px]"
                                        )
                                      }
                                      value={person}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "ml-3 block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            ></span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                      <div className="max-w-[290px] w-full flex justify-between items-center mx-auto mt-[30px] pb-[20px]">
                        <button
                          onClick={() => setMoveToTraceModelOpen(false)}
                          className=" bg-[#E33B32] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                        >
                          cancel
                        </button>
                        <button
                          onClick={() => setMoveToTraceModelOpen(false)}
                          className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                        >
                          Confirm
                        </button>
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

export default DeleteSharedProjectModal;
