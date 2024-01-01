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
import ModelSettings from "./modelSettings"; // Import the settings component

const models = [
  {
    id: 1,
    name: "Select an option",
    id1: "None",
    provider: null,
    context: null,
    input_price: null,
    output_price: null,
    model_description: null,
  },
  {
    id: 2,
    name: "OpenAI - GPT-3-Curie",
    id1: "text-curie-001",
    id2: "open1",
    provider: "openai",
    context: "2,049",
    input_price: "0.003 / 1000 Tokens",
    output_price: "0.005 / 1000 Tokens",
    model_description: "Model is capable for all kind of tasks",
  },
  {
    id: 3,
    name: "OpenAI - GPT-3-Davinci",
    id1: "davinci",
    id2: "open2",
    provider: "openai",
    context: "2,049",
    input_price: "0.002 / 1000 Tokens",
    output_price: "0.005 / 1000 Tokens",
    model_description: "Model is capable for all kind of tasks",
  },
  {
    id: 4,
    name: "FW - Mixtral MoE 8x7B Instruct",
    id1: "mixtral-8x7b-instruct",
    id2: "open3",
    provider: "fireworks",
    context: "128000",
    input_price: "0.002 / 1000 Tokens",
    output_price: "0.005 / 1000 Tokens",
    model_description: "Model is capable for all kind of tasks",
  },
  {
    id: 5,
    name: "FW - Fireworks Function Call 34B v0",
    id1: "fw-function-call-34b-v0",
    id2: "open4",
    provider: "fireworks",
    context: "128000",
    input_price: "0.002 / 1000 Tokens",
    output_price: "0.005 / 1000 Tokens",
    model_description: "Model is capable for all kind of tasks",
  },
  {
    id: 6,
    name: "FW - Qwen 72B Chat",
    id1: "qwen-72b-chat",
    id2: "open5",
    provider: "fireworks",
    context: "128000",
    input_price: "0.002 / 1000 Tokens",
    output_price: "0.005 / 1000 Tokens",
    model_description: "Model is capable for all kind of tasks",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Version = ({
  addVersion,
  removeVersion,
  message,
  versions,
  versionId,
  runPressed,
  resetRunPressed,
  appendToMessage,
}) => {
  const [selected, setSelected] = useState(models[0]);
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState();
  const [fireworksAIKey, setFireworksAIKey] = useState(""); // State for the API key
  const [openaiKey, setOpenaiKey] = useState(""); // State for the API key
  const modalRef = useRef();
  // Load API key from Local Storage

  useEffect(() => {
    const key = localStorage.getItem("fireworksAIKey") || "";
    setFireworksAIKey(key);
    const key1 = localStorage.getItem("openAIKey") || "";
    setOpenaiKey(key1);
  }, []);

  const providerConfig = {
    openai: {
      endpoint: "https://api.openai.com/v1/chat/completions",
      getKey: () => openaiKey,
    },
    fireworks: {
      endpoint: "https://api.fireworks.ai/inference/v1/chat/completions",
      getKey: () => fireworksAIKey,
    },
    // Add more providers here as needed
  };

  // Function to append apiResponse to message
  const handleCopyClick = () => {
    appendToMessage(apiResponse);
  };

  // Function to call the API
  const fetchApiResponseFromOpenai = async () => {
    setIsLoading(true);
    setError(null);

    const providerInfo = providerConfig[selected.provider];
    if (!providerInfo) {
      setError(`Provider ${selected.provider} is not supported.`);
      setIsLoading(false);
      return;
    }

    const apiEndpoint = providerInfo.endpoint;
    const authKey = `Bearer ${providerInfo.getKey()}`;

    const formData = {
      settings: settings,
      modal: selected,
    };
    const response = await fetch(`/api/open-ai-completion`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    // const response = await fetch(`/api/fireworks-completion`, {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });

    if (response.ok) {
      const messageResponse = await response.json();
      if (messageResponse.content) {
        setApiResponse(messageResponse.content);
        setTokens(messageResponse.tokens);
        setIsLoading(false);
      } else {
        setApiResponse("No content available");
        setIsLoading(false);
      }
    } else {
      console.error("API request failed:", response.statusText);
      setIsLoading(false);
    }
  };
  const fetchApiResponseFromFireworks = async () => {
    setIsLoading(true);
    setError(null);

    const providerInfo = providerConfig[selected.provider];
    if (!providerInfo) {
      setError(`Provider ${selected.provider} is not supported.`);
      setIsLoading(false);
      return;
    }

    const apiEndpoint = providerInfo.endpoint;
    const authKey = `Bearer ${providerInfo.getKey()}`;

    const formData = {
      settings: settings,
      modal: selected,
    };

    const response = await fetch(`/api/fireworks-completion`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const messageResponse = await response.json();
      if (messageResponse.content) {
        setApiResponse(messageResponse.content);
        setTokens(messageResponse.tokens);
        setIsLoading(false);
      } else {
        setApiResponse("No content available");
        setIsLoading(false);
      }
    } else {
      console.error("API request failed:", response.statusText);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isValidModelSelected = selected.id1 && selected.id1 !== "None";
    const providerInfo = providerConfig[selected.provider];
    const apiKey = providerInfo ? providerInfo.getKey() : null;

    if (message && isValidModelSelected && runPressed) {
      if (selected.provider == "openai") {
        fetchApiResponseFromOpenai()
          .then(() => {
            resetRunPressed(); // Reset runPressed after the API call
          })
          .catch((error) => {
            console.error("Error fetching API response:", error);
            setError("Error: " + error.message); // Set error state
          });
      } else {
        fetchApiResponseFromFireworks()
          .then(() => {
            resetRunPressed(); // Reset runPressed after the API call
          })
          .catch((error) => {
            console.error("Error fetching API response:", error);
            setError("Error: " + error.message); // Set error state
          });
      }
    } else if (runPressed) {
      let missingItems = [];
      if (!message) missingItems.push("message");
      if (!isValidModelSelected) missingItems.push("valid model selection");
      if (!apiKey) missingItems.push("API key");

      setApiResponse(
        `Please provide the following: ${missingItems.join(", ")}.`
      ); // Set error message in apiResponse
      resetRunPressed();
    }
  }, [message, selected.id1, fireworksAIKey, runPressed, resetRunPressed]);

  // Format OutputResponse for Code
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

  const parseApiResponse = (apiResponse) => {
    const segments = [];
    const regex = /```(.*?)```/gs;
    let lastIndex = 0;

    apiResponse.replace(regex, (match, codeBlock, index) => {
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
    if (lastIndex < apiResponse.length) {
      segments.push({ type: "text", content: apiResponse.slice(lastIndex) });
    }

    return segments;
  };

  const segments = parseApiResponse(apiResponse);

  // Settings Modal Window
  // State to manage settings visibility
  const [showSettings, setShowSettings] = useState(false);

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
        // className="py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC]"
        className={`py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC] border-b-[1px] border-b-[#CCCCCC] bg-[#F7F7F7] flex justify-between flex-col ${
          versions > 4 ? "sm:min-h-[500px] min-h-[520px] sm:!pr-[10px]" : ""
        }`}
      >
        <div>
          <div className="flex sm:items-center items-end justify-between sm:flex-row flex-col relative">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button
                      className={`relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[8px] py-[3px] ${
                        versions > 2 ? "sm:!w-[140px]" : ""
                      }`}
                    >
                      <span className="flex items-center">
                        <span className=" block truncate">{selected.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg xl:max-w-[210px] max-w-[180px]">
                        {models.map((model) => (
                          <Listbox.Option
                            key={model.id}
                            id={model.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-[#f0efef]  rounded-[6px]"
                                  : "text-[#000]",
                                "relative cursor-default select-none lg:py-2 py-1 px-[10px]"
                              )
                            }
                            value={model}
                          >
                            <div
                              className="flex items-center tooltip-main"
                              data-tooltip-id={
                                model.id > 1
                                  ? `my-tooltip-${model.id}`
                                  : undefined
                              }
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
                              <Tooltip
                                className="tooltip-show-data"
                                id={`my-tooltip-${model.id}`}
                                place="right"
                              >
                                <div className="p-[16px] bg-white text-base border border-[#cccccc] rounded-lg  z-[2] ml-[10px] 2xl:!w-[270px] w-[230px]">
                                  <h1 className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium ">
                                    {model.name}
                                  </h1>
                                  <p className="font-Archivo sm:text-[12px] text-[10px] font-normal text-[#aaa] leading-normal mt-[5px]">
                                    {model.model_description}
                                  </p>
                                  <div className="my-[10px]">
                                    <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                                      <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        Context length:
                                      </p>
                                      <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        {model.context} tokens
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                                      <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        Input pricing:
                                      </p>
                                      <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        {model.input_price}
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-2  sm:py-[5px] py-[10px]">
                                      <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        Output princing:
                                      </p>
                                      <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                                        {model.output_price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Tooltip>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <div
              className={`flex gap-[17px] sm:mt-0 mt-[20px] ${
                versions > 2 ? "!gap-[10px]" : ""
              }`}
            >
              <EditIcon />
              <MinusIcon onClick={() => removeVersion()} />
              <PlusRectangleIcon onClick={addVersion} />
              <ShareIcon />
              <SettingIcon
                onClick={() => setShowSettings(true)}
                className="cursor-pointer"
              />{" "}
              {/* Attach the click handler */}
            </div>

            {/* Conditionally render the settings component */}
            {showSettings && (
              <div
                ref={modalRef}
                className="max-w-[285px] w-full mx-auto bg-white shadow-lg rounded-lg absolute sm:top-[40px] top-[80px] right-0 p-[13px_23px_17px_25px]"
              >
                <ModelSettings
                  onSettingsChange={handleSettingsChange}
                  settings={settings}
                />
              </div>
            )}
          </div>
          <div
            className={`response-output justify-center sm:mt-[38px] mt-[20px]  overflow-auto ${
              versions > 4 ? "max-h-[330px]" : ""
            }`}
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : apiResponse ? (
              parseApiResponse(apiResponse).map((segment, index) =>
                segment.type === "code" ? (
                  <CodeBox key={index} code={segment.content} />
                ) : (
                  <ReactMarkdown
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
          <div className="flex gap-[10px] justify-center my-[17px]">
            <CopyIcon onClick={handleCopyClick} />
            <DownArrowIcon />
            <UpArrowIcon />
            <PenIcon />
          </div>
        </div>
        {tokens && (
          <div>
            <p className="text-[12px] text-black text-center font-normal">
              Total Tokens: {tokens.total_tokens} - Input Tokens:{" "}
              {tokens.prompt_tokens} - Output Tokens: {tokens.completion_tokens}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Version;
