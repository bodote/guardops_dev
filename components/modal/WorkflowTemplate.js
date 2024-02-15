import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const WorkflowTemplate = ({
  isModalOpen,
  setIsModalOpen,
  updateFlowList,
  projectID,
  values,
}) => {
  const [flowData, setFlowData] = useState({
    flow_name: values ? values.name : "",
    flow_description: values ? values.description : "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFlowData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white sm:p-[37px_38px_48px_36px] p-[20px] text-left shadow-[0px_4px_4px_0px_#00000040] transition-all sm:max-w-[645px] w-full">
                  <div>
                    <div>
                      <Dialog.Title>
                        <label className="text-[14px] font-medium block mb-[6px]">
                          Workflow Name
                        </label>
                      </Dialog.Title>
                      <input
                        type="text"
                        name="flow_name"
                        id="flow_name"
                        value={flowData.flow_name}
                        onChange={handleOnChange}
                        placeholder="Name for your Workflow"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                      />
                    </div>
                    <div className="mt-[35px]">
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="flow_description"
                        id="flow_description"
                        value={flowData.flow_description}
                        onChange={handleOnChange}
                        placeholder="Description for the Workflow"
                        className="border-[#EAEBF0] border-[1px] h-[80px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                      />
                    </div>
                    <div className="flex justify-center mt-[28px]">
                      <button
                        // onClick={handleCreateFlow}
                        className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex justify-center items-center gap-[10px] max-w-[161px] w-full"
                      >
                        <FiPlus />
                        {values ? "Update WF" : "Create WF"}
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

export default WorkflowTemplate;
