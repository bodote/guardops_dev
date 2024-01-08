import { RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();

const AddProjectModal = ({
  updateProjectList,
  setIsModalOpen,
  project_status,
  values,
}) => {
  const [projectData, setProjectData] = useState({
    project_name: values ? values.name : "",
    project_description: values ? values.description : "",
    project_retention: values ? values.retention : 0,
  });
  const [selected, setSelected] = useState(
    values ? values.tags.map((tag) => ({ label: tag, value: tag })) : []
  );
  const [showRange, setShowRange] = useState(
    values?.retention > 0 ? true : false
  );

  const data = [
    { label: " LAW ", value: "LAW" },
    { label: " GPT ", value: "GPT" },
    { label: " Eval ", value: "Eval" },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const CustomOption = (props) => (
    <components.Option {...props}>{props.data.label}</components.Option>
  );

  const CreatableSelect = (props) => (
    <Creatable
      components={{ ...animatedComponents, Option: CustomOption }}
      isMulti
      {...props}
    />
  );

  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const handleSaveProject = async () => {
    const projectFormData = {
      ...projectData,
      project_tags: selected.map((option) => option.value),
      user_id: "demouser2",
    };

    if (
      projectFormData.project_name == "" ||
      projectFormData.project_description == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }

    const formData = {
      user_id: projectFormData.user_id,
      project_name: projectFormData.project_name,
      project_description: projectFormData.project_description,
      project_retention: projectFormData.project_retention,
      project_tags: selected.map((e) => e.value),
      project_id: values ? values.project_id : "",
    };

    try {
      if (project_status == "new") {
        const response = await fetch("/api/manageProjects", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Project created successfully !!");
          const responseData = await response.json();
          setProjectData({
            project_name: "",
            project_description: "",
            project_retention: 0,
          });
          setSelected([]);
          setIsModalOpen(false);
          updateProjectList();
        } else {
          toast.error("API request failed");
          console.error("API request failed:", response.statusText);
        }
      } else {
        const response = await fetch("/api/manageProjects", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Project updated successfully !!");
          const responseData = await response.json();
          setProjectData({
            project_name: "",
            project_description: "",
            project_retention: 0,
          });
          setSelected([]);
          setIsModalOpen(false);
          updateProjectList();
        } else {
          toast.error("API request failed");
          console.error("API request failed:", response.statusText);
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during API request:", error);
    }
  };

  return (
    <>
      <div className="border-b border-b-[#CCCCCC]">
        <button
          className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
          onClick={() => setIsModalOpen(false)}
        >
          <RightcircleIcon />
        </button>
      </div>
      <div className="sm:px-[35px] px-[16px] py-[29px]">
        <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
          {project_status == "new"
            ? "Create New Project"
            : "Edit project details"}
        </h1>
        <div className="sm:mt-[53px] mt-[10px]">
          <label
            htmlFor="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Name of Project
          </label>
          <input
            type="text"
            name="project_name"
            id="name"
            className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="NegotiationGPT"
            value={projectData.project_name}
            onChange={handleOnChange}
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Enter name of Project
          </p>
        </div>
        <div className="mt-[36px]">
          <label
            htmlFor="description"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Description of Project
          </label>
          <textarea
            type="text"
            name="project_description"
            id="message"
            className="h-[122px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
            placeholder="Input Text"
            value={projectData.project_description}
            onChange={handleOnChange}
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Give a clear Description of the Project you want to start
          </p>
        </div>
        <div className="sm:mt-[45px] mt-[35px] sm:mb-[61px] mb-[30px]">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="tag"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Tags
            </label>
            <p
              className="text-[#68727D] font-semibold text-[14px] font-Inter cursor-pointer"
              onClick={() => setSelected([])}
            >
              Clear
            </p>
          </div>
          <div>
            <CreatableSelect
              closeMenuOnSelect={false}
              options={data}
              value={selected}
              onChange={handleSelectChange}
            />
          </div>
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            Enter meaningful tags to ensure proper filtering later
          </p>
        </div>
        <div className="flex gap-[16px] sm:flex-row flex-col">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value={showRange}
                onChange={() => {
                  setShowRange(!showRange);
                }}
                id="hs-basic-with-description-checked"
                className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent  rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                              disabled:opacity-50  checked:bg-none checked:text-[#0D859A] dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-600 before:inline-block 
                              before:w-6 before:h-6 before:bg-white checked:before:bg-[#fff] before:translate-x-0 checked:before:translate-x-full before:rounded-full"
                checked={showRange}
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[16px] font-Inter text-[#252525]">
              Activate Retention
            </h1>
            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              Tracing Data will only be kept for the given period
            </p>
          </div>
          {showRange && (
            <div className="slidecontainer">
              <input
                type="range"
                name="project_retention"
                min="1"
                max="100"
                className="slider"
                id="myRange"
                value={projectData.project_retention}
                onChange={handleOnChange}
              />
              <p className="text-[#68727D] font-medium text-[14px] pl-[34px] mt-[4px] font-Inter">
                {projectData.project_retention} days
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center sm:mt-[77px] mt-[50px]">
          <button
            className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
            onClick={() => handleSaveProject(values)}
          >
            <FiPlus />
            {project_status == "new" ? "Save Project" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
