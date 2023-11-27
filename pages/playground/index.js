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
  },
  {
    id: 2,
    name: "Select an option",
  },
  {
    id: 3,
    name: "Open Al - GPT 4",
  },
  {
    id: 4,
    name: "HF - Mistral 7b",
  },
  {
    id: 5,
    name: "HF - Bloom",
  },
  {
    id: 6,
    name: "Anthropic Claude2",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const index = () => {
  const [selected, setSelected] = useState(people[1]);
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
            <div className="py-[9px] px-[12px] flex sm:w-[1642px] w-full justify-between flex-wrap sm:flex-row flex-col border-b border-[#CCCCCC]">
              <div>
                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                  Prompt
                </h1>
                <p className="font-Archivo text-[12px] font-normal text-[#CCCCCC] sm:mt-[19px] mt-[10px] sm:max-w-full max-w-[220px]">
                  Start entering your prompt for the selected models. Press
                  Button Run Playground or Shift + Return to get the results.
                </p>
              </div>
              <div className="flex-col justify-between  flex">
                <div className="sm:my-0 my-[20px]">
                  <div className="flex sm:items-center gap-[18px] sm:flex-row flex-col items-start">
                    <label
                      for="project"
                      class="block font-Archivo text-[12px] text-[#000000] font-normal"
                    >
                      Input Tokens: 245
                    </label>
                    <select
                      id="project"
                      class=" border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal py-[0px] sm:w-[209px] w-full px-[20px]"
                    >
                      <option selected>Select a project to store</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-[10px] flex-wrap pb-[6px]">
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
            <div className=" flex sm:w-[1642px] w-full lg:flex-row flex-col">
              <div className="lg:w-[50%] w-auto py-[9px] sm:pl-[12px] pl-[16px] sm:pr-[27px] pr-[16px]  lg:border-r lg:border-r-[#CCCCCC] border-b border-b-[#CCCCCC]">
                <div className="flex items-center justify-between sm:flex-row flex-col">
                  <select
                    id="project"
                    className=" border border-[#CCCCCC] rounded-[6px] block font-Inter text-[12px] text-[#464F60] font-normal py-[0px] sm:w-[179px] w-full px-[20px]"
                  >
                    <option selected>Select an option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <div className="flex gap-[17px] sm:mt-0 mt-[20px]">
                    <EditIcon />
                    <MinusIcon />
                    <PlusRectangleIcon />
                    <ShareIcon />
                    <SettingIcon />
                  </div>
                </div>
                <div className="flex justify-center sm:mt-[38px] mt-[20px]">
                  <p className="font-Inter text-[12px] text-[#000000] font-light max-w-[525px]  ">
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
                            {/* <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 
                          shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"> */}

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
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg max-w-[210px]">
                              {people.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#CCC] text-white"
                                        : "text-gray-900",
                                      "relative cursor-default select-none py-2 pl-[30px] pr-9"
                                    )
                                  }
                                  value={person}
                                >
                                  {/* {({ selected, active }) => (
                                    <> */}
                                  <div className="flex items-center">
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
                                  {/* </>
                                  )} */}
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
                  <p className="font-Inter text-[12px] text-[#000000] font-light max-w-[525px]  ">
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
