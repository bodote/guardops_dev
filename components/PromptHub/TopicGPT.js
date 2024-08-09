"use client";
import React, { useEffect, useState, Fragment } from "react";
import { getCookie } from "cookies-next";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const TopicGPT = ({ searchPrompt }) => {
  const [searchProject, setSearchProject] = useState("");
  const [searchDataset, setSearchDataset] = useState("");

  const [unsharedTemplates, setUnsharedTemplates] = useState([]);
  const [sharedTemplates, setSharedTemplates] = useState([]);
  const [subscribedTemplates, setSubscribedTemplates] = useState([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);
  const [selectedProject, setSelectedProject] = useState({
    name: "Select a project",
  });
  const [projectList, setProjectList] = useState([]);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState({
    name: "Select a dataset",
  });
  const [datasetList, setDatasetList] = useState([]);

  const getProjectList = async () => {
    try {
      const response = await fetch(`/api/manageProjects`, {
        method: "GET",
        opentelemetry: {
          ignore: true
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.projects) {
          setProjectList(responseData.projects);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getDatasetList = async () => {
    try {
      const response = await fetch(`/api/manageDataset`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.datasets) {
          setDatasetList(responseData.datasets);
          console.log(responseData.datasets);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    getProjectList();
    getDatasetList();
  }, []);

  const handleSelectProject = (value) => {
    setSelectedProject(value);
  };

  const handleSelectDataset = (value) => {
    setSelectedDataset(value);
  };

  const filteredProjects = projectList
    .filter((project) => {
      const trimmedSearchProject = searchProject.replace(/[^\w\s]/g, "").trim();
      const regex = new RegExp(trimmedSearchProject, "gi");
      const trimmedProjectName = project.name
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "");
      return trimmedProjectName.match(regex);
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  const filteredDatasets = datasetList
    .filter((dataset) => {
      const trimmedSearchDataset = searchDataset.replace(/[^\w\s]/g, "").trim();
      const regex = new RegExp(trimmedSearchDataset, "gi");
      const trimmedDatasetName = dataset.name
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "");
      return trimmedDatasetName.match(regex);
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  const toggleExpand = (templateId) => {
    if (expandedTemplateId === templateId) {
      setExpandedTemplateId(null);
    } else {
      setExpandedTemplateId(templateId);
    }
  };

  const handleCheckboxChange = (e, templateId) => {
    e.stopPropagation();
    setSelectedPrompts((prevSelected) =>
      prevSelected.includes(templateId)
        ? prevSelected.filter((id) => id !== templateId)
        : [...prevSelected, templateId]
    );
  };

  const user_id = getCookie("user_id");

  const getTemplates = async () => {
    const response = await fetch(`/api/prompthub`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    const data = res.data;
    if (data.unshared_templates) {
      setUnsharedTemplates(data.unshared_templates);
    }
    if (data.shared_templates) {
      setSharedTemplates(data.shared_templates);
    }
    if (data.subscribed_templates) {
      setSubscribedTemplates(data.subscribed_templates);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const filterTemplates = (templates) => {
    return templates.filter((template) =>
      template.name.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.description.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.template.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.link.toLowerCase().includes(searchPrompt.toLowerCase())
    );
  };

  const filteredSharedTemplates = filterTemplates(sharedTemplates);
  const filteredUnsharedTemplates = filterTemplates(unsharedTemplates);
  const filteredSubscribedTemplates = filterTemplates(subscribedTemplates);

  return (
    <div className="xl:pl-[47px] lg:pl-[20px] xl:pr-[93px] lg:pr-[40px] xl:mt-[79px] md:mt-[50px] sm:mt-[30px] mt-[20px] [overflow-wrap:anywhere]">
      <div className="border rounded-lg dark:border-[#EAECF0] shadow-[0px_1px_3px_rgba(16,24,40,0.1),_0px_1px_2px_rgba(16,24,40,0.06)] overflow-y-hidden w-full [overflow-wrap:anywhere]">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 [overflow-wrap:anywhere]">
          <thead className="bg-[#F9FAFB] dark:bg-gray-700">
            <tr>
              <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-prewrap w-0">
                
              </th>
              <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-prewrap">
                Name
              </th>
              <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-prewrap">
                Description
              </th>
              <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-prewrap">
                Link
              </th>
          
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredSharedTemplates.map((template) => (
              <React.Fragment key={template.template_id}>
                <tr
                  className={`border-b-[#EAECF0] border-b-[1px] hover:bg-[#d6d6d6] hover:cursor-pointer`}
                 
                >
                  <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                    <input
                      type="checkbox"
                      checked={selectedPrompts.includes(template.template_id)}
                      onChange={(e) => handleCheckboxChange(e, template.template_id)}
                    />
                  </td>
                  <td className="p-[15px_24px]" onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]" onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]" onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.link}
                      </p>
                    </div>
                  </td>
                </tr>
                {expandedTemplateId === template.template_id && (
                  <tr>
                    <td colSpan="6" className="border-t border-b-gray-700 border-b-4">
                      <div className="p-[15px_24px] whitespace-pre-wrap">
                        <p className="text-[#101828] text-[14px] font-Inter font-medium">
                          {template.template}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="6" className="border-t border-gray-200 dark:border-gray-700"></td>
            </tr>
            {filteredUnsharedTemplates.map((template) => (
              <React.Fragment key={template.template_id}>
                <tr
                  className={`border-b-[#EAECF0] border-b-[1px] hover:bg-[#d6d6d6] hover:cursor-pointer`}
                  
                >
                  <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                    <input
                      type="checkbox"
                      checked={selectedPrompts.includes(template.template_id)}
                      onChange={(e) => handleCheckboxChange(e, template.template_id)}
                    />
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.link}
                      </p>
                    </div>
                  </td>
                </tr>
                {expandedTemplateId === template.template_id && (
                  <tr>
                    <td colSpan="6" className="border-t border-b-gray-700 border-b-4" >
                      <div className="p-[15px_24px] whitespace-pre-wrap">
                        <p className="text-[#101828] text-[14px] font-Inter font-medium">
                          {template.template}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="6" className="border-t border-gray-200 dark:border-gray-700"></td>
            </tr>
            {filteredSubscribedTemplates.map((template) => (
              <React.Fragment key={template.template_id}>
                <tr
                  className={`border-b-[#EAECF0] border-b-[1px] hover:bg-[#d6d6d6] hover:cursor-pointer`}
                 
                >
                  <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                    <input
                      type="checkbox"
                      checked={selectedPrompts.includes(template.template_id)}
                      onChange={(e) => handleCheckboxChange(e, template.template_id)}
                    />
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-[15px_24px]"  onClick={() => toggleExpand(template.template_id)}>
                    <div>
                      <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-prewrap">
                        {template.link}
                      </p>
                    </div>
                  </td>
                </tr>
                {expandedTemplateId === template.template_id && (
                  <tr>
                    <td colSpan="6" className="border-t border-b-gray-700 border-b-4">
                      <div className="p-[15px_24px] whitespace-pre-wrap">
                        <p className="text-[#101828] text-[14px] font-Inter font-medium">
                          {template.template}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Listbox
        value={selectedProject}
        onChange={(value) => handleSelectProject(value)}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[209px] px-[8px] py-[1px]">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedProject.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <MdKeyboardArrowUp
                    className={
                      open
                        ? "h-5 w-5 text-gray-400 rotate-[0]"
                        : "h-5 w-5 text-gray-400 rotate-[180deg]"
                    }
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-[8] max-h-56 overflow-y-auto mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[209px]">
                  <div className="bg-white sticky top-0 z-[9] p-1">
                    <input
                      type="text"
                      className="border-b border-gray-300 focus:outline-none px-2 py-1 w-[97%] bg-white rounded-[6px] ml-[4px] mt-[3px]"
                      placeholder="Search..."
                      value={searchProject}
                      onChange={(e) =>
                        setSearchProject(e.target.value)
                      }
                    />
                  </div>
                  {filteredProjects.map((project) => (
                    <Listbox.Option
                      key={project.project_id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-[#f0efef]  rounded-[6px]"
                            : "text-[#000]",
                          "relative cursor-default select-none lg:py-2 py-1 px-[10px]"
                        )
                      }
                      value={project}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected
                                  ? "text-[#656565] text-[12px] font-Inter font-medium"
                                  : "font-normal text-[#656565] text-[12px]",
                                "ml-3 block truncate"
                              )}
                            >
                              {project.name}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <Listbox
        value={selectedDataset}
        onChange={(value) => handleSelectDataset(value)}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[209px] px-[8px] py-[1px]">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedDataset.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <MdKeyboardArrowUp
                    className={
                      open
                        ? "h-5 w-5 text-gray-400 rotate-[0]"
                        : "h-5 w-5 text-gray-400 rotate-[180deg]"
                    }
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-[8] max-h-56 overflow-y-auto mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[209px]">
                  <div className="bg-white sticky top-0 z-[9] p-1">
                    <input
                      type="text"
                      className="border-b border-gray-300 focus:outline-none px-2 py-1 w-[97%] bg-white rounded-[6px] ml-[4px] mt-[3px]"
                      placeholder="Search..."
                      value={searchDataset}
                      onChange={(e) =>
                        setSearchDataset(e.target.value)
                      }
                    />
                  </div>
                  {filteredDatasets.map((dataset) => (
                    <Listbox.Option
                      key={dataset.dataset_id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-[#f0efef]  rounded-[6px]"
                            : "text-[#000]",
                          "relative cursor-default select-none lg:py-2 py-1 px-[10px]"
                        )
                      }
                      value={dataset}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected
                                  ? "text-[#656565] text-[12px] font-Inter font-medium"
                                  : "font-normal text-[#656565] text-[12px]",
                                "ml-3 block truncate"
                              )}
                            >
                              {dataset.name}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default TopicGPT;
