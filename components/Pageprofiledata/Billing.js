import React from "react";
import { FiPlus } from "react-icons/fi";
const Billing = () => {
  return (
    <div className="sm:mt-[200px] mt-0 flex sm:justify-end justify-center">
      <button className="bg-[#D4DB33] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center gap-[10px]">
        <FiPlus />
        Datensatz
      </button>
    </div>
  );
};

export default Billing;
