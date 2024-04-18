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
} from "@/public/Assets/Icons/Allsvg";
import { Fragment, useState, useEffect, useRef } from "react";
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


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Version = ({
  addVersion,
  removeVersion,
  message,
  versions,
  allVersions,
  versionId,
  runPressed,
  resetRunPressed,
  appendToMessage,
  setApiCallInProgress,
  apiCallInProgress,
  syncAll,
  setsyncAll,
  setAllSystemPrompt,
  allSystemPrompt,
  analysisModelOpen,
  setAnalysisModelOpen,
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
  const [vercelResponse, setVercelResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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



  // Function to append vercelResponse to message
  const handleCopyClick = () => {
    appendToMessage(vercelResponse);
  };
// Vercel integration
  const fetchVercelResponse = async () => {
    var res = null;
    setInputTokens();
    setTotalTokens();
    setOutputTokens();
    setVercelResponse("");
    setIsLoading(true);
    const provider =selected.provider;
    if (!provider) {
      setError(`Provider ${selected.provider} is not supported.`);
      setIsLoading(false);
      return;
    }
    try{
      const enc = encodingForModel("gpt-3.5-turbo");
      const promptTokens = enc.encode(message).length;
      setInputTokens(promptTokens);
     
      var formData = {
        max_tokens: Number(settings.maxTokens),
        temperature: Number(settings.temperature),
        top_p: Number(settings.topP),
        top_k: Number(settings.topK),
        frequency_penalty: Number(settings.frequencyPenalty),
        presence_penalty: Number(settings.presencePenalty),
        settings: settings,
        model: selected.id1,
        prompt: message,
        systemPrompt: open ? systemPrompt : "",
        type: "prompt",
      };
        switch(selected.provider){
          case "openai":
            formData.api_key = openaiKey
            res = await fetch("/api/openai", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "fireworks":
            formData.api_key = fireworksAIKey
            res = await fetch("/api/fireworks", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "custom":
            formData.api_key = customAIKey
            res = await fetch("/api/custom", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;           
          case "together":
            formData.api_key = togetherKey
            res = await fetch("/api/together", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;          
          case "anthropic":
            formData.api_key = anthropicKey
            res = await fetch("/api/anthropic", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "cohere":
            formData.api_key = cohereKey
            res = await fetch("/api/cohere", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "google":
            formData.api_key = googleKey
            res = await fetch("/api/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "mistral":
            formData.api_key = mistralKey
            res = await fetch("/api/mistral", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            break;
          case "perplexity":
              formData.api_key = perplexityKey
              res = await fetch("/api/perplexity", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
              break;
          }
        const data = res.body;
        
        setIsLoading(false);
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let completeString = "";
        let generationTokens = 0;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          const tokenRegex = /{"tokens":(\d+)}/g;
          const match = tokenRegex.exec(chunkValue);
          let tokenChunk = "";
        
          tokenChunk += chunkValue;
         
          completeString += chunkValue;
          generationTokens += enc.encode(chunkValue).length;
          setVercelResponse((prev) => prev + tokenChunk);
          
        }

        if (done){
          
          setOutputTokens(generationTokens);
          setTotalTokens(inputTokens + outputTokens);
        }
        
        setIsLoading(false);
        setAllPromtsDetails((prevDetails) => [
          ...prevDetails,
          {
            isValid: true,
            versionId: versionId,
            model: selected.model_id,
            input: message,
            output: completeString,
            systemPrompt: systemPrompt,
            settings: settings,
          },
        ]);
      }
        
      catch (error) {
        console.error("API request failed:", error.message);
        setError("Error: " + error.message);
        setIsLoading(false);
      }
  };

  useEffect(() => {
    const isValidModelSelected = selected?.id1 && selected?.id1 !== "None";


    if (message && isValidModelSelected && runPressed) {
      fetchVercelResponse()
      .then(() => {
        resetRunPressed(); // Reset runPressed after the API call
        setApiCallInProgress(false);
      })
      .catch((error) => {
        console.error("Error fetching API response:", error);
        setError("Error: " + error.message); // Set error state
        setApiCallInProgress(false);
      });
    } else if (runPressed) {
      let missingItems = [];
      if (!message) missingItems.push("message");
      if (!isValidModelSelected) missingItems.push("valid model selection");

      setVercelResponse(
        `Please provide the following: ${missingItems.join(", ")}.`
      ); // Set error message in vercelResponse
      setApiCallInProgress(false);
      resetRunPressed();
    }
  }, [message, selected?.id1, fireworksAIKey, runPressed, resetRunPressed]);

  // Format OutputResponse for Code
  const handleAnalysis = async () => {
    const formData = {
      input: message,
      response: vercelResponse,
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
      setVercelResponse("");
      setOutputTokens();
      setInputTokens();
      setTotalTokens();
      setClear(false);
    }
  }, [clear]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const CodeBox = ({ code }) => {
    return (
      <div className="code-box-container my-2">
        <pre className="code-box">{code}</pre>
        <button className="copy-button" onClick={() => copyToClipboard(code)}>
          Copy
        </button>
      </div>
    );
  };

  const parseVercelResponse = (vercelResponse) => {
    const segments = [];
    const regex = /```(.*?)```/gs;
    let lastIndex = 0;

    vercelResponse?.replace(regex, (match, codeBlock, index) => {
      // Add the text segment before the code block
      if (index > lastIndex) {
        segments.push({
          type: "text",
          content: vercelResponse.slice(lastIndex, index),
        });
      }
      // Add the code block
      segments.push({ type: "code", content: codeBlock });
      lastIndex = index + match.length;
    });

    // Add any remaining text after the last code block
    if (vercelResponse && lastIndex < vercelResponse.length) {
      segments.push({ type: "text", content: vercelResponse.slice(lastIndex) });
    }

    return segments;
  };

  const segments = parseVercelResponse(vercelResponse);

  // Settings Modal Window
  // State to manage settings visibility
  const [showSettings, setShowSettings] = useState(false);

  // State for settings values
  const [settings, setSettings] = useState({
    maxTokens: 2500,
    temperature: 0.6,
    topP: 0.2,
    topK: 50,
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
    if (showSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings]);

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
                  !apiCallInProgress && setAnalysisModelOpen(!analysisModelOpen)
                }
              >
                <ShareIcon />
              </button>
              <button onClick={() => setShowSettings(true)}>
                <SettingIcon />{" "}
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
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="border-[#EAEBF0] border-[1px] rounded-[6px] mt-2 placeholder:text-[#68727D] text-[15px] font-medium h-[153px] w-full resize-none shadow-[0px_1px_2px_0px_#1018280A]"
                ></textarea>
                <div className="flex justify-between items-center gap-[10px] flex-wrap">
                  <div className="flex items-center gap-[5px]">
                    <Switch
                      checked={enabled}
                      onChange={() => setEnabled(!enabled)}
                      className={classNames(
                        enabled ? "bg-[#0074fb]" : "bg-gray-200",
                        "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-[11px]" : "translate-x-0",
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
               {isLoading ? (
                <p>Loading...</p>
              ) : vercelResponse ? (
                segments.map((segment, index) =>
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
                          <h1 className="font-bold text-6xl" {...props} />
                        ),
                      }}
                      remarkPlugins={[gfm]}
                      key={index}
                      children={segment.content}
                    />
                  )
                )
              ) : error ? (
                <p>Error: {error}</p>
              ) : null}
              
            </div>
          </div>
          <div className="flex gap-[10px] justify-center mt-[17px]">
            <CopyIcon onClick={handleCopyClick} />
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
  {totalTokens && (
    <div className="mx-4">
      <p className="text-[12px] text-black text-center font-bold">
        Total Tokens: {totalTokens}
      </p>
    </div>
  )}
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
