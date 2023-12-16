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
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';


const models = [
  {
    id: 1,
    name: "Open Al - GPT-3.5",
    id1: "open1",
  },
  {
    id: 2,
    name: "Select an option",
    id1: "open2",
  },
  {
    id: 3,
    name: "FW - LLama 2 34B",
    id1: "accounts/fireworks/models/llama-v2-34b-code-instruct",
  },
  {
    id: 4,
    name: "FW - Mixtral7bx8",
    id1: "accounts/fireworks/models/mixtral-8x7b-instruct",
  },
  {
    id: 5,
    name: "HF - Bloom",
    id1: "open5",
  },
  {
    id: 6,
    name: "Anthropic Claude2",
    id1: "open6",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Version = ({ addVersion, removeVersion, message, versionId, runPressed, resetRunPressed, appendToMessage }) => {
  const [selected, setSelected] = useState(models[1]);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fireworksAIKey, setFireworksAIKey] = useState(''); // State for the API key

  // Load API key from Local Storage

  useEffect(() => {
    const key = localStorage.getItem('fireworksAIKey') || '';
    setFireworksAIKey(key);
  }, []);

  // Function to append apiResponse to message
  const handleCopyClick = () => {
    appendToMessage(apiResponse);
  };

    // Function to call the API
  const fetchApiResponse = async () => {
    setIsLoading(true);
    setError(null);
    console.log(process.env.FIREWORKS_API);
    try {
      const response = await fetch(`https://api.fireworks.ai/inference/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Authorization': `Bearer ${fireworksAIKey}`,
        },
        body: JSON.stringify({
          model: selected.id1,
          messages: [{ "role": "user", "content": message }],
          stream: false,
          n: 1,
          max_tokens: 150,
          temperature: 0,
          top_p: 0.9
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setApiResponse(data.choices[0].message.content); // Extracting the content
      } else {
        setApiResponse("No content available");
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isValidModelSelected = selected.id1 && selected.id1 !== "open2"; // Adjust condition as necessary
  
    if (message && isValidModelSelected && fireworksAIKey && runPressed) {
      fetchApiResponse().then(() => {
        resetRunPressed(); // Reset runPressed after the API call
      }).catch((error) => {
        console.error("Error fetching API response:", error);
        setError("Error: " + error.message); // Set error state
      });
    } else if (runPressed) {
      let missingItems = [];
      if (!message) missingItems.push("message");
      if (!isValidModelSelected) missingItems.push("valid model selection");
      if (!fireworksAIKey) missingItems.push("API key");
  
      setApiResponse(`Please provide the following: ${missingItems.join(", ")}.`); // Set error message in apiResponse
      resetRunPressed();
    }
  }, [message, selected.id1, fireworksAIKey, runPressed, resetRunPressed]);
  
  
  // Format OutputResponse for Code
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  const CodeBox = ({ code }) => {
    return (
      <div className="code-box-container my-2">
        <pre className="code-box">{code}</pre>
        <button className="copy-button" onClick={() => copyToClipboard(code)}>Copy</button>
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
        segments.push({ type: 'text', content: apiResponse.slice(lastIndex, index) });
      }
      // Add the code block
      segments.push({ type: 'code', content: codeBlock });
      lastIndex = index + match.length;
    });
  
    // Add any remaining text after the last code block
    if (lastIndex < apiResponse.length) {
      segments.push({ type: 'text', content: apiResponse.slice(lastIndex) });
    }
  
    return segments;
  };
  

  const segments = parseApiResponse(apiResponse);

  return (
    <div>
      <div className="py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC] lg:h-screen h-auto">
        <div className="flex items-center justify-between sm:flex-row flex-col">
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
                            ? "h-5 w-5 text-gray-400 rotate-[180deg]"
                            : "h-5 w-5 text-gray-400 rotate-[0]"
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
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
            <PlusRectangleIcon onClick={addVersion}/>
            <ShareIcon />
            <SettingIcon />
          </div>
        </div>
        <div className="response-output justify-center sm:mt-[38px] mt-[20px]">
          {isLoading ? <p>Loading...</p> : apiResponse ? (
            parseApiResponse(apiResponse).map((segment, index) => (
              segment.type === 'code' ? (
                <CodeBox key={index} code={segment.content} />
              ) : (
                <ReactMarkdown remarkPlugins={[gfm]} key={index} children={segment.content} />
              )
            ))
          ) : error ? <p>Error: {error}</p> : null}
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
