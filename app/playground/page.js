'use client'
import  { useState, useEffect, useRef, useCallback } from "react";
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
import PromptTemplates from "@/components/modal/PromptTemplates";
import { Switch } from "@headlessui/react";
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
  const [chatList, setChatList] = useState([]);
  const [piiData, setPiiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const [PiiCheckEnable, setPiiCheckEnable] = useState(false);
  const [arenaCheck, setArenaCheck] = useState(false);
  const [ragCheck, setRagCheck] = useState(false);
  const [vectorStores, setVectorStores] = useState([]);
  const [searchRag, setSearchRag] = useState('');
  const [selectedRag, setSelectedRag] = useState('');
  const [syncAll, setsyncAll] = useState(false);
  const [syncAllMsg, setSyncAllMsg] = useState(false);
  const [analysisModelOpen, setAnalysisModelOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [allSystemPrompt, setAllSystemPrompt] = useState("");
  const [allChatPrompt, setAllChatPrompt] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [chatSyncAll, setChatSyncAll] = useState(false);
  const [currentPlaygroundID, setCurrentPlaygroundID] = useState("");
  const [currentChatID, setCurrentChatID] = useState();
  const [allPromtsDetails, setAllPromtsDetails] = useState([]);
  const [allChatsDetails, setAllChatsDetails] = useState([]);
  const [files, setFiles] = useState([]);
  const [chromaCollectionName, setChromaCollectionName] = useState("");
  const [selectedProject, setSelectedProject] = useState({
    name: "Select a Project",
  });
  
  const [selectedModel, setSelectedModel] = useState(null); // State to store the selected model
  const [searchProject, setSearchProject] = useState("");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(true);
  const [review, setReview] = useState(false);
  const [traces, setTraces] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const params = useSearchParams();
  const data = params.get("data");
  const [runStart, setRunStart] = useState();
 
  const filteredVectorStores = vectorStores?.filter(vectorStore =>
    vectorStore.name.toLowerCase().includes(searchRag)
  );

  useEffect(() => {
    const parsedData = JSON.parse(data);
    if (parsedData && parsedData.input) {
      setMessage(parsedData.input);
    }
    if (parsedData && parsedData.project_name) {
      const matchingProject = projectList.find(
        (project) => project.name === parsedData.project_name
      );
      setSelectedProject(matchingProject);
    }
  }, [projectList, data]);

 const groupedChatList = chatList.reduce((acc, playground) => {
   const { name, description } = playground;
 
   // Check if playground.name is a valid date in the format YYYY-MM-DD
   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
   if (dateRegex.test(name)) {
     const date = new Date(name);
     if (!isNaN(date)) {
       const formattedDate = date.toLocaleDateString("de-DE", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
       });
 
       if (!acc[formattedDate]) {
         acc[formattedDate] = [];
       }
       acc[formattedDate].push({ description, playground });
     } else {
       console.error(`Invalid date: ${name}`);
     }
   } else {
     if (!acc["old"]) {
       acc["old"] = [];
     }
     acc["old"].push({ description, playground });
   }
 
   return acc;
 }, {});
 
  const sortedDates = Object.keys(groupedChatList)
  .filter(date => date !== "old")
  .sort((a, b) => new Date(b.split(".").reverse().join("-")) - new Date(a.split(".").reverse().join("-")));

  const handleAddToPrompt = (content) => {
    setAllChatPrompt({ 
      value: content, 
      timestamp: Date.now() 
    });
    setIsModalOpen(false);
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  const handleFileChange = (event) => {
   
    if (event.target.files) {
      setFiles(event.target.files);
      if(syncAllMsg){
        setAllFiles(event.target.files);
      }
      
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


  useEffect(() => {
    setFiles(allFiles);
  }, [allFiles]);
  const handlePaste = (event) => {
    const items = event.clipboardData?.items;

    if (items) {
      const files = Array.from(items)
        .map((item) => item.getAsFile())
        .filter((file) => file !== null);

      if (files.length > 0) {
        const validFiles = files.filter(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("text/")
        );

        if (validFiles.length === files.length) {
          const dataTransfer = new DataTransfer();
          validFiles.forEach((file) => dataTransfer.items.add(file));
          setFiles(dataTransfer.files);
          if(syncAllMsg){
            setAllFiles(dataTransfer.files)
          }
        } else {
          toast.error("Only image and text files are allowed");
        }
      }
    }
  };
  const updatePlaygroundList = async () => {
    await getChatPlaygrounds();
  };


  const fetchVectorStores = async () => {
    try {
      const response = await fetch("/api/knowledge/files/vectorstore", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch vector stores");
      }
      const data = await response.json();
      setVectorStores(data.data.stores);
    } catch (error) {
      console.error("Error fetching vector stores:", error);
    }
  };
  useEffect(() => {
    fetchVectorStores();
  }, []);

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
    getChatPlaygrounds();
  }, []);




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

  const [chatVersions, setChatVersions] = useState([{ id: 1 }]);



  const addChatVersion = useCallback(() => {
    setChatVersions(prevVersions => [
      ...prevVersions,
      { id: prevVersions.length + 1 }
    ]);
  }, []);

  const [allMessages, setAllMessages] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); // State to trigger re-fetching
  const componentRefs = useRef([]);
const [savePressed, setSavePressed] = useState(false);
  // Function to gather all messages from child components
  const updateAllMessages = useCallback(() => {
    const updatedMessages = componentRefs.current.map(ref => ref?.getMessages() || []);
    setAllMessages(updatedMessages);
    console.log('All Messages:', updatedMessages); // Log all messages when updated
  }, [updateTrigger]);

  // Update allMessages when chatVersions change
  useEffect(() => {
    updateAllMessages();
  }, [chatVersions, updateTrigger, updateAllMessages]);

  useEffect(() => {
    if (savePressed) {
      traceChats();
      setSavePressed(!savePressed)
    }
  }, [allMessages]);

  const handleMessagesUpdate = (index) => {
    // Trigger re-fetching of all messages
    setUpdateTrigger(prev => prev + 1);
  };

// Log allMessages whenever it changes
useEffect(() => {
  console.log('All Messages:', allMessages);
}, [allMessages]);

  useEffect(() => {
    // Collect messages from all Chat_version instances when chatVersions change
    const allMessagesFromRefs = componentRefs.current.map(ref => ref?.getMessages());
    setAllMessages(allMessagesFromRefs);
  }, [chatVersions]);


  const removeChatVersion = useCallback((id) => {
    if (chatVersions.length > 1) {
      setChatVersions(prevVersions => prevVersions.filter(version => version.id !== id));
    }
  }, [chatVersions.length]);




  const initialHeight = 391; // Initial height in pixels
  const [height, setHeight] = useState(`${initialHeight}px`);


 const traceChats = async () => {

    if (selectedProject.project_id === undefined ) {
      toast.error("Please select a project first!");
      return;
    }
  
  
    
    try {
      
     
      const formData = {
        project_id: selectedProject.project_id,
        ...(currentChatID !== undefined && { playground_id: currentChatID }),
        access_token: localStorage.getItem("customAIKey"),
        chat_columns: allMessages,
       
      }; 
      const response = await fetch("/api/manageChatPlayground", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success("The traces are successfully stored!");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleCreateChat = async () => {
      setChatVersions([{id:1}]);

    const currentDate = new Date();

    // Format the current date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];
  
    // Format the current time as HH:MM
    const formattedTime = currentDate.toTimeString().split(' ')[0].slice(0, 5);
    const playgroundFormData = {
      playground_name: formattedDate,
      playground_description: formattedTime,
    };
    if (
      playgroundFormData.playground_name == "" ||
      playgroundFormData.playground_description == ""
    ) {
      toast.error("Please Enter required fields!");
      return false;
    }
    const formData = {
      playground_name: playgroundFormData.playground_name,
      playground_description: playgroundFormData.playground_description
    };
    try {
      let url = "/api/manageChatPlayground";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
       
        updatePlaygroundList();
        setCurrentChatID(responseData);
      } else {
        toast.error(responseData.detail);
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during API request:", error);
    }
  };
  const handleSelectRag = async (value) => {
    // Update the selected value
    setSelectedRag(value);
    // Call the download function when the value changes
   
  };


  useEffect(() => {
    if (selectedRag) {
      getChromaCollectionName(selectedRag);
    }
  }, [selectedRag]);

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
    console.log("these models are selected", selectedModels)
    const formData = {
      project_id: selectedProject.project_id,
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
    for (let i = 0; i < chatVersions.length; i++) {
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
      setSelectedProject({
        name: "Select a Project",
      })
      if (responseData.traces && responseData.traces.length > 0) {
        setChatVersions([]);
        const newChatVersions = [];
        const selectedProjectOfOldChat = responseData.project;
        console.log("this old project ", selectedProjectOfOldChat)
        const matchingProject = projectList.find(
          (project) => project.project_id === selectedProjectOfOldChat
        );
        setSelectedProject(matchingProject);
        responseData.traces.forEach((trace, i) => {
          newChatVersions.push({
            id: i + 1,
            component: <Chat_version key={i + 1} chatHistory={trace}  />,
          });
          
        });
        // Set chatVersion with the new elements
        setChatVersions((prevChatVersions) => [
          ...prevChatVersions,
          ...newChatVersions,
        ]);
      } else {
        const newId =
          chatVersions.length > 0
            ? chatVersions[chatVersions.length - 1].id + 1
            : 1;
        setChatVersions([{ id: newId, component: <Chat_version key={newId}  selectedRag={selectedRag} ragCheck={ragCheck} chromaCollectionName={chromaCollectionName}/> }]);
      }
    } else {
      console.error("API request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during API request:", error);
  }
};

const getChromaCollectionName = async (store_id) => {
  try {

    // Fetch the zip file from the API
    const response = await fetch(`/api/knowledge/files/vectorstore/rag?store_id=${store_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to download vector store");
    }

    const data = await response.json();
    //idk data.data is needed a lot maybe i am just stupid
    setChromaCollectionName(data.data);
  } catch (error) {
    console.error("Error downloading or processing vector store:", error);
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
                className="flex md:flex-row flex-col border-b border-b-[#CCCCCC] overflow-y-auto relative !h-[calc(100vh-43px)] !resize-none"
              >
         
                <div
                  className="md:w-[182px] md:min-w-[182px] w-full overflow-y-auto md:border-r md:border-r-[#CCCCCC] h-[calc(100vh-44px)]"
                   
                >
                <div className="sticky top-0 bg-white px-[16px] py-[12px] border-b-[#CCCCCC] border-b-[1px]">
  <div className="flex justify-center items-center h-full">
    <button
      onClick={handleCreateChat}
      className="flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium 2xl:text-[12px] text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
    >
      <FiPlus /> New Chat
    </button>
  </div>
</div>

                  {sortedDates.map(date => (
  <div key={date}>
    <h3 className="text-[14px] font-bold mt-5 ml-2">{date}</h3>
    {groupedChatList[date].slice().reverse().map(({ description, playground }) => (
      <div
        key={playground.playground_id}
        className="flex items-start my-[10px] gap-2 px-[16px]"
      >
        <div
          onClick={() => getTraces(playground.playground_id)}
          className={`text-[#656565] text-[12px]  cursor-pointer hover:font-bold ${
            currentChatID === playground.playground_id ? "font-bold" : ""
          }`}
        >
          {description}
        </div>
      </div>
    ))}
  </div>
))}

{/* Render the "old" section */}
{groupedChatList.old && (
  <div>
    <h3 className="text-[14px] font-bold mt-5 ml-2">Old</h3>
    {groupedChatList.old.slice().reverse().map(({ description, playground }) => (
      <div
        key={playground.playground_id}
        className="flex items-start my-[10px] gap-2 px-[16px]"
      >
        <div
          onClick={() => getTraces(playground.playground_id)}
          className={`text-[#656565] text-[12px] cursor-pointer hover:font-bold ${
            currentChatID === playground.playground_id ? "font-bold" : ""
          }`}
        >
          {description}
        </div>
      </div>
    ))}
  </div>
)}

                </div>
                
                  <div className="w-full sm:mt-0 mt-3 overflow-auto">
                    <div className="border-b-[#CCCCCC] border-b-[1px] flex justify-between items-center w-full p-[7px_7px_6px_13px] gap-3 flex-wrap sm:border-r-0 sm:border-t-0 border-t-[1px] border-t-[#CCCCCC]">
                      <div className="flex justify-between w-full sm:flex-row flex-col gap-3">
<p>Chat</p>
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
                           

                            <div className="flex items-center gap-[5px]">
                            {isModalOpen && (
                      <div className="modal z-[2] sm:w-[600px] w-[76%] fixed bg-white right-0 top-0 border-l border-[#CCCCCC] h-screen overflow-y-auto">
                        <PromptTemplates
                          setIsModalOpen={setIsModalOpen}
                          onPromptOpen={handleAddToPrompt}
                        />
                      </div>
                    )}

{ragCheck && (
        <div className="flex sm:items-center sm:gap-[18px] gap-[10px] sm:flex-row flex-col items-start lg:mt-0 mt-[10px]">
          <Listbox value={selectedRag} onChange={handleSelectRag}>
            {({ open }) => (
              <>
                <div className="relative sm:w-[180px]">
                  <Listbox.Button className="relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[3px]">
                    <span className="flex items-center">
                      <span className="block truncate mr-3">
                        {selectedRag ? vectorStores.find(store => store.store_id === selectedRag)?.name : 'Select a Database'}
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
                          value={searchRag}
                          onChange={(e) => setSearchRag(e.target.value)}
                        />
                      </div>
                      {filteredVectorStores?.map((vectorStore) => (
                        <Listbox.Option
                          key={vectorStore.store_id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-[#f0efef] rounded-[6px]"
                                : "text-[#000]",
                              "relative cursor-default select-none sm:py-2 py-1 sm:pl-[30px] pl-2 pr-2 sm:pr-9"
                            )
                          }
                          value={vectorStore.store_id}
                        >
                          <div className="flex items-center">
                            <span
                              className=
                               
                                   "text-[#656565] text-[12px] font-Inter font-medium block truncate"
                            
                            >
                              {vectorStore.name}
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
      )}



<Switch
                                checked={ragCheck}
                                onChange={setRagCheck}
                              
                                className={classNames(
                                  ragCheck ? "bg-[#0074fb]" : "bg-gray-200",
                                  "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    ragCheck
                                      ? "translate-x-[11px]"
                                      : "translate-x-0",
                                    "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                  )}
                                />
                              </Switch>
                              <label className="text-[#252525] text-[12px] font-medium">
                                Memory
                              </label>
                              
                              {arenaCheck && (<button
                        onClick={() => setReview(true)}
                        className=" flex items-center  bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[10px] font-Inter py-[6px] px-[14px] rounded-md "
                      >
                        Score Arena
                      </button>)}
                              <Switch
                                checked={arenaCheck}
                                onChange={() => {
                                  setArenaCheck(!arenaCheck);
                                  setReview(false);
                                }}                                onClick={() => {
                                  chatVersions.length === 1 && addChatVersion();
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
                                PII Checker
                              </label>
                              
                            </div>
                          </div>
                          <div className="flex sm:items-center sm:gap-[18px] gap-[10px] sm:flex-row flex-col items-start lg:mt-0 mt-[10px]">
                          <button
                        onClick={() => setIsModalOpen(true)}
                        className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[10px] font-Inter py-[6px] px-[14px] rounded-md "
                      >
                        Prompt Templates
                      </button>
                            <Listbox value={selectedProject} onChange={setSelectedProject}>
                              {({ open }) => (
                                <>
                                  <div className="relative sm:w-[180px]">
                                    <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[3px] ">
                                      <span className="flex items-center">
                                        <span className=" block truncate mr-3">
                                          {selectedProject?.name}
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
                                                  selectedProject
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
                    </div>
                    <div
                      className={`grid w-full
                      ${chatVersions.length > 1 && "lg:grid-cols-2"}
                      ${chatVersions.length > 2 && "xl:grid-cols-3"}
                      ${chatVersions.length > 3 && "2xl:!grid-cols-3"}
                      ${chatVersions.length > 4 && "3xl:!grid-cols-5"}
                  `}
                    >
                         {arenaCheck && review && (
                      <div className="fixed md:bottom-[72px] bottom-[42px] z-[1] md:w-[calc(100vw-279px)] sm:w-[calc(100vw-99px)] w-[calc(100vw-72px)] flex justify-center">
                        <div className="bg-[#D9D9D9] rounded-[12px] flex flex-wrap items-center sm:p-[5px_29px_5px_23px] p-[5px_8px_5px_8px]">
                          <div className="flex items-center md:gap-[6px] gap-[4px] flex-wrap">
                            <p className="text-[12px] text-black mr-[7px] sm:whitespace-nowrap whitespace-normal">
                              Which model was better to use? :
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
                       {chatVersions.map((version, index) => (
                <Chat_version
                  key={`${version.id}-${ragCheck}-${selectedRag}-${chromaCollectionName}`}
                  ref={el => (componentRefs.current[index] = el)}
                  versionId={version.id}
                  onSave={() => handleMessagesUpdate(index)}
                  ragCheck={ragCheck}
                  selectedRag={selectedRag}
                  addChatVersion={addChatVersion}
                  removeChatVersion={() => removeChatVersion(version.id)}
                  columnCount={chatVersions.length}
                  syncAll={syncAll}
                  setsyncAll={setsyncAll}
                  syncAllMsg={syncAllMsg}
                  setSyncAllMsg={setSyncAllMsg}
                  setAllSystemPrompt={setAllSystemPrompt}
                  allSystemPrompt={allSystemPrompt}
                  allChatPrompt={allChatPrompt}
                  setAllChatPrompt={setAllChatPrompt}
                  chatSyncAll={chatSyncAll}
                  setChatSyncAll={setChatSyncAll}
                  setAllChatsDetails={setAllChatsDetails}
                  selectedProject={selectedProject}
                  currentChatID={currentChatID}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  setRunStart={setRunStart}
                  allFiles={allFiles}
                  setAllFiles={setAllFiles}
                  piiCheck={PiiCheckEnable}
                  arenaCheck={arenaCheck}
                  chatHistory={version?.component?.props?.chatHistory}
                  chromaCollectionName={chromaCollectionName}
                  setSavePressed={setSavePressed}
                />
              ))}
                    </div>
                  </div>
                
                <div
                  onMouseDown={handleMouseDown}
                  className="resize-div after:w-full after:left-0 after:bottom-0 after:content-[''] after:absolute after:h-[4px] after:bg-transparent after:cursor-row-resize"
                ></div>
              </div>
             
            </div>
          </div>
      
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
