import { DeleteBlackIcon, EditBlackIcon } from "@/public/Assets/Icons/Allsvg";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const Templates = ({
  data,
  onPromptOpen,
  setOpen,
  setActionType,
  setTemplatesForEdit,
  updateTemplatesList,
}) => {
  const handleAddToPromptClick = (content) => {
    onPromptOpen(content);
  };
  const handleUpdateTemplate = (data) => {
    setOpen(true);
    setActionType("edit");
    setTemplatesForEdit(data);
  };
  const handleDeleteTemplate = async (template) => {
    const formData = {
      template_id: template,
    };

    try {
      const response = await fetch("/api/manageTemplates", {
        method: "DELETE",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Template deleted successfully");
        updateTemplatesList();
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  return (
    <>
      <div className="sm:flex items-center justify-between mt-[42px] sm:p-[10px_13px_0_12px] pb-[14px] border-b-[#CCCCCC] border-b-[1px] gap-[9px]">
        <div>
          <h3 className="text-[14px] font-bold text-black font-Inter mb-2">
            {data.name}
          </h3>
          <p className="text-[14px] font-light tracking-[.5px] mt-[8px] text-black font-Inter max-w-[334px]">
            {data.description}
          </p>
          <a
            href={data.link}
            className="font-Inter mt-2 block font-medium text-[14px] cursor-pointer"
          >
            {data.link}
          </a>
        </div>
        <div className="flex gap-[16px] items-center">
          <button
            onClick={() => handleAddToPromptClick(data.template)}
            className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium w-[119px] sm:text-[12px] text-[12px] font-Inter py-[6px] px-[4px] rounded-md flex items-center gap-[8px]"
          >
            <FiPlus />
            Add to Prompt
          </button>
          <button onClick={() => handleUpdateTemplate(data)}>
            <EditBlackIcon className="stroke-[#000] hover:stroke-[#0D859A]" />
          </button>
          <button onClick={() => handleDeleteTemplate(data.template_id)}>
            <DeleteBlackIcon className="stroke-[#000] hover:stroke-[#0D859A]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Templates;
