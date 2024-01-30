import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const NewPrompt = ({
  open,
  setOpen,
  updatePlaygroundList,
  actionType,
  playground,
  setCurrentPlaygroundID,
  setCurrentPlayground,
}) => {
  const [playgroundData, setPlaygroundData] = useState({
    playground_name: playground ? playground.name : "",
    playground_description: playground ? playground.description : "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPlaygroundData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatePrompt = async () => {
    const playgroundFormData = {
      ...playgroundData,
    };
    if (
      playgroundFormData.playground_name == "" ||
      playgroundFormData.playground_description == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }
    const formData = {
      playground_name: playgroundFormData.playground_name,
      playground_description: playgroundFormData.playground_description,
      playground_id: playground ? playground.playground_id : "",
    };
    try {
      if (actionType === "new") {
        const response = await fetch("/api/managePlaygrounds", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Prompt created successfully !!");
          const responseData = await response.json();
          setPlaygroundData({
            playground_name: "",
            playground_description: "",
          });
          setOpen(false);
          updatePlaygroundList();
          setCurrentPlaygroundID();
          setCurrentPlayground();
        }
      } else if (actionType === "edit") {
        const response = await fetch("/api/managePlaygrounds", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Prompt updated successfully !!");
          const responseData = await response.json();
          setPlaygroundData({
            playground_name: "",
            playground_description: "",
          });
          setOpen(false);
          updatePlaygroundList();
          setCurrentPlaygroundID();
          setCurrentPlayground();
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
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="playground_name"
                        id="playground_name"
                        value={playgroundData.playground_name}
                        onChange={handleOnChange}
                        placeholder="Name for your prompt"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                      />
                    </div>
                    <div className="mt-[35px]">
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Description
                      </label>
                      <input
                        type="text"
                        name="playground_description"
                        id="playground_description"
                        value={playgroundData.playground_description}
                        onChange={handleOnChange}
                        placeholder="Description for your prompt"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                      />
                    </div>
                    <div className="flex justify-center mt-[68px]">
                      <button
                        onClick={handleCreatePrompt}
                        className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
                      >
                        <FiPlus />
                        {actionType === "new"
                          ? "Create Prompt"
                          : "Update Prompt"}
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

export default NewPrompt;
