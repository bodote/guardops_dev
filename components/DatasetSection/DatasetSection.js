import React, { useEffect, useState, useRef } from "react";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  PlusIcon,
  LightIcon,
  Share2Icon,
  ImportIcon,
} from "@/public/Assets/Icons/Allsvg";
import { useRouter } from "next/navigation";
import AddDatasetModal from "@/components/modal/AddDatasetModal";
import DeleteModal from "../modal/DeleteModal";
import DeveloperInfo from "../modal/DeveloperInfo";
import ImportShareCode from "../modal/ImportShareCode";
import GenerateShareModal from "../modal/GenerateShareModal";

const DatasetSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datasetList, setDatasetList] = useState([]);
  const [createDatasetStatus, setCreateDatasetStatus] = useState("new");
  const [selectedDatasetForDelete, setSelectedDatasetForDelete] = useState("");
  const [selectedDatasetID, setSelectedDatasetID] = useState("");
  const [selectedDatasetForEdit, setSelectedDatasetForEdit] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const modalRef = useRef();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [importShare, setImportShare] = useState(false);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleDataSetClick = (dataset_id, dataset_name) => {
    router.push(`/datasets/${dataset_id}?name=${dataset_name}`);
  };

  const getDatasetList = async () => {
    setLoader(true);
    try {
      const response = await fetch(`/api/manageDataset`, {
        method: "GET",
      });

      if (response.ok) {
        setLoader(false);
        const responseData = await response.json();
        if (responseData.datasets) {
          setDatasetList(responseData.datasets);
        }
      } else {
        setLoader(false);
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
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

  const handleDatasetDelete = async () => {
    const formData = {
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
  };

  const handleGenerateShareCode = (datasetId) => {
    setShareModal(true);
    setSelectedDatasetID(datasetId);
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
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-[45px] sm:gap-[30px] gap-[10px] w-full">
          {!loader ? (
            datasetList.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="hover:border-[#000] hover:bg-[#f2f2f2] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-[8px]"
                      onClick={() =>
                        handleDataSetClick(ele.dataset_id, ele.name)
                      }
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
                      <button
                        onClick={() => handleGenerateShareCode(ele.dataset_id)}
                      >
                        <Share2Icon />
                      </button>
                      <button
                        onClick={() => {
                          setActive(true);
                          setSelectedDatasetID(ele.dataset_id);
                        }}
                      >
                        <LightIcon />
                      </button>
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
                        <DeleteModal
                          open={open}
                          setOpen={setOpen}
                          selectedDataForDelete={selectedDatasetForDelete}
                          handleDeleteData={handleDatasetDelete}
                          name="dataset"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Traces: {ele.stats.trace_count}
                    </p>
                    {/* <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      -Latenz: 0,25
                    </p>
                    <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                      Errors: 59
                    </p> */}
                  </div>
                  {/* <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                    Used Token: 2.425.453
                  </p> */}
                </div>
              );
            })
          ) : (
            <div className="flex">
              <div className="dot-loader"></div>
              <div className="dot-loader dot-loader--2"></div>
              <div className="dot-loader dot-loader--3"></div>
            </div>
          )}

          <div
            onClick={() => {
              setCreateDatasetStatus("new");
              setIsModalOpen(true);
            }}
            className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
          >
            <div className="flex items-center gap-[8px]">
              <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
              <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                New Dataset
              </h2>
            </div>
            <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
              Create a Dataset for Finetuning, Evaluation and Curation
            </p>
          </div>
          <div
            onClick={() => setImportShare(true)}
            className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
          >
            <div className="flex items-center gap-[8px]">
              <ImportIcon className="stroke-[#12131A] group-hover:stroke-white" />
              <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                Import Dataset
              </h2>
            </div>
            <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
              Import an existing dataset from a share code
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
          {active && (
            <DeveloperInfo
              active={active}
              setActive={setActive}
              name="dataset"
              selectedID={selectedDatasetID}
            />
          )}
          {shareModal && (
            <GenerateShareModal
              shareModal={shareModal}
              setShareModal={setShareModal}
              selectedDatasetID={selectedDatasetID}
            />
          )}
          {importShare && (
            <ImportShareCode
              importShare={importShare}
              setImportShare={setImportShare}
              name="dataset"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetSection;
