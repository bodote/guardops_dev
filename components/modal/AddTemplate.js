import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const AddTemplate = ({
  open,
  setOpen,
  updateTemplatesList,
  actionType,
  value,
}) => {
  const [templateData, setTemplateData] = useState({
    template_name: value ? value.name : "",
    template_description: value ? value.description : "",
    template_link: value ? value.link : "",
    template: value ? value.template : "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTemplate = async () => {
    const templateFormData = {
      ...templateData,
      user_id: "demouser2",
    };

    if (
      templateFormData.template_name == "" ||
      templateFormData.template_description == "" ||
      templateFormData.template == ""
    ) {
      toast.error("Please Enter required fields !!");
      return false;
    }
    const formData = {
      user_id: templateFormData.user_id,
      template_name: templateFormData.template_name,
      template_description: templateFormData.template_description,
      template_link: templateFormData.template_link,
      template: templateFormData.template,
      template_id: value ? value.template_id : "",
    };

    try {
      if (actionType === "new") {
        const response = await fetch("/api/manageTemplates", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Template created successfully !!");
          const responseData = await response.json();
          setTemplateData({
            template_name: "",
            template_description: "",
            template_link: "",
            template: "",
          });
          setOpen(false);
          updateTemplatesList();
        }
      } else if (actionType === "edit") {
        const response = await fetch("/api/manageTemplates", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Template updated successfully !!");
          const responseData = await response.json();
          setTemplateData({
            template_name: "",
            template_description: "",
            template_link: "",
            template: "",
          });
          setOpen(false);
          updateTemplatesList();
        }
      } else {
        toast.error("API request failed");
        console.error("API request failed:", response.statusText);
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white sm:p-[37px_38px_28px_36px] p-[20px] text-left shadow-xl transition-all sm:max-w-[645px] w-full">
                  <div>
                    <div>
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="template_name"
                        id="template_name"
                        placeholder="Name for your template"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                        value={templateData.template_name}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mt-[35px]">
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Description
                      </label>
                      <input
                        type="text"
                        name="template_description"
                        id="template_description"
                        placeholder="Description for your template"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                        value={templateData.template_description}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mt-[35px]">
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Link
                      </label>
                      <input
                        type="text"
                        name="template_link"
                        id="template_link"
                        placeholder="Useful link for your template"
                        className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
                        value={templateData.template_link}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mt-[9px]">
                      <label className="text-[14px] font-medium block mb-[6px]">
                        Content
                      </label>
                      <textarea
                        name="template"
                        id="template"
                        placeholder="Your actual prompt template"
                        className="border-[#EAEBF0] border-[1px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full sm:h-[236px] h-[200px]"
                        value={templateData.template}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleAddTemplate}
                        className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
                      >
                        <FiPlus />
                        {actionType === "new"
                          ? "Create Template"
                          : "Update Template"}
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

export default AddTemplate;
