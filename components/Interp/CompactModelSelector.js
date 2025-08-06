'use client'
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FiCpu, FiChevronDown } from "react-icons/fi";
import { getModelDisplayName, getModelArchitectureSummary } from "@/utils/modelUtils";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CompactModelSelector = ({
    selectedModel,
    onModelSelect,
    models,
    isLoading,
    showDetails,
    onToggleDetails,
    compact = false
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
        <div className={`bg-slate-50 rounded-xl mb-6 border border-slate-200 ${compact ? 'p-3 opacity-90' : 'p-4'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className={`bg-[#D4DB33] text-black rounded-full flex items-center justify-center font-bold ${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                            1
                        </div>
                        <h3 className={`font-Archivo font-semibold text-slate-900 ${compact ? 'text-sm' : 'text-lg'}`}>
                            {compact ? 'Model' : 'Model Selection'}
                        </h3>
                    </div>
                    {!selectedModel && !compact && (
                        <span className="text-sm text-slate-500 italic">Choose your model to begin</span>
                    )}
                </div>

                <Listbox value={selectedModel} onChange={onModelSelect} disabled={isLoading}>
                    {({ open }) => (
                        <>
                            <div className="relative">
                                <Listbox.Button className={`relative cursor-default border border-slate-300 rounded-lg bg-white font-Inter text-slate-700 font-normal text-left disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400 transition-colors ${compact ? 'pl-3 pr-8 py-2 text-xs min-w-[220px]' : 'pl-4 pr-10 py-3 text-sm min-w-[280px]'}`}>
                                    <span className="flex items-center justify-between">
                                        <span className="block truncate">
                                            {selectedModel
                                                ? getModelDisplayName(selectedModel.model_id)
                                                : 'Select a model...'
                                            }
                                        </span>
                                        <FiChevronDown className="w-4 h-4 text-slate-400" />
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-200 rounded-lg max-h-[300px] overflow-auto right-0">
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
                                                        "relative cursor-default select-none p-3 hover:bg-slate-50 transition-colors"
                                                    )
                                                }
                                                value={model}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-slate-900 text-sm font-Inter font-semibold truncate">
                                                        {getModelDisplayName(model.model_id)}
                                                    </span>
                                                    <span className="text-slate-600 text-xs font-Inter">
                                                        {getModelArchitectureSummary(model.config)} • {model.config.model_type}
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

            {selectedModel && (
                <div className={`pt-3 border-t border-slate-200 ${compact ? 'mt-2' : 'mt-3'}`}>
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 text-slate-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                            <FiCpu className={compact ? "w-3 h-3" : "w-4 h-4"} />
                            <span>
                                <strong>{getModelDisplayName(selectedModel.model_id)}</strong> ({selectedModel.config.model_type}) ready for analysis
                            </span>
                        </div>
                        <button
                            className={`bg-slate-100 hover:bg-[#D4DB33]/20 text-slate-700 hover:text-slate-900 rounded-lg transition-all duration-200 border border-slate-300 hover:border-[#D4DB33] flex items-center gap-1 ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs'}`}
                            onClick={onToggleDetails}
                        >
                            <FiCpu className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
                            {showDetails ? 'Hide Specs' : 'View Specs'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompactModelSelector;