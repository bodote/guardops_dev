import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  PlusIcon,
} from "@/public/Assets/Icons/Allsvg";
import { useRouter, useSearchParams } from "next/navigation";
import WorkflowTemplate from "@/components/modal/WorkflowTemplate";
import DeleteModal from "@/components/modal/DeleteModal";

const EvaluationFlow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [evaluationList, setEvaluationList] = useState([]);
  const [createDataset, setCreateDataset] = useState("new");
  const [projectID, setProjectID] = useState("");
  const [selectedEvaluationForEdit, setSelectedEvaluationForEdit] = useState();
  const [selectedEvaluationForDelete, setSelectedEvaluationForDelete] =
    useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const getEvaluationList = async (projectID) => {
    setLoader(true);
    try {
      const response = await fetch(
        `/api/manageEvaluation?projectID=${projectID}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setLoader(false);
        const responseData = await response.json();
        if (responseData) {
          setEvaluationList(responseData.evaluations);
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
  const handleEvaluationEdit = (flow) => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setSelectedEvaluationForEdit(flow);
      setCreateDataset("existing");
    }
  };
  const handleEvaluationDelete = async () => {
    const formData = {
      evaluation_id: selectedEvaluationForDelete.evaluation_id,
      project_id: projectID,
    };
    try {
      const response = await fetch("/api/manageEvaluation", {
        method: "DELETE",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        getEvaluationList(projectID);
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  useEffect(() => {
    const ID = params.get("projectID");
    if (ID) {
      setProjectID(ID);
      getEvaluationList(ID);
    }
  }, [params.get("projectID")]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto  sm:ml-[96px] ml-[72px]">
          <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                COAI
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                Monitoring
              </h1>
            </div>
            <Logout />
          </div>
          <div className="mt-[26px] sm:px-[55px] px-[16px]">
            <h2 className="font-Archivo text-[32px] font-thin">
              Workflow Builder Evals & Monitoring
            </h2>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-[38px] sm:gap-[20px] gap-[10px] w-full mt-[31px]">
              {!loader ? (
                evaluationList.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:border-[#000] hover:bg-[#f2f2f2] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[8px]">
                          <img
                            src="/Assets/Images/Union.png"
                            alt=""
                            className="w-[23px]"
                          />
                          <button
                            onClick={() =>
                              router.push(
                                `/workflowdetails?evaluationID=${ele.evaluation_id}`
                              )
                            }
                            className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000] hover:text-[#0D859A]"
                          >
                            {ele.title}
                          </button>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => handleEvaluationEdit(ele)}>
                            <EditBlackIcon className="stroke-[#000] hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEvaluationForDelete(ele);
                              setOpen(true);
                            }}
                          >
                            <DeleteBlackIcon className="stroke-[#000] hover:stroke-[#0D859A]" />
                          </button>
                          {open && (
                            <DeleteModal
                              open={open}
                              setOpen={setOpen}
                              selectedDataForDelete={
                                selectedEvaluationForDelete
                              }
                              handleDeleteData={handleEvaluationDelete}
                              name="evaluation"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-[14px] pt-[8px] pb-[6px]">
                        <p className="font-Archivo lg:text-[16px] sm:text-[14px] text-[12px] font-normal text-[#D4DB33]">
                          Project: Project 1 - Runs: 18
                        </p>
                      </div>
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
                  setCreateDataset("new");
                  setIsModalOpen(true);
                }}
                className="cursor-pointer hover:border-[#000] hover:bg-[#0D859A] group w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]"
              >
                <div className="flex items-center gap-[8px]">
                  <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
                  <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] group-hover:text-white text-[18px] font-thin text-[#000] ">
                    New Evaluation Workflow
                  </h2>
                </div>
                <p className="font-Archivo lg:text-[13px] text-[11px] group-hover:text-white font-light text-[#000] mt-[10px]">
                  Create a new Evaluation Workflow for your Project
                </p>
              </div>
              {isModalOpen && (
                <WorkflowTemplate
                  updateEvaluationList={getEvaluationList}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  projectID={projectID}
                  values={
                    createDataset !== "new" ? selectedEvaluationForEdit : null
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluationFlow;
