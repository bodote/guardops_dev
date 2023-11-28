import Sidebar from "@/components/Sidebar/Sidebar";
import {
  CopyIcon,
  DownArrowIcon,
  EditIcon,
  LockIcon,
  MinusIcon,
  PenIcon,
  PlusIcon,
  PlusRectangleIcon,
  RightIcon,
  SettingIcon,
  ShareIcon,
  UpArrowIcon,
} from "@/public/Assets/Icons/Allsvg";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

const people = [
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
    name: "Open Al - GPT 4",
    id1: "open3",
  },
  {
    id: 4,
    name: "HF - Mistral 7b",
    id1: "open4",
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
  const [selected, setSelected] = useState(people[1]);
  const [proname, setProname] = useState(projectname[1]);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
            <LockIcon />
          </div>
          <div className=" flex sm:flex-row flex-col">
            <div className="px-[16px] pt-[12px] sm:w-[182px] w-full sm:h-[285px] h-auto sm:border-r border-0 border-r-[#CCCCCC] border-b border-b-[#CCCCCC]">
              <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                <FiPlus /> New Prompt
              </button>
              <ul className="list-disc px-[8px]">
                <li className="text-[#656565] text-[12px] font-Inter font-medium my-[20px]">
                  Prompt1
                </li>
              </ul>
            </div>
            <div className="px-[16px] pt-[12px] w-full border-b border-[#CCCCCC]">
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
                        <div className="relative  sm:w-[215px] w-full border border-[#CCCCCC] rounded-[6px]">
                          <Listbox.Button className=" relative w-full cursor-default   block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[20px] py-[3px] ">
                            <span className="flex items-center">
                              <span className=" block truncate">
                                {proname.name}
                              </span>
                            </span>
                          </Listbox.Button>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <MdKeyboardArrowUp
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-5  w-full bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
                              {projectname.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#CCC]  rounded-[6px]"
                                        : "text-[#000]",
                                      "relative cursor-default select-none pt-2 pb-1 pl-[30px] pr-9"
                                    )
                                  }
                                  value={person}
                                >
                                  <div className="flex items-center ">
                                    <span
                                      className={classNames(
                                        proname
                                          ? " text-[#656565] text-[12px] font-Inter font-medium"
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
                  className="h-[180px] border-0 rounded  w-full  font-Archivo text-[12px] font-normal placeholder:text-[#CCCCCC] shadow-none"
                  placeholder=" Start entering your prompt for the selected models. Press
                  Button Run Playground or Shift + Return to get the results."
                />
              </div>
              <div className="flex gap-[10px] flex-wrap pb-[6px] sm:justify-end justify-center">
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                  Prompt Templates
                </button>
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                  Clear
                </button>
                <button className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md">
                  Run Playground
                </button>
              </div>
            </div>
          </div>
          <div className=" flex sm:flex-row flex-col h-screen">
            <div className="px-[16px] py-[12px] sm:w-[182px] w-full min-w-[117px] sm:border-r border-0 border-r-[#CCCCCC] lg:border-r lg:border-r-[#CCCCCC] border-b border-b-[#CCCCCC] ">
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
            <div className=" flex  w-full lg:flex-row flex-col bg-[#F7F7F7]">
              <div className="lg:w-[50%] w-auto py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC] border-b border-b-[#CCCCCC]">
                <div className="flex items-center justify-between sm:flex-row flex-col">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2  sm:w-[237px] w-full">
                          <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[20px] py-[3px] ">
                            <span className="flex items-center">
                              <span className=" block truncate">
                                {selected.name}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <MdKeyboardArrowUp
                                className="h-5 w-5 text-gray-400"
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
                              {people.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  id={person.id1}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#CCC]  rounded-[6px]"
                                        : "text-[#000]",
                                      "relative cursor-default select-none py-2 pl-[30px] pr-9"
                                    )
                                  }
                                  onMouseOver={handleMouseOver}
                                  onMouseOut={handleMouseOut}
                                  value={person}
                                >
                                  <div className="flex items-center ">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>
                                  <div className="ml-[220px] p-[16px] bg-white text-base border border-[#cccccc] rounded-lg w-[350px] hidden show absolute">
                                    <h1 className="text-[#656565] text-[12px] font-Inter font-medium ">
                                      Modelname 2
                                    </h1>
                                    <p className="font-Archivo text-[12px] font-normal text-[#CCCCCC] leading-normal mt-[5px]">
                                      Short description to this model.What is
                                      especially for this model.Eventually more
                                      information of the company.What the model
                                      is capable off.
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
                    <MinusIcon />
                    <PlusRectangleIcon />
                    <ShareIcon />
                    <SettingIcon />
                  </div>
                </div>
                <div className="flex justify-center sm:mt-[38px] mt-[20px]">
                  <p className="font-Inter text-[12px] text-[#000000] font-light mr-[4px] ml-[16px] ">
                    To install the Vercel SDK, you can use npm or yarn package
                    managers. Open your command line interface and run "npm
                    install -g vercel" or "yarn global add vercel". Once
                    installed, you can authenticate by running "vercel login"
                    and following the prompts. To create a new project, navigate
                    to your project directory and run "vercel init". Finally,
                    deploy your application using the command "vercel --prod" to
                    generate a unique URL for accessing it.
                  </p>
                </div>
                <div className="flex gap-[10px] justify-center my-[17px]">
                  <CopyIcon />
                  <DownArrowIcon />
                  <UpArrowIcon />
                  <PenIcon />
                </div>
              </div>
              <div className="lg:w-[50%] w-auto py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px] ">
                <div className="flex items-center justify-between sm:flex-row flex-col">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2  sm:w-[237px] w-full">
                          <Listbox.Button className=" relative w-full cursor-default border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal sm:w-[179px] px-[20px] py-[3px] ">
                            <span className="flex items-center">
                              <span className=" block truncate">
                                {selected.name}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <MdKeyboardArrowUp
                                className="h-5 w-5 text-gray-400"
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
                              {people.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  id={person.id1}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#CCC]  rounded-[6px]"
                                        : "text-[#000]",
                                      "relative cursor-default select-none py-2 pl-[30px] pr-9"
                                    )
                                  }
                                  onMouseOver={handleMouseOver}
                                  onMouseOut={handleMouseOut}
                                  value={person}
                                >
                                  <div className="flex items-center ">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>
                                  <div className="ml-[220px] p-[16px] bg-white text-base border border-[#cccccc] rounded-lg w-[350px] hidden show absolute">
                                    <h1 className="text-[#656565] text-[12px] font-Inter font-medium ">
                                      Modelname 2
                                    </h1>
                                    <p className="font-Archivo text-[12px] font-normal text-[#CCCCCC] leading-normal mt-[5px]">
                                      Short description to this model.What is
                                      especially for this model.Eventually more
                                      information of the company.What the model
                                      is capable off.
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
                    <MinusIcon />
                    <PlusRectangleIcon />
                    <ShareIcon />
                    <SettingIcon />
                  </div>
                </div>

                <div className="flex justify-center sm:mt-[38px] mt-[20px]">
                  <p className="font-Inter text-[12px] text-[#000000] font-light mr-[4px] ml-[16px] ">
                    To install the Vercel SDK, you can use npm or yarn package
                    managers. Open your command line interface and run "npm
                    install -g vercel" or "yarn global add vercel". Once
                    installed, you can authenticate by running "vercel login"
                    and following the prompts. To create a new project, navigate
                    to your project directory and run "vercel init". Finally,
                    deploy your application using the command "vercel --prod" to
                    generate a unique URL for accessing it.
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
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
