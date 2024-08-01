'use client'
import  {cloneElement, useState, useEffect, useRef, useCallback } from "react";
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
import styles from "@/styles/TextHighlighter.module.css";
import { useSearchParams } from "next/navigation";
import NewPrompt from "@/components/modal/NewPrompt";
import DeleteModal from "@/components/modal/DeleteModal";
import Logout from "@/components/Logout/Logout";
import Chat_version from "@/components/Playground/chat_version";
import { getUserRole } from "@/helper/getRole";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const index = () => {
  // Add state to manage text area content
  const [projectList, setProjectList] = useState([]);
  const [playgroundList, setPlaygroundList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const [piiData, setPiiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const [PiiCheckEnable, setPiiCheckEnable] = useState(false);
  const [arenaCheck, setArenaCheck] = useState(false);
  const [syncAll, setsyncAll] = useState(false);
  const [syncAllMsg, setSyncAllMsg] = useState(false);
  const [analysisModelOpen, setAnalysisModelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [clear, setClear] = useState(false);
  const [page, setPage] = useState("chat");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [allSystemPrompt, setAllSystemPrompt] = useState("");
  const [allChatPrompt, setAllChatPrompt] = useState("");
  const [chatSyncAll, setChatSyncAll] = useState(false);
  const [currentPlaygroundID, setCurrentPlaygroundID] = useState("");
  const [currentChatID, setCurrentChatID] = useState();
  const [currentPlayground, setCurrentPlayground] = useState({});
  const [allPromtsDetails, setAllPromtsDetails] = useState([]);
  const [allChatsDetails, setAllChatsDetails] = useState([]);
  const [ActiveTool, setActiveTool] = useState(false);
  const [proname, setProname] = useState({
    name: "Select a Project",
  });
  const [selectedModel, setSelectedModel] = useState(null); // State to store the selected model
  const [searchProject, setSearchProject] = useState("");
  const [apiCallInProgress, setApiCallInProgress] = useState(false);
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(true);
  const [review, setReview] = useState(false);
  const [traces, setTraces] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const params = useSearchParams();
  const data = params.get("data");
  const [runStart, setRunStart] = useState();

  const handleSelectModel = (modelId, index) => {
    setSelectedModels((prevState) => {
      const updatedModels = [...prevState];
      updatedModels[index] = modelId;
      return updatedModels;
    });
  };

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
        const response = await fetch("/api/manageModelChecks", {
          method: "POST",
          body: JSON.stringify(inputText),
        });
        if (response.ok) {
          const responseData = await response.json();
          setPiiData(responseData);
        }
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
      const response = await fetch(`/api/manageProjects`, {
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
    page === "prompt" ? await getPlaygrounds() : await getChatPlaygrounds();
  };

  const getPlaygrounds = async () => {
    try {
      const response = await fetch(`/api/managePlaygrounds`, {
        method: "GET",
      });

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

  const getChatPlaygrounds = async () => {
    try {
      const response = await fetch(`/api/manageChatPlayground`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.playgrounds) {
          setChatList(responseData.playgrounds);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const getRole = async () => {
    const roles = await getUserRole();
    if (roles) {
      setRole(roles);
      setLoader(false);
    }
  };
  useEffect(() => {
    getRole();
    getProjectList();
    getPlaygrounds();
    getChatPlaygrounds();
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
    setClear(true);
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

  const saveTraceChatPlayground = async () => {
    if (proname.project_id === undefined ) {
      toast.error("Please select the project first!!!");
      return;
    }
    const formatModelParams = (settings) => {
      const paramsArray = Object.entries(settings).map(
        ([key, value]) => `${key}:${value}`
      );
      return paramsArray.join(", ");
    };
    const uniqueChatVersionIds = [
      ...new Set(allChatsDetails.map((item) => item.chatVersionId)),
    ];

    try {
      let combinedAPIBody = [];
      await Promise.all(
        uniqueChatVersionIds.map(async (chatVersionId) => {
          const chatDetails = allChatsDetails.filter(
            (item) => item.chatVersionId === chatVersionId
          );

          const lastModel = chatDetails[chatDetails.length - 1].model;
          const APIBody = chatDetails
            .filter(
              (item) =>
                item.isValid && (item.input !== "" || item.output !== "")
            )
            .map((item) => ({
              [lastModel]: {
                system_prompt: item.systemPrompt,
                input: item.input,
                output: item.output.replace(/\{"tokens":\d+\}/g, ""),
                model_params: formatModelParams(item.settings),
              },
            }));

          combinedAPIBody.push(APIBody);
        })
      );
      const formData = {
        project_id: proname.project_id,
        ...(currentChatID !== undefined && { playground_id: currentChatID }),
        access_token: localStorage.getItem("customAIKey"),
        start_time: runStart,
        prompt_response_pairs: combinedAPIBody,
      };
      // Make API call with the combined form data
      const response = await fetch("/api/manageChatPlayground", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success("The traces are successfully stored!!!");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const saveTracePlayground = async () => {
    const formatModelParams = (settings) => {
      const paramsArray = Object.entries(settings).map(
        ([key, value]) => `${key}:${value}`
      );
      return paramsArray.join(", ");
    };
    const APIBody = allPromtsDetails
      .filter((item) => item.isValid)
      .map((item) => ({
        // [item.model]: [item.input, item.output],
        [item.model]: {
          system_prompt: item.systemPrompt,
          input: item.input,
          output: item.output.replace(/\{"tokens":\d+\}/g, ""),
          model_params: formatModelParams(item.settings),
        },
      }));
      
    const formData = {
      project_id: proname.project_id,
      playground_id: currentPlaygroundID,
      access_token: localStorage.getItem("customAIKey"),
      start_time: runStart,
      prompt_response_pairs: APIBody,
    };
    try {
      const response = await fetch("/api/managePlaygrounds", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setTraces(responseData.traces);
          arenaCheck && setReview(true);
        }
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleDeletePlaygroundData = async () => {
    const formData = {
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
    setRunStart(new Date().toISOString())
    if (apiCallInProgress) {
      return;
    }
    if (arenaCheck) {
      if (!proname.project_id) {
        toast.error("Please select the project first!!!");
        return;
      }
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
  const filteredProjects = projectList.filter((project) => {
    const trimmedSearchProject = searchProject.replace(/[^\w\s]/g, "").trim();
    const regex = new RegExp(trimmedSearchProject, "gi");
    const trimmedProjectName = project.name
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "");
    return trimmedProjectName.match(regex);
  }) .sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; // names must be equal
  });;
  // State to manage versions
  const [versions, setVersions] = useState([
    { id: 1, component: <Version key={1} /> },
  ]);

  const [chatVersion, setChatVersions] = useState([
    { id: 1, component: <Chat_version key={1} /> },
  ]);

  // Function to add a new version
  const addVersion = () => {
    const modelId = selectedModels[selectedModels.length - 1];
    setSelectedModels((prevState) => [...prevState, modelId]);

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

  const addChatVersion = () => {
    const newId =
      chatVersion.length > 0 ? chatVersion[chatVersion.length - 1].id + 1 : 1;
    setChatVersions([
      ...chatVersion,
      {
        id: newId,
        component: <Chat_version />,
      },
    ]);
  };

  // Function to remove a version
  const removeVersion = (id, index) => {
    if (versions.length === 1) {
      // If there's only one version, do not remove it
      return;
    }

    setSelectedModels((prevState) => {
      const updatedModels = [...prevState];
      updatedModels.splice(index, 1);
      return updatedModels;
    });
    setVersions(versions.filter((version) => version.id !== id));
  };

  const removeChatVersion = (id) => {
    if (chatVersion.length === 1) {
      // If there's only one version, do not remove it
      return;
    }
    setChatVersions(chatVersion.filter((version) => version.id !== id));
  };
  // Calculate grid columns based on number of versions
  const gridCols = `grid-cols-${versions.length > 1 ? versions.length : 1}`;

  const initialHeight = 391; // Initial height in pixels
  const [height, setHeight] = useState(`${initialHeight}px`);

  const handleMouseDown = (e) => {
    const startY = e.clientY;
    const initialHeight = parseFloat(height);

    const handleMouseMove = (e) => {
      const newHeight = initialHeight + (e.clientY - startY);
      if (newHeight > 0 && newHeight < window.innerHeight) {
        setHeight(`${newHeight}px`);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleStoreArenaScore = async (i) => {
    const winningModelId = selectedModels[i];
    const losingModelIds = selectedModels.filter((id, index) => index !== i);
    const formData = {
      project_id: proname.project_id,
      winner_trace_id: traces[i],
      winning_model_id: winningModelId,
      losing_model_ids: losingModelIds,
    };
    try {
      const response = await fetch("/api/manageArena", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setReview(false);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < versions.length; i++) {
      buttons.push(
        <button
          onClick={() => handleStoreArenaScore(i)}
          key={i}
          className="bg-[#D4DB33] border-[#ABABAB] border-[1px] sm:text-[14px] text-[10px] rounded-[6px] sm:w-[20px] w-[16px] sm:h-[20px] h-[16px] flex justify-center items-center"
        >
          {String.fromCharCode(65 + i)}
        </button>
      );
    }
    return buttons;
  };

  const getTraces = async (playgroundId) => {
    setCurrentChatID(playgroundId);
    try {
      const response = await fetch(
        `/api/manageTraces?playground_id=${playgroundId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setAllChatsDetails([]);
        if (responseData.traces && responseData.traces.length > 0) {
          setChatVersions([]);
          const newChatVersions = [];
          responseData.traces.forEach((data, i) => {
            newChatVersions.push({
              id: i + 1,
              component: <Chat_version chatPromptData={data} />,
            });
          });
          // Set chatVersion with the new elements
          setChatVersions((prevChatVersions) => [
            ...prevChatVersions,
            ...newChatVersions,
          ]);
        } else {
          const newId =
            chatVersion.length > 0
              ? chatVersion[chatVersion.length - 1].id + 1
              : 1;
          setChatVersions([{ id: newId, component: <Chat_version /> }]);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : role.includes("Playground") || role.includes("Full_Access") ? (
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
              <Logout />
            </div>
            <div>
              <div
                style={{ height: `${height}` }}
                className={`flex md:flex-row flex-col border-b border-b-[#CCCCCC] overflow-y-auto relative ${
                  page === "prompt"
                    ? "h-[48.5%]"
                    : "!h-[calc(100vh-43px)] !resize-none"
                }`}
              >
                <div
                  className={`md:w-[182px] md:min-w-[182px] w-full overflow-y-auto md:border-r md:border-r-[#CCCCCC] ${
                    page === "prompt" ? "min-h-[285px]" : "h-[calc(100vh-44px)]"
                  }`}
                >
                  <div className="sticky top-0 bg-white px-[16px] py-[12px] border-b-[#CCCCCC] border-b-[1px]">
                    <div className="bg-[#CCCCCC] text-white rounded-[6px] text-[12px] w-fit mb-[11px]">
                      <button
                        onClick={() => setPage("prompt")}
                        className={`rounded-[6px] px-[6px] py-[3px] uppercase ${
                          page === "prompt" ? "bg-[#D4DB33]" : "bg-transparent"
                        }`}
                      >
                        prompt
                      </button>
                      <button
                        onClick={() => setPage("chat")}
                        className={` py-[3px] pl-[9px] pr-[15px] uppercase rounded-[6px] ${
                          page === "chat" ? "bg-[#D4DB33]" : "bg-transparent"
                        }`}
                      >
                        chat
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setActionType("new");
                      }}
                      className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium 2xl:text-[12px] text-[12px] font-Inter py-[6px] px-[14px] rounded-md min-w-[112px]"
                    >
                      <FiPlus /> New Prompt
                    </button>
                  </div>
                  {page === "prompt"
                    ? playgroundList.map((playground) => (
                        <div
                          key={playground.playground_id}
                          className="flex items-start my-[22px] gap-2 px-[16px]"
                        >
                          <span className="min-w-[5px] min-h-[5px] bg-[#656565] rounded-full block mt-[6px]"></span>
                          <div
                            onClick={() => handleSetTraces(playground)}
                            className={`text-[#656565] text-[12px] font-Inter font-medium cursor-pointer hover:underline ${
                              currentPlaygroundID === playground.playground_id
                                ? "underline"
                                : ""
                            }`}
                          >
                            {playground.name}
                          </div>
                        </div>
                      ))
                    : chatList.map((playground) => (
                        <div
                          key={playground.playground_id}
                          className="flex items-start my-[20px] gap-2 px-[16px]"
                        >
                          <span className="min-w-[5px] min-h-[5px] bg-[#656565] rounded-full block mt-[6px]"></span>
                          <div
                            onClick={() => getTraces(playground.playground_id)}
                            className={`text-[#656565] text-[12px] font-Inter font-medium cursor-pointer hover:underline ${
                              currentChatID === playground.playground_id
                                ? "underline"
                                : ""
                            }`}
                          >
                            {playground.name}
                          </div>
                        </div>
                      ))}
                </div>
                {page === "prompt" ? (
                  <div className="px-[16px] pt-[12px] w-full flex flex-col justify-between">
                    <div className="h-full mb-[10px]">
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
                                  <EditBlackIcon className="stroke-[#000]" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteModalOpen(true);
                                  }}
                                >
                                  <DeleteBlackIcon className="stroke-[#000]" />
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
                                checked={arenaCheck}
                                onChange={setArenaCheck}
                                onClick={() => {
                                  versions.length === 1 && addVersion();
                                }}
                                className={classNames(
                                  arenaCheck ? "bg-[#0074fb]" : "bg-gray-200",
                                  "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    arenaCheck
                                      ? "translate-x-[11px]"
                                      : "translate-x-0",
                                    "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                  )}
                                />
                              </Switch>
                              <label className="text-[#252525] text-[12px] font-medium">
                                Arena
                              </label>
                            </div>
                            <div className="flex items-center gap-[5px]">
                              <Switch
                                checked={PiiCheckEnable}
                                onChange={setPiiCheckEnable}
                                className={classNames(
                                  PiiCheckEnable
                                    ? "bg-[#0074fb]"
                                    : "bg-gray-200",
                                  "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                                )}
                              >
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
                           
                            <Listbox value={proname} onChange={setProname}>
                              {({ open }) => (
                                <>
                                  <div className="relative sm:w-[180px]">
                                    <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[3px] ">
                                      <span className="flex items-center">
                                        <span className=" block truncate mr-3">
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
                                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[180px] max-h-[234px] overflow-auto">
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
                      <div className="lg:flex h-[90%]">
                        <textarea
                          type="text"
                          name="message"
                          id="message"
                          className=" border-0 rounded  w-full  text-[16px] font-normal placeholder:text-[#CCCCCC] shadow-none mt-[5px] focus:ring-0 focus:outline-none resize-none min-h-[127px]"
                          placeholder=" Start entering your prompt for the selected models. Press
                    Button Run Playground or Shift + Return to get the results."
                          value={message}
                          onChange={handleTextChange}
                        />
                        {PiiCheckEnable && (
                          <div className=" w-full text-[16px] font-normal placeholder:text-[#CCCCCC] shadow-none mt-[5px] focus:ring-0 focus:outline-none lg:border-l lg:border-l-[#CCCCCC] lg:border-t-0 border-t border-t-[#CCCCCC] p-[8px_12px] overflow-y-auto min-h-[127px]">
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
                        className={`flex items-center gap-[2px]  text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md ${
                          apiCallInProgress
                            ? "bg-[#D4DB33] hover:bg-[#0D859A]"
                            : " bg-[#CCCCCC] text-[#666666]"
                        }`}
                        disabled={!apiCallInProgress}
                      >
                        Stop
                      </button>
                      <button
                        className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                        onClick={runPlayground}
                      >
                        Run Playground
                      </button>
                    </div>
                    {isModalOpen && (
                      <div className="modal z-[2] sm:w-[600px] w-[76%] fixed bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto">
                        <PromptTemplates
                          setIsModalOpen={setIsModalOpen}
                          onPromptOpen={handleAddToPrompt}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full sm:mt-0 mt-3 overflow-auto">
                    <div className="border-b-[#CCCCCC] border-b-[1px] flex justify-between items-center w-full p-[7px_7px_6px_13px] gap-3 flex-wrap sm:border-r-0 sm:border-t-0 border-t-[1px] border-t-[#CCCCCC]">
                      <p className="text-[12px] text-black">Chat Prompt </p>
                      <div className="flex md:justify-between justify-end items-center gap-[16px] flex-wrap">
                        <div className="flex items-center gap-[5px]">
                          <Switch
                            checked={ActiveTool}
                            onChange={setActiveTool}
                            className={classNames(
                              ActiveTool ? "bg-[#0074fb]" : "bg-gray-200",
                              "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                ActiveTool
                                  ? "translate-x-[11px]"
                                  : "translate-x-0",
                                "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                              )}
                            />
                          </Switch>
                          <label className="text-[#252525] text-[12px] font-medium">
                            Activating Tools
                          </label>
                        </div>
                        <Listbox value={proname} onChange={setProname}>
                          {({ open }) => (
                            <>
                              <div className="relative sm:w-[180px]">
                                <Listbox.Button className=" relative cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[1px] ">
                                  <span className="flex items-center">
                                    <span className=" block truncate mr-3">
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
                                    <div className="bg-white sticky top-0 z-[9]">
                                      <input
                                        type="text"
                                        className="w-full border-b border-gray-300 rounded-[6px] focus:outline-none px-2 py-1"
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
                    <div
                      className={`grid w-full
                      ${chatVersion.length > 1 && "lg:grid-cols-2"}
                      ${chatVersion.length > 2 && "xl:grid-cols-3"}
                      ${chatVersion.length > 3 && "2xl:!grid-cols-3"}
                      ${chatVersion.length > 4 && "3xl:!grid-cols-5"}
                  `}
                    >
                      {chatVersion.map((version) =>
                        cloneElement(version.component, {
                          key: version.id,
                          addChatVersion,
                          removeChatVersion: () =>
                            removeChatVersion(version.id),
                          versions: chatVersion.length,
                          chatVersionId: version.id,
                          syncAll,
                          setsyncAll,
                          syncAllMsg,
                          setSyncAllMsg,
                          setAllSystemPrompt,
                          allSystemPrompt,
                          allChatPrompt,
                          setAllChatPrompt,
                          chatSyncAll,
                          setChatSyncAll,
                          setAllChatsDetails,
                          proname,
                          currentChatID,
                          selectedModel,
                          setSelectedModel,
                          saveTraceChatPlayground,
                          setRunStart
                        })
                      )}
                    </div>
                  </div>
                )}
                <div
                  onMouseDown={handleMouseDown}
                  className="resize-div after:w-full after:left-0 after:bottom-0 after:content-[''] after:absolute after:h-[4px] after:bg-transparent after:cursor-row-resize"
                ></div>
              </div>
              {page === "prompt" && (
                <div
                  style={{ height: `calc(100vh - ${height} - 43px)` }}
                  className={`flex md:flex-row flex-col`}
                  // ${versions.length < 6 && "2xl:h-screen"}
                >
                  <div className="md:w-[182px] sm:min-w-[182px] w-full sm:border-r border-0 border-r-[#CCCCCC] lg:border-r lg:border-r-[#CCCCCC] overflow-y-auto">
                    <h1 className="text-[#000000] font-medium text-[12px] font-Inter sticky top-0 bg-white px-[16px] pt-[12px]">
                      Versions
                    </h1>
                    <ul className="list-disc px-[16px] py-[12px] pt-0 ml-[12px]">
                      {runsHistory.map((innerArray) =>
                        innerArray.map((run, innerIndex) => (
                          <li
                            key={innerIndex}
                            className="run-link text-[#656565] text-[12px] font-Inter font-medium my-[20px]"
                            onClick={() =>
                              handleRunClick(run.attributes.prompt)
                            }
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
                    className={`grid w-full overflow-y-auto relative
              ${versions.length > 1 && "lg:grid-cols-2"}
              ${versions.length > 2 && "xl:grid-cols-3"}
              ${versions.length > 3 && "2xl:!grid-cols-4"}
              ${versions.length > 4 && "3xl:!grid-cols-5"}
              `}
                  >
                    {arenaCheck && review && (
                      <div className="fixed md:bottom-[72px] bottom-[42px] z-[1] md:w-[calc(100vw-279px)] sm:w-[calc(100vw-99px)] w-[calc(100vw-72px)] flex justify-center">
                        <div className="bg-[#D9D9D9] rounded-[12px] flex flex-wrap items-center sm:p-[5px_29px_5px_23px] p-[5px_8px_5px_8px]">
                          <div className="flex items-center md:gap-[6px] gap-[4px] flex-wrap">
                            <p className="text-[12px] text-black mr-[7px] sm:whitespace-nowrap whitespace-normal">
                              Which model output is best for your use-case? :
                            </p>
                            {renderButtons()}
                            <div className="bg-[#ABABAB] h-[28px] w-[1px] sm:mx-[8px]" />
                            <div className="flex items-center sm:gap-[12px] gap-[8px]">
                              <button
                                onClick={() => setReview(false)}
                                className="bg-[#D4DB33] border-[#ABABAB] border-[1px] sm:text-[14px] text-[10px] rounded-[6px] p-[4px] h-[20px] flex justify-center items-center"
                              >
                                Equal
                              </button>
                              <button
                                onClick={() => setReview(false)}
                                className="bg-[#D4DB33] border-[#ABABAB] border-[1px] sm:text-[14px] text-[10px] rounded-[6px] p-[4px] h-[20px] flex justify-center items-center"
                              >
                                None
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {versions.map((version, index) =>
                      cloneElement(version.component, {
                        addVersion,
                        removeVersion: () => removeVersion(version.id, index),
                        message: version.message, // pass the message here
                        versionId: version.id, // pass the version ID here
                        runPressed: runPressed,
                        versions: versions.length,
                        allVersions: versions,
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
                        setClear,
                        clear,
                        selectedModel,
                        setSelectedModel,
                        arenaCheck,
                        handleSelectModel,
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {open && (
            <NewPrompt
              setOpen={setOpen}
              open={open}
              updatePlaygroundList={updatePlaygroundList}
              actionType={actionType}
              playground={actionType === "edit" ? currentPlayground : null}
              setCurrentID={
                page === "prompt" ? setCurrentPlaygroundID : setCurrentChatID
              }
              setCurrentPlayground={setCurrentPlayground}
              page={page}
            />
          )}
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="text-[20px]">
            You don't have permission to access this page.
          </p>
        </div>
      )}
    </>
  );
};

export default index;
