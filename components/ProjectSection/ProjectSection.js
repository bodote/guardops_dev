import React, { useEffect, useState, useRef } from "react";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  PlusIcon,
  LightIcon,
  Share2Icon,
  ImportIcon,
} from "@/public/Assets/Icons/Allsvg";
import AddProjectModal from "@/components/modal/AddProjectModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DeleteProjectModal from "../modal/DeleteProjectModal";
import DeveloperInfo from "../modal/DeveloperInfo";
import GenerateShareModal from "../modal/GenerateShareModal";
import ImportShareCode from "../modal/ImportShareCode";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProjectStatus, setCreateProjectStatus] = useState("new");
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectForDelete, setSelectedProjectForDelete] = useState("");
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState("");
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [active, setActive] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [importShare, setImportShare] = useState(false);

  const router = useRouter();
  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleProjectClick = (project_id, project_name) => {
    router.push(`/projects/${project_id}?name=${project_name}`);
  };
  const handleProjectDelete = async (activity) => {
    if ((activity = "delete")) {
      const formData = {
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
    setLoader(true);
    try {
      const response = await fetch(`/api/manageProjects`, {
        method: "GET",
      });

      if (response.ok) {
        setLoader(false);
        const responseData = await response.json();
        if (responseData.projects) {
          setProjectList(responseData.projects);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
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

  const handleGenerateShareCode = (projectId) => {
    setShareModal(true);
    setSelectedProjectID(projectId);
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
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-[45px] sm:gap-[30px] gap-[10px] w-full">
          {!loader ? (
            projectList.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="hover:border-[#000] hover:bg-[#f2f2f2] border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px] cursor-pointer w-full"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-[8px]"
                      onClick={() =>
                        handleProjectClick(ele.project_id, ele.name)
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
                        onClick={() => handleGenerateShareCode(ele.project_id)}
                      >
                        <Share2Icon />
                      </button>
                      <button
                        onClick={() => {
                          setActive(true);
                          setSelectedProjectID(ele.project_id);
                        }}
                      >
                        <LightIcon />
                      </button>
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
                      {open && (
                        <DeleteProjectModal
                          open={open}
                          setOpen={setOpen}
                          selectedProjectForDelete={selectedProjectForDelete}
                          selected={selected}
                          handleProjectDelete={handleProjectDelete}
                          setSelected={setSelected}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-[14px] pt-[8px] pb-[6px] flex-wrap">
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
              setCreateProjectStatus("new");
              setIsModalOpen(true);
            }}
            className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
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
          <div
            onClick={() => setImportShare(true)}
            className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
          >
            <div className="flex items-center gap-[8px]">
              <ImportIcon className="stroke-[#12131A] group-hover:stroke-white" />
              <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                Import Project
              </h2>
            </div>
            <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
              Import an existing project from a share code
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
          {active && (
            <DeveloperInfo
              active={active}
              setActive={setActive}
              name="project"
              selectedID={selectedProjectID}
            />
          )}
          {shareModal && (
            <GenerateShareModal
              shareModal={shareModal}
              setShareModal={setShareModal}
              selectedProjectID={selectedProjectID}
            />
          )}
          {importShare && (
            <ImportShareCode
              importShare={importShare}
              setImportShare={setImportShare}
              name="project"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
