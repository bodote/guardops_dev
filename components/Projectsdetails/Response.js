import { ArrowDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState } from "react";

const Response = ({ traceProject, selected, type }) => {
  const [responce, setResponce] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    if (traceProject?.response) {
      setApiResponse(traceProject?.response);
    } else if (traceProject?.response_lm3openai) {
      setApiResponse(traceProject?.response_lm3openai);
    } else if (traceProject?.response_openai) {
      setApiResponse(traceProject?.response_openai);
    } else {
      setApiResponse("");
    }
  }, [traceProject]);
  return (
    <>
      <div className="lg:m-[38px_45px_10px_49px] m-[20px_16px_20px_16px]">
        <div className="relative  w-full cursor-default rounded-[5px] border border-[#CCCCCC] ">
          <div
            onClick={() => setResponce(!responce)}
            className="flex gap-[13px] items-center p-[13px_23px_15px_23px] "
          >
            <ArrowDownIcon className="fill-[#334851]" />
            <h1 className="text-[18px] font-Archivo font-normal text-[#000000]">
              API Response
            </h1>
          </div>
          {responce && (
            <div className=" w-full p-[18px_28px_85px_19px] text-[18px] font-Archivo font-normal text-[#000000]  border-t border-t-[#CCCCCC]">
              <p class="break-all">
                {type === 'chat' ? selected?.response : apiResponse}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Response;
