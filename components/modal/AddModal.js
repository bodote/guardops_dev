import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";

const AddModal = ({ open, setOpen }) => {
  const [settings, setSettings] = useState({
    context: 0,
    inputCost: 0,
    outputCost: 0,
  });

  // Handle settings change
  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };

  const calculateSliderBackground = (name, value) => {
    const percentage = (name / value) * 100;
    return `linear-gradient(to right, #0D859A 0%, #0D859A ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  };
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[643px] border-[#CCCCCC] border-[1px] sm:p-[19px_36px] p-[19px_36px]">
                  <div className="flex flex-col gap-[17px]">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        Name of Dataset
                      </label>
                      <input
                        type="text"
                        name="dataset_name"
                        id="name"
                        className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="Name for your model"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        ID
                      </label>
                      <input
                        type="text"
                        name="dataset_name"
                        id="name"
                        className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="ID of the Model given by the Model Provider to identify the model"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        Provider
                      </label>
                      <input
                        type="text"
                        name="dataset_name"
                        id="name"
                        className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="Select Box with existing Provider"
                      />
                    </div>
                    <div className="slidecontainer-main">
                      <div className="flex justify-between items-center mb-[6px]">
                        <p className="text-[#5D6574] text-[12px]">
                          Context Length
                        </p>
                        <span className="text-[#5D6574] text-[12px]">
                          {settings.context ? settings.context : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200000"
                        step="1"
                        className="slider-main"
                        value={settings.context ? settings.context : 0}
                        id="temperature"
                        onChange={(e) =>
                          handleSettingsChange("context", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.context,
                            200000
                          ),
                        }}
                      />
                    </div>
                    <div className="slidecontainer-main">
                      <div className="flex justify-between items-center mb-[6px]">
                        <p className="text-[#5D6574] text-[12px]">
                          Cost Input Token per Million
                        </p>
                        <span className="text-[#5D6574] text-[12px]">
                          {settings.inputCost ? settings.inputCost : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="1"
                        className="slider-main"
                        value={settings.inputCost ? settings.inputCost : 0}
                        id="temperature"
                        onChange={(e) =>
                          handleSettingsChange("inputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.inputCost,
                            4
                          ),
                        }}
                      />
                    </div>
                    <div className="slidecontainer-main">
                      <div className="flex justify-between items-center mb-[6px]">
                        <p className="text-[#5D6574] text-[12px]">
                          Cost Output Token per Million
                        </p>
                        <span className="text-[#5D6574] text-[12px]">
                          {settings.outputCost ? settings.outputCost : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="1"
                        className="slider-main"
                        value={settings.outputCost ? settings.outputCost : 0}
                        id="temperature"
                        onChange={(e) =>
                          handleSettingsChange("outputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.outputCost,
                            4
                          ),
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        Provider
                      </label>
                      <textarea
                        name="dataset_name"
                        id="name"
                        className="h-[153px] resize-none border border-[#EAEBF0] my-[8px] rounded w-full font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="Select Box with existing Provider"
                      ></textarea>
                    </div>
                    <div className="flex justify-center mt-[8px]">
                      <button
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-[10px] bg-[#D4DB33] text-black font-medium text-[14px] font-Inter py-[6px] sm:px-[29px] px-[9px] rounded-md"
                      >
                        <FiPlus className="text-[20px]" />
                        Add Model
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AddModal;
