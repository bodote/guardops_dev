import React, { useEffect, useState, useRef } from "react";
import { LockIcon, PlusIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import { useUser } from "@auth0/nextjs-auth0/client";
import AddProjectModal from "@/components/modal/AddProjectModal";
import { useRouter } from "next/navigation";
import AddDatasetModal from "@/components/modal/AddDatasetModal";

const DatasetSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datasetList, setDatasetList] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const modalRef = useRef();

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
                  onClick={() => handleProjectClick(ele.dataset_id)}
                  className="hover:border-[#000] hover:bg-[#f2f2f2] xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#fff] px-[17px] pt-[12px] pb-[8px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <img
                      src="/Assets/Images/Union.png"
                      alt=""
                      className="w-[23px]"
                    />
                    <h2 className="font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
                      {ele.name}
                    </h2>
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
            onClick={() => setIsModalOpen(true)}
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
              <AddDatasetModal updateProjectList={getDatasetList} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetSection;
