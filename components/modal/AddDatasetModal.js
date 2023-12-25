import { RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AddDatasetModal = ({ updateProjectList , dataset_status }) => {
  const [datasetData, setDatasetData] = useState({
    dataset_name : "",
    dataset_description : "",
  });
  const [selected, setSelected] = useState([]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDatasetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const handleSaveProject = async () => {
    const projectFormData = {
      ...datasetData,
      user_id: "demouser1",
    };

    const formData = {
      user_id: projectFormData.user_id,
      dataset_name: projectFormData.dataset_name,
      dataset_description: projectFormData.dataset_description,
    };

    try {
      const response = await fetch("/api/manageDataset", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setDatasetData({
          dataset_name : "",
          dataset_description : "",
        });
        setSelected([]);
        updateProjectList();
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };


  return (
    <>
      <div className="border-b border-b-[#CCCCCC]">
        <button className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]">
          <RightcircleIcon />
        </button>
      </div>
      <div className="sm:px-[35px] px-[16px] py-[29px]">
        <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
          {dataset_status == "new" ? "Create New Dataset" : "Edit Dataset" }
        </h1>
        <div className="sm:mt-[53px] mt-[10px]">
          <label
            htmlFor="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Name of Dataset
          </label>
          <input
            type="text"
            name="dataset_name"
            id="name"
            className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="NegotiationGPT"
            value={datasetData.dataset_name}
            onChange={handleOnChange}
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Enter name of Dataset
          </p>
        </div>
        <div className="mt-[36px]">
          <label
            htmlFor="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Description of Dataset
          </label>
          <textarea
            type="text"
            name="dataset_description"
            id="message"
            className="h-[122px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="Input Text"
            value={datasetData.dataset_description}
            onChange={handleOnChange}
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Give a clear Description of the Project you want to start
          </p>
        </div>

        <div className="flex justify-center sm:mt-[77px] mt-[50px]">
          <button
            className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
            onClick={handleSaveProject}
          >
            <FiPlus />
            Save Project
          </button>
        </div>
      </div>
    </>
  );
};

export default AddDatasetModal;
