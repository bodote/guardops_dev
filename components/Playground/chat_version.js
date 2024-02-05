import React, { useState, Fragment, useEffect } from "react";
import {
  EditIcon,
  MinusIcon,
  PlusRectangleIcon,
  SettingIcon,
  ShareIcon,
  LodingIcon,
  ImageIcon,
  User2Icon,
  FireIcon,
} from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { AiOutlineStop } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Chat_version = ({
  setPage,
  page,
  projectList,
  chatVersion,
  removeVersion,
  addVersion,
}) => {
  const [Active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    name: "Select an option",
  });
  const [proname, setProname] = useState({
    name: "Select a project to store",
  });
  const [showSettings, setShowSettings] = useState(false);
  const [models, setModels] = useState([]);
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
    const response = await fetch(`/api/manageModelChecks`, {
      method: "GET",
    });
    const data = await response.json();
    setModels(data);
  };

  // Load API key from Local Storage
  useEffect(() => {
    getModels();
  }, []);
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
    <div className="flex sm:flex-row flex-col items-start">
      <div className="px-[16px] pt-[12px] sm:w-[182px] sm:min-w-[182px] w-full overflow-y-auto">
        <div className="bg-[#CCCCCC] text-white rounded-[6px] text-[12px] w-fit mb-[11px]">
          <button
            onClick={() => setPage("prompt")}
            className={`rounded-[6px] px-[6px] py-[3px] uppercase ${
              page === "prompt" ? "bg-[#D4DB33]" : ""
            }`}
          >
            prompt
          </button>
          <button
            onClick={() => setPage("chat")}
            className={`pl-[9px] pr-[15px] py-[3px] uppercase ${
              page === "chat" ? "bg-[#D4DB33] rounded-[6px]" : ""
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
      <div className="w-full sm:border-l border-0 border-l-[#CCCCCC]">
        <div className="border-b-[#CCCCCC] border-b-[1px] flex justify-between items-center w-full p-[7px_7px_6px_13px]">
          <p className="text-[12px] text-black">Chat Prompt </p>
          <div className="flex justify-between items-center gap-[16px]">
            <div className="flex items-center gap-[5px]">
              <Switch
                checked={Active}
                onChange={setActive}
                className={classNames(
                  Active ? "bg-[#0074fb]" : "bg-gray-200",
                  "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    Active ? "translate-x-[11px]" : "translate-x-0",
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
                  <div className="relative sm:w-[180px] w-full">
                    <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[1px] ">
                      <span className="flex items-center">
                        <span className=" block truncate">{proname?.name}</span>
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
        <div
          className={`grid w-full
              ${chatVersion.length > 1 && "lg:grid-cols-2"}
              ${chatVersion.length > 2 && "xl:grid-cols-3"}
              ${chatVersion.length > 3 && "2xl:!grid-cols-4"}
              ${chatVersion.length > 4 && "3xl:!grid-cols-5"}
              `}
        >
          {chatVersion.map((data) => (
            <div key={data.id} className="border-r-[#CCCCCC] border-r-[1px]">
              <div className="flex sm:items-center justify-between sm:flex-row flex-col relative p-[9px_27px_10px_11px]">
                <div className="flex items-center gap-2">
                  <Listbox
                    key={data.id}
                    value={selected}
                    onChange={setSelected}
                  >
                    {({ open }) => (
                      <>
                        <div className="relative">
                          <Listbox.Button
                            className={`relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[8px] py-[3px] ${
                              chatVersion.length > 2 ? "sm:!w-[140px]" : ""
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
                                      <div className="p-[16px] bg-white text-base border border-[#cccccc] rounded-lg  z-[9] ml-[10px] 2xl:!w-[270px] w-[230px opacity-100">
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
                  <button className="text-[#464F60] text-[17px] rotate-[95deg]">
                    <AiOutlineStop />
                  </button>
                </div>
                <div
                  className={`flex gap-[17px] sm:mt-0 mt-[20px] ${
                    chatVersion.length > 2 ? "!gap-[10px]" : ""
                  }`}
                >
                  <button>
                    <LodingIcon />
                  </button>
                  <button>
                    <ImageIcon />
                  </button>
                  <button onClick={() => setOpen(!open)}>
                    <EditIcon />
                  </button>
                  <button>
                    <MinusIcon onClick={() => removeVersion(data.id)} />
                  </button>
                  <button>
                    <PlusRectangleIcon onClick={addVersion} />
                  </button>
                  <button
                    onClick={() =>
                      !apiCallInProgress &&
                      setAnalysisModelOpen(!analysisModelOpen)
                    }
                  >
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
              <div>
                <div className="bg-[#F7F7F7]">
                  <div className="bg-[#ECECEC] p-[19px_31px] flex gap-[19px]">
                    <User2Icon />
                    <p>Hello </p>
                  </div>
                  <div className="p-[19px_31px] flex gap-[19px]">
                    <FireIcon />
                    <p>
                      Hello! How can I help you today? If you have any questions
                      or need assistance with something, just let me know. I'll
                      do my best to help you out.
                    </p>
                  </div>
                  <div className="bg-[#ECECEC] p-[19px_31px] flex gap-[19px]">
                    <User2Icon />
                    <p>How are you?</p>
                  </div>
                  <div className="p-[19px_31px] flex gap-[19px]">
                    <FireIcon />
                    <p>
                      I'm just a computer program, so I don't have feelings or
                      experiences in the way that a human does. However, I can
                      understand and respond to a wide range of inquiries and
                      requests.
                    </p>
                  </div>
                  <div className="bg-[#ECECEC] p-[19px_31px] flex gap-[19px]">
                    <User2Icon />
                    <p>Hello </p>
                  </div>
                </div>
                <div className="p-[10px_14px_12px_20px]">
                  <div className="bg-[#ECECEC]">
                    <textarea
                      placeholder="Send a message"
                      className="border-0 resize-none bg-[#ECECEC] focus:ring-0 focus:shadow-none w-full"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat_version;
