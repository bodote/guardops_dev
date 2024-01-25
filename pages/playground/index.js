import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  DeleteBlackIcon,
  EditBlackIcon,
  LockIcon,
  RightIcon,
} from "@/public/Assets/Icons/Allsvg";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Version from "@/components/Playground/Version";
import PromptTemplates from "@/components/modal/PromptTemplates";
import { Switch } from "@headlessui/react";
import debounce from "lodash/debounce";
import axios from "axios";
import styles from "@/styles/TextHighlighter.module.css";
import { useSearchParams } from "next/navigation";
import NewPrompt from "@/components/modal/NewPrompt";
import DeleteModal from "@/components/modal/DeleteModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const index = () => {
  // Add state to manage text area content
  const [projectList, setProjectList] = useState([]);
  const [playgroundList, setPlaygroundList] = useState([]);
  const [message, setMessage] = useState("");
  const [piiData, setPiiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const [PiiCheckEnable, setPiiCheckEnable] = useState(false);
  const [syncAll, setsyncAll] = useState(false);
  const [analysisModelOpen, setAnalysisModelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [allSystemPrompt, setAllSystemPrompt] = useState("");
  const [currentPlaygroundID, setCurrentPlaygroundID] = useState("");
  const [currentPlayground, setCurrentPlayground] = useState({});
  const [allPromtsDetails, setAllPromtsDetails] = useState([]);
  const [proname, setProname] = useState({
    name: "Select an option",
  });
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  const params = useSearchParams();
  const data = params.get("data");

  useEffect(() => {
    const parsedData = JSON.parse(data);
    if (parsedData && parsedData.message) {
      setMessage(parsedData.message);
    }
    if (parsedData && parsedData.project_name) {
      const matchingProject = projectList.find(
        (project) => project.name === parsedData.project_name
      );
      setProname(matchingProject);
    }
  }, [projectList, data]);

  // Code for VersionsHistory:
  const [runsHistory, setRunsHistory] = useState([]);

  const handleRunClick = (runMessage) => {
    setMessage(runMessage);
  };

  const handleAddToPrompt = (content) => {
    setMessage(content);
    setIsModalOpen(false);
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  const getParsedText = () => {
    const elements = [];
    let lastIndex = 0;

    {
      message &&
        piiData.forEach((annotation, index) => {
          elements.push(message.substring(lastIndex, annotation.start));

          elements.push(
            <span
              key={index}
              className={`${styles[annotation.entity_type]} ${
                styles.highlight
              }`}
            >
              {message.substring(annotation.start, annotation.end)}
              <span className={styles.category}>{annotation.entity_type}</span>
            </span>
          );
          lastIndex = annotation.end;
        });
      elements.push(message.substring(lastIndex));
    }
    return elements;
  };

  const debouncedSendText = useCallback(
    debounce(async (inputText) => {
      try {
        const response = await axios.post(
          "https://lm3.hs-ansbach.de/tracing/api/detect_pii",
          { text: inputText }
        );
        setPiiData(response.data);
      } catch (error) {
        console.error("Error sending text to API:", error);
        setPiiData([]);
      }
    }, 1000),
    []
  );
  // Function to handle text change in text area
  const handleTextChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0) {
      PiiCheckEnable && debouncedSendText(e.target.value);
    } else {
      setPiiData([]);
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

  const getProjectList = async () => {
    try {
      const user_id = "demouser2";
      const response = await fetch(`/api/manageProjects?user_id=${user_id}`, {
        method: "GET",
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

  // Add useEffect to listen for keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        if (apiCallInProgress) {
          return;
        }
        runPlayground();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [message, apiCallInProgress]); // Depend on 'message' to ensure it's captured in the closure

  const updatePlaygroundList = async () => {
    await getPlaygrounds();
  };

  const getPlaygrounds = async () => {
    try {
      const user_id = "demouser2";
      const response = await fetch(
        `/api/managePlaygrounds?user_id=${user_id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.playgrounds) {
          setPlaygroundList(responseData.playgrounds);
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
    getPlaygrounds();
  }, []);

  const handleSetTraces = async (playground) => {
    setCurrentPlayground(playground);
    setCurrentPlaygroundID(playground.playground_id);
    try {
      const response = await fetch(
        `/api/manageTraces?playground_id=${playground.playground_id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setRunsHistory(responseData.traces);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  // Function to clear the message text area
  const clearMessage = () => {
    setMessage("");
    setPiiData([]);
  };

  // State to track the runPlayground button has been pressed
  const [runPressed, setRunPressed] = useState(false);

  // Function to reset the runPressed flag
  const resetRunPressed = () => {
    setRunPressed(false);
  };

  useEffect(() => {
    if (allPromtsDetails.length && allPromtsDetails.length == versions.length) {
      if (!apiCallInProgress && proname.project_id) {
        saveTracePlayground();
      }
    }
  }, [allPromtsDetails]);

  const saveTracePlayground = async () => {
    const APIBody = allPromtsDetails
      .filter((item) => item.isValid)
      .map((item) => ({
        [item.model]: [item.input, item.output],
      }));

    const formData = {
      user_id: "demouser2",
      project_id: proname.project_id,
      playground_id: currentPlaygroundID,
      access_token: localStorage.getItem("customAIKey"),
      start_time: new Date().toISOString(),
      prompt_response_pairs: APIBody,
    };
    try {
      const response = await fetch("/api/managePlaygrounds", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleDeletePlaygroundData = async () => {
    const formData = {
      user_id: "demouser2",
      playground_id: currentPlaygroundID,
    };
    try {
      const response = await fetch("/api/managePlaygrounds", {
        method: "DELETE",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        getPlaygrounds();
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  // Function to transform text and pass to Version component
  const runPlayground = () => {
    setAnalysisModelOpen(false);
    if (apiCallInProgress) {
      return;
    }

    setAllPromtsDetails([]);
    // Set the API call in progress status
    setApiCallInProgress(true);
    // Pass the uppercaseMessage to each Version component
    setVersions(versions.map((v) => ({ ...v, message: message })));
    setRunPressed(true);
  };

  // Function to append text to message
  const appendToMessage = (text) => {
    setMessage((prevMessage) => `${prevMessage} ${text}`);
  };

  // State to manage versions
  const [versions, setVersions] = useState([
    { id: 1, component: <Version key={1} /> },
  ]);

  // Function to add a new version
  const addVersion = () => {
    const newId =
      versions.length > 0 ? versions[versions.length - 1].id + 1 : 1;
    setVersions([
      ...versions,
      {
        id: newId,
        component: (
          <Version
            key={newId}
            syncAll={syncAll}
            setsyncAll={setsyncAll}
            allSystemPrompt={allSystemPrompt}
            setAllSystemPrompt={setAllSystemPrompt}
            setAnalysisModelOpen={setAnalysisModelOpen}
            analysisModelOpen={analysisModelOpen}
            setAllPromtsDetails={setAllPromtsDetails}
            allPromtsDetails={setAllPromtsDetails}
          />
        ),
      },
    ]);
  };

  // Function to remove a version
  const removeVersion = (id) => {
    if (versions.length === 1) {
      // If there's only one version, do not remove it
      return;
    }
    setVersions(versions.filter((version) => version.id !== id));
  };
  // Calculate grid columns based on number of versions
  const gridCols = `grid-cols-${versions.length > 1 ? versions.length : 1}`;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px]">
          <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                COAI
              </h1>
              <RightIcon />
              <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                Playground
              </h1>
            </div>
            <a href="/">
              <LockIcon />
            </a>
          </div>
          <div className=" flex sm:flex-row flex-col border-b border-b-[#CCCCCC]">
            <div className="px-[16px] pt-[12px] sm:w-[182px] sm:min-w-[182px] w-full  sm:border-r border-0 border-r-[#CCCCCC] lg:h-[285px] sm:h-[495px] h-[285px] overflow-y-auto">
              <button
                onClick={() => {
                  setOpen(true);
                  setActionType("new");
                }}
                className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium 2xl:text-[12px] text-[11px] font-Inter py-[6px] px-[14px] rounded-md min-w-[112px]"
              >
                <FiPlus /> New Prompt
              </button>
              {/* <ul className="list-disc px-[8px]"> */}
              {playgroundList.map((playground) => (
                <div
                  key={playground.playground_id}
                  className="flex items-start my-[20px] gap-2"
                >
                  <span className="min-w-[5px] min-h-[5px] bg-[#656565] rounded-full block mt-[6px]"></span>
                  <div
                    onClick={() => handleSetTraces(playground)}
                    className="text-[#656565] text-[12px] font-Inter font-medium cursor-pointer hover:underline"
                  >
                    {playground.name}
                  </div>
                </div>
              ))}
              {/* </ul> */}
            </div>
            <div className="px-[16px] pt-[12px] w-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between w-full sm:flex-row flex-col gap-3">
                  <label
                    htmlFor="name"
                    className="font-Archivo text-[12px] font-normal text-[#000]"
                  >
                    Prompt
                  </label>
                  <div className="lg:flex items-center gap-[20px]">
                    <div className="flex gap-[20px] sm:mt-0 mt-2 items-center">
                      {currentPlaygroundID && (
                        <>
                          <button
                            onClick={() => {
                              setOpen(true);
                              setActionType("edit");
                            }}
                          >
                            <EditBlackIcon />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModalOpen(true);
                            }}
                          >
                            <DeleteBlackIcon />
                          </button>
                        </>
                      )}
                      {deleteModalOpen && (
                        <DeleteModal
                          open={deleteModalOpen}
                          setOpen={setDeleteModalOpen}
                          selectedDataForDelete={currentPlayground}
                          handleDeleteData={handleDeletePlaygroundData}
                          name="playground"
                        />
                      )}
                      <div className="flex items-center gap-[5px]">
                        <Switch
                          checked={PiiCheckEnable}
                          onChange={setPiiCheckEnable}
                          className={classNames(
                            PiiCheckEnable ? "bg-[#0074fb]" : "bg-gray-200",
                            "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                          )}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              PiiCheckEnable
                                ? "translate-x-[11px]"
                                : "translate-x-0",
                              "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                        <label className="text-[#252525] text-[12px] font-medium">
                          PII checker
                        </label>
                      </div>
                    </div>
                    <div className="flex sm:items-center sm:gap-[18px] gap-[10px] sm:flex-row flex-col items-start lg:mt-0 mt-[10px]">
                      <label
                        htmlFor="project"
                        className="block font-Archivo text-[12px] text-[#000000] font-normal"
                      >
                        Input Tokens: 245
                      </label>
                      <Listbox value={proname} onChange={setProname}>
                        {({ open }) => (
                          <>
                            <div className="relative sm:w-[180px] w-full">
                              <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[3px] ">
                                <span className="flex items-center">
                                  <span className=" block truncate">
                                    {proname?.name}
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
                                <Listbox.Options className="absolute overflow-x-auto z-10 mt-1 max-h-56 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
                                  {projectList.map((project) => (
                                    <Listbox.Option
                                      key={project.project_id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-[#f0efef]  rounded-[6px]"
                                            : "text-[#000]",
                                          "relative cursor-default select-none sm:py-2 py-1 sm:pl-[30px] pl-2 pr-2 sm:pr-9"
                                        )
                                      }
                                      value={project}
                                    >
                                      <div className="flex items-center ">
                                        <span
                                          className={classNames(
                                            proname
                                              ? "text-[#656565] text-[12px] font-Inter font-medium"
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {project.name}
                                        </span>
                                      </div>
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                </div>
                <div className="lg:flex">
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    className="h-[180px] border-0 rounded  w-full  font-Archivo text-[12px] font-normal placeholder:text-[#CCCCCC] shadow-none mt-[5px] focus:ring-0 focus:outline-none resize-none"
                    placeholder=" Start entering your prompt for the selected models. Press
                  Button Run Playground or Shift + Return to get the results."
                    value={message}
                    onChange={handleTextChange}
                  />
                  {PiiCheckEnable && (
                    <div className="h-[180px] w-full font-Archivo text-[12px] font-normal placeholder:text-[#CCCCCC] shadow-none mt-[5px] focus:ring-0 focus:outline-none lg:border-l lg:border-l-[#CCCCCC] lg:border-t-0 border-t border-t-[#CCCCCC] p-[8px_12px] overflow-y-auto">
                      {getParsedText()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-[10px] flex-wrap pb-[6px] sm:justify-end justify-center mt-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                >
                  Prompt Templates
                </button>
                <button
                  className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                  onClick={clearMessage}
                >
                  Clear
                </button>
                <button
                  className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                  onClick={runPlayground}
                >
                  Run Playground
                </button>
              </div>
              {isModalOpen && (
                <div
                  // ref={modalRef}
                  className="modal z-[2] sm:w-[600px] w-[76%] absolute bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto"
                >
                  <PromptTemplates
                    setIsModalOpen={setIsModalOpen}
                    onPromptOpen={handleAddToPrompt}
                  />
                </div>
              )}
              {open && (
                <NewPrompt
                  setOpen={setOpen}
                  open={open}
                  updatePlaygroundList={updatePlaygroundList}
                  actionType={actionType}
                  playground={actionType === "edit" ? currentPlayground : null}
                  setCurrentPlaygroundID={setCurrentPlaygroundID}
                  setCurrentPlayground={setCurrentPlayground}
                />
              )}
            </div>
          </div>
          <div
            className={`flex sm:flex-row flex-col h-screen
              // ${versions.length < 6 && "2xl:h-screen"}
              `}
          >
            <div className="px-[16px] py-[12px] sm:w-[182px] sm:min-w-[182px] w-full sm:border-r border-0 border-r-[#CCCCCC] lg:border-r lg:border-r-[#CCCCCC]  ">
              <h1 className="text-[#000000] font-medium text-[12px] font-Inter">
                Versions
              </h1>
              <ul className="list-disc px-[8px]">
                {runsHistory.map((innerArray) =>
                  innerArray.map((run, innerIndex) => (
                    <li
                      key={innerIndex}
                      className="run-link text-[#656565] text-[12px] font-Inter font-medium mt-[10px]"
                      onClick={() => handleRunClick(run.attributes.prompt)}
                    >
                      {run.attributes.prompt.length > 20
                        ? run.attributes.prompt.substring(0, 16) + "..."
                        : run.attributes.prompt}{" "}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div
              className={`grid w-full
              ${versions.length > 1 && "lg:grid-cols-2"}
              ${versions.length > 2 && "xl:grid-cols-3"}
              ${versions.length > 3 && "2xl:!grid-cols-4"}
              ${versions.length > 4 && "3xl:!grid-cols-5"}
              `}
            >
              {versions.map((version) =>
                React.cloneElement(version.component, {
                  addVersion,
                  removeVersion: () => removeVersion(version.id),
                  message: version.message, // pass the message here
                  versionId: version.id, // pass the version ID here
                  runPressed: runPressed,
                  versions: versions.length,
                  resetRunPressed: resetRunPressed, // pass the resetRunPressed function here
                  appendToMessage: appendToMessage, // pass the appendToMessage function here
                  key: version.id,
                  setApiCallInProgress: setApiCallInProgress,
                  apiCallInProgress: apiCallInProgress,
                  syncAll,
                  setsyncAll,
                  setAllSystemPrompt,
                  allSystemPrompt,
                  analysisModelOpen,
                  setAnalysisModelOpen,
                  setAllPromtsDetails,
                  allPromtsDetails,
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
