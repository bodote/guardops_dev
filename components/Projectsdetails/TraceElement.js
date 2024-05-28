import React, { useState } from 'react';
import { DocumentIcon } from '@/public/Assets/Icons/Allsvg';

const TraceElement = ({ element, handleClick }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLatency = (startTime, endTime) => {
    const TempStartTime = new Date(startTime);
    const TempendTime = new Date(endTime);
    const latency = (TempendTime - TempStartTime) / 1000;
    return latency;
  };

  const handleSpanStartTime = (startTime) => {
    const startDate = new Date(startTime);
    const formattedDate = startDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format time
    const formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const FormatedTime = `${formattedDate} ${formattedTime}`;
    return FormatedTime;
  };

  const handleTreeRowClick = (e, val, parent = false) => {
    setType("playground");
    if (parent) {
      setOpen(!open);
    }
    e.preventDefault();
    setSelectedProject(val);
  };

  return (
    <div className="relative mb-[10px]">
      <div
        className={`flex items-center relative bg-[#fff] z-[9] max-w-[466px] ${element.parent_id ? 'ml-[20px]' : ''}`}
        onClick={toggleExpand}
      >
        <div className="border border-[#CCCCCC] rounded-2xl w-full h-[24px] overflow-clip flex items-center hover:bg-[#fffbeb] cursor-pointer">
          <div className="p-[5px_8px_5px_12px]">
            <DocumentIcon />
          </div>
          <div className="md:p-[6px_0px_6px_10px] p-[12px] border-x">
            <h1  data-tooltip-content={element.kind} className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[80px]">
              {element.kind}
            </h1>
          </div>
          <div className="md:p-[6px_0px_6px_10px] pl-[4px] border-r">
            <h1  data-tooltip-content={element.name} className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[80px]">
              {element.name}
            </h1>
          </div>
          <div className="md:p-[6px_0px_6px_10px] p-[12px] border-r">
            <h1  data-tooltip-content={handleSpanStartTime(element.start_time)} className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[80px]">
              {handleSpanStartTime(element.start_time)}
            </h1>
          </div>
          <div className="md:p-6px_0px_6px_10px] p-[12px]">
            <h1 className="text-[10px] font-Archivo font-normal text-[#000000] truncate w-[60px]">
              {handleLatency(element.start_time, element.end_time)} s
            </h1>
          </div>
        </div>
        {element.parent_id && (
          <div className="absolute left-[-20px] top-[12px] w-[20px] h-[1px] bg-[#d1d1d1]"></div>
        )}
      </div>
      {isExpanded && element.children && element.children.length > 0 && (
        <div className="pl-[10px] mt-[10px] relative">
          <div className="absolute left-[-10px] top-[0px] w-[1px] h-full bg-[#d1d1d1]"></div>
          {element.children.map((child) => (
            <TraceElement key={child.context.span_id} element={child} handleClick={handleClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TraceElement;