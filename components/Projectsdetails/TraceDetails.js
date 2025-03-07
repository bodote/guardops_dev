import {
  DocumentIcon,
  LineverticalbigIcon,
  RightcircleIcon,
  ArrowDownIcon
} from "@/public/Assets/Icons/Allsvg";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import SelectDatasetModal from "../modal/SelectDatasetModal";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { JsonViewer } from "@textea/json-viewer";

const TraceDetails = ({
  traceProject,
  setIsModalOpen,
  minWidth,
  maxWidth,
  setWidth,
  isResized,
}) => {
  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentRootTrace, setCurrentRootTrace] = useState(null);
  const [isDatasetModelOpen, setIsDatasetModelOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    input: true,
    output: true,
    model: false,
    fullResponse: false,
    promptModeration: false,
    responseModeration: false
  });
  const [activeTab, setActiveTab] = useState("main"); // main, technical, moderation
  const [type, setType] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const dataToPass = {
    project_name: params.get("name"),
    message: encodeURIComponent(selectedProject?.attributes?.prompt),
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChatRowClick = (e, val) => {
    e.preventDefault();
    setType("chat");
    setSelectedProject(val);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((prevWidth) => {
        const newWidth = prevWidth - e.movementX / 20;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          return newWidth;
        } else {
          return prevWidth;
        }
      });
    };

    const handleMouseUp = () => {
      isResized.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minWidth, maxWidth, setWidth]);

  useEffect(() => {
    traceProject.map((trace) => {
      if (trace.parent_id == null) {
        setCurrentRootTrace(trace);
        setSelectedProject(trace);
      }
    });
  }, [traceProject]);

  const buildNestedStructure = (elements) => {
    const elementMap = new Map();

    // Initialize the map
    elements.forEach((ele) => {
      elementMap.set(ele.context.span_id, { ...ele, children: [] });
    });

    // Populate the children
    elements.forEach((ele) => {
      if (ele.parent_id) {
        const parent = elementMap.get(ele.parent_id);
        if (parent) {
          parent.children.push(elementMap.get(ele.context.span_id));
        }
      }
    });

    // Filter out the root elements
    return elements.filter((ele) => !ele.parent_id).map((ele) => elementMap.get(ele.context.span_id));
  };

  const nestedTraceProject = buildNestedStructure(traceProject);

  // Get API response
  const getApiResponse = () => {
    if (type === "chat" && selectedProject?.attributes?.response) {
      return selectedProject.attributes.response.replace(/\{"tokens":\d+\}/g, "");
    }

    if (currentRootTrace?.attributes?.response) {
      return currentRootTrace.attributes.response.replace(/\{"tokens":\d+\}/g, "");
    } else if (currentRootTrace?.attributes?.response_lm3openai) {
      return currentRootTrace.attributes.response_lm3openai.replace(/\{"tokens":\d+\}/g, "");
    } else if (currentRootTrace?.attributes?.response_openai) {
      return currentRootTrace.attributes.response_openai.replace(/\{"tokens":\d+\}/g, "");
    }

    return "";
  };

  // Get prompt content
  const getPromptContent = () => {
    return selectedProject?.attributes?.prompt ||
      selectedProject?.attributes?.llm_prompts_0_content ||
      "No prompt found";
  };

  // Get output content
  const getOutputContent = () => {
    if (selectedProject?.attributes?.output) {
      return selectedProject.attributes.output.replace(/\{"tokens":\d+\}/g, "");
    } else if (selectedProject?.attributes?.response) {
      return selectedProject.attributes.response;
    } else if (selectedProject?.attributes?.content) {
      return selectedProject.attributes.content;
    } else if (selectedProject?.attributes?.llm_completions_0_content) {
      return selectedProject.attributes.llm_completions_0_content;
    }
    return "No output found";
  };

  // Check if moderation is flagged
  const isPromptFlagged = selectedProject?.attributes?.prompt_moderation?.flagged;
  const isOutputFlagged = selectedProject?.attributes?.output_moderation?.flagged;
  const isModerationFlagged = isPromptFlagged || isOutputFlagged;


  // Updated EnhancedTraceElement component
  const EnhancedTraceElement = ({ element, handleClick, selectedId, level = 0 }) => {
    const [expanded, setExpanded] = useState(true);

    // Format duration
    const formatDuration = (start, end) => {
      if (!start || !end) return '';
      const duration = new Date(end) - new Date(start);
      if (duration < 1000) {
        return `${duration}ms`;
      }
      return `${(duration / 1000).toFixed(2)}s`;
    };

    // Get span type badge style based on kind
    const getSpanTypeBadge = (kind) => {
      const kindLower = kind.toLowerCase();
      if (kindLower.includes('llm') || kindLower.includes('openai') || kindLower.includes('completion')) {
        return 'bg-blue-50 text-blue-700 border-blue-100';
      } else if (kindLower.includes('chain')) {
        return 'bg-green-50 text-green-700 border-green-100';
      } else if (kindLower.includes('tool') || kindLower.includes('function')) {
        return 'bg-purple-50 text-purple-700 border-purple-100';
      }
      return 'bg-gray-50 text-gray-700 border-gray-100';
    };

    const isSelected = element.context.span_id === selectedId;
    const hasChildren = element.children && element.children.length > 0;
    const duration = formatDuration(element.start_time, element.end_time);
    const spanTypeBadge = getSpanTypeBadge(element.kind);

    // Extract the specific type from the kind (e.g., "openai.chat" from "langchain.llm.openai.chat")
    const getSpecificType = (kind) => {
      const parts = kind.split('.');
      return parts.length > 1 ? parts.slice(-2).join('.') : kind;
    };

    const specificType = getSpecificType(element.kind);

    return (
      <div className="mb-1">
        <div
          className={`relative pl-8 pr-3 py-3 rounded-lg transition-colors ${isSelected
            ? 'bg-indigo-50 border border-indigo-200 shadow-sm'
            : 'hover:bg-gray-100 border border-transparent'
            }`}
          onClick={(e) => handleClick(e, element)}
        >
          {/* Expand/collapse button for spans with children */}
          {hasChildren && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Span content */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">
                {/* Display the main kind name */}
                {element.name}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {duration}
              </div>
            </div>

            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-2">
                {/* Display the specific type as a badge */}
                <span className={`text-xs px-2 py-0.5 rounded-full border ${spanTypeBadge}`}>
                  {specificType}
                </span>
                <span className="text-xs text-gray-500">
                  ID: {element.context.span_id.substring(0, 6)}
                </span>
              </div>
              <div className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {element.status?.status_code || 'unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* Render children if expanded */}
        {expanded && hasChildren && (
          <div className="ml-8 pl-4 border-l border-gray-200">
            {element.children.map(child => (
              <EnhancedTraceElement
                key={child.context.span_id}
                element={child}
                handleClick={handleClick}
                selectedId={selectedId}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };


  return (
    <>
      {/* Left sidebar with trace tree */}
      <div className="trace-scroll bg-gray-50 border-r border-gray-200 w-1/4 min-w-[300px]">
        <div className="w-full overflow-y-auto lg:h-screen scroll-auto">
          <div className="border-b border-gray-200 bg-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-[9px] px-[11px] border-r border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <RightcircleIcon />
            </button>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-800">
                Trace Tree
              </h1>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                {traceProject.length} spans
              </span>
            </div>

            {/* Search or filter option */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter spans..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced trace tree */}
            <div className="relative trace-detail">
              <div className="relative after:content-[''] after:bg-gray-300 after:min-h-[calc(100%+58px)] after:left-[16px] after:top-[-27px] after:absolute after:w-[2px]">
                {nestedTraceProject.map((element) => (
                  <EnhancedTraceElement
                    key={element.context.span_id}
                    element={element}
                    handleClick={handleChatRowClick}
                    selectedId={selectedProject?.context?.span_id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-3/4 flex flex-col bg-white">
        {/* Header with actions */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="h-14 flex items-center justify-between px-6 border-l border-gray-200">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800 mr-4">
                {selectedProject?.kind || "Trace Details"}
              </h2>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                  ID: {selectedProject?.context?.span_id?.substring(0, 8)}
                </span>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                  Status: {selectedProject?.status?.status_code}
                </span>
                {isModerationFlagged && (
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-100 animate-pulse">
                    ⚠️ Flagged Content
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm py-2 px-4 rounded-md border border-indigo-200 transition-colors"
                onClick={() => {
                  setIsDatasetModelOpen(!isDatasetModelOpen);
                }}
              >
                Add to dataset
              </button>
              <button
                onClick={() =>
                  router.push(`/playground?data=${JSON.stringify(dataToPass)}`)
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-md transition-colors"
              >
                Open in playground
              </button>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => setActiveTab("main")}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === "main"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              Main View
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === "technical"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              Technical Details
            </button>
            <button
              onClick={() => setActiveTab("moderation")}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === "moderation"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                } ${isModerationFlagged ? "text-red-600" : ""}`}
            >
              {isModerationFlagged ? "⚠️ " : ""}Moderation
            </button>
          </div>
        </div>

        {isDatasetModelOpen && (
          <SelectDatasetModal
            setIsDatasetModelOpen={setIsDatasetModelOpen}
            traceProject={traceProject}
          />
        )}

        {/* Main content based on active tab */}
        <div className="flex-1 overflow-y-auto border-l border-gray-200 p-6">
          {activeTab === "main" && (
            <div className="space-y-6">
              {/* Conversation view */}
              <div className="flex flex-col space-y-4">
                {/* Input message */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-4 max-w-3xl">
                      <pre className="whitespace-pre-wrap text-gray-800 font-sans text-sm">
                        {getPromptContent()}
                      </pre>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">
                      {new Date(selectedProject?.start_time).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Output message */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 max-w-3xl">
                      <div className="prose prose-sm max-w-none text-gray-800">
                        <ReactMarkdown
                          components={{
                            ul: ({ node, ...props }) => (
                              <ul className="list-disc pl-5 my-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="list-decimal pl-5 my-2" {...props} />
                            ),
                            h1: ({ node, ...props }) => (
                              <h1 className="text-xl font-bold my-3" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-lg font-bold my-2" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-md font-bold my-2" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="my-2" {...props} />
                            ),
                            code: ({ node, inline, ...props }) => (
                              inline
                                ? <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                                : <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto my-3" {...props} />
                            ),
                          }}
                          remarkPlugins={[gfm]}
                        >
                          {getOutputContent()}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">
                      {new Date(selectedProject?.end_time).toLocaleString()} •
                      {selectedProject?.attributes?.total_tokens && (
                        <span className="ml-2">{selectedProject.attributes.total_tokens} tokens</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Model information */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">Model Information</h3>
                  <button
                    onClick={() => toggleSection('model')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowDownIcon
                      className={`fill-current ${expandedSections.model ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                </div>
                {expandedSections.model && (
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Model Name</h4>
                        <p className="text-sm text-gray-800">{selectedProject?.attributes?.model || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Total Tokens</h4>
                        <p className="text-sm text-gray-800">{selectedProject?.attributes?.total_tokens || "Not available"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Latency</h4>
                        <p className="text-sm text-gray-800">
                          {selectedProject?.start_time && selectedProject?.end_time ?
                            `${((new Date(selectedProject.end_time) - new Date(selectedProject.start_time)) / 1000).toFixed(2)}s` :
                            "Not available"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                        <p className="text-sm text-gray-800">{selectedProject?.status?.status_code || "Unknown"}</p>
                      </div>
                    </div>
                    {selectedProject?.attributes?.model_params && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Model Parameters</h4>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <pre className="text-xs text-gray-800 overflow-auto max-h-40">
                            {JSON.stringify(selectedProject.attributes.model_params, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="space-y-6">
              {/* Full API Response */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">Full API Response</h3>
                  <button
                    onClick={() => toggleSection('fullResponse')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowDownIcon
                      className={`fill-current ${expandedSections.fullResponse ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                </div>
                {expandedSections.fullResponse && (
                  <div className="p-4">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 overflow-auto max-h-96">
                        {getApiResponse() || "No API response available"}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Span Details */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Span Details</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Span ID</h4>
                      <p className="text-sm text-gray-800 font-mono">{selectedProject?.context?.span_id || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Parent ID</h4>
                      <p className="text-sm text-gray-800 font-mono">{selectedProject?.parent_id || "None (Root Span)"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Kind</h4>
                      <p className="text-sm text-gray-800">{selectedProject?.kind || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                      <p className="text-sm text-gray-800">{selectedProject?.status?.status_code || "Unknown"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Start Time</h4>
                      <p className="text-sm text-gray-800">
                        {selectedProject?.start_time ? new Date(selectedProject.start_time).toLocaleString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">End Time</h4>
                      <p className="text-sm text-gray-800">
                        {selectedProject?.end_time ? new Date(selectedProject.end_time).toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Context attributes */}
                  {selectedProject?.context && Object.keys(selectedProject.context).length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Context</h4>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <pre className="text-xs text-gray-800 overflow-auto max-h-40">
                          {JSON.stringify(selectedProject.context, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "moderation" && (
            <div className="space-y-6">
              {/* Prompt Moderation */}
              <div className={`bg-white rounded-lg border ${isPromptFlagged ? 'border-red-300' : 'border-gray-200'} overflow-hidden`}>
                <div className={`${isPromptFlagged ? 'bg-red-50' : 'bg-gray-50'} px-4 py-3 border-b ${isPromptFlagged ? 'border-red-300' : 'border-gray-200'} flex justify-between items-center`}>
                  <div className="flex items-center">
                    <h3 className={`font-medium ${isPromptFlagged ? 'text-red-700' : 'text-gray-700'}`}>
                      Prompt Moderation
                    </h3>
                    {isPromptFlagged && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Flagged
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSection('promptModeration')}
                    className={`${isPromptFlagged ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <ArrowDownIcon
                      className={`fill-current ${expandedSections.promptModeration ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                </div>
                {expandedSections.promptModeration && (
                  <div className="p-4">
                    {selectedProject?.attributes?.prompt_moderation ? (
                      <div className="max-h-96 overflow-auto">
                        <JsonViewer
                          className="text-sm"
                          value={selectedProject.attributes.prompt_moderation}
                          theme={isPromptFlagged ? "light_red" : "light"}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No moderation data available</p>
                    )}
                  </div>
                )}
              </div>

              {/* Response Moderation */}
              <div className={`bg-white rounded-lg border ${isOutputFlagged ? 'border-red-300' : 'border-gray-200'} overflow-hidden`}>
                <div className={`${isOutputFlagged ? 'bg-red-50' : 'bg-gray-50'} px-4 py-3 border-b ${isOutputFlagged ? 'border-red-300' : 'border-gray-200'} flex justify-between items-center`}>
                  <div className="flex items-center">
                    <h3 className={`font-medium ${isOutputFlagged ? 'text-red-700' : 'text-gray-700'}`}>
                      Response Moderation
                    </h3>
                    {isOutputFlagged && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Flagged
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSection('responseModeration')}
                    className={`${isOutputFlagged ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <ArrowDownIcon
                      className={`fill-current ${expandedSections.responseModeration ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                </div>
                {expandedSections.responseModeration && (
                  <div className="p-4">
                    {selectedProject?.attributes?.output_moderation ? (
                      <div className="max-h-96 overflow-auto">
                        <JsonViewer
                          className="text-sm"
                          value={selectedProject.attributes.output_moderation}
                          theme={isOutputFlagged ? "light_red" : "light"}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No moderation data available</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default TraceDetails;