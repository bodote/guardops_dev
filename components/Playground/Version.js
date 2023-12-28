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
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import ModelSettings from "./modelSettings"; // Import the settings component

const models = [
  {
    id: 1,
    name: "Select an option",
    id1: "None",
    provider: null,
    context: null,
  },
  {
    id: 2,
    name: "OpenAI - GPT-3.5-Turbo",
    id1: "gpt-3.5-turbo-1106",
    provider: "openai",
    context: "16385",
  },
  {
    id: 3,
    name: "OpenAI - GPT-4-Turbo",
    id1: "gpt-4-1106-preview",
    provider: "openai",
    context: "128000",
  },
  {
    id: 4,
    name: "FW - LLama 2 34B",
    id1: "accounts/fireworks/models/llama-v2-34b-code-instruct",
    provider: "fireworks",
    context: null,
  },
  {
    id: 5,
    name: "FW - Mixtral7bx8",
    id1: "accounts/fireworks/models/mixtral-8x7b-instruct",
    provider: "fireworks",
    context: null,
  },
  {
    id: 6,
    name: "FW - LLama 2 Code 13B",
    id1: "accounts/fireworks/models/llama-v2-13b-code-instruct",
    provider: "fireworks",
    context: null,
  },
  {
    id: 7,
    name: "FW - Mixtral-7b-Instruct",
    id1: "accounts/fireworks/models/mistral-7b-instruct-4k",
    provider: "fireworks",
    context: null,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Version = ({
  addVersion,
  removeVersion,
  message,
  versionId,
  runPressed,
  resetRunPressed,
  appendToMessage,
}) => {
  const [selected, setSelected] = useState(models[0]);
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fireworksAIKey, setFireworksAIKey] = useState(""); // State for the API key
  const [openaiKey, setOpenaiKey] = useState(""); // State for the API key

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
  const fetchApiResponse = async () => {
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

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: authKey,
        },
        body: JSON.stringify({
          model: selected.id1,
          messages: [{ role: "user", content: message }],
          stream: false,
          n: 1,
          max_tokens: 1024,
          temperature: settings.temperature,
          top_p: settings.topP,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setApiResponse(data.choices[0].message.content); // Extracting the content
      } else {
        setApiResponse("No content available");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isValidModelSelected = selected.id1 && selected.id1 !== "None";
    const providerInfo = providerConfig[selected.provider];
    const apiKey = providerInfo ? providerInfo.getKey() : null;

    if (message && isValidModelSelected && apiKey && runPressed) {
      fetchApiResponse()
        .then(() => {
          resetRunPressed(); // Reset runPressed after the API call
        })
        .catch((error) => {
          console.error("Error fetching API response:", error);
          setError("Error: " + error.message); // Set error state
        });
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

  // Toggle settings visibility
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Handle settings change
  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };

  return (
    <div>
      <div className="py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC] lg:h-screen h-auto">
        <div className="flex sm:items-center items-end justify-between sm:flex-row flex-col relative">
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative mt-2  sm:w-[237px] w-full">
                  <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[20px] py-[3px] ">
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
                      {models.map((model) => (
                        <Listbox.Option
                          key={model.id}
                          id={model.id1}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-[#f0efef]  rounded-[6px]"
                                : "text-[#000]",
                              "relative cursor-default select-none py-2 pl-[30px] pr-9"
                            )
                          }
                          value={model}
                        >
                          <div className="flex items-center ">
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
                          <div className="ml-[220px] p-[16px] bg-white text-base border border-[#cccccc] rounded-lg w-[350px] hidden show absolute">
                            <h1 className="text-[#656565] text-[12px] font-Inter font-medium ">
                              Modelname 2
                            </h1>
                            <p className="font-Archivo text-[12px] font-normal text-[#CCCCCC] leading-normal mt-[5px]">
                              Short description to this model.What is especially
                              for this model.Eventually more information of the
                              company.What the model is capable off.
                            </p>
                            <div className="my-[10px]">
                              <div className="grid grid-cols-2 border-b border-b-[#ccc] py-[5px]">
                                <p className="text-[#000] text-[12px] font-Inter font-medium ">
                                  Context length:
                                </p>
                                <p className="text-[#656565] text-[12px] font-Inter font-medium ">
                                  128.000 tokens
                                </p>
                              </div>
                              <div className="grid grid-cols-2 border-b border-b-[#ccc] py-[5px]">
                                <p className="text-[#000] text-[12px] font-Inter font-medium ">
                                  Input pricing:
                                </p>
                                <p className="text-[#656565] text-[12px] font-Inter font-medium ">
                                  0.003 / 1000 tokens
                                </p>
                              </div>
                              <div className="grid grid-cols-2  py-[5px]">
                                <p className="text-[#000] text-[12px] font-Inter font-medium ">
                                  Output princing:
                                </p>
                                <p className="text-[#656565] text-[12px] font-Inter font-medium ">
                                  0.005 / 1000 tokens
                                </p>
                              </div>
                            </div>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="flex gap-[17px] sm:mt-0 mt-[20px]">
            <EditIcon />
            <MinusIcon onClick={() => removeVersion()} />
            <PlusRectangleIcon onClick={addVersion} />
            <ShareIcon />
            <SettingIcon
              onClick={toggleSettings}
              className="cursor-pointer"
            />{" "}
            {/* Attach the click handler */}
          </div>

          {/* Conditionally render the settings component */}
          {showSettings && (
            <ModelSettings
              onSettingsChange={handleSettingsChange}
              settings={settings}
            />
          )}
        </div>
        <div className="response-output justify-center sm:mt-[38px] mt-[20px]">
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
        <div>
          To install the Vercel SDK, you can use npm or yarn package managers.
          Open your command line interface and run "npm install -g vercel" or
          "yarn global add vercel". Once installed, you can authenticate by
          running "vercel login" and following the prompts. To create a new
          project, navigate to your project directory and run "vercel init".
          Finally, deploy your application using the command "vercel --prod" to
          generate a unique URL for accessing it.
        </div>
        <div className="flex gap-[10px] justify-center my-[17px]">
          <CopyIcon onClick={handleCopyClick} />
          <DownArrowIcon />
          <UpArrowIcon />
          <PenIcon />
        </div>
      </div>
    </div>
  );
};

export default Version;
