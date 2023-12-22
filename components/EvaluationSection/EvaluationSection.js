import React from "react";
import {
  PlusIcon,
} from "@/public/Assets/Icons/Allsvg";

const EvaluationSection = () => {
  return (
    <div className=" lg:my-[142px] sm:my-[70px] my-0 sm:px-[55px] px-[16px]">
      <h1 className="font-Archivo sm:text-[32px] text-[28px] font-thin text-[#000] sm:py-[26px] py-[20px]">
        Evaluations
      </h1>
      <div className=" hover:border-[#000] hover:bg-[#0D859A] group xl:w-[calc(34%_-_45px)] sm:w-[calc(50%_-_15px)] w-full border rounded-2xl border-[#ccc] bg-[#D4DB33] px-[17px] pt-[12px] sm:pb-[31px] pb-[8px]">
        <div className="flex items-center gap-[8px]">
          <PlusIcon className="stroke-[#12131A] group-hover:stroke-white" />
          <h2 className="group-hover:text-white font-Archivo lg:text-[24px] sm:text-[20px] text-[18px] font-thin text-[#000]">
            New Evaluation
          </h2>
        </div>
        <p className="group-hover:text-white font-Archivo lg:text-[13px] text-[11px] font-light text-[#000] mt-[10px]">
          Create a Run for Evaluation your model using a Dataset
        </p>
      </div>
    </div>
  );
};

export default EvaluationSection;
