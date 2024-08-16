import React, { useEffect, useState, useRef} from "react";
import { RightcircleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import Templates from "../Templates/Templates";
import AddTemplate from "./AddTemplate";

const PromptTemplates = ({ setIsModalOpen, onPromptOpen }) => {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templatesForEdit, setTemplatesForEdit] = useState();
  const [actionType, setActionType] = useState("");
  const componentRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setOpen(false);
        setIsModalOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen, setIsModalOpen]);
  
  const getTemplatesList = async () => {
    try {
      const response = await fetch(`/api/manageTemplates`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.prompt_templates) {
          setTemplates(responseData.prompt_templates);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const updateTemplatesList = async () => {
    await getTemplatesList();
  };

  useEffect(() => {
    getTemplatesList();
  }, []);

  return (
    <>
      <>
        <div className="border-b border-b-[#CCCCCC]">
          <button
            className="py-[9px] px-[11px] border-r border-r-[#CCCCCC]"
            onClick={() => setIsModalOpen(false)}
          >
            <RightcircleIcon />
          </button>
        </div>
        <div className="sm:px-[35px] px-[16px] py-[29px]">
          <h1 className="sm:text-[32px] text-[22px] font-normal font-Archivo text-[#000] ">
            Choose Template to fill
          </h1>
          <div>
            {templates.map((data, ind) => (
              <Templates
                data={data}
                key={ind}
                onPromptOpen={onPromptOpen}
                setOpen={setOpen}
                setActionType={setActionType}
                setTemplatesForEdit={setTemplatesForEdit}
                updateTemplatesList={updateTemplatesList}
              />
            ))}
          </div>

          <div className="flex justify-center sm:mt-[53px] mt-[30px]">
            <button
              className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]"
              onClick={() => {
                setOpen(true);
                setActionType("new");
              }}
            >
              <FiPlus />
              Add own Template
            </button>
            {open && (
              <AddTemplate
                open={open}
                setOpen={setOpen}
                updateTemplatesList={updateTemplatesList}
                actionType={actionType}
                value={actionType === "edit" ? templatesForEdit : null}
              />
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default PromptTemplates;
