import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  LockIcon,
  PlusIcon,
  RightIcon,
} from "@/public/Assets/Icons/Allsvg";
import { useUser } from "@auth0/nextjs-auth0/client";
import AddProjectModal from "@/components/modal/AddProjectModal";
import { useRouter } from "next/navigation";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { IoAdd, IoChevronDownOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const people = [
  {
    id: 1,
    name: "Select a dataset",
  },
  {
    id: 2,
    name: "DIAS Assistant",
  },
  {
    id: 3,
    name: "Simon Marius GPT",
  },
  {
    id: 4,
    name: "PlantUML GPT",
  },
  {
    id: 5,
    name: "MDZ",
  },
  {
    id: 6,
    name: "New Project ...",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProjectStatus, setCreateProjectStatus] = useState("new");
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectForDelete, setSelectedProjectForDelete] = useState("");
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(people[0]);

  const router = useRouter();
  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleProjectClick = (project_id) => {
    router.push(`/projects/${project_id}`);
  };
  const handleProjectDelete = async (activity) => {
    if ((activity = "delete")) {
      const formData = {
        user_id: "demouser1",
        project_id: selectedProjectForDelete.project_id,
      };

      try {
        const response = await fetch("/api/manageProjects", {
          method: "DELETE",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success(`Project deleted successfully !!`);
          getProjectList();
        } else {
          toast.error(`API request failed !!`);
          console.error("API request failed:", response.statusText);
        }
      } catch (error) {
        toast.error(`${error.message}`);
        console.error("Error during API request:", error);
      }
    }
  };

  const getProjectList = async () => {
    try {
      const user_id = "demouser1";
      const response = await fetch(`/api/manageProjects?user_id=${user_id}`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.projects) {
          setProjectList(responseData.projects);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleProjectEdit = (project) => {
    if (!isModalOpen) {
      setSelectedProjectForEdit(project);
      setIsModalOpen(true);
      setCreateProjectStatus("existing");
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
    getProjectList();
  }, []);

  return (
    <div className="sm:px-[55px] px-[16px]">
      <div>
        <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
          Projects
        </h1>
        <div className="flex xl:gap-[45px] sm:gap-[30px] gap-[10px] flex-wrap ">
          {projectList.length &&
            projectList.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-[8px]"
                      onClick={() => handleProjectClick(ele.project_id)}
                    >
                      <img
                        src="/Assets/Images/Union.png"
                        alt=""
                        className="w-[23px]"
                      />
                      <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                        {ele.name}
                      </h2>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleProjectEdit(ele)}>
                        <EditBlackIcon />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectForDelete(ele);
                          setOpen(true);
                        }}
                      >
                        <DeleteBlackIcon />
                      </button>
                      <Transition.Root show={open} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          // initialFocus={cancelButtonRef}
                          onClose={setOpen}
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
                                          Delete selected API-Key
                                        </h3>
                                        <p className="text-left text-[14px] font-medium font-Inter text-[#68727D] ">
                                          The project you are trying to delete
                                          has 20 traces in it. Do you want to
                                          delete them or move them to a
                                          different project?
                                        </p>
                                        <input
                                          type="text"
                                          name="emailaddresss"
                                          id="emailaddresss"
                                          placeholder={
                                            selectedProjectForDelete.name
                                          }
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
                                            onClick={() => setActive(true)}
                                            className=" bg-[#D4DB33] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                                          >
                                            Move Traces
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
                      <Transition.Root show={active} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          // initialFocus={cancelButtonRef}
                          onClose={setActive}
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
                                      <Listbox
                                        value={selected}
                                        onChange={setSelected}
                                      >
                                        {({ open }) => (
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
                                                show={open}
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
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
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
                                          onClick={() => setActive(false)}
                                          className=" bg-[#E33B32] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                                        >
                                          cancel
                                        </button>
                                        <button
                                          onClick={() => setActive(false)}
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
                    </div>
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
              );
            })}

          <div
            onClick={() => {
              setCreateProjectStatus("new");
              setIsModalOpen(true);
            }}
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
              <AddProjectModal
                updateProjectList={getProjectList}
                setIsModalOpen={setIsModalOpen}
                project_status={createProjectStatus}
                values={
                  createProjectStatus !== "new" ? selectedProjectForEdit : null
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
