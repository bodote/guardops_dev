import { ThreeDotsIcon, UpDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState, useRef } from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import TraceDetails from "./TraceDetails";

const Projectstabledata = ({
  searchTrace,
  setSelectedTrace,
  traceList,
  setTraceList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traceProject, setTraceProject] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [option, setOption] = useState(false);
  const [minWidth, maxWidth, defaultWidth] = [20, 95, 80];
  const [width, setWidth] = useState(defaultWidth);
  const isResized = useRef(false);
  const modalRef = useRef();

  const openModal = (value) => {
    setIsModalOpen(true);
    setTraceProject(value);
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

  const handleSelectTraces = (e, data) => {
    if (e.target.checked) {
      // If checked, add the data to the selectedRows state
      setSelectedTrace((prevSelectedTrace) => [...prevSelectedTrace, data]);
    } else {
      // If unchecked, remove the data from the selectedRows state
      setSelectedTrace((prevSelectedTrace) =>
        prevSelectedTrace.filter((row) => row !== data)
      );
    }
  };

  const sortData = () => {
    const sortedProjectList = [...traceList];

    sortedProjectList.sort((a, b) => {
      const nullParentA = a.find((obj) => obj.parent_id === null);
      const nullParentB = b.find((obj) => obj.parent_id === null);

      if (nullParentA && nullParentB) {
        const comparisonResult =
          new Date(nullParentA.start_time) - new Date(nullParentB.start_time);

        return sortOrder === "asc" ? comparisonResult : -comparisonResult;
      } else if (nullParentA) {
        return -1;
      } else if (nullParentB) {
        return 1;
      } else {
        return 0;
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    setTraceList(sortedProjectList);
  };

  const filteredProjects = traceList.filter((project) =>
    project.some(
      (item) =>
        item?.parent_id === null &&
        (item?.kind.toLowerCase().includes(searchTrace.toLowerCase()) ||
          item?.attributes.prompt
            .toLowerCase()
            .includes(searchTrace.toLowerCase()) ||
          (item?.attributes.content
            ? item?.attributes.content
            : item?.attributes.response
          )
            .toLowerCase()
            .includes(searchTrace.toLowerCase()))
    )
  );

  // Function to find the best content from a trace, prioritizing output
  const findBestContent = (trace) => {
    // First, find a span with output
    const spanWithOutput = trace.find(span =>
      span.attributes?.output && span.attributes.output.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.response && span.attributes.response.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.content && span.attributes.content.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.llm_completions_0_content && span.attributes.llm_completions_0_content.trim() !== ""
    );

    // If we found a span with output, use it
    if (spanWithOutput) {
      let output = "";
      if (spanWithOutput.attributes?.output) {
        output = spanWithOutput.attributes.output.replace(/\{"tokens":\d+\}/g, "");
      } else if (spanWithOutput.attributes?.response) {
        output = spanWithOutput.attributes.response;
      } else if (spanWithOutput.attributes?.content) {
        output = spanWithOutput.attributes.content;
      } else if (spanWithOutput.attributes?.llm_completions_0_content) {
        output = spanWithOutput.attributes.llm_completions_0_content;
      }

      // Get the prompt from the same span if available
      let prompt = "";
      if (spanWithOutput.attributes?.prompt) {
        prompt = spanWithOutput.attributes.prompt;
      } else if (spanWithOutput.attributes?.llm_prompts_0_content) {
        prompt = spanWithOutput.attributes.llm_prompts_0_content;
      }

      return { prompt, output, span: spanWithOutput };
    }

    // If no span has output, just return empty strings
    return { prompt: "", output: "", span: null };
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="xl:w-full w-[1240px]">
          <thead>
            <tr className="border-b border-[#334851] border-opacity-[0.1]">
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26]">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                />
              </th>
              <th></th>
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26] ">
                <div className="flex items-center justify-center">
                  #
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  Kind
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>

              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                input
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                Output
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  start Time
                  <div onClick={sortData} className="cursor-pointer">
                    <UpDownIcon />
                  </div>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                Latency
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                total tokens
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] min-w-[100px]">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((data, index) => {
              // Check if any of the vals in the data array are flagged
              const isAnyFlagged = data.some(
                (val) =>
                  (val.attributes?.prompt_moderation?.flagged ?? false) ||
                  (val.attributes?.output_moderation?.flagged ?? false)
              );

              const textColorClass = isAnyFlagged ? "text-red-700" : "text-[#0D859A]";

              // Find the root span
              const rootSpan = data.find(span => span.parent_id === null);

              // Find the best content from any span in the trace, prioritizing output
              const { prompt, output, span: bestSpan } = findBestContent(data);

              // Use the best span for display if available, otherwise fall back to root span
              const displaySpan = bestSpan || rootSpan;

              return (
                rootSpan && (
                  <tr
                    key={index}
                    className="hover:bg-[#fffbeb] align-middle border-b border-[#334851] border-opacity-[0.1]"
                  >
                    <td className="py-[14px] px-[10px] text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectTraces(e, rootSpan)}
                        className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded focus:ring-0 focus:outline-none focus:!border-[#334851]"
                      />
                    </td>
                    <td className="text-[#bbbbbb]">
                      <IoChevronForwardCircleOutline />
                    </td>
                    <td className="py-[14px] px-[10px] text-[14px] text-[#171C26] font-medium font-Inter text-center">
                      {index}
                    </td>
                    <td
                      onClick={() => openModal(data)}
                      className={`py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center ${textColorClass}`}
                    >
                      <p className="hover:underline cursor-pointer">
                        {rootSpan.kind}
                      </p>
                    </td>
                    <td className={`py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center min-w-[300px] ${textColorClass}`}>
                      <p className="line-clamp">{prompt}</p>
                    </td>
                    <td className={`py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center ${textColorClass}`}>
                      <p className="line-clamp">
                        {output}
                      </p>
                    </td>
                    <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center min-w-[300px]">
                      {handleSpanStartTime(rootSpan.start_time)}
                      <br />
                    </td>
                    <td className="py-[14px] px-[10px] text-[14px] font-normal font-Inter text-[#464F60] text-center">
                      <p className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                        {handleLatency(rootSpan.start_time, rootSpan.end_time)}s
                      </p>
                    </td>
                    <td className="py-[14px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-center">
                      <p className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                        {rootSpan.attributes?.total_tokens}
                      </p>
                    </td>
                    <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center">
                      {rootSpan?.status.status_code}
                    </td>
                    <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter">
                      <div className="flex gap-[5px] items-center relative">
                        <div onClick={() => setOption(!option)}>
                          <ThreeDotsIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}

            {isModalOpen && (
              <div
                style={{ width: `${width}%` }}
                className="modal overflow-x-auto flex absolute bg-white right-0 top-0 border-l border-[#CCCCCC] overflow-y-auto z-20 lg:flex-row flex-col h-screen trace-modal-main"
              >
                <div
                  className="after:content-[''] after:absolute after:h-screen after:left-0 after:w-2 after:cursor-col-resize"
                  onMouseDown={() => {
                    isResized.current = true;
                  }}
                ></div>
                <TraceDetails
                  traceProject={traceProject}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  width={width}
                  setWidth={setWidth}
                  minWidth={minWidth}
                  maxWidth={maxWidth}
                  isResized={isResized}
                />
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projectstabledata;