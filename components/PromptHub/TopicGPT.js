"use client";
import React, { useEffect, useState, Fragment } from "react";
import { getCookie } from "cookies-next";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiBarChartLine, RiCheckCircleLine, RiFlaskLine, RiArrowRightLine, RiLoader4Line, RiFolderLine, RiDatabaseLine } from "react-icons/ri";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
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

  const allTemplates = [...filteredSharedTemplates, ...filteredUnsharedTemplates, ...filteredSubscribedTemplates];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const PromptCard = ({ template, isSelected, onToggle }) => {
    const isExpanded = expandedTemplateId === template.template_id;

    return (
      <div className={`bg-white rounded-lg border-2 transition-all duration-200 ${isSelected ? 'border-[#0D859A] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onToggle(e, template.template_id)}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 h-4 w-4 text-[#0D859A] focus:ring-[#0D859A] border-gray-300 rounded"
            />
            <div className="flex-1 min-w-0" onClick={() => toggleExpand(template.template_id)}>
              <h4 className="font-medium text-gray-900 mb-1 cursor-pointer hover:text-[#0D859A] transition-colors duration-200">
                {template.name}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {template.description}
              </p>
              {template.link && (
                <p className="text-xs text-gray-500 truncate">
                  {template.link}
                </p>
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Prompt Template
                  </span>
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {template.template}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Beta Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-3">
          <RiFlaskLine className="w-6 h-6 text-orange-600" />
          <div>
            <h3 className="text-lg font-medium text-orange-900">Prompt Analysis (Beta)</h3>
            <p className="text-sm text-orange-700">
              Use AI to analyze and cluster your prompts based on their characteristics and topics.
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Workflow */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Analysis Workflow</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Step 1 of 3</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Step 1: Select Prompts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0D859A] text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <h4 className="font-medium text-gray-900">Select Prompts</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Choose the prompts you want to analyze and cluster
            </p>
            <div className="text-sm text-[#0D859A] font-medium">
              {selectedPrompts.length} prompts selected
            </div>
          </div>

          {/* Step 2: Configure Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <h4 className="font-medium text-gray-900">Configure</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Set analysis parameters and target project
            </p>
            <div className="text-sm text-gray-500">
              Coming next
            </div>
          </div>

          {/* Step 3: Review Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                3
              </div>
              <h4 className="font-medium text-gray-900">Analyze</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Review clustering results and insights
            </p>
            <div className="text-sm text-gray-500">
              Coming soon
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPrompts(allTemplates.map(t => t.template_id))}
              className="text-sm text-[#0D859A] hover:text-[#0a6b7a] font-medium"
            >
              Select All ({allTemplates.length})
            </button>
            <button
              onClick={() => setSelectedPrompts([])}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Clear Selection
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={selectedPrompts.length === 0 || isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-[#0D859A] hover:bg-[#0a6b7a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
          >
            {isAnalyzing ? (
              <>
                <RiLoader4Line className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RiBarChartLine className="w-4 h-4" />
                Analyze Selected ({selectedPrompts.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiFolderLine className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium text-gray-900">Target Project</h4>
          </div>
          <Listbox value={selectedProject} onChange={handleSelectProject}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default border border-gray-300 rounded-lg bg-white pl-3 pr-10 py-3 text-left shadow-sm focus:border-[#0D859A] focus:outline-none focus:ring-1 focus:ring-[#0D859A]">
                  <span className="block truncate">{selectedProject.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdKeyboardArrowUp
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"
                        }`}
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D859A] focus:border-[#0D859A]"
                        placeholder="Search projects..."
                        value={searchProject}
                        onChange={(e) => setSearchProject(e.target.value)}
                      />
                    </div>
                    {filteredProjects.map((project) => (
                      <Listbox.Option
                        key={project.project_id}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-[#0D859A] text-white" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={project}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                              {project.name}
                            </span>
                            {selected && (
                              <span className={classNames(
                                active ? "text-white" : "text-[#0D859A]",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}>
                                <RiCheckCircleLine className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>

        {/* Dataset Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiDatabaseLine className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium text-gray-900">Target Dataset</h4>
          </div>
          <Listbox value={selectedDataset} onChange={handleSelectDataset}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default border border-gray-300 rounded-lg bg-white pl-3 pr-10 py-3 text-left shadow-sm focus:border-[#0D859A] focus:outline-none focus:ring-1 focus:ring-[#0D859A]">
                  <span className="block truncate">{selectedDataset.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdKeyboardArrowUp
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"
                        }`}
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D859A] focus:border-[#0D859A]"
                        placeholder="Search datasets..."
                        value={searchDataset}
                        onChange={(e) => setSearchDataset(e.target.value)}
                      />
                    </div>
                    {filteredDatasets.map((dataset) => (
                      <Listbox.Option
                        key={dataset.dataset_id}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-[#0D859A] text-white" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={dataset}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                              {dataset.name}
                            </span>
                            {selected && (
                              <span className={classNames(
                                active ? "text-white" : "text-[#0D859A]",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}>
                                <RiCheckCircleLine className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
      </div>

      {/* Prompt Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Available Prompts</h3>
          <span className="text-sm text-gray-500">
            {allTemplates.length} total prompts
          </span>
        </div>

        {allTemplates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <RiBarChartLine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts available</h3>
            <p className="text-gray-500">
              Create or subscribe to prompts to see them here for analysis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTemplates.map((template) => (
              <PromptCard
                key={template.template_id}
                template={template}
                isSelected={selectedPrompts.includes(template.template_id)}
                onToggle={handleCheckboxChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicGPT;
