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

const Version = ({ addVersion, removeVersion, message, versionId, runPressed, resetRunPressed }) => {
  const [selected, setSelected] = useState(models[1]);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function for upperCase later for generating output content
  const displayText = message ? message.toUpperCase() : "";

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
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FIREWORKS_API}`,
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
    if (message && selected.id1 && runPressed) {
      fetchApiResponse().then(() => {
        resetRunPressed(); // Reset runPressed after fetchApiResponse is called
      });
    }
  }, [message, selected.id1, runPressed, resetRunPressed]);



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
        <div className="flex justify-center sm:mt-[38px] mt-[20px]">
          <p className="font-Inter text-[12px] text-[#000000] font-light mr-[4px] ml-[16px] ">

            {isLoading ? <p>Loading...</p> : apiResponse ? <p>{apiResponse}</p> : error ? <p>Error: {error}</p> : null}
          </p>
        </div>
        <div className="flex gap-[10px] justify-center my-[17px]">
          <CopyIcon />
          <DownArrowIcon />
          <UpArrowIcon />
          <PenIcon />
        </div>
      </div>
    </div>
  );
};

export default Version;
