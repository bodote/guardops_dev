import React, { useState, Fragment, useEffect, useRef } from "react";
import {
  EditIcon,
  MinusIcon,
  PlusRectangleIcon,
  SettingIcon,
  ShareIcon,
  LoadingIcon,
  SaveIcon,
  User2Icon,
  FireIcon,
} from "@/public/Assets/Icons/Allsvg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { AiOutlineStop } from "react-icons/ai";
import ModelSettings from "./modelSettings";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Chat_version = ({
  versions,
  removeChatVersion,
  addChatVersion,
  syncAll,
  setsyncAll,
  setAllSystemPrompt,
  allSystemPrompt,
  syncAllMsg,
  setSyncAllMsg,
  allChatSystemPromot,
  setAllChatSystemPromot,
  proname,
  currentChatID,
  selectedModel,
  setSelectedModel,
}) => {
  const [userMessage, setUserMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      input: "",
      output: "",
    },
  ]);
  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const [sync, setSync] = useState(false);
  const [selected, setSelected] = useState(
    selectedModel
      ? selectedModel
      : {
          name: "Select an option",
        }
  );
  const [enabled, setEnabled] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [apiCallInProgress, setApiCallInProgress] = useState(false);
  const [models, setModels] = useState([]);
  const [fireworksAIKey, setFireworksAIKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [togetheraiKey, setTogetheraiKey] = useState("");
  const [customAIKey, setCustomAIKey] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedMessage, setEditedMessage] = useState("");
  const [tooltipData, setTooltipData] = useState({});
  const [tracesData, setTracesData] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  // State for settings values
  const [settings, setSettings] = useState({
    maxTokens: 500,
    temperature: 0.6,
    topP: 0.2,
    topK: 0.3,
    frequencyPenalty: 0.3,
    presencePenalty: 0.3,
  });

  // Handle settings change
  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };
  const getModels = async () => {
    const response = await fetch(`/api/manageModels`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.models) {
      setModels(data.models);
    }
  };

  const getTraces = async () => {
    try {
      const response = await fetch(
        `/api/manageTraces?playground_id=${currentChatID}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setTracesData(responseData.traces);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const reconstructConversation = (traces) => {
    let chatHistory = [];
    traces.forEach((trace) => {
      const promptOutputPairs = trace;

      // Find the root prompt-output pair where parent_id is null
      const rootPair = promptOutputPairs.find(
        (pair) => pair.parent_id === null
      );
      if (!rootPair) {
        return; // Move to the next trace if root pair is not found
      }
      chatHistory.push(rootPair);

      let currentParentId = rootPair.context.span_id;
      while (chatHistory.length < promptOutputPairs.length) {
        // Find the next prompt-output pair where parent_id matches the span_id of the previously added pair
        const nextPair = promptOutputPairs.find(
          (pair) => pair.parent_id === currentParentId
        );
        if (nextPair) {
          chatHistory.push(nextPair);
          currentParentId = nextPair.context.span_id;
        } else {
          break; // Exit loop if no more pairs are found
        }
      }
    });

    const newMessages = chatHistory.map((pair) => ({
      input: pair.attributes.prompt || "",
      output: pair.attributes.output || "",
    }));

    setMessages(newMessages);
  };

  const providerConfig = {
    openai: {
      endpoint: "https://api.openai.com/v1/chat/completions",
      getKey: () => openaiKey,
    },
    fireworks: {
      endpoint: "https://api.fireworks.ai/inference/v1/chat/completions",
      getKey: () => fireworksAIKey,
    },
    custom: {
      endpoint: () => customEndpoint,
      getKey: () => customAIKey,
    },
    togethercompute: {
      endpoint: "https://api.together.xyz/v1/chat/completions",
      getKey: () => togetheraiKey,
    },
    // Add more providers here as needed
  };

  const handleEditMessage = (index) => {
    setEditingIndex(index);
    setEditedMessage(messages[index].input);
  };

  const handleSaveEdit = async () => {
    // Update the message with the edited content
    const updatedMessages = [...messages];
    updatedMessages[editingIndex].input = editedMessage;
    setMessages(updatedMessages);
    setEditingIndex(-1); // Reset editing index
    setEditedMessage("");

    // Clear messages after the edited input
    const messagesBeforeEdit = updatedMessages.slice(0, editingIndex + 1);
    setMessages(messagesBeforeEdit);

    // Fetch API response
    await fetchApiResponse();
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1); // Reset editing index
    setEditedMessage(""); // Reset edited message
  };

  const simulateCtrlEnter = () => {
    const event = new Event("keydown");
    event.ctrlKey = true;
    event.key = "Enter";
    window.dispatchEvent(event);
  };

  const handleMessageSubmit = () => {
    if (syncAllMsg) {
      simulateCtrlEnter();
    } else {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!selected || selected.name === "Select an option") {
      setError("Please select a model first.");
      return;
    }
    if (userMessage.length) {
      setApiCallInProgress(true);
      setMessages([...messages, { input: userMessage }]);
      setUserMessage("");
      fetchApiResponse();
    }
  };

  const fetchApiResponse = async () => {
    const providerInfo = providerConfig[selected.provider];

    if (!providerInfo) {
      setError("Please select the valid model");
      return;
    }

    const apiEndpoint =
      selected.provider === "custom"
        ? providerInfo.endpoint()
        : providerInfo.endpoint;
    const authKey =
      selected.provider === "custom"
        ? `${providerInfo.getKey()}`
        : `Bearer ${providerInfo.getKey()}`;
    const formData = {
      settings: settings,
      modal: selected,
      apiEndpoint: apiEndpoint,
      authKey: authKey,
      message: editedMessage ? editedMessage : userMessage,
      systemPrompt: open ? systemPrompt : "",
      type: "chat",
      data: messages,
    };

    try {
      const res = await fetch("/api/open-ai-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setApiCallInProgress(false);
        setError("No content available");
        const errorText = await res.text();
        let errorMessage = JSON.parse(errorText);
        selected.provider === "fireworks" && setError(errorMessage.error);
        selected.provider === "openai" && setError(errorMessage.error.message);
        selected.provider === "fireworks" && setError(errorMessage.error);
        selected.provider === "togethercompute" && setError(errorMessage.error);
        throw new Error(res.statusText);
      } else {
        const data = res.body;
        if (!data) {
          setError("No content available");
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let completeString = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setError("");
          completeString += chunkValue;
          setMessages((prevMessages) => {
            const lastIndex = prevMessages.length - 1;
            return prevMessages.map((message, index) => {
              if (index === lastIndex) {
                return {
                  ...message,
                  output: completeString.replace(/\{"tokens":\d+\}/g, ""),
                };
              } else {
                return message;
              }
            });
          });
        }
        setApiCallInProgress(false);
      }
    } catch (error) {
      console.error("API request failed:", error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const CodeBox = ({ code }) => {
    return (
      <div className="code-box-container my-2 max-w-[700px]">
        <pre className="code-box">{code}</pre>
        <button className="copy-button" onClick={() => copyToClipboard(code)}>
          Copy
        </button>
      </div>
    );
  };

  const parseApiResponse = (apiResponse) => {
    const segments = [];
    const regex = /```(.*?)```/gs;
    let lastIndex = 0;
    apiResponse?.replace(regex, (match, codeBlock, index) => {
      // Add the text segment before the code block
      if (index > lastIndex) {
        segments.push({
          type: "text",
          content: apiResponse.slice(lastIndex, index),
        });
      }
      // Add the code block
      segments.push({ type: "code", content: codeBlock });
      lastIndex = index + match.length;
    });

    // Add any remaining text after the last code block
    if (apiResponse && lastIndex < apiResponse.length) {
      segments.push({ type: "text", content: apiResponse.slice(lastIndex) });
    }
    return segments;
  };

  const saveTracePlayground = async () => {
    if (apiCallInProgress) {
      return;
    }
    if (proname.project_id === undefined || currentChatID.length === 0) {
      toast.error("Please select the project and playground first!!!");
      return;
    }
    const modelId = selected.model_id;
    const formatModelParams = (settings) => {
      const paramsArray = Object.entries(settings).map(
        ([key, value]) => `${key}:${value}`
      );
      return paramsArray.join(", ");
    };
    const APIBody = messages
      .filter((item) => item.input !== "" || item.output !== "")
      .map((item) => ({
        [modelId]: {
          system_prompt: systemPrompt,
          input: item.input,
          output: item.output.replace(/\{"tokens":\d+\}/g, ""),
          model_params: formatModelParams(settings),
        },
      }));
    const formData = {
      project_id: proname.project_id,
      playground_id: currentChatID,
      access_token: localStorage.getItem("customAIKey"),
      start_time: new Date().toISOString(),
      prompt_response_pairs: APIBody,
    };
    try {
      const response = await fetch("/api/manageChatPlayground", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success("The traces are successfully stored!!!");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleSelect = (model) => {
    setSelected(model);
    setSelectedModel(model);
  };

  const filteredModels = models.filter((model) => {
    const trimmedSearchModel = searchModel.replace(/[^\w\s]/g, "").trim();
    const regex = new RegExp(trimmedSearchModel, "gi");
    const trimmedModelName = model.name
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "");
    return trimmedModelName.match(regex);
  });

  useEffect(() => {
    getModels();
    const key = localStorage.getItem("fireworksAIKey") || "";
    setFireworksAIKey(key);
    const key1 = localStorage.getItem("openAIKey") || "";
    setOpenaiKey(key1);
    const key2 = localStorage.getItem("customAIKey") || "";
    setCustomAIKey(key2);
    const key3 = localStorage.getItem("customEndpoint") || "";
    setCustomEndpoint(key3);
    const key4 = localStorage.getItem("togetherAIKey") || "";
    setTogetheraiKey(key4);
  }, []);

  useEffect(() => {
    if (currentChatID) {
      getTraces();
    }
  }, [currentChatID]);

  useEffect(() => {
    if (tracesData) {
      const modelName = tracesData[0]?.[0]?.attributes?.model || "";
      if (modelName) {
        setSelected(models.find((model) => model.name === modelName));
      }
      reconstructConversation(tracesData);
    }
  }, [tracesData]);

  useEffect(() => {
    if (showSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        handleSendMessage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userMessage, selected]);

  const handleMessageInputChange = (event) => {
    setUserMessage(event.target.value);
    if (syncAllMsg) {
      setAllChatSystemPromot(event.target.value);
    }
  };
  useEffect(() => {
    setUserMessage(allChatSystemPromot);
  }, [allChatSystemPromot]);

  const handleInputChange = (event) => {
    setSystemPrompt(event.target.value);
    if (syncAll) {
      setAllSystemPrompt(event.target.value);
    }
  };
  useEffect(() => {
    setSystemPrompt(allSystemPrompt);
  }, [allSystemPrompt]);
  return (
    <div className="flex sm:flex-row flex-col items-start">
      <div className="w-full">
        <div className="border-r-[#CCCCCC] border-r-[1px]">
          <div className="flex sm:items-center justify-between sm:flex-row flex-col relative xl:p-[9px_27px_10px_11px] p-[9px_11px_10px_11px]">
            <div className="flex items-center gap-2">
              <Listbox value={selected} onChange={handleSelect}>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <Listbox.Button
                        className={`relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[8px] py-[3px] ${
                          versions > 2 ? "sm:!w-[140px]" : ""
                        }`}
                      >
                        <span className="flex items-center">
                          <span className=" block truncate pr-[20px]">
                            {selected?.name}
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
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[180px] max-h-[230px] overflow-auto">
                          <div className="bg-white sticky top-0 z-[9] p-1">
                            <input
                              type="text"
                              className="border-b border-gray-300 focus:outline-none px-2 py-1 w-[97%] bg-white rounded-[6px] ml-[4px] mt-[3px]"
                              placeholder="Search..."
                              value={searchModel}
                              onChange={(e) => setSearchModel(e.target.value)}
                            />
                          </div>
                          {filteredModels.map((model) => (
                            <Listbox.Option
                              key={model.model_id}
                              id={model.model_id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f0efef]  rounded-[6px]"
                                    : "text-[#000]",
                                  "relative cursor-default select-none lg:py-2 py-1 px-[10px]"
                                )
                              }
                              value={model}
                              onMouseEnter={() => setTooltipData(model)}
                              onMouseLeave={() => setTooltipData({})}
                            >
                              <div
                                className="flex items-center tooltip-main"
                                data-tooltip-id={`my-tooltip-${model.model_id}`}
                              >
                                <span
                                  className={classNames(
                                    selected
                                      ? "text-[#656565] text-[12px] font-Inter font-medium"
                                      : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {model.name}
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
              <button className="text-[#464F60] text-[17px] rotate-[95deg]">
                <AiOutlineStop />
              </button>
            </div>
            <div
              className={`flex gap-[17px] sm:mt-0 mt-[20px] ${
                versions > 2 ? "!gap-[10px]" : ""
              }`}
            >
              <button
                onClick={() =>
                  setMessages([
                    {
                      input: "",
                      output: "",
                    },
                  ])
                }
              >
                <LoadingIcon />
              </button>
              <button onClick={saveTracePlayground}>
                <SaveIcon />
              </button>
              <button onClick={() => setOpen(!open)}>
                <EditIcon />
              </button>
              <button>
                <MinusIcon onClick={() => removeChatVersion()} />
              </button>
              <button>
                <PlusRectangleIcon onClick={() => addChatVersion()} />
              </button>
              <button>
                <ShareIcon />
              </button>
              <button onClick={() => setShowSettings(true)}>
                <SettingIcon />{" "}
              </button>
            </div>

            {showSettings && (
              <div
                ref={modalRef}
                className="max-w-[285px] w-full mx-auto bg-white shadow-lg rounded-lg absolute sm:top-[40px] top-[80px] right-0 p-[13px_23px_17px_25px] z-[1]"
              >
                <ModelSettings
                  onSettingsChange={handleSettingsChange}
                  settings={settings}
                />
              </div>
            )}
          </div>

          <div className="relative">
            {error && (
              <p className="bg-[#ffe1e1bb] text-[red] p-[10px] flex gap-2 items-center absolute top-0 w-full">
                <MdErrorOutline className="text-[20px]" />
                {error}
              </p>
            )}

            <div
              className={`bg-[#F7F7F7] h-[calc(100vh-249px)] overflow-y-auto ${
                error ? "pt-[44px]" : ""
              }`}
            >
              {open && (
                <div className="border-[#CCCCCC] border-[1px] rounded-[12px] p-[7px_10px_10px_14px] m-[10px] mt-[16px]">
                  <p className="text-[#252525] font-medium text-[14px]">
                    System Prompt
                  </p>
                  <textarea
                    placeholder="Your system prompt to the model"
                    name="system"
                    id="system"
                    value={systemPrompt}
                    onChange={handleInputChange}
                    className="border-[#EAEBF0] border-[1px] rounded-[6px] mt-2 placeholder:text-[#68727D] text-[15px] font-medium h-[153px] w-full resize-none shadow-[0px_1px_2px_0px_#1018280A]"
                  ></textarea>
                  <div className="flex justify-between items-center gap-[10px] flex-wrap">
                    <div className="flex items-center gap-[5px]">
                      <Switch
                        checked={syncAll}
                        onChange={() => setsyncAll(!syncAll)}
                        className={classNames(
                          syncAll ? "bg-[#0074fb]" : "bg-gray-200",
                          "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            syncAll ? "translate-x-[11px]" : "translate-x-0",
                            "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                      <label className="text-[#252525] text-[12px] font-medium">
                        Sync to all
                      </label>
                    </div>
                    <button
                      onClick={() =>
                        systemPrompt &&
                        toast.success("System prompt saved successfully")
                      }
                      className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                    >
                      Save System Prompt
                    </button>
                  </div>
                </div>
              )}
              <div
                className={open ? "h-[calc(100vh-520px)] overflow-auto" : ""}
              >
                {messages.map((message, index) => (
                  <Fragment key={index}>
                    {message.input && (
                      <>
                        <div
                          className={`bg-[#ECECEC] md:p-[19px_31px] p-[8px_10px] group ${
                            editingIndex === index
                              ? ""
                              : "flex justify-between gap-[20px]"
                          }`}
                        >
                          <div className="flex sm:gap-[19px] gap-[8px]">
                            <User2Icon className="min-w-[16px]" />
                            {editingIndex === index ? (
                              <>
                                <div className="flex-col w-full">
                                  <div>
                                    <textarea
                                      className="bg-transparent border-none w-full  focus:ring-0 focus:outline-none pt-0 pl-0 h-[100px]"
                                      value={editedMessage}
                                      onChange={(e) =>
                                        setEditedMessage(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex gap-[13px] justify-center item-center">
                                    <button
                                      onClick={handleSaveEdit}
                                      className="text-[12px] text-[#000]  bg-[#D4DB33] block px-[13px] h-fit py-[3px] rounded-[6px] font-medium"
                                    >
                                      Save & Send
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="text-[12px] text-[#000] bg-[#D4DB33]  block px-[29px] h-fit py-[3px] rounded-[6px] font-medium"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p className="md:text-[16px] text-[14px]">
                                {message.input}{" "}
                              </p>
                            )}
                          </div>
                          {editingIndex !== index && (
                            <button
                              className="text-[20px] text-[#2B3F6C] hidden group-hover:block"
                              onClick={() => handleEditMessage(index)}
                            >
                              <RiEdit2Line />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                    {message.output && (
                      <div
                        // style={{ whiteSpace: "pre-wrap" }}
                        className="md:p-[19px_31px] p-[8px_10px] flex sm:gap-[19px] gap-[8px]"
                      >
                        <FireIcon className="min-w-[16px]" />
                        <div className="w-[calc(100%-35px)]">
                          {parseApiResponse(message.output).map(
                            (segment, index) =>
                              segment.type === "code" ? (
                                <CodeBox key={index} code={segment.content} />
                              ) : (
                                <ReactMarkdown
                                  components={{
                                    ul: ({ node, ...props }) => (
                                      <ul
                                        style={{
                                          display: "block",
                                          listStyleType: "disc",
                                          paddingInlineStart: "40px",
                                        }}
                                        {...props}
                                      />
                                    ),
                                    ol: ({ node, ...props }) => (
                                      <ol
                                        style={{
                                          display: "block",
                                          listStyleType: "decimal",
                                          paddingInlineStart: "40px",
                                        }}
                                        {...props}
                                      />
                                    ),
                                    h1: ({ node, ...props }) => (
                                      <h1
                                        className="font-bold text-6xl"
                                        {...props}
                                      />
                                    ),
                                    p: ({ node, ...props }) => (
                                      <p
                                        style={{
                                          whiteSpace: "pre-wrap",
                                        }}
                                        {...props}
                                      />
                                    ),
                                  }}
                                  remarkPlugins={[gfm]}
                                  key={index}
                                  children={segment.content}
                                />
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="p-[10px_14px_12px_20px] border-b-[#CCC] border-b-[1px]">
              <div className="bg-[#ECECEC] rounded-md">
                <textarea
                  placeholder="Send a message"
                  value={userMessage}
                  onChange={handleMessageInputChange}
                  className="border-0 resize-none bg-[#ECECEC] focus:ring-0 focus:shadow-none w-full rounded-md"
                ></textarea>
                <div className="flex justify-end gap-[10px] pr-[13px] pb-2">
                  <div className="flex items-center gap-[5px]">
                    <Switch
                      checked={syncAllMsg}
                      onChange={() => setSyncAllMsg(!syncAllMsg)}
                      className={classNames(
                        syncAllMsg ? "bg-[#0074fb]" : "bg-[#898989]",
                        "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          syncAllMsg ? "translate-x-[11px]" : "translate-x-0",
                          "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                    <label className="text-[#252525] text-[12px] font-medium">
                      Sync to all
                    </label>
                  </div>
                  <button
                    onClick={handleMessageSubmit}
                    className={` text-black text-[12px] w-[54px] h-[22px] rounded-[6px] ${
                      apiCallInProgress
                        ? "bg-[#CCCCCC]"
                        : "bg-[#D4DB33] hover:bg-[#0D859A]"
                    }`}
                    disabled={apiCallInProgress}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tooltipData && (
        <Tooltip
          className="tooltip-show-data"
          id={`my-tooltip-${tooltipData.model_id}`}
          place="right"
        >
          <div className="p-[16px] bg-white text-base border border-[#cccccc] rounded-lg  z-[9] ml-[10px] 2xl:!w-[270px] w-[230px opacity-100">
            <h1 className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium ">
              {tooltipData.name}
            </h1>
            <p className="font-Archivo sm:text-[12px] text-[10px] font-normal text-[#aaa] leading-normal mt-[5px]">
              {tooltipData.model_description}
            </p>
            <div className="my-[10px]">
              <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Context length:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  {tooltipData.context} tokens
                </p>
              </div>
              <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Input pricing:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  {tooltipData.input_price}
                </p>
              </div>
              <div className="grid grid-cols-2  sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Output princing:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  {tooltipData.output_price}
                </p>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Chat_version;
