import React, { Fragment, useEffect, useState } from "react";

import { IoChevronDownOutline } from "react-icons/io5";
import { Listbox, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { RiCheckLine, RiDatabaseLine } from "react-icons/ri";

const SelectDatasetModal = ({
  setIsDatasetModelOpen,
  traceProject,
  selectedTrace,
}) => {
  const [selected, setSelected] = useState({ name: "Select a dataset" });
  const [datasetList, setDatasetList] = useState([]);

  const getDatasets = async () => {
    try {
      const response = await fetch(`/api/manageDataset`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.datasets) {
          const sortedDatasets = responseData.datasets.slice().sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // names must be equal
          });
          setDatasetList(sortedDatasets);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const formData = {
    dataset_id: selected.dataset_id,
    trace_ids: (() => {
      if (traceProject) {
        const mainTrace = traceProject.find(
          (trace) => trace.parent_id === null
        );
        return mainTrace ? [mainTrace.context.trace_id] : null;
      } else if (selectedTrace) {
        return selectedTrace.map((trace) => trace.context.trace_id);
      } else {
        return null;
      }
    })(),
  };

  const handleConfirm = async () => {
    const response = await fetch("/api/manageDataset", {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      toast.success("Traces successfully added to dataset!");
      const responseData = await response.json();
      setIsDatasetModelOpen(false);
    }
  };

  useEffect(() => {
    getDatasets();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getSelectedCount = () => {
    if (traceProject) return 1;
    if (selectedTrace) return selectedTrace.length;
    return 0;
  };

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 min-w-[400px] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#0D859A] rounded-lg">
          <RiDatabaseLine className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Add to Dataset</h2>
          <p className="text-sm text-gray-600">
            Adding {getSelectedCount()} trace{getSelectedCount() !== 1 ? 's' : ''} to dataset
          </p>
        </div>
      </div>

      {/* Dataset Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Dataset
        </label>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 hover:border-gray-400 focus:border-[#0D859A] focus:outline-none focus:ring-2 focus:ring-[#0D859A] focus:ring-opacity-20 transition-all duration-200">
                <span className="flex items-center">
                  <span className="block truncate text-sm text-gray-900">
                    {selected.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <IoChevronDownOutline
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {datasetList.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No datasets available</p>
                      <p className="text-xs text-gray-400 mt-1">Create a dataset first</p>
                    </div>
                  ) : (
                    datasetList.map((dataset) => (
                      <Listbox.Option
                        key={dataset.dataset_id}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-[#0D859A] text-white" : "text-gray-900",
                            "relative cursor-pointer select-none py-3 pl-4 pr-9 hover:bg-gray-50 transition-colors duration-150"
                          )
                        }
                        value={dataset}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate text-sm"
                                )}
                              >
                                {dataset.name}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-[#0D859A]",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <RiCheckLine className="w-4 h-4" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setIsDatasetModelOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selected.dataset_id}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0D859A] to-[#0A6B7A] rounded-lg hover:from-[#0A6B7A] hover:to-[#085C6A] focus:outline-none focus:ring-2 focus:ring-[#0D859A] focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Add to Dataset
        </button>
      </div>
    </div>
  );
};

export default SelectDatasetModal;
