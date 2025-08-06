'use client'
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FiCpu } from "react-icons/fi";
import { getModelDisplayName, getModelArchitectureSummary } from "@/utils/modelUtils";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ModelSelector = ({
    selectedModel,
    onModelSelect,
    models,
    isLoading
}) => {
    const [searchModel, setSearchModel] = useState("");

    const filteredModels = models.filter((model) => {
        const trimmedSearchModel = searchModel.replace(/[^\w\s]/g, "").trim();
        const regex = new RegExp(trimmedSearchModel, "gi");
        const modelName = getModelDisplayName(model.model_id);
        const trimmedModelName = modelName.replace(/[^\w\s]/g, "").replace(/\s+/g, "");
        return trimmedModelName.match(regex) || model.model_id.includes(trimmedSearchModel);
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 p-6">
            <h2 className="font-Archivo text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FiCpu className="w-5 h-5 text-[#D4DB33]" />
                Select Interpretability Model
            </h2>
            <div className="flex items-center gap-4">
                <Listbox value={selectedModel} onChange={onModelSelect} disabled={isLoading}>
                    {({ open }) => (
                        <>
                            <div className="relative w-96">
                                <Listbox.Button className="relative w-full cursor-default border border-slate-300 rounded-xl bg-white font-Inter text-[14px] text-slate-700 font-normal pl-[12px] pr-[40px] py-[10px] text-left disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400 transition-colors">
                                    <span className="flex items-center">
                                        <span className="block truncate">
                                            {selectedModel
                                                ? getModelDisplayName(selectedModel.model_id)
                                                : 'Select a model for interpretation'
                                            }
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
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-200 rounded-xl max-h-[400px] overflow-auto">
                                        <div className="bg-white sticky top-0 z-[9] p-3 border-b border-slate-200">
                                            <input
                                                type="text"
                                                className="border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] px-3 py-2 w-full bg-white rounded-lg text-sm"
                                                placeholder="Search models..."
                                                value={searchModel}
                                                onChange={(e) => setSearchModel(e.target.value)}
                                            />
                                        </div>
                                        {filteredModels.map((model) => (
                                            <Listbox.Option
                                                key={model.model_id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active
                                                            ? "bg-slate-50"
                                                            : "text-slate-900",
                                                        "relative cursor-default select-none p-4 hover:bg-slate-50 transition-colors"
                                                    )
                                                }
                                                value={model}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-slate-900 text-[15px] font-Inter font-semibold truncate">
                                                        {getModelDisplayName(model.model_id)}
                                                    </span>
                                                    <span className="text-slate-600 text-[12px] font-Inter">
                                                        {getModelArchitectureSummary(model.config)} • {model.config.model_type}
                                                    </span>
                                                    <span className="text-slate-500 text-[11px] font-mono truncate">
                                                        {model.model_id}
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
                {selectedModel && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#D4DB33]/10 rounded-xl border border-[#D4DB33]/20">
                        <FiCpu className="w-4 h-4 text-[#D4DB33]" />
                        <span className="text-sm font-medium text-slate-800">
                            {getModelDisplayName(selectedModel.model_id)}
                        </span>
                        <span className="text-xs text-slate-600">
                            ({selectedModel.config.model_type})
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelSelector;