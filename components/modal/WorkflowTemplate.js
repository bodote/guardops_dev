import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const WorkflowTemplate = ({
  isModalOpen,
  setIsModalOpen,
  updateEvaluationList,
  projectID,
  values,
}) => {
  const [evaluationData, setEvaluationData] = useState({
    evaluation_name: values ? values.title : "",
    evaluation_description: values ? values.description : "",
  });
  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateFlow = async () => {
    if (
      evaluationData.evaluation_name == "" ||
      evaluationData.evaluation_description == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }
    const formData = {
      project_id: projectID,
      evaluation_name: evaluationData.evaluation_name,
      evaluation_description: evaluationData.evaluation_description,
      evaluation_id: values ? values.evaluation_id : "",
    };
    try {
      if (!values) {
        const response = await fetch("/api/manageEvaluation", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Evaluation created successfully !!");
          const responseData = await response.json();
          setEvaluationData({
            evaluation_name: "",
            evaluation_description: "",
          });

          router.push("/workflowdetails");
          setIsModalOpen(false);
        }
      }
      if (values) {
        const response = await fetch("/api/manageEvaluation", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Evaluation updated successfully !!");
          const responseData = await response.json();
          setEvaluationData({
            evaluation_name: "",
            evaluation_description: "",
          });
          setIsModalOpen(false);
          updateEvaluationList(projectID);
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
                        name="evaluation_name"
                        id="evaluation_name"
                        value={evaluationData.evaluation_name}
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
                        name="evaluation_description"
                        id="evaluation_description"
                        value={evaluationData.evaluation_description}
                        onChange={handleOnChange}
                        placeholder="Description for the Workflow"
                        className="border-[#EAEBF0] border-[1px] h-[80px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                      />
                    </div>
                    <div className="flex justify-center mt-[28px]">
                      <button
                        onClick={handleCreateFlow}
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
