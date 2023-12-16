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
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Version = ({ addVersion, removeVersion }) => {
  const [selected, setSelected] = useState(people[1]);
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
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          id={person.id1}
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
                                selected
                                  ? "text-[#656565] text-[12px] font-Inter font-medium"
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
            To install the Vercel SDK, you can use npm or yarn package managers.
            Open your command line interface and run "npm install -g vercel" or
            "yarn global add vercel". Once installed, you can authenticate by
            running "vercel login" and following the prompts. To create a new
            project, navigate to your project directory and run "vercel init".
            Finally, deploy your application using the command "vercel --prod"
            to generate a unique URL for accessing it.
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
