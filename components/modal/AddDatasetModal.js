import React, { useEffect, useState } from "react";
import { RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();

const AddDatasetModal = ({
  updateProjectList,
  isModalOpen,
  dataset_status,
  values,
}) => {
  const [datasetData, setDatasetData] = useState({
    dataset_name: values ? values.name : "",
    dataset_description: values ? values.description : "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDatasetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveDataset = async () => {
    const datasetFormData = {
      ...datasetData,
      user_id: "demouser2",
    };
    if (
      datasetFormData.dataset_name == "" ||
      datasetFormData.dataset_description == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }

    const formData = {
      user_id: datasetFormData.user_id,
      dataset_name: datasetFormData.dataset_name,
      dataset_description: datasetFormData.dataset_description,
      dataset_id: values ? values.dataset_id : "",
    };

    try {
      if (dataset_status == "new") {
        const response = await fetch("/api/manageDataset", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          toast.success("Dataset created successfully !!");
          setDatasetData({
            dataset_name: "",
            dataset_description: "",
          });
          isModalOpen(false);
          updateProjectList();
        } else {
          toast.error("API request failed !!");
          console.error("API request failed:", response.statusText);
        }
      } else {
        const response = await fetch("/api/manageDataset", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Dataset updated successfully !!");
          const responseData = await response.json();
          setDatasetData({
            dataset_name: "",
            dataset_description: "",
          });
          isModalOpen(false);
          updateProjectList();
        } else {
          toast.error("API request failed !!");
          console.error("API request failed:", response.statusText);
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during API request:", error);
    }
  };
  useEffect(() => {}, [values]);

  return (
    <>
      <div className="border-b border-b-[#CCCCCC]">
        <button
          className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
          onClick={() => isModalOpen(false)}
        >
          <RightcircleIcon />
        </button>
      </div>
      <div className="sm:px-[35px] px-[16px] py-[29px]">
        <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
          {dataset_status == "new" ? "Create New Dataset" : "Edit Dataset"}
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
            Enter the name of your Dataset
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
            Give a clear description of the Dataset you want to create
          </p>
        </div>

        <div className="flex justify-center sm:mt-[77px] mt-[50px]">
          <button
            className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
            onClick={handleSaveDataset}
          >
            <FiPlus />
            {dataset_status == "new" ? "Save Dataset" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddDatasetModal;
