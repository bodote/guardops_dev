import React, { useEffect, useState, useRef } from "react";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  PlusIcon,
} from "@/public/Assets/Icons/Allsvg";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import AddDatasetModal from "@/components/modal/AddDatasetModal";
import DeleteDatasetModal from "../modal/DeleteDatasetModal";

const DatasetSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datasetList, setDatasetList] = useState([]);
  const [createDatasetStatus, setCreateDatasetStatus] = useState("new");
  const [selectedDatasetForDelete, setSelectedDatasetForDelete] = useState("");
  const [selectedDatasetForEdit, setSelectedDatasetForEdit] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const modalRef = useRef();
  const [open, setOpen] = useState(false);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleProjectClick = (dataset_id) => {
    router.push(`/datasets/${dataset_id}`);
  };

  const getDatasetList = async () => {
    try {
      const user_id = "demouser1";
      const response = await fetch(`/api/manageDataset?user_id=${user_id}`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.datasets) {
          setDatasetList(responseData.datasets);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  const handleDatasetEdit = (project) => {
    if (!isModalOpen) {
      setSelectedDatasetForEdit(project);
      setIsModalOpen(true);
      setCreateDatasetStatus("existing");
    }
  };

  const handleDatasetDelete = async (activity) => {
    if ((activity = "delete")) {
      const formData = {
        user_id: "demouser1",
        dataset_id: selectedDatasetForDelete.dataset_id,
      };

      try {
        const response = await fetch("/api/manageDataset", {
          method: "DELETE",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          getDatasetList();
        } else {
          console.error("API request failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
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
    getDatasetList();
  }, []);

  return (
    <div className="sm:px-[55px] px-[16px]">
      <div>
        <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
          Datasets
        </h1>
        <div className="flex xl:gap-[45px] sm:gap-[30px] gap-[10px] flex-wrap ">
          {datasetList.length &&
            datasetList.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-[8px]"
                      onClick={() => handleProjectClick(ele.dataset_id)}
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
                      <button onClick={() => handleDatasetEdit(ele)}>
                        <EditBlackIcon />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDatasetForDelete(ele);
                          setOpen(true);
                        }}
                      >
                        <DeleteBlackIcon />
                      </button>
                      {open && (
                        <DeleteDatasetModal
                          open={open}
                          setOpen={setOpen}
                          selectedProjectForDelete={selectedDatasetForDelete}
                          handleProjectDelete={handleDatasetDelete}
                        />
                      )}
                      {/* <Transition.Root show={open} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          initialFocus={cancelButtonRef}
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
                                            selectedDatasetForDelete.name
                                          }
                                          className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                                        />

                                        <div className="flex justify-center my-[12px] sm:gap-[16px] gap-[8px] flex-wrap">
                                          <button
                                            onClick={() => {
                                              handleDatasetDelete("delete");
                                              setOpen(false);
                                            }}
                                            className=" bg-[#E33B32] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                                          >
                                            Delete
                                          </button>
                                          <button
                                            onClick={() => setOpen(false)}
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
                      </Transition.Root> */}
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
              setCreateDatasetStatus("new");
              setIsModalOpen(true);
            }}
            className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
          >
            <div className="flex items-center gap-[8px]">
              <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
              <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                Add Datasets
              </h2>
            </div>
            <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
              Create a Dataset for Finetuning, Evaluation and Curation
            </p>
          </div>
          {isModalOpen && (
            <div
              ref={modalRef}
              className="modal sm:w-[600px] w-auto absolute bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto"
            >
              <AddDatasetModal
                updateProjectList={getDatasetList}
                isModalOpen={setIsModalOpen}
                dataset_status={createDatasetStatus}
                values={
                  createDatasetStatus !== "new" ? selectedDatasetForEdit : null
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetSection;
