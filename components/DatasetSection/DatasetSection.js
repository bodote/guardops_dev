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
          const sortedDatasets = responseData.datasets.slice().sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // names must be equal
          });
          setDatasetList(sortedDatasets);
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
    <div className="sm:px-[55px] px-[16px] pb-8">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-slate-600 text-sm">Manage datasets for finetuning, evaluation and curation</p>
          <div className="flex items-center justify-between">
            <h1 className="font-Archivo text-[32px] font-thin text-slate-900">Datasets</h1>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCreateDatasetStatus("new");
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] transform"
              >
                <PlusIcon className="w-4 h-4 stroke-current" />
                New Dataset
              </button>
              <button
                onClick={() => setImportShare(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#D4DB33] rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ImportIcon className="w-4 h-4 stroke-current" />
                Import
              </button>
            </div>
          </div>
        </div>

        {/* Datasets Grid */}
        <div>
          {!loader ? (
            datasetList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {datasetList.map((ele, i) => (
                  <div
                    key={i}
                    className="group bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-2 min-h-[200px] flex flex-col"
                  >
                    {/* Dataset Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => handleDataSetClick(ele.dataset_id, ele.name)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4DB33] to-[#D4DB33]/80 rounded-xl flex items-center justify-center shadow-sm">
                          <img
                            src="/Assets/Images/Union.png"
                            alt=""
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-Archivo text-lg font-semibold text-slate-900 group-hover:text-[#0D859A] transition-colors duration-200 truncate mb-1">
                            {ele.name}
                          </h3>
                          <p className="text-sm text-slate-500">Dataset</p>
                        </div>
                      </div>

                      {/* Action Menu */}
                      <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex items-center gap-1">
                          <button
                            id="dataset_share"
                            onClick={() => handleGenerateShareCode(ele.dataset_id)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="Share dataset"
                          >
                            <Share2Icon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="dataset_code"
                            onClick={() => {
                              setActive(true);
                              setSelectedDatasetID(ele.dataset_id);
                            }}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="View details"
                          >
                            <LightIcon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="dataset_edit"
                            onClick={() => handleDatasetEdit(ele)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="Edit dataset"
                          >
                            <EditBlackIcon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="dataset_delete"
                            onClick={() => {
                              setSelectedDatasetForDelete(ele);
                              setOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            title="Delete dataset"
                          >
                            <DeleteBlackIcon className="w-4 h-4 stroke-slate-500 hover:stroke-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Shared Badge */}
                    {ele.shared && (
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#0D859A]/10 text-[#0D859A] border border-[#0D859A]/20">
                          Shared Dataset
                        </span>
                      </div>
                    )}

                    {/* Dataset Stats */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${ele.shared ? 'bg-[#0D859A]' : 'bg-[#D4DB33]'}`}></div>
                          <span className="text-sm font-medium text-slate-700 font-Archivo">
                            Traces
                          </span>
                        </div>
                        <span className="text-lg font-semibold text-slate-900">
                          {ele.stats.trace_count}
                        </span>
                      </div>
                    </div>

                    {/* Delete Modal */}
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
                ))}
              </div>
            ) : (
              <div className="text-center py-20 max-w-md mx-auto">
                <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <PlusIcon className="w-10 h-10 stroke-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">No datasets yet</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Get started by creating your first dataset or importing a shared one</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setCreateDatasetStatus("new");
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <PlusIcon className="w-4 h-4 stroke-current" />
                    Create Dataset
                  </button>
                  <button
                    onClick={() => setImportShare(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#D4DB33] rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <ImportIcon className="w-4 h-4 stroke-current" />
                    Import Dataset
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D4DB33] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#D4DB33] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#D4DB33] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="ml-3 text-slate-600 font-Archivo">Loading datasets...</span>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div ref={modalRef} className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl">
              <AddDatasetModal
                updateProjectList={getDatasetList}
                isModalOpen={setIsModalOpen}
                dataset_status={createDatasetStatus}
                values={
                  createDatasetStatus !== "new" ? selectedDatasetForEdit : null
                }
              />
            </div>
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
  );
};

export default DatasetSection;
