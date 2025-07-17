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
import DeleteSharedProjectModal from "../modal/DeleteSharedProjectModal";
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
  const [showSharedModal, setShowSharedModal] = useState(false); // State to manage whether to show shared project modal
  // Define state to store open state for each project
  const [openModals, setOpenModals] = useState({});

  // Function to toggle modal for a specific project
  const toggleModal = (projectId) => {
    setOpenModals(prevState => ({
      ...prevState,
      [projectId]: !prevState[projectId]
    }));
  };
  useEffect(() => {
    // Check if any shared project exists in projectList
    const sharedExists = projectList.some(ele => ele.shared);
    setShowSharedModal(sharedExists); // Update state based on whether shared project exists
  }, [projectList]); // Re-run effect when projectList changes
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
          opentelemetry: {
            ignore: true
          }
        });
        const responseData = await response.json();
        if (response.ok) {
          toast.success(`Project deleted successfully!`);
          getProjectList();
        } else {
          toast.error(responseData.detail);
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
        opentelemetry: {
          ignore: true
        }
      });

      if (response.ok) {
        setLoader(false);
        const responseData = await response.json();
        if (responseData.projects) {
          const sortedProjects = responseData.projects.slice().sort((a, b) => {
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
          setProjectList(sortedProjects);
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
    <div className="sm:px-[55px] px-[16px] pb-8">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-slate-600 text-sm">Manage your logging and tracing projects</p>
          <div className="flex items-center justify-between">
            <h1 className="font-Archivo text-[32px] font-thin text-slate-900">Projects</h1>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCreateProjectStatus("new");
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] transform"
              >
                <PlusIcon className="w-4 h-4 stroke-current" />
                New Project
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

        {/* Projects Grid */}
        <div>
          {!loader ? (
            projectList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projectList.map((ele, i) => (
                  <div
                    key={i}
                    className="group bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-2 min-h-[200px] flex flex-col"
                  >
                    {/* Project Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => handleProjectClick(ele.project_id, ele.name)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4DB33]/20 to-[#D4DB33]/10 border border-[#D4DB33]/30 rounded-xl flex items-center justify-center shadow-sm">
                          <img
                            src="/Assets/Images/Union.png"
                            alt=""
                            className="w-6 h-6 opacity-80"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-Archivo text-lg font-semibold text-slate-900 group-hover:text-[#0D859A] transition-colors duration-200 truncate mb-1">
                            {ele.name}
                          </h3>
                          <p className="text-sm text-slate-500">Project</p>
                        </div>
                      </div>

                      {/* Action Menu */}
                      <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex items-center gap-1">
                          <button
                            id="project_sharer"
                            onClick={() => handleGenerateShareCode(ele.project_id)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="Share project"
                          >
                            <Share2Icon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="project_code"
                            onClick={() => {
                              setActive(true);
                              setSelectedProjectID(ele.project_id);
                            }}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="View details"
                          >
                            <LightIcon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="project_edit"
                            onClick={() => handleProjectEdit(ele)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            title="Edit project"
                          >
                            <EditBlackIcon className="w-4 h-4 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            id="project_delete"
                            onClick={() => {
                              setSelectedProjectForDelete(ele);
                              toggleModal(ele.project_id);
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            title="Delete project"
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
                          Shared Project
                        </span>
                      </div>
                    )}

                    {/* Project Stats */}
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

                    {/* Delete Modals */}
                    {openModals[ele.project_id] && (
                      ele.shared ? (
                        <DeleteSharedProjectModal
                          key={ele.project_id}
                          open={openModals[ele.project_id]}
                          setOpen={() => toggleModal(ele.project_id)}
                          selectedProjectForDelete={selectedProjectForDelete}
                          selected={selected}
                          handleProjectDelete={handleProjectDelete}
                          setSelected={setSelected}
                        />
                      ) : (
                        <DeleteProjectModal
                          key={ele.project_id}
                          open={openModals[ele.project_id]}
                          setOpen={() => toggleModal(ele.project_id)}
                          selectedProjectForDelete={selectedProjectForDelete}
                          selected={selected}
                          handleProjectDelete={handleProjectDelete}
                          setSelected={setSelected}
                          projects={projectList}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 max-w-md mx-auto">
                <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <PlusIcon className="w-10 h-10 stroke-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">No projects yet</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Get started by creating your first project or importing a shared one</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setCreateProjectStatus("new");
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <PlusIcon className="w-4 h-4 stroke-current" />
                    Create Project
                  </button>
                  <button
                    onClick={() => setImportShare(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#D4DB33] rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <ImportIcon className="w-4 h-4 stroke-current" />
                    Import Project
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
                <span className="ml-3 text-slate-600 font-Archivo">Loading projects...</span>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div ref={modalRef} className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl">
              <AddProjectModal
                updateProjectList={getProjectList}
                setIsModalOpen={setIsModalOpen}
                project_status={createProjectStatus}
                values={
                  createProjectStatus !== "new" ? selectedProjectForEdit : null
                }
              />
            </div>
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
  );
};

export default ProjectSection;
