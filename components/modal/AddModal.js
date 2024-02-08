import React, { useState, Fragment } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { toast } from "react-toastify";

const people = [
  {
    id: 1,
    name: "openai",
  },
  {
    id: 2,
    name: "fireworks",
  },
  {
    id: 3,
    name: "togethercompute",
  },
  {
    id: 4,
    name: "custom",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddModal = ({ open, setOpen, value, model_status, updateModelList }) => {
  const [selected, setSelected] = useState(
    value ? people.find((people) => people.name === value.provider) : people[0]
  );
  const valueFormat = (price) => {
    if (price.includes("/")) {
      const [pricePerToken, tokens] = price.split(" / ");
      const pricePerTokenNumber = parseFloat(pricePerToken);
      const tokensNumber = parseInt(tokens?.trim().split(" ")[0]); // Extracting only the number part and converting to integer
      const pricePerSingleToken = pricePerTokenNumber / tokensNumber;
      const pricePerMillionTokens = pricePerSingleToken * 1000000;
      return pricePerMillionTokens;
    } else {
      return price;
    }
  };
  const [settings, setSettings] = useState({
    context: value ? parseFloat(String(value.context).replace(/,/g, "")) : 0,
    inputCost: value ? valueFormat(value.input_price) : 0,
    outputCost: value ? valueFormat(value.output_price) : 0,
  });
  // Handle settings change
  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };

  const calculateSliderBackground = (name, value) => {
    const cleanedName = parseFloat(String(name).replace(/,/g, ""));
    const percentage = (cleanedName / value) * 100;
    return `linear-gradient(to right, #0D859A 0%, #0D859A ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  };

  const [modelData, setModelData] = useState({
    name: value ? value.name : "",
    id1: value ? value.id1 : "",
    provider: value ? value.provider : "",
    model_description: value ? value.model_description : "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setModelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddModel = async () => {
    const modelFormData = {
      ...modelData,
      provider: selected.name,
      context: settings.context,
      input_price: settings.inputCost,
      output_price: settings.outputCost,
    };
    if (
      modelFormData.name == "" ||
      modelFormData.id1 == "" ||
      modelFormData.provider == "" ||
      modelFormData.context == "" ||
      modelFormData.input_price == "" ||
      modelFormData.output_price == "" ||
      modelFormData.model_description == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }

    const formData = {
      name: modelFormData.name,
      id1: modelFormData.id1,
      provider: modelFormData.provider,
      context: modelFormData.context,
      input_price: modelFormData.input_price,
      output_price: modelFormData.output_price,
      model_description: modelFormData.model_description,
      model_id: value ? value.model_id : "",
    };

    try {
      if (model_status == "new") {
        const response = await fetch("/api/manageModels", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          toast.success("Model created successfully !!");
          setModelData({
            name: value ? value.name : "",
            id1: value ? value.id1 : "",
            provider: value ? value.provider : "",
            context: value ? value.context : "",
            input_price: value ? value.input_price : "",
            output_price: value ? value.output_price : "",
            model_description: value ? value.model_description : "",
          });
          setOpen(false);
          updateModelList();
        } else {
          toast.error("API request failed !!");
          console.error("API request failed:", response.statusText);
        }
      } else {
        if (value.user_id == 0) {
          toast.error("Default model cannot be edited");
          return;
        }
        const response = await fetch("/api/manageModels", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Model updated successfully !!");
          const responseData = await response.json();
          setModelData({
            name: value ? value.name : "",
            id1: value ? value.id1 : "",
            provider: value ? value.provider : "",
            context: value ? value.context : "",
            input_price: value ? value.input_price : "",
            output_price: value ? value.output_price : "",
            model_description: value ? value.model_description : "",
          });
          setOpen(false);
          updateModelList();
        } else {
          toast.error("API request failed !!");
          console.error("API request failed:", response.statusText);
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during API request:", error);
    }
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[643px] border-[#CCCCCC] border-[1px] sm:p-[19px_36px] p-[19px_14px]">
                  <div className="flex flex-col gap-[17px]">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        Name of Model
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-[42px] border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="Name for your model"
                        value={modelData.name}
                        onChange={handleOnChange}
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
                        name="id1"
                        id="id1"
                        className="h-[42px]  border border-[#EAEBF0] my-[8px] rounded  w-full   font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="ID of the Model given by the Model Provider to identify the model"
                        value={modelData.id1}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div>
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="text-[#252525] font-medium text-[14px] font-Inter">
                              Provider
                            </Listbox.Label>
                            <div className="relative mt-2">
                              <Listbox.Button className="h-[42px] border border-[#EAEBF0] rounded w-full font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]">
                                <span className="ml-3 block truncate text-left">
                                  {selected.name}
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
                                <Listbox.Options className="absolute z-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {people.map((person) => (
                                    <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-[#f0efef] rounded-md"
                                            : "text-[#000]",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={person}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            ></span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
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
                        id="context"
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
                        max="10"
                        step="0.1"
                        className="slider-main"
                        value={settings.inputCost ? settings.inputCost : 0}
                        id="inputCost"
                        onChange={(e) =>
                          handleSettingsChange("inputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.inputCost,
                            10
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
                        max="10"
                        step="0.1"
                        className="slider-main"
                        value={settings.outputCost ? settings.outputCost : 0}
                        id="outputCost"
                        onChange={(e) =>
                          handleSettingsChange("outputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.outputCost,
                            10
                          ),
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        System Prompt
                      </label>
                      <textarea
                        name="model_description"
                        id="model_description"
                        className="h-[153px] resize-none border border-[#EAEBF0] my-[8px] rounded w-full font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]"
                        placeholder="Your system prompt to the model"
                        value={modelData.model_description}
                        onChange={handleOnChange}
                      ></textarea>
                    </div>
                    <div className="flex justify-center mt-[8px]">
                      <button
                        onClick={handleAddModel}
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
