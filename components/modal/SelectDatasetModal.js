import React, { Fragment, useEffect, useState } from "react";

import { IoChevronDownOutline } from "react-icons/io5";
import { Listbox, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const SelectDatasetModal = ({
  setIsDatasetModelOpen,
  traceProject,
  selectedTrace,
}) => {
  const [selected, setSelected] = useState({ name: "Select a dataset" });
  const [datasetList, setDatasetList] = useState([]);
  const user_id = "demouser2";

  const getDatasets = async () => {
    try {
      const response = await fetch(`/api/manageDataset?user_id=${user_id}`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.datasets) {
          setDatasetList(responseData.datasets);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const formData = {
    user_id,
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
      toast.success("Traces successfully added to dataset!!");
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

  return (
    <div className="p-[16px] absolute border-[1px] border-[#ccc] w-[380px] bg-white z-[1]">
      <h1 className="text-[14px] text-black text-center font-medium mb-3 mt-[10px]">
        Select Dataset to add to
      </h1>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative mt-2 max-w-[290px] w-full mx-auto">
              <Listbox.Button className="relative w-full cursor-default rounded-[7px] bg-white pl-3 pr-10 text-left text-gray-900 border-[1px] border-[#ccc] sm:text-sm sm:leading-6 ">
                <span className="flex items-center">
                  <span className="ml-2 block truncate text-[12px]">
                    {selected.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <IoChevronDownOutline
                    className="text-[14px] text-black"
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-[8px] bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-[1px] border-[#ccc] shadow-none">
                  {datasetList.map((dataset) => (
                    <Listbox.Option
                      key={dataset.dataset_id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-[#eee]" : "text-gray-900",
                          "relative cursor-default select-none py-[4px] pl-3 pr-9 text-[12px]"
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
                                "ml-3 block truncate"
                              )}
                            >
                              {dataset.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
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
      <div className="max-w-[290px] w-full flex justify-between items-center mx-auto mt-[30px]">
        <button
          onClick={() => setIsDatasetModelOpen(false)}
          className=" bg-[#E33B32] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
        >
          cancel
        </button>
        <button
          onClick={handleConfirm}
          className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SelectDatasetModal;
