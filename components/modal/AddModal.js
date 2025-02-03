import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { toast } from "react-toastify";
const DEFAULT_PROVIDERS = [
  { id: 1, name: "anthropic" },
  { id: 2, name: "cohere" },
  { id: 3, name: "custom" },
  { id: 4, name: "fireworks" },
  { id: 5, name: "google" },
  { id: 6, name: "mistral" },
  { id: 7, name: "openai" },
  { id: 8, name: "perplexity" },
  { id: 9, name: "together" },
  { id: 10, name: "custom_h" }
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddModal = ({ open, setOpen, value, model_status, updateModelList }) => {
  const [customProviders, setCustomProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProviders, setAllProviders] = useState(DEFAULT_PROVIDERS);
  const [selected, setSelected] = useState(DEFAULT_PROVIDERS[0]);

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
  const filteredProviders = allProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [settings, setSettings] = useState({
    context: value ? parseFloat(String(value.context).replace(/,/g, "")) : 0,
    inputCost: value ? valueFormat(value.input_price) : 0,
    outputCost: value ? valueFormat(value.output_price) : 0,
  });
  // Handle settings change
  const handleSettingsChange = (
    settingName,
    value,
    isEditableNumber = false
  ) => {
    if (isEditableNumber) {
      setSettings({ ...settings, [settingName]: parseFloat(value) });
    } else {
      setSettings({ ...settings, [settingName]: value });
    }
  };

  const calculateSliderBackground = (name, value) => {
    const cleanedName = parseFloat(String(name).replace(/,/g, ""));
    const percentage = (cleanedName / value) * 100;
    return `linear-gradient(to right, #0D859A 0%, #0D859A ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  };

  const [modelData, setModelData] = useState({
    name: value ? value.name : "",
    id1: value ? value.id1 : "",
    model_description: value ? value.model_description : "",
    multimodal: value ? value.multimodal : false

  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setModelData((prevState) => ({
        ...prevState,
        [name]: checked
      }));
    } else {
      setModelData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const fetchCustomProviders = async () => {
      try {
        const response = await fetch('/api/customProviders');
        const { data } = await response.json();
        const transformedProviders = (data.custom_providers || []).map(provider => ({
          id: provider.provider_id,
          name: provider.name,
          isCustom: true,
          provider_id: provider.provider_id
        }));
        setCustomProviders(transformedProviders);
      } catch (error) {
        console.error("Failed to fetch custom providers:", error);
        toast.error("Failed to load custom providers");
      }
    };

    fetchCustomProviders();
  }, []);


  useEffect(() => {
    const combined = [...DEFAULT_PROVIDERS, ...customProviders].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    setAllProviders(combined);

    // Update selected based on value prop and combined providers
    if (value) {
      const matchingProvider = combined.find((provider) =>
        provider.isCustom
          ? provider.provider_id === value.provider
          : provider.name === value.provider
      );
      if (matchingProvider) {
        setSelected(matchingProvider);
      }
    }
  }, [customProviders, value]);

  const handleAddModel = async () => {
    const modelFormData = {
      ...modelData,
      // Use provider_id for custom providers, name for default ones
      provider: selected.isCustom ? selected.provider_id : selected.name,
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
      modelFormData.output_price == ""
    ) {
      toast.error("Please Enter required fields!");
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
      multimodal: modelFormData.multimodal

    };

    try {
      if (model_status == "new") {
        const response = await fetch("/api/manageModels", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        if (response.ok) {
          toast.success("Model created successfully!");
          setModelData({
            name: value ? value.name : "",
            id1: value ? value.id1 : "",
            provider: value ? value.provider : "",
            context: value ? value.context : "",
            input_price: value ? value.input_price : "",
            output_price: value ? value.output_price : "",
            model_description: value ? value.model_description : "",
            multimodal: value ? value.multimodal : false

          });
          setOpen(false);
          updateModelList();
        } else {
          toast.error(responseData.detail);
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
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Model updated successfully!");
          setModelData({
            name: value ? value.name : "",
            id1: value ? value.id1 : "",
            provider: value ? value.provider : "",
            context: value ? value.context : "",
            input_price: value ? value.input_price : "",
            output_price: value ? value.output_price : "",
            model_description: value ? value.model_description : "",
            multimodal: value ? value.multimodal : false

          });
          setOpen(false);
          updateModelList();
        } else {
          toast.error(responseData.detail);
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
                      <Dialog.Title>
                        <label
                          htmlFor="name"
                          className="text-[#252525] font-medium text-[14px] font-Inter"
                        >
                          Name of Model
                        </label>
                      </Dialog.Title>
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
                      <input
                        type="checkbox"
                        name="multimodal"
                        id="multimodal"
                        className="ml-1 mr-2 mb-1 rounded font-medium text-[15px] font-Inter focus:ring-0 focus:outline-none"
                        checked={modelData.multimodal} // Use 'checked' attribute here
                        onChange={handleOnChange}
                      />
                      <label
                        htmlFor="multimodal"
                        className="text-[#252525] font-medium text-[14px] font-Inter"
                      >
                        Multimodal (allows image input)
                      </label>
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
                                  {selected?.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                  <MdKeyboardArrowUp
                                    className={open ? "h-5 w-5 text-gray-400 rotate-[0]" : "h-5 w-5 text-gray-400 rotate-[180deg]"}
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
                                <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {/* Add search input */}
                                  <div className="px-3 py-2 border-b">
                                    <div className="relative">
                                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                      <input
                                        type="text"
                                        className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4DB33]"
                                        placeholder="Search providers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  {filteredProviders.map((provider) => (
                                    <Listbox.Option
                                      key={provider.id}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "bg-[#f0efef] rounded-md" : "text-[#000]",
                                          "relative cursor-default select-none py-2 pl-3 pr-9",
                                          provider.isCustom ? "italic" : ""
                                        )
                                      }
                                      value={provider}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected ? "font-medium" : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {provider.name}
                                              {provider.isCustom && " (Custom)"}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active ? "text-white" : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            />
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
                        <span
                          className="text-[#5D6574] text-[12px] editable-number"
                          contentEditable
                          tabIndex="0"
                          onBlur={(e) => {
                            let newValue = e.target.textContent.trim();
                            newValue = Math.max(
                              1024,
                              Math.min(256000, newValue)
                            );
                            handleSettingsChange("context", newValue, true);
                            e.target.textContent = newValue;
                          }}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]|Backspace|Delete/.test(e.key) ||
                              (e.key === "0" && e.target.textContent === "0")
                            ) {
                              e.preventDefault();
                            }
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (
                              e.target.textContent === "0" &&
                              e.key !== "Backspace"
                            ) {
                              e.target.textContent = "";
                            }
                          }}
                          suppressContentEditableWarning
                        >
                          {settings.context ? settings.context : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1024"
                        max="256000"
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
                            256000
                          ),
                        }}
                      />
                    </div>
                    <div className="slidecontainer-main">
                      <div className="flex justify-between items-center mb-[6px]">
                        <p className="text-[#5D6574] text-[12px]">
                          Cost Input Token per Million
                        </p>
                        <span
                          className="text-[#5D6574] text-[12px] editable-number"
                          contentEditable
                          tabIndex="0"
                          onBlur={(e) => {
                            let newValue = e.target.textContent.trim();
                            newValue = Math.max(0.001, Math.min(1, newValue));
                            handleSettingsChange("inputCost", newValue, true);
                            e.target.textContent = newValue;
                          }}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]|Backspace|Delete|\./.test(e.key) ||
                              (e.key === "." &&
                                e.target.textContent.includes(".")) ||
                              (e.key === "0" && e.target.textContent === "0")
                            ) {
                              e.preventDefault();
                            }
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (
                              e.target.textContent === "0" &&
                              e.key !== "Backspace"
                            ) {
                              e.target.textContent = "";
                            }
                          }}
                          suppressContentEditableWarning
                        >
                          {settings.inputCost ? settings.inputCost : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.001"
                        max="1"
                        step="0.001"
                        className="slider-main"
                        value={settings.inputCost ? settings.inputCost : 0}
                        id="inputCost"
                        onChange={(e) =>
                          handleSettingsChange("inputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.inputCost,
                            1
                          ),
                        }}
                      />
                    </div>
                    <div className="slidecontainer-main">
                      <div className="flex justify-between items-center mb-[6px]">
                        <p className="text-[#5D6574] text-[12px]">
                          Cost Output Token per Million
                        </p>
                        <span
                          className="text-[#5D6574] text-[12px] editable-number"
                          contentEditable
                          tabIndex="0"
                          onBlur={(e) => {
                            let newValue = e.target.textContent.trim();
                            newValue = Math.max(0.001, Math.min(1, newValue));
                            handleSettingsChange("outputCost", newValue, true);
                            e.target.textContent = newValue;
                          }}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]|Backspace|Delete|\./.test(e.key) ||
                              (e.key === "." &&
                                e.target.textContent.includes(".")) ||
                              (e.key === "0" && e.target.textContent === "0")
                            ) {
                              e.preventDefault();
                            }
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (
                              e.target.textContent === "0" &&
                              e.key !== "Backspace"
                            ) {
                              e.target.textContent = "";
                            }
                          }}
                          suppressContentEditableWarning
                        >
                          {settings.outputCost ? settings.outputCost : 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.001"
                        max="1"
                        step="0.001"
                        className="slider-main"
                        value={settings.outputCost ? settings.outputCost : 0}
                        id="outputCost"
                        onChange={(e) =>
                          handleSettingsChange("outputCost", e.target.value)
                        }
                        style={{
                          background: calculateSliderBackground(
                            settings.outputCost,
                            1
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
