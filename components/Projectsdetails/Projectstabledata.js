import { ThreeDotsIcon, UpDownIcon } from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState, useRef } from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { RiCheckboxLine, RiArrowUpDownLine, RiMoreLine, RiPlayCircleLine, RiTimeLine, RiCpuLine, RiShieldCheckLine, RiAlertLine } from "react-icons/ri";
import TraceDetails from "./TraceDetails";

const Projectstabledata = ({
  searchTrace,
  setSelectedTrace,
  selectedTrace,
  traceList,
  setTraceList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traceProject, setTraceProject] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [option, setOption] = useState(false);
  const [minWidth, maxWidth, defaultWidth] = [20, 95, 80];
  const [width, setWidth] = useState(defaultWidth);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
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

    const formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const FormatedTime = `${formattedDate} ${formattedTime}`;
    return FormatedTime;
  };

  const handleSelectTraces = (e, data, currentIndex) => {
    const isShiftHeld = e.shiftKey;
    // Since we're using onClick, we need to determine the new state
    const currentlySelected = isTraceSelected(data);
    const isChecked = !currentlySelected; // Toggle the current state

    console.log('handleSelectTraces called:', { isShiftHeld, isChecked, currentIndex, lastClickedIndex, currentlySelected });

    if (isShiftHeld && lastClickedIndex !== null) {
      // Shift-click: select range between last clicked and current
      const startIndex = Math.min(lastClickedIndex, currentIndex);
      const endIndex = Math.max(lastClickedIndex, currentIndex);

      console.log('Shift-click range:', { startIndex, endIndex });

      const rangeTraces = [];
      for (let i = startIndex; i <= endIndex; i++) {
        const rootSpan = filteredProjects[i]?.find(span => span.parent_id === null);
        if (rootSpan) {
          rangeTraces.push(rootSpan);
        }
      }

      console.log('Range traces found:', rangeTraces.length);

      if (isChecked) {
        // Add all traces in range to selection
        setSelectedTrace((prevSelected) => {
          const current = prevSelected || [];
          const newTraces = rangeTraces.filter(trace => !current.includes(trace));
          console.log('Adding traces:', newTraces.length);
          return [...current, ...newTraces];
        });
      } else {
        // Remove all traces in range from selection
        setSelectedTrace((prevSelected) => {
          const current = prevSelected || [];
          const filtered = current.filter(trace => !rangeTraces.includes(trace));
          console.log('Removing traces, before:', current.length, 'after:', filtered.length);
          return filtered;
        });
      }
    } else {
      // Normal click: toggle just this item
      console.log('Normal click');
      if (isChecked) {
        setSelectedTrace((prevSelected) => {
          const current = prevSelected || [];
          if (!current.includes(data)) {
            console.log('Adding single trace');
            return [...current, data];
          }
          return current;
        });
      } else {
        setSelectedTrace((prevSelected) => {
          const current = prevSelected || [];
          const filtered = current.filter(trace => trace !== data);
          console.log('Removing single trace, before:', current.length, 'after:', filtered.length);
          return filtered;
        });
      }
      // Remember this index for future shift-clicks
      setLastClickedIndex(currentIndex);
      console.log('Set lastClickedIndex to:', currentIndex);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all visible traces
      const allRootSpans = filteredProjects.map(project =>
        project.find(span => span.parent_id === null)
      ).filter(Boolean);

      setSelectedTrace(allRootSpans);
    } else {
      // Deselect all
      setSelectedTrace([]);
    }
    setLastClickedIndex(null);
  };

  const isTraceSelected = (trace) => {
    return selectedTrace?.some(selectedItem => selectedItem === trace) || false;
  };

  const isAllSelected = () => {
    if (filteredProjects.length === 0 || !selectedTrace) return false;

    const allRootSpans = filteredProjects.map(project =>
      project.find(span => span.parent_id === null)
    ).filter(Boolean);

    return allRootSpans.length > 0 && allRootSpans.every(span => isTraceSelected(span));
  };

  const isIndeterminate = () => {
    if (filteredProjects.length === 0 || !selectedTrace) return false;

    const allRootSpans = filteredProjects.map(project =>
      project.find(span => span.parent_id === null)
    ).filter(Boolean);

    const selectedCount = allRootSpans.filter(span => isTraceSelected(span)).length;
    return selectedCount > 0 && selectedCount < allRootSpans.length;
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

  const findBestContent = (trace) => {
    const spanWithOutput = trace.find(span =>
      span.attributes?.output && span.attributes.output.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.response && span.attributes.response.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.content && span.attributes.content.trim() !== ""
    ) || trace.find(span =>
      span.attributes?.llm_completions_0_content && span.attributes.llm_completions_0_content.trim() !== ""
    );

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

      let prompt = "";
      if (spanWithOutput.attributes?.prompt) {
        prompt = spanWithOutput.attributes.prompt;
      } else if (spanWithOutput.attributes?.llm_prompts_0_content) {
        prompt = spanWithOutput.attributes.llm_prompts_0_content;
      }

      return { prompt, output, span: spanWithOutput };
    }

    return { prompt: "", output: "", span: null };
  };

  const getStatusBadge = (statusCode) => {
    const status = statusCode?.toString();
    if (status === "1" || status === "OK") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <RiShieldCheckLine className="w-3 h-3 mr-1" />
          Success
        </span>
      );
    } else if (status === "2" || status?.startsWith("4") || status?.startsWith("5")) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <RiAlertLine className="w-3 h-3 mr-1" />
          Error
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <RiCpuLine className="w-3 h-3 mr-1" />
          {status || "Unknown"}
        </span>
      );
    }
  };

  const getLatencyBadge = (latency) => {
    const latencyMs = latency * 1000;
    let bgColor = "bg-green-100 text-green-800";
    if (latencyMs > 2000) {
      bgColor = "bg-red-100 text-red-800";
    } else if (latencyMs > 1000) {
      bgColor = "bg-yellow-100 text-yellow-800";
    }

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        <RiTimeLine className="w-3 h-3 mr-1" />
        {latency}s
      </span>
    );
  };

  const getTokensBadge = (tokens) => {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <RiCpuLine className="w-3 h-3 mr-1" />
        {tokens || 0}
      </span>
    );
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate();
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-[#0D859A] focus:ring-[#0D859A] border-gray-300 rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <RiPlayCircleLine className="w-4 h-4 text-gray-400" />
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1">
                  #
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <RiArrowUpDownLine className="w-3 h-3" />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1">
                  Kind
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <RiArrowUpDownLine className="w-3 h-3" />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                Input
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                Output
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1">
                  Start Time
                  <button onClick={sortData} className="p-1 hover:bg-gray-200 rounded">
                    <RiArrowUpDownLine className="w-3 h-3" />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Latency
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Tokens
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((data, index) => {
              const isAnyFlagged = data.some(
                (val) =>
                  (val.attributes?.prompt_moderation?.flagged ?? false) ||
                  (val.attributes?.output_moderation?.flagged ?? false)
              );

              const rootSpan = data.find(span => span.parent_id === null);
              const { prompt, output, span: bestSpan } = findBestContent(data);
              const displaySpan = bestSpan || rootSpan;
              const latency = handleLatency(rootSpan.start_time, rootSpan.end_time);

              return (
                rootSpan && (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${isAnyFlagged ? 'bg-red-50 border-l-4 border-l-red-500' : ''
                      }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        onClick={(e) => handleSelectTraces(e, rootSpan, index)}
                        checked={isTraceSelected(rootSpan)}
                        className="h-4 w-4 text-[#0D859A] focus:ring-[#0D859A] border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => openModal(data)}
                        className="text-gray-400 hover:text-[#0D859A] transition-colors duration-200"
                      >
                        <RiPlayCircleLine className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => openModal(data)}
                        className={`text-sm font-medium hover:underline transition-colors duration-200 ${isAnyFlagged ? 'text-red-700' : 'text-[#0D859A] hover:text-[#0A6B7A]'
                          }`}
                      >
                        {rootSpan.kind}
                      </button>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className={`text-sm ${isAnyFlagged ? 'text-red-700' : 'text-gray-900'}`}>
                        <p className="line-clamp-2 leading-5">
                          {truncateText(prompt, 100)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className={`text-sm ${isAnyFlagged ? 'text-red-700' : 'text-gray-900'}`}>
                        <p className="line-clamp-2 leading-5">
                          {truncateText(output, 100)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="text-xs text-gray-900">
                        {handleSpanStartTime(rootSpan.start_time)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {getLatencyBadge(latency)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {getTokensBadge(rootSpan.attributes?.total_tokens)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {getStatusBadge(rootSpan?.status.status_code)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => setOption(!option)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                      >
                        <RiMoreLine className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <RiCpuLine className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No traces found</h3>
          <p className="text-gray-600">
            {searchTrace ?
              `No traces match your search "${searchTrace}"` :
              "No traces available yet. Start using your AI models to see traces here."
            }
          </p>
        </div>
      )}

      {isModalOpen && (
        <div
          style={{ width: `${width}%` }}
          className="modal overflow-x-auto flex absolute bg-white right-0 top-0 border-l border-gray-200 overflow-y-auto z-20 lg:flex-row flex-col h-screen shadow-xl"
        >
          <div
            className="after:content-[''] after:absolute after:h-screen after:left-0 after:w-2 after:cursor-col-resize after:bg-gray-300 after:hover:bg-gray-400 after:transition-colors"
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
    </div>
  );
};

export default Projectstabledata;