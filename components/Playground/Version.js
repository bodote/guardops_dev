import {
  CopyIcon,
  DownArrowIcon,
  EditIcon,
  MinusIcon,
  PenIcon,
  PlusRectangleIcon,
  SettingIcon,
  ShareIcon,
  UpArrowIcon,
  User2Icon,
  FireIcon
} from "@/public/Assets/Icons/Allsvg";
import React, { DragEvent, useState, Fragment, useEffect, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Tooltip } from "react-tooltip";
import ModelSettings from "./modelSettings";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import { AiOutlineStop } from "react-icons/ai";
import { encodingForModel } from "js-tiktoken";
import { AnimatePresence, motion } from "framer-motion";
const hljs = require('highlight.js/lib/common');
import { useChat } from 'ai/react';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const getTextFromDataUrl = (dataUrl) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

function TextFilePreview({ file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setContent(typeof text === "string" ? text.slice(0, 100) : "");
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div>
      {content}
      {content.length >= 100 && "..."}
    </div>
  );
}
const Version = ({
  addVersion,
  removeVersion,
  message,
  versions,
  allVersions,
  versionId,
  isLoading,
  runPressed,
  setRunPressed,
  appendToMessage,
  setApiCallInProgress,
  input,
  apiCallInProgress,
  syncAll,
  setsyncAll,
  messages,
  completion,
  setAllSystemPrompt,
  allSystemPrompt,
  files,
  analysisModelOpen,
  setCompletion,
  setInput,
  setAnalysisModelOpen,
  formData,
  setFormData,
  handleSubmit,
  setAllPromtsDetails,
  setClear,
  clear,
  selectedModel,
  setSelectedModel,
  arenaCheck,
  handleSelectModel,
}) => {
  const [models, setModels] = useState([]);
  const [selected, setSelected] = useState(
    selectedModel
      ? selectedModel
      : {
          name: "Select a Model",
        }
  );

  hljs.highlightAll();
  
  const [error, setError] = useState(null);
  const [totalTokens, setTotalTokens] = useState();
  const [inputTokens, setInputTokens] = useState();
  const [outputTokens, setOutputTokens] = useState();

  const [fireworksAIKey, setFireworksAIKey] = useState(""); // State for the API key
  const [openaiKey, setOpenaiKey] = useState(""); // State for the API key
  const [togetherKey, setTogetherKey] = useState(""); // State for the API key
  const [customAIKey, setCustomAIKey] = useState(""); // State for the API key
  // vercel keys
  const [anthropicKey, setAnthropicKey] = useState(""); 
  const [cohereKey, setCohereKey] = useState(""); 
  const [googleKey, setGoogleKey] = useState(""); 
  const [mistralKey, setMistralKey] = useState(""); 
  const [perplexityKey, setPerplexityKey] = useState(""); 

  //
  const modalRef = useRef();
  const [analysisData, setAnalysisData] = useState([]);
  const [tooltipData, setTooltipData] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [searchModel, setSearchModel] = useState("");

  const getModels = async () => {
    const response = await fetch(`/api/manageModels`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.models) {
      setModels(data.models);
    }
  };

    // State for settings values
    const [settings, setSettings] = useState({
      maxTokens: 2500,
      temperature: 0.6,
      topP: 0.2,
      topK: 50,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3,
    });
  
  // Load API key from Local Storage
  useEffect(() => {
    getModels();
    const key = localStorage.getItem("fireworksAIKey") || "";
    setFireworksAIKey(key);
    const key1 = localStorage.getItem("openAIKey") || "";
    setOpenaiKey(key1);
    const key2 = localStorage.getItem("customAIKey") || "";
    setCustomAIKey(key2);
    const key4 = localStorage.getItem("togetherKey") || "";
    setTogetherKey(key4);
    const key5 = localStorage.getItem("anthropicKey") || "";
    setAnthropicKey(key5);
    const key6 = localStorage.getItem("cohereKey") || "";
    setCohereKey(key6);
    const key7 = localStorage.getItem("googleKey") || "";
    setGoogleKey(key7);
    const key8 = localStorage.getItem("mistralKey") || "";
    setMistralKey(key8);
    const key9 = localStorage.getItem("perplexityKey") || "";
    setPerplexityKey(key9);
  }, []);


  useEffect(() => {
    setFormData({
      max_tokens: Number(settings.maxTokens),
      model: selected.id1,
      systemPrompt: open ? systemPrompt : "",
      type: "chat",
      settings: settings,
      provider: selected.provider,
      multimodal: selected.multimodal | false,
      api_keys: {
        openaiKey: openaiKey,
        fireworksKey: fireworksAIKey,
        customKey: customAIKey,
        anthropicKey: anthropicKey,
        cohereKey: cohereKey,
        googleKey: googleKey,
        mistralKey: mistralKey,
        perplexityKey: perplexityKey,
      },
    });
  }, [
    settings,
    open,
    systemPrompt,
    selected,
    openaiKey,
    fireworksAIKey,
    customAIKey,
    anthropicKey,
    cohereKey,
    googleKey,
    mistralKey,
    perplexityKey,
  ]);

  console.log("i have this formdata", formData);

  const chatDivRef= useRef(null);


  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [completion]);
  
  
  const handleFileChange = (event) => {
   
    if (event.target.files) {
      setFiles(event.target.files);
      if(syncAllMsg){
        setAllFiles(event.target.files);
      }
      
    }
  };
  const reconstructConversation = (traces) => {
    setError("");
    const modelName = traces[0]?.attributes?.model || "";
    let traceChatHistory = [];

    const model = models.find((model) => model.name === modelName);

    const rootPair = traces.find((pair) => pair.parent_id === null);
    if (!rootPair) {
      return;
    }
    traceChatHistory.push(rootPair);

    let currentParentId = rootPair.context.span_id;
    while (traceChatHistory.length < traces.length) {
      const nextPair = traces.find(
        (pair) => pair.parent_id === currentParentId
      );
      if (nextPair) {
        traceChatHistory.push(nextPair);
        currentParentId = nextPair.context.span_id;
      } else {
        break;
      }
    }
    const newMessages = traceChatHistory.flatMap((pair) => [
      {
        role: "user",
        content: pair.attributes.prompt || "",
      },
      {
        role: "assistant",
        content: pair.attributes.output || "",
      },
    ]);
    

    if (model) {
      setSelected(model);
    }
    
     setMessages(newMessages);
  };

  // FROM HERE IDK

  const handleAnalysis = async () => {
    const formData = {
      input: input,
      response: completion,
    };
    try {
      const response = await fetch("/api/manageModelChecks", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setAnalysisData(responseData);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    if (analysisModelOpen) {
      handleAnalysis();
    }
  }, [analysisModelOpen]);

  useEffect(() => {
    if (clear) {
      setCompletion("");
      setClear(false);
    }
  }, [clear]);
  const handleSystemInputChange = (event) => {
    setSystemPrompt(event.target.value);
    if (syncAll) {
      setAllSystemPrompt(event.target.value);
    }
  };
  useEffect(() => {
    setSystemPrompt(allSystemPrompt);
  }, [allSystemPrompt]);
  const copyToClipboard = (text, uniqueId) => {
    // Ignore the first line because it is only the language name
    const lines = text.split('\n');
    const textToCopy = lines.slice(1).join('\n');
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedIndex(uniqueId);
        // Optionally, reset the button text after a delay
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };


  const parseVercelResponse = (apiResponse) => {
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


  // Settings Modal Window
  // State to manage settings visibility
  const [showSettings, setShowSettings] = useState(false);


  // Handle settings change
  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };
  // const handleOutsideClick = (event) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     setShowSettings(false);
  //   }
  // };

  const handleSelect = (model) => {
    setSelected(model);
    setSelectedModel(model);
    const index = allVersions.findIndex((version) => version.id === versionId);
    handleSelectModel(model.model_id, index);
  };

  const filteredModels = models
  .filter((model) => {
    const trimmedSearchModel = searchModel.replace(/[^\w\s]/g, "").trim();
    const regex = new RegExp(trimmedSearchModel, "gi");
    const trimmedModelName = model.name
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "");
    return trimmedModelName.match(regex);
  })
  .sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; // names must be equal
  });
  const getModelLabel = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = allVersions.findIndex((version) => version.id === versionId);
    return `Model ${alphabet[index]}`;
  };

  useEffect(() => {
    if (enabled) {
      setsyncAll(true);
      setAllSystemPrompt(systemPrompt);
    } else {
      setsyncAll(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (syncAll) {
      setEnabled(true);
      setSystemPrompt(allSystemPrompt);
    } else {
      setEnabled(false);
    }
  }, [syncAll, allSystemPrompt]);

  useEffect(() => {
    if (syncAll) {
      setAllSystemPrompt(systemPrompt);
    }
  }, [systemPrompt]);


  useEffect(() => {
    const isValidModelSelected = selected?.id1 && selected?.id1 !== "None";


    if (input && isValidModelSelected && runPressed) {
      handleSubmit( {
        experimental_attachments: files,
      });
      
    } else if (runPressed) {
      let missingItems = [];
      if (!input) missingItems.push("message");
      if (!isValidModelSelected) missingItems.push("valid model selection");

      setCompletion(
        `Please provide the following: ${missingItems.join(", ")}.`
      ); // Set error message in vercelResponse
    setRunPressed(false)

}
  }, [input, selected?.id1, runPressed]);
  // useEffect(() => {
  //   if (showSettings) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [showSettings]);

  return (
    <>
      <div
        className={`py-[16px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px] lg:border-r lg:border-r-[#CCCCCC] border-b-[1px] border-b-[#CCCCCC] bg-[#F7F7F7] flex justify-between flex-col xl:!mih-h-0 sm:!min-h-[calc(100vh-434px)] !min-h-[calc(100vh-396px)] overflow-auto relative ${
          versions > 4
            ? "sm:min-h-0 !min-h-[464px] sm:h-auto h-[464px] sm:!pr-[10px]"
            : ""
        } ${
          versions < 5
            ? "!h-full 3xl:!min-h-[700px] xl:!min-h-[calc(100vh-434px)] sm:!min-h-[363px]"
            : ""
        }`}
      >
        {arenaCheck && (
          <div className="bg-[#D9D9D9] w-[66px] h-[16px] text-[10px] font-inter rounded-[0_0_12px_12px] flex justify-center p-[1px_0_3px_0] absolute top-0 left-[50%] translate-x-[-50%]">
            {getModelLabel()}
          </div>
        )}
        <div>
          <div className="flex sm:items-center justify-between sm:flex-row flex-col relative">
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
                        <Listbox.Options className="absolute z-10 w-full bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl: w-[180px] max-w-[400px] max-h-[700px] h-[230px] overflow-auto resize">
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













              <button onClick={() => setOpen(!open)}>
                <EditIcon />
              </button>
              <button disabled={arenaCheck && versions <= 2}>
                <MinusIcon onClick={() => removeVersion()} />
              </button>
              <button>
                <PlusRectangleIcon onClick={addVersion} />
              </button>
              <button
                onClick={() =>
                  !isLoading && setAnalysisModelOpen(!analysisModelOpen)
                }
              >
                <ShareIcon />
              </button>
              <button onClick={() => setShowSettings(!showSettings)}>
                <SettingIcon />
              </button>
              {/* Attach the click handler */}
            </div>

            {/* Conditionally render the settings component */}
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
          <div
            className={`overflow-auto ${
              totalTokens
                ? "h-[calc(100vh-555px)]"
                : "sm:h-[calc(100vh-527px)] h-[calc(100vh-607px)]"
            }`}
          >
            {open && (
              <div className="border-[#CCCCCC] border-[1px] rounded-[12px] p-[7px_10px_10px_14px] mt-[16px]">
                <p className="text-[#252525] font-medium text-[14px]">
                  System Prompt
                </p>
                <textarea
                  placeholder="Your system prompt to the model"
                  name="system"
                  id="system"
                  value={systemPrompt}
                  onChange={handleSystemInputChange}
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
              className={`response-output justify-center mt-[20px]  overflow-auto ${
                open && "2xl:h-[calc(100vh-822px)] h-[calc(100vh-778px)]"
              } ${versions > 4 && "sm:max-h-auto"}`}
            >
              {console.log("these messages", completion)}
            {completion && (
              <div className="md:p-[19px_31px] p-[8px_10px] flex sm:gap-[19px] gap-[8px]">
                <div className="w-[calc(100%-35px)]">
                  <div className="flex flex-wrap justify-start">
                    {completion.experimental_attachments?.map((attachment) => (
                      <div key={attachment.name} className="mb-3 mr-3">
                        {attachment.contentType?.startsWith("image") ? (
                          <img
                            className="rounded-md h-60"
                            src={attachment.url}
                            alt={attachment.name}
                          />
                        ) : attachment.contentType?.startsWith("text") ? (
                          <div className="text-xs w-40 h-60 overflow-hidden text-zinc-400 border p-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700">
                            {getTextFromDataUrl(attachment.url)}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
            
                  {parseVercelResponse(completion).map((segment, index) =>
                    segment.type === 'code' ? (
                      <pre className="text-sm overflow-hidden border-t rounded-lg mt-5 mb-5">
                        <button className="w-full text-right pr-5 pb-0.5 pt-1.5 bg-gray-700 text-neutral-200" onClick={() => copyToClipboard(segment.content, `${segment.content}-${index}`)}>
                          {copiedIndex === `${segment.content}-${index}` ? 'Copied' : 'Copy'}
                        </button>
                        <code>{segment.content}</code>
                      </pre>
                    ) : (
                      <ReactMarkdown
                        components={{
                          ul: ({ node, ...props }) => (
                            <ul style={{ display: 'block', listStyleType: 'disc', paddingInlineStart: '40px' }} {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol style={{ display: 'block', listStyleType: 'decimal', paddingInlineStart: '40px' }} {...props} />
                          ),
                          h1: ({ node, ...props }) => <h1 className="font-bold text-6xl" {...props} />,
                          p: ({ node, ...props }) => <p style={{ whiteSpace: 'pre-wrap' }} {...props} />,
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
            
              
            </div>
          </div>
          <div className="flex gap-[10px] justify-center mt-[17px]">
            <CopyIcon/>
            <DownArrowIcon />
            <UpArrowIcon />
            <PenIcon />
          </div>
          {analysisModelOpen && (

            <div className="w-full bg-[#D4DB3333] p-[15px] rounded-[18px] overflow-auto">
              <table className="grid grid-cols-2 min-w-[640px]">
                {analysisData?.map((data, key) => {
                  return (
                    <tbody key={key}>
                      <tr className="flex gap-[12px]">
                        <td className="text-[12px] italic font-semibold mb-[3px] text-left">
                          <div
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={data.category}
                            className="w-[100px] truncate"
                          >
                            {data.category}
                          </div>
                        </td>
                        <td className="text-[12px] font-normal mb-[3px] text-left">
                          <div
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={data.type}
                            className="w-[100px] truncate"
                          >
                            {data.type}
                          </div>
                        </td>
                        <td className="text-[12px] font-semibold mb-[3px] text-left">
                          <div
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={data.value}
                            className="w-[60px] truncate"
                          >
                            {data.value}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          )}
            </div>
          </div>
          
          <div className="flex gap-[10px] justify-center mt-[17px]">
            <CopyIcon onClick={handleCopyClick} />
            <DownArrowIcon />
            <UpArrowIcon />
            <PenIcon />
          </div>
         
        </div>
        <div className="flex justify-center">
  {inputTokens && (
    <div className="mx-4">
      <p className="text-[12px] text-black text-center font-bold">
        Input Tokens: {inputTokens}
      </p>
    </div>
  )}
  {outputTokens && (
    <div className="mx-4">
      <p className="text-[12px] text-black text-center font-bold">
        Output Tokens: {outputTokens}
      </p>
    </div>
  )}
  {/* {totalTokens && (
    <div className="mx-4">
      <p className="text-[12px] text-black text-center font-bold">
        Total Tokens: {totalTokens}
      </p>
    </div>
  )} */}
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
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default Version;
