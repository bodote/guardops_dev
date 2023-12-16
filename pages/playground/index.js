import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { LockIcon, RightIcon } from "@/public/Assets/Icons/Allsvg";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Version from "@/components/Playground/Version";

const projectname = [
  {
    id: 1,
    name: "DIAS Assitant",
  },
  {
    id: 2,
    name: "Select a project to store",
  },
  {
    id: 3,
    name: "PlantUML GPT",
  },
  {
    id: 4,
    name: "Simon Marius GPT",
  },
  {
    id: 5,
    name: "MDZ",
  },
  {
    id: 6,
    name: "New Project.....",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const index = () => {
  // Add state to manage text area content
  const [message, setMessage] = useState("");

  // Function to clear the message text area
  const clearMessage = () => {
    setMessage("");
  };

  // State to track the runPlayground button has been pressed
  const [runPressed, setRunPressed] = useState(false);

  // Function to reset the runPressed flag
  const resetRunPressed = () => {
    setRunPressed(false);
  };

  // Function to handle text change in text area
  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to transform text and pass to Version component
  const runPlayground = () => {
    // Pass the uppercaseMessage to each Version component
    setVersions(versions.map(v => ({ ...v, message: message })));
    setRunPressed(true);
  };

  // Function to append text to message
  const appendToMessage = (text) => {
    setMessage((prevMessage) => `${prevMessage} ${text}`);
  };



  const [proname, setProname] = useState(projectname[1]);

  // State to manage versions
  const [versions, setVersions] = useState([{ id: 1, component: <Version key={1} /> }]);

  // Function to add a new version
  const addVersion = () => {
    const newId = versions.length > 0 ? versions[versions.length - 1].id + 1 : 1;
    setVersions([...versions, { id: newId, component: <Version key={newId} /> }]);
  };

  // Function to remove a version
  const removeVersion = (id) => {
    setVersions(versions.filter(version => version.id !== id));
  };

  // Calculate grid columns based on number of versions
  const gridCols = `grid-cols-${versions.length > 1 ? versions.length : 1}`;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto  ml-[96px]">
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
            <a href="/">
        <LockIcon />
        </a>
          </div>
          <div className=" flex sm:flex-row flex-col border-b border-b-[#CCCCCC]">
            <div className="px-[16px] pt-[12px] sm:w-[182px] w-full  sm:border-r border-0 border-r-[#CCCCCC] ">
              <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                <FiPlus /> New Prompt
              </button>
              <ul className="list-disc px-[8px]">
                <li className="text-[#656565] text-[12px] font-Inter font-medium my-[20px]">
                  Prompt1
                </li>
              </ul>
            </div>
            <div className="px-[16px] pt-[12px] w-full">
              <div className="flex justify-between w-full sm:flex-row flex-col">
                <label
                  for="name"
                  className="font-Archivo text-[12px] font-normal text-[#000]"
                >
                  Prompt
                </label>
                <div className="flex sm:items-center sm:gap-[18px] gap-[10px] sm:flex-row flex-col items-start sm:mt-0 mt-[10px]">
                  <label
                    for="project"
                    class="block font-Archivo text-[12px] text-[#000000] font-normal"
                  >
                    Input Tokens: 245
                  </label>
                  <Listbox value={proname} onChange={setProname}>
                    {({ open }) => (
                      <>
                        <div className="relative sm:w-[180px] w-full">
                          <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] pl-[10px] pr-[20px] py-[3px] ">
                            <span className="flex items-center">
                              <span className=" block truncate">
                                {proname.name}
                              </span>
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
                              {projectname.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#f0efef]  rounded-[6px]"
                                        : "text-[#000]",
                                      "relative cursor-default select-none py-2 pl-[30px] pr-9"
                                    )
                                  }
                                  value={person}
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
                                      {person.name}
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
              <div>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  className="h-[180px] border-0 rounded  w-full  font-Archivo text-[12px] font-normal placeholder:text-[#CCCCCC] shadow-none mt-[5px] focus:ring-0 focus:outline-none "
                  placeholder=" Start entering your prompt for the selected models. Press
                  Button Run Playground or Shift + Return to get the results."
                  value={message}
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex gap-[10px] flex-wrap pb-[6px] sm:justify-end justify-center">
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                  Prompt Templates
                </button>
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                onClick={clearMessage}
                >
                  Clear
                </button>
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                onClick={runPlayground}
                >
                  Run Playground
                </button>
              </div>
            </div>
          </div>
          <div className=" flex sm:flex-row flex-col h-screen">
            <div className="px-[16px] py-[12px] sm:w-[182px] w-full min-w-[117px] sm:border-r border-0 border-r-[#CCCCCC] lg:border-r lg:border-r-[#CCCCCC]  ">
              <h1 className="text-[#000000] font-medium text-[12px] font-Inter">
                Versions
              </h1>
              <ul className="list-disc px-[8px]">
                <li className="text-[#656565] text-[12px] font-Inter font-medium mt-[10px]">
                  Run 1
                </li>
                <li className="text-[#656565] text-[12px] font-Inter font-medium mt-[10px]">
                  Run 2
                </li>
                <li className="text-[#656565] text-[12px] font-Inter font-medium mt-[10px]">
                  Run 3
                </li>
                <li className="text-[#656565] text-[12px] font-Inter font-medium mt-[10px]">
                  Run 4
                </li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${versions.length}, minmax(0, 1fr))` }} className={`grid ${gridCols} w-full lg:flex-row flex-col bg-[#F7F7F7]`}>
            {versions.map((version) => (
              React.cloneElement(version.component, {
                addVersion,
                removeVersion: () => removeVersion(version.id),
                message: version.message, // pass the message here
                versionId: version.id, // pass the version ID here
                runPressed: runPressed,
                resetRunPressed: resetRunPressed, // pass the resetRunPressed function here
                appendToMessage: appendToMessage, // pass the appendToMessage function here
                key: version.id
              })
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
