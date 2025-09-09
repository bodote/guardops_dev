import React, { DragEvent, useState, Fragment, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react";
import {
  User2Icon,
  FireIcon,
} from "@/public/Assets/Icons/Allsvg";
import 'highlight.js/styles/atom-one-dark.css';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { FaRobot, FaBrain, FaServer, FaDatabase, FaCloud, FaLock, FaUnlock, FaUndo, FaSave, FaEdit, FaMinus, FaPlus, FaShare, FaCog } from "react-icons/fa";
import styles from "@/styles/TextHighlighter.module.css";
import { Tooltip } from "react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import debounce from "lodash/debounce";
import gfm from "remark-gfm";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { AiOutlineStop } from "react-icons/ai";
import ModelSettings from "./modelSettings";
import { toast } from "react-toastify";
const hljs = require('highlight.js/lib/common');
import { useChat } from '@ai-sdk/react';
import FileSource from "./FileSource";

// Modal component for API key display/input
const ApiKeyModal = ({ isOpen, onClose, provider, providerNames }) => {
  if (!isOpen) return null;

  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);

  // Handle clicking outside the modal content
  const handleOverlayClick = (e) => {
    // Ensure this is the direct overlay click, not a bubbled event
    if (e.target === e.currentTarget && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Get the key name based on the provider
  const getKeyName = (provider) => {
    if (!provider) return null;

    // For custom providers with UUID
    if (provider.includes('-')) {
      return provider;
    }

    // For standard providers
    const keyMapping = {
      "openai": "openAIKey",
      "anthropic": "anthropicKey",
      "fireworks.ai": "fireworksAIKey",
      "google": "googleKey",
      "cohere": "cohereKey",
      "mistral": "mistralKey",
      "together.ai": "togetherKey",
      "perplexity.ai": "perplexityKey",
      "custom": "customAIKey"
    };

    return keyMapping[provider.toLowerCase()] || null;
  };

  // Get display name for the provider
  const getDisplayName = (provider) => {
    if (provider?.includes('-')) {
      return providerNames[provider] || "Custom Provider";
    }
    return provider;
  };

  const keyName = getKeyName(provider);
  const storedKey = keyName ? localStorage.getItem(keyName) || "" : "";
  const [inputValue, setInputValue] = useState(storedKey);
  const displayName = getDisplayName(provider);

  const saveKey = () => {
    if (keyName) {
      localStorage.setItem(keyName, inputValue);
      // Dispatch a storage event so other components know localStorage changed
      window.dispatchEvent(new Event('storage'));
      toast.success("API key saved successfully");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{displayName} API Key</h2>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your {displayName} API key
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4DB33] focus:border-transparent transition-all duration-200"
              placeholder="Enter API key..."
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={saveKey}
            className="px-4 py-2 bg-[#D4DB33] border border-transparent rounded-lg text-sm font-medium text-black hover:bg-[#c4cb2d] transition-colors duration-200"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getTextFromDataUrl = (dataUrl) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

async function convertFilesToDataURLs(files) {
  return Promise.all(
    Array.from(files).map(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: 'file',
              mediaType: file.type,
              url: reader.result,
              name: file.name,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
}

// Smooth streaming markdown component with fade-in animations
const SmoothStreamingMarkdown = ({
  content,
  isStreaming,
  messageId,
  segmentIndex,
  components,
  remarkPlugins,
  ...props
}) => {
  const contentKey = `${messageId}-${segmentIndex}`;

  return (
    <motion.div
      key={contentKey}
      initial={isStreaming ? { opacity: 0.2, y: 3 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      {...props}
    >
      <ReactMarkdown
        components={{
          p: ({ children, ...props }) => (
            <motion.p
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-slate-700 leading-relaxed my-2"
              style={{ whiteSpace: 'pre-wrap' }}
              {...props}
            >
              {children}
            </motion.p>
          ),
          ul: ({ children, ...props }) => (
            <motion.ul
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="list-disc list-inside space-y-1 my-3"
              {...props}
            >
              {children}
            </motion.ul>
          ),
          ol: ({ children, ...props }) => (
            <motion.ol
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="list-decimal list-inside space-y-1 my-3"
              {...props}
            >
              {children}
            </motion.ol>
          ),
          h1: ({ children, ...props }) => (
            <motion.h1
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-bold text-2xl text-slate-900 my-4"
              {...props}
            >
              {children}
            </motion.h1>
          ),
          h2: ({ children, ...props }) => (
            <motion.h2
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-bold text-xl text-slate-900 my-3"
              {...props}
            >
              {children}
            </motion.h2>
          ),
          h3: ({ children, ...props }) => (
            <motion.h3
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-bold text-lg text-slate-900 my-2"
              {...props}
            >
              {children}
            </motion.h3>
          ),
          code: ({ children, ...props }) => (
            <motion.code
              initial={isStreaming ? { opacity: 0.2 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm"
              {...props}
            >
              {children}
            </motion.code>
          ),
          ...components,
        }}
        remarkPlugins={remarkPlugins}
        children={content}
      />
    </motion.div>
  );
};

function TextFilePreview({ file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setContent(typeof text === "string" ? text.slice(0, 100) : "");
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div>
      {content}
      {content.length >= 100 && "..."}
    </div>
  );
}

const Chat_version = forwardRef(({
  columnCount,
  onSave,
  chatVersionId,
  removeChatVersion,
  addChatVersion,
  syncAll,
  setAllChatPrompt,
  setsyncAll,
  setAllSystemPrompt,
  allSystemPrompt,
  ragCheck,
  selectedRag,
  syncAllMsg,
  setSyncAllMsg,
  allChatPrompt,
  selectedModel,
  setSelectedModel,
  chatHistory,
  allFiles,
  setAllFiles,
  piiCheck,
  arenaCheck,
  selectedProject,
  currentChatID,
  chromaCollectionName,
  setSavePressed


}, ref) => {
  hljs.highlightAll();

  useImperativeHandle(ref, () => ({
    getMessages: () => {

      if (isLoading) {
        return
      }
      const newMessages = [];
      const start_time = new Date(messages?.[0]?.createdAt ?? new Date().getTime());

      for (let i = 0; i < messages.length; i += 2) {
        const inputMessage = messages[i]; // The user input
        const outputMessage = messages[i + 1]; // The assistant's response

        newMessages.push({
          input: inputMessage.content,
          output: outputMessage.content,
        });
      }

      const formData = {
        start_time: start_time,
        messages: newMessages,
        system_prompt: systemPrompt,
        model_settings: { [selected.model_id]: formatModelParams(settings) }
      };

      return formData;
    },
  }));
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const [selected, setSelected] = useState(
    selectedModel
      ? selectedModel
      : {
        name: "Select a Model",
      }
  );

  const [showSettings, setShowSettings] = useState(false);
  const [models, setModels] = useState([]);
  const [fireworksAIKey, setFireworksAIKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [togetherKey, setTogetherKey] = useState(""); // State for the API key
  const [customAIKey, setCustomAIKey] = useState("");
  // vercel keys
  const [anthropicKey, setAnthropicKey] = useState("");
  const [cohereKey, setCohereKey] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [mistralKey, setMistralKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [errorOwn, setErrorOwn] = useState("");
  const [tooltipData, setTooltipData] = useState({});
  const [searchModel, setSearchModel] = useState("");
  const [piiData, setPiiData] = useState([]);

  // State for settings values
  const [settings, setSettings] = useState({
    maxOutputTokens: 2500,
    temperature: 0.6,
    topP: 0.2,
    topK: 50,
    frequencyPenalty: 0.3,
    presencePenalty: 0.3,
  });
  const [formData, setFormData] = useState({
    max_tokens: Number(settings.maxOutputTokens),
    model: selected.id1,
    systemPrompt: systemPrompt,
    type: "chat",
    settings: settings,
    rag: ragCheck,
    selectedRag: selectedRag,
    chromaCollectionName: chromaCollectionName,
    provider: selected.provider,
    multimodal: selected.multimodal | false,
    api_keys: {
      openaiKey: openaiKey,
      fireworksKey: fireworksAIKey,
      customKey: customAIKey,
      anthropicKey: anthropicKey,
      cohereKey: cohereKey,
      googleKey: googleKey,
      mistralKey: mistralKey,
      perplexityKey: perplexityKey,
      togetherKey: togetherKey

    }
  });

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    const droppedFilesArray = Array.from(droppedFiles);
    if (droppedFilesArray.length > 0) {
      const validFiles = droppedFilesArray.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("text/")
      );

      if (validFiles.length === droppedFilesArray.length) {
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
        if (syncAllMsg) {
          setAllFiles(dataTransfer.files);
        }
      } else {
        toast.error("Only image and text files are allowed!");
      }

      setFiles(droppedFiles);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const updateFormData = async () => {
      let providerInfo = {
        provider: selected.provider,
        customProvider: false
      };

      // Check if it's a custom provider (UUID format)
      if (selected.provider?.includes('-')) {
        const provider = await fetchProviderDetails(selected.provider);
        if (provider) {
          const storedKey = localStorage.getItem(selected.provider); // Using selected.provider as it is the provider_id
          providerInfo = {
            provider: {
              baseUrl: provider.baseUrl,
              apiKey: storedKey // Using the stored key mapped to provider ID
            },
            customProvider: true
          };
        }
      }

      setFormData({
        max_tokens: Number(settings.maxOutputTokens),
        model: selected.id1,
        systemPrompt: systemPrompt,
        type: "chat",
        settings: settings,
        ...providerInfo, // Spread the provider info
        rag: ragCheck,
        selectedRag: selectedRag,
        chromaCollectionName: chromaCollectionName,
        multimodal: selected.multimodal | false,
        api_keys: {
          openaiKey: openaiKey,
          fireworksKey: fireworksAIKey,
          customKey: customAIKey,
          anthropicKey: anthropicKey,
          cohereKey: cohereKey,
          googleKey: googleKey,
          mistralKey: mistralKey,
          perplexityKey: perplexityKey,
          togetherKey: togetherKey
        },
      });
    };

    updateFormData();
  }, [
    settings,
    open,
    systemPrompt,
    selected,
    openaiKey,
    fireworksAIKey,
    customAIKey,
    anthropicKey,
    cohereKey,
    googleKey,
    mistralKey,
    perplexityKey,
  ]);
  const [input, setInput] = useState('');
  const { id, messages, stop, handleInputChange, status, regenerate, setMessages, sendMessage, error, data } = useChat({
    body: formData,

    onError: error => {
      // Decode the error message
      let decodedErrorJson = decodeURIComponent(error.message);

      // Parse the JSON string back into an object
      let errorData;
      try {
        errorData = JSON.parse(decodedErrorJson);
      } catch (parseError) {
        errorData = { message: decodedErrorJson };
      }

      // Remove the prefix if it exists in the error message
      const prefixToRemove = "Failed to parse stream string. Invalid code ";
      if (errorData.message && errorData.message.startsWith(prefixToRemove)) {
        errorData.message = errorData.message.slice(prefixToRemove.length);
      }

      // Set the error message
      setErrorOwn(errorData.message);

      // Log the full error data for debugging purposes
      console.error("FULL ERROR DATA", errorData);
    }
  });
  const isLoading = status === "streaming";
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editedMessageContent, setEditedMessageContent] = useState('');
  const textareaRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatDivRef = useRef(null);
  const [expandedReasoning, setExpandedReasoning] = useState({});

  const [ragInfo, setRagInfo] = useState([]);
  //the index to make sure that each source gets displayed at the right response
  let assistantIndex = 0;

  // State for smart auto-scroll behavior
  const [userScrolling, setUserScrolling] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const scrollTimeoutRef = useRef(null);

  // useEffect to update the filtered data when `data` changes
  useEffect(() => {
    if (data && Array.isArray(data)) { // Check if data exists and is an array
      // Filter out elements that do not have `parentRunId`
      const filteredData = data.filter(item => !item.parentRunId);
      setRagInfo(filteredData);
    }
  }, [data]); // Re-run this effect whenever `data` changes

  // Function to toggle reasoning section expansion
  const toggleReasoning = (messageId, segmentIndex) => {
    const key = `${messageId}-${segmentIndex}`;
    setExpandedReasoning(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle user scroll detection
  const handleScroll = () => {
    if (!chatDivRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatDivRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

    // If user scrolled away from bottom, disable auto-scroll
    if (!isAtBottom) {
      setUserScrolling(true);
      setAutoScrollEnabled(false);
    } else {
      // If user is back at bottom, re-enable auto-scroll after a delay
      setUserScrolling(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setAutoScrollEnabled(true);
      }, 500); // 500ms delay before re-enabling auto-scroll
    }
  };

  // Smart auto-scroll effect
  useEffect(() => {
    if (chatDivRef.current && autoScrollEnabled && !userScrolling) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [messages, autoScrollEnabled, userScrolling]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleFileChange = (event) => {

    if (event.target.files) {
      setFiles(event.target.files);
      if (syncAllMsg) {
        setAllFiles(event.target.files);
      }

    }
  };

  const handleSettingsChange = (settingName, value) => {
    setSettings({ ...settings, [settingName]: value });
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  const fetchProviderDetails = async (providerId) => {
    try {
      const response = await fetch('/api/customProviders');
      const { data } = await response.json();
      const provider = data.custom_providers.find(p => p.provider_id === providerId);
      return provider;
    } catch (error) {
      console.error("Failed to fetch provider details:", error);
      return null;
    }
  };
  const getModels = async () => {
    const response = await fetch(`/api/manageModels`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.models) {
      setModels(data.models);
    }
  };

  const reconstructConversation = (traces) => {
    setErrorOwn("");
    const modelName = traces[0]?.attributes?.model || "";
    let traceChatHistory = [];

    const model = models.find((model) => model.name === modelName);

    const rootPair = traces.find((pair) => pair.parent_id === null);
    if (!rootPair) {
      return;
    }
    traceChatHistory.push(rootPair);
    setSystemPrompt(rootPair.attributes.system_prompt);

    let currentParentId = rootPair.context.span_id;
    while (traceChatHistory.length < traces.length) {
      const nextPair = traces.find(
        (pair) => pair.parent_id === currentParentId
      );
      if (nextPair) {
        traceChatHistory.push(nextPair);
        currentParentId = nextPair.context.span_id;
      } else {
        break;
      }
    }
    const newMessages = traceChatHistory.flatMap((pair) => [
      {
        role: "user",
        parts: [
          {
            type: "text",
            text: pair.attributes.prompt || "",
          }
        ],
      },
      {
        role: "assistant",
        parts: [
          {
            type: "text",
            text: pair.attributes.output || "",
          }
        ],
      },
    ]);

    if (model) {
      setSelected(model);
    }

    setMessages(newMessages);
  };


  const getParsedText = () => {
    const elements = [];
    let lastIndex = 0;

    {
      input &&
        piiData.forEach((annotation, index) => {
          elements.push(input?.substring(lastIndex, annotation.start));

          elements.push(
            <span
              key={index}
              className={`${styles[annotation.entity_type]} ${styles.highlight
                }`}
            >
              {input?.substring(annotation.start, annotation.end)}
              <span className={styles.category}>{annotation.entity_type}</span>
            </span>
          );
          lastIndex = annotation.end;
        });
      elements.push(input?.substring(lastIndex));
    }
    return elements;
  };

  const sendText = useCallback(async () => {
    try {
      const response = await fetch("/api/manageModelChecks", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (response.ok) {
        const responseData = await response.json();
        setPiiData(responseData);
      }
    } catch (error) {
      console.error("Error sending text to API:", error);
      setPiiData([]);
    }
  }, [input]);

  const debouncedSendText = useCallback(debounce(sendText, 1000), [sendText]);

  useEffect(() => {
    if (input) {
      debouncedSendText();
    }

    // Cleanup to cancel the debounce on unmount or input change
    return () => {
      debouncedSendText.cancel();
    };
  }, [input, debouncedSendText]);

  const formatModelParams = (settings) => {
    const paramsArray = Object.entries(settings).map(
      ([key, value]) => `${key}:${value}`
    );
    return paramsArray.join(", ");
  };

  const handleSave = () => {
    // Update messages and notify parent as well as trace the playground

    onSave();
    setSavePressed(true)
  };

  const parseVercelResponse = (apiResponse) => {
    const segments = [];
    let lastIndex = 0;

    // Process content sequentially, looking for both code and reasoning blocks
    const patterns = [
      { regex: /```(.*?)```/gs, type: 'code' },
      { regex: /<think(?:ing)?\b[^>]*>.*?<\/think(?:ing)?\b[^>]*>/gs, type: 'reasoning' }
    ];

    // Find all matches and their positions
    const allMatches = [];
    patterns.forEach(pattern => {
      let match;
      pattern.regex.lastIndex = 0; // Reset regex
      while ((match = pattern.regex.exec(apiResponse)) !== null) {
        allMatches.push({
          type: pattern.type,
          content: pattern.type === 'code' ? match[1] : match[0],
          start: match.index,
          end: match.index + match[0].length,
          fullMatch: match[0]
        });
      }
    });

    // Sort matches by position
    allMatches.sort((a, b) => a.start - b.start);

    // Process content with all matches in order
    allMatches.forEach(match => {
      // Add text before this match
      if (match.start > lastIndex) {
        const textContent = apiResponse.slice(lastIndex, match.start);
        if (textContent.trim()) {
          segments.push({
            type: "text",
            content: textContent
          });
        }
      }

      // Add the match
      segments.push({
        type: match.type,
        content: match.content
      });

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < apiResponse?.length) {
      const remainingText = apiResponse?.slice(lastIndex);
      if (remainingText.trim()) {
        segments.push({
          type: "text",
          content: remainingText
        });
      }
    }

    // If no matches found, treat entire content as text
    if (segments.length === 0 && apiResponse) {
      segments.push({
        type: "text",
        content: apiResponse
      });
    }

    return segments;
  };


  const handleSelect = (model) => {
    // Update local state
    setSelected(model);
    // Only update parent state for this specific component instance
    if (setSelectedModel) {
      setSelectedModel(model);
    }
  };
  const handleEditMessage = (id, currentContent) => {
    setEditMessageId(id);
    setEditedMessageContent(currentContent);
  };
  const copyToClipboard = (text, uniqueId) => {
    // Ignore the first line because it is only the language name
    const lines = text.split('\n');
    const textToCopy = lines.slice(1).join('\n');
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedIndex(uniqueId);
        // Optionally, reset the button text after a delay
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const saveEditedMessage = (id) => {
    setMessages((prevMessages) => {
      const editIndex = prevMessages.findIndex((message) => message.id === id);
      if (editIndex === -1) return prevMessages; // Message not found, return current state

      const updatedMessages = prevMessages
        .slice(0, editIndex + 1)
        .map((message, index) => {
          if (index === editIndex) {
            // Update the text part in the parts array
            const updatedParts = message.parts?.map(part =>
              part.type === 'text'
                ? { ...part, text: editedMessageContent }
                : part
            ) || [{ type: 'text', text: editedMessageContent }];

            return { ...message, parts: updatedParts };
          }
          return message;
        });

      return updatedMessages;
    });

    // Reset editing state and reload
    setEditMessageId(null);
    setEditedMessageContent('');
    regenerate(); // Call reload to update the component if necessary
  };

  const cancelEditing = () => {
    setEditMessageId(null);
    setEditedMessageContent('');
  };
  // Store provider names
  const [providerNames, setProviderNames] = useState({});

  // Fetch custom provider names
  useEffect(() => {
    const fetchCustomProviderNames = async () => {
      try {
        const response = await fetch('/api/customProviders');
        const { data } = await response.json();

        if (data.custom_providers) {
          const newProviderNames = {};
          data.custom_providers.forEach(provider => {
            newProviderNames[provider.provider_id] = provider.name;
          });
          setProviderNames(newProviderNames);
        }
      } catch (error) {
        console.error("Failed to fetch provider details:", error);
      }
    };

    fetchCustomProviderNames();
  }, []);

  // Get provider display name helper function
  const getProviderDisplayName = (provider) => {
    if (!provider) return "";

    // If it's a UUID-format provider (contains hyphen)
    if (provider.includes('-')) {
      return providerNames[provider] || "Custom Provider";
    }

    // Return regular provider name
    return provider;
  };

  // Check if API key exists for a provider
  const hasApiKey = (provider) => {
    if (!provider) return false;

    // For custom providers with UUID
    if (provider.includes('-')) {
      return !!localStorage.getItem(provider);
    }

    // For standard providers
    const keyMapping = {
      "openai": "openAIKey",
      "anthropic": "anthropicKey",
      "fireworks.ai": "fireworksAIKey",
      "google": "googleKey",
      "cohere": "cohereKey",
      "mistral": "mistralKey",
      "together.ai": "togetherKey",
      "perplexity.ai": "perplexityKey",
      "custom": "customAIKey"
    };

    const keyName = keyMapping[provider.toLowerCase()] || null;
    return keyName ? !!localStorage.getItem(keyName) : false;
  };

  // State for API key overlay modal
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [storageChanged, setStorageChanged] = useState(0);
  // State to control dropdown open/close
  const [forceDropdownOpen, setForceDropdownOpen] = useState(false);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setStorageChanged(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Also update storage changed when modal closes (after saving a key)
  const handleModalClose = () => {
    setShowKeyModal(false);
    setForceDropdownOpen(false);
    setStorageChanged(prev => prev + 1);
  };

  // Handle click on the lock icon
  const handleLockClick = (e, provider, fromDropdown = false) => {
    // Stop all propagation and prevent default behavior
    e.stopPropagation();
    e.preventDefault();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    // Schedule the modal to open after event propagation finishes
    setTimeout(() => {
      // Set the provider
      setSelectedProvider(provider);

      // If from dropdown, maintain dropdown state first
      if (fromDropdown) {
        setForceDropdownOpen(true);

        // Delay showing modal slightly to ensure dropdown stays open
        setTimeout(() => {
          setShowKeyModal(true);
        }, 50);
      } else {
        // If not from dropdown, just show modal
        setShowKeyModal(true);
      }
    }, 0);

    // Return false to prevent further event handling
    return false;
  };

  // Navigate to PlaygroundSettings page with the correct tab selected
  const navigateToPlaygroundSettings = (provider) => {
    // Construct the URL for the PlaygroundSettings page
    const url = '/pageprofile?tab=PlaygroundSettings';

    // Use localStorage to pass information about which provider to highlight
    localStorage.setItem('selectedApiProvider', provider);

    // Navigate to the page
    window.open(url, '_blank');
  };

  const filteredModels = models
    .filter((model) => {
      const trimmedSearchModel = searchModel.replace(/[^\w\s]/g, "").trim();
      if (!trimmedSearchModel) return true; // Show all if no search term

      const regex = new RegExp(trimmedSearchModel, "gi");

      // Search by model name
      const trimmedModelName = model.name
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "");

      // Search by provider name
      const trimmedProviderName = (model.provider || "")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "");

      // Return true if either model name or provider matches
      return trimmedModelName.match(regex) || trimmedProviderName.match(regex);
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // names must be equal
    });

  // Load API key from Local Storage
  useEffect(() => {
    getModels();
    const key = localStorage.getItem("fireworksAIKey") || "";
    setFireworksAIKey(key);
    const key1 = localStorage.getItem("openAIKey") || "";
    setOpenaiKey(key1);
    const key2 = localStorage.getItem("customAIKey") || "";
    setCustomAIKey(key2);

    const key4 = localStorage.getItem("togetherKey") || "";
    setTogetherKey(key4);
    const key5 = localStorage.getItem("anthropicKey") || "";
    setAnthropicKey(key5);
    const key6 = localStorage.getItem("cohereKey") || "";
    setCohereKey(key6);
    const key7 = localStorage.getItem("googleKey") || "";
    setGoogleKey(key7);
    const key8 = localStorage.getItem("mistralKey") || "";
    setMistralKey(key8);
    const key9 = localStorage.getItem("perplexityKey") || "";
    setPerplexityKey(key9);
  }, []);

  useEffect(() => {
    if (chatHistory && models.length > 0) {
      console.log(chatHistory)
      reconstructConversation(chatHistory);
    }
  }, [chatHistory, models]);

  useEffect(() => {
    if (showSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        cancelEditing();
      }
    };

    if (editMessageId !== null) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus the textarea when editing starts
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editMessageId]);
  useEffect(() => {
    const handleKeyDown = async (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        if (!isLoading) {
          setErrorOwn(null);

          const fileParts = files && files.length > 0
            ? await convertFilesToDataURLs(files)
            : [];

          sendMessage({
            body: formData,
            role: 'user',
            parts: [{ type: 'text', text: input }, ...fileParts],
          });
          setInput('');
          setFiles(undefined);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          console.log("messages so far:", messages)
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, selected]);

  const handleMessageInputChange = (event) => {
    setInput(event.target.value);
    if (syncAllMsg) {
      setAllChatPrompt({
        value: event.target.value,
        timestamp: Date.now()
      });
    }
  };
  useEffect(() => {
    setInput(allChatPrompt?.value);

  }, [allChatPrompt]);


  useEffect(() => {
    setFiles(allFiles);
  }, [allFiles]);

  const handlePaste = (event) => {
    const items = event.clipboardData?.items;

    if (items) {
      const files = Array.from(items)
        .map((item) => item.getAsFile())
        .filter((file) => file !== null);

      if (files.length > 0) {
        const validFiles = files.filter(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("text/")
        );

        if (validFiles.length === files.length) {
          const dataTransfer = new DataTransfer();
          validFiles.forEach((file) => dataTransfer.items.add(file));
          setFiles(dataTransfer.files);
          if (syncAllMsg) {
            setAllFiles(dataTransfer.files)
          }
        } else {
          toast.error("Only image and text files are allowed");
        }
      }
    }
  };
  const handleSystemInputChange = (event) => {
    setSystemPrompt(event.target.value);
    if (syncAll) {
      setAllSystemPrompt(event.target.value);
    }
  };
  useEffect(() => {
    setSystemPrompt(allSystemPrompt);
  }, [allSystemPrompt]);

  return (
    <div className="flex sm:flex-row flex-col items-start bg-white">
      <div className="w-full">
        <div className="border-r-slate-200 border-r">
          <div className="flex sm:items-center justify-between sm:flex-row flex-col relative p-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Listbox value={selected} onChange={handleSelect}>
                {({ open }) => {
                  // Use either the Headless UI open state or our forced open state
                  const isOpen = open || forceDropdownOpen;

                  // Special effect to keep dropdown open when API key modal is closed
                  useEffect(() => {
                    if (!showKeyModal && forceDropdownOpen) {
                      // Keep dropdown open for a bit longer when modal closes
                      const timer = setTimeout(() => {
                        setForceDropdownOpen(false);
                      }, 100);
                      return () => clearTimeout(timer);
                    }
                  }, [showKeyModal]);

                  return (
                    <>
                      <div
                        className={classNames(
                          columnCount > 2 ? "" : "w-full ",
                          "Listbox-container"
                        )}
                      >
                        <Listbox.Button
                          className={classNames(
                            "relative flex items-center w-[220px] h-11 bg-white text-sm border-2 border-slate-200 rounded-xl py-2 pl-4 pr-10 text-left focus:outline-none focus:border-[#D4DB33] focus:ring-2 focus:ring-[#D4DB33]/20 hover:border-slate-300 transition-all duration-200 overflow-hidden cursor-pointer shadow-sm",
                            columnCount > 2 ? "h-9 w-full text-xs" : ""
                          )}
                          onClick={(e) => {
                            // Check if click originated from a lock button
                            if (e.target.closest('.lock-button-wrapper')) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            }
                            if (forceDropdownOpen) {
                              setForceDropdownOpen(false);
                            }
                          }}
                        >
                          <span
                            className={classNames(
                              "block truncate",
                              columnCount && "text-xs"
                            )}
                          >
                            {selected?.name ? (
                              <div className="flex items-center gap-2 truncate">
                                <span className={`flex items-center justify-center w-5 h-5 rounded-full ${selected.multimodal ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                                  <FaRobot size={10} />
                                </span>
                                <span className="font-medium whitespace-nowrap text-slate-900">
                                  {selected.name}
                                </span>

                                {selected.provider && (
                                  <span className="text-xs text-slate-500 ml-1 truncate max-w-[60px]">
                                    {getProviderDisplayName(selected.provider)}
                                  </span>
                                )}

                                {selected.provider && (
                                  <div
                                    className="lock-button-wrapper"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      return false;
                                    }}
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      e.nativeEvent.stopImmediatePropagation();
                                      return false;
                                    }}
                                  >
                                    <button
                                      onMouseDown={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        e.nativeEvent.stopImmediatePropagation();
                                        handleLockClick(e, selected.provider, false);
                                        return false;
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        e.nativeEvent.stopImmediatePropagation();
                                        return false;
                                      }}
                                      className={`ml-1 transition-colors duration-200 ${hasApiKey(selected.provider) ? 'text-emerald-500 hover:text-emerald-700' : 'text-red-500 hover:text-red-700'}`}
                                    >
                                      {hasApiKey(selected.provider) ? (
                                        <FaUnlock size={12} />
                                      ) : (
                                        <FaLock size={12} />
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-500">Select a Model</span>
                            )}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <MdKeyboardArrowUp
                              className="h-5 w-5 text-slate-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={isOpen && !showKeyModal}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-2 bg-white text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-slate-200 rounded-xl w-[320px] max-h-[700px] overflow-auto resize"
                            onClick={(e) => {
                              // If clicking a lock button, prevent closing
                              if (e.target.closest('.lock-button-wrapper')) {
                                e.stopPropagation();
                                e.preventDefault();
                              }
                            }}>
                            <div className="bg-white sticky top-0 z-[9] p-3 border-b border-slate-100">
                              <input
                                type="text"
                                className="border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] px-3 py-2 w-full bg-white rounded-lg text-sm transition-all duration-200"
                                placeholder="Search by model or provider..."
                                value={searchModel}
                                onChange={(e) => setSearchModel(e.target.value)}
                              />
                            </div>
                            {filteredModels.map((model) => (
                              <Listbox.Option
                                key={model.model_id}
                                id={model.model_id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-slate-50 rounded-lg"
                                      : "text-slate-900",
                                    "relative cursor-default select-none py-3 px-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-150"
                                  )
                                }
                                value={model}
                                onMouseEnter={() => setTooltipData(model)}
                                onMouseLeave={() => setTooltipData({})}
                              >
                                {({ selected, active }) => (
                                  <div
                                    className="flex flex-col tooltip-main"
                                    data-tooltip-id={`my-tooltip-${model.model_id}`}
                                  >
                                    <div className="flex justify-between items-center w-full">
                                      <div
                                        className="flex items-center gap-2 flex-grow"
                                        onClick={() => handleSelect(model)}
                                      >
                                        <span className={`flex items-center justify-center w-5 h-5 rounded-full ${model.multimodal ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                                          <FaRobot size={10} />
                                        </span>
                                        <span
                                          className={classNames(
                                            "text-sm font-medium",
                                            "block truncate text-slate-900"
                                          )}
                                        >
                                          {model.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 ml-auto">
                                        {model.provider && (
                                          <span
                                            className="text-xs text-slate-500 px-2 py-1 bg-slate-100 rounded-full"
                                            onClick={() => handleSelect(model)}
                                          >
                                            {getProviderDisplayName(model.provider)}
                                          </span>
                                        )}
                                        {model.provider && (
                                          <div
                                            className="lock-button-wrapper inline-block cursor-pointer"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              handleLockClick(e, model.provider, true);
                                              return false;
                                            }}
                                            onMouseDown={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              e.nativeEvent.stopImmediatePropagation();
                                              return false;
                                            }}
                                          >
                                            <span
                                              className={`ml-1 inline-flex transition-colors duration-200 ${hasApiKey(model.provider) ? 'text-emerald-500 hover:text-emerald-700' : 'text-red-500 hover:text-red-700'}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                e.nativeEvent.stopImmediatePropagation();
                                                handleLockClick(e, model.provider, true);
                                                return false;
                                              }}
                                            >
                                              {hasApiKey(model.provider) ? (
                                                <FaUnlock size={12} />
                                              ) : (
                                                <FaLock size={12} />
                                              )}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {model.model_description && (
                                      <span className="text-xs text-slate-500 mt-1 line-clamp-1 ml-7">
                                        {model.model_description}
                                      </span>
                                    )}
                                    <div className="flex gap-2 mt-2 ml-7">
                                      {model.multimodal && (
                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                                          Multimodal
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  );
                }}
              </Listbox>
              <div className="h-6 w-px bg-slate-200"></div>
            </div>
            <div
              className={`flex gap-2 sm:mt-0 mt-4 ${columnCount > 2 ? "gap-1" : ""
                }`}
            >
              <button
                onClick={() => {

                  if (syncAllMsg) {
                    setInput("")
                    setAllChatPrompt({
                      value: "",
                      timestamp: Date.now()
                    });
                    setAllFiles(undefined);
                  } else {
                    setInput("");
                    setFiles(undefined);
                    setErrorOwn(null);

                  }
                  setMessages([]);
                }
                }
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Reset chat"
              >
                <FaUndo size={16} />
              </button>
              <button
                onClick={handleSave}
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Save chat"
              >
                <FaSave size={16} />
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Edit system prompt"
              >
                <FaEdit size={16} />
              </button>
              <button
                disabled={arenaCheck && columnCount <= 2}
                className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Remove chat version"
              >
                <FaMinus onClick={() => removeChatVersion()} size={16} />
              </button>
              <button
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Add chat version"
              >
                <FaPlus onClick={() => addChatVersion()} size={16} />
              </button>
              <button
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Share chat"
              >
                <FaShare size={16} />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-slate-600 hover:text-[#D4DB33] hover:bg-[#D4DB33]/10 rounded-lg transition-all duration-200"
                title="Settings"
              >
                <FaCog size={16} />
              </button>
            </div>

            {showSettings && (
              <div
                ref={modalRef}
                className="max-w-[320px] w-full mx-auto bg-white shadow-2xl rounded-xl absolute sm:top-[60px] top-[100px] right-0 p-6 z-[1] border border-slate-200"
              >
                <ModelSettings
                  onSettingsChange={handleSettingsChange}
                  settings={settings}
                />
              </div>
            )}
          </div>

          <div className="relative">
            {errorOwn && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 flex gap-3 items-start absolute top-0 w-full z-1">
                <MdErrorOutline className="text-xl flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Error occurred</p>
                  <p className="text-sm mt-1">{errorOwn}</p>
                </div>
              </div>
            )}

            <div
              ref={chatDivRef}
              className={`bg-slate-50 h-[calc(100vh-400px)] overflow-y-auto ${errorOwn ? "pt-20" : ""
                }`}
              onScroll={handleScroll} // Add onScroll handler
            >
              {open && (
                <div className="border border-slate-200 rounded-xl p-6 m-4 mt-6 bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#D4DB33] rounded-full"></div>
                    <p className="text-slate-900 font-semibold text-base">
                      System Prompt
                    </p>
                  </div>
                  <textarea
                    placeholder="Your system prompt to the model..."
                    name="system"
                    id="system"
                    value={systemPrompt}
                    onChange={handleSystemInputChange}
                    className="border border-slate-200 rounded-lg mt-3 placeholder:text-slate-400 text-sm font-medium h-40 w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] transition-all duration-200 p-4"
                  ></textarea>
                  <div className="flex justify-between items-center gap-4 flex-wrap mt-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={syncAll}
                        onChange={() => setsyncAll(!syncAll)}
                        className={classNames(
                          syncAll ? "bg-[#D4DB33]" : "bg-slate-300",
                          "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            syncAll ? "translate-x-4" : "translate-x-0",
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                      <label className="text-slate-700 text-sm font-medium">
                        Sync to all
                      </label>
                    </div>
                    <button
                      onClick={() =>
                        systemPrompt &&
                        toast.success("System prompt saved successfully")
                      }
                      className="flex items-center gap-2 bg-[#D4DB33] hover:bg-[#c4cb2d] text-black font-medium text-sm py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                      Save System Prompt
                    </button>
                  </div>
                </div>
              )}
              <div
                className={open ? "h-[calc(100vh-550px)] overflow-auto" : ""}
              >
                {/* Model Selection Prompt Card - Only show when no model selected and no messages */}
                {selected.name === "Select a Model" && messages.length === 0 && (
                  <div className="flex justify-center mt-12">
                    <div
                      className="w-[75%] max-w-md cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
                      onClick={() => setForceDropdownOpen(true)}
                    >
                      <div className="bg-white border-2 border-dashed border-slate-300 hover:border-[#D4DB33] rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-200">
                        <div className="mb-6">
                          <div className="mx-auto w-16 h-16 bg-slate-100 hover:bg-[#D4DB33]/10 rounded-full flex items-center justify-center transition-colors duration-200">
                            <FaRobot className="w-7 h-7 text-slate-400" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          No Model Selected
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                          Please select a model to start chatting
                        </p>
                        <div className="inline-flex items-center text-[#D4DB33] hover:text-[#b8c42d] font-medium text-sm transition-colors duration-200">
                          Click here to select a model
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Model Details Card - Show when model is selected but no messages */}
                {selected.name !== "Select a Model" && messages.length === 0 && (
                  <div className="flex justify-center mt-12">
                    <div className="w-[75%] max-w-lg">
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="text-center mb-8">
                          <div className="mx-auto w-16 h-16 bg-[#D4DB33] rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <FaRobot className="w-7 h-7 text-black" />
                          </div>
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full ${selected.multimodal ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                              <FaRobot size={12} />
                            </span>
                            <h3 className="text-2xl font-semibold text-slate-900">
                              {selected.name}
                            </h3>
                          </div>
                          {selected.provider && (
                            <div className="flex items-center justify-center gap-3 mb-6">
                              <span className="text-sm text-slate-600 px-3 py-1 bg-slate-100 rounded-full">
                                {getProviderDisplayName(selected.provider)}
                              </span>
                              {selected.multimodal ? (
                                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                  Multimodal
                                </span>
                              ) : (
                                <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-sm">
                                  Text Only
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Model Details */}
                        {(selected.model_description || selected.context || selected.input_price || selected.output_price) && (
                          <div className="space-y-6">
                            {selected.model_description && (
                              <div className="text-center">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  {selected.model_description}
                                </p>
                              </div>
                            )}

                            <div className="border-t border-slate-100 pt-6">
                              <div className="grid grid-cols-1 gap-4">
                                {selected.context && (
                                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                    <span className="text-sm font-medium text-slate-700">Context length:</span>
                                    <span className="text-sm text-slate-600 font-mono">{selected.context} tokens</span>
                                  </div>
                                )}
                                {selected.input_price && (
                                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                    <span className="text-sm font-medium text-slate-700">Input pricing:</span>
                                    <span className="text-sm text-slate-600 font-mono">{selected.input_price}</span>
                                  </div>
                                )}
                                {selected.output_price && (
                                  <div className="flex justify-between items-center py-3">
                                    <span className="text-sm font-medium text-slate-700">Output pricing:</span>
                                    <span className="text-sm text-slate-600 font-mono">{selected.output_price}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="text-center mt-8 pt-6 border-t border-slate-100">
                          <p className="text-sm text-slate-500 mb-3">
                            Ready to start chatting with {selected.name}
                          </p>
                          <div className="text-[#D4DB33] font-medium text-sm">
                            Type your message below to begin
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => {
                  // Keep track of the current assistant message index
                  const isAssistant = message.role === 'assistant';
                  const currentRagInfo = isAssistant ? ragInfo[assistantIndex] : null;

                  if (isAssistant) {
                    assistantIndex++;
                  }

                  return (
                    <div key={message.id} className="flex justify-center">
                      <div className="w-[60%]">
                        {message.parts?.map((part, partIndex) => {
                          if (part.type === 'text') {
                            return message.role === 'user' ? (
                              <div
                                key={partIndex}
                                className={`mb-4 bg-white border border-slate-200 shadow-sm p-6 flex flex-col rounded-2xl ${index === 0 ? 'mt-6' : ''}`}
                              >
                                <div className="flex justify-between">
                                  <div className="flex gap-4 flex-col w-full">
                                    <div className="flex items-start">
                                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User2Icon className="w-4 h-4 text-slate-600" />
                                      </div>
                                      {editMessageId === message.id ? (
                                        <textarea
                                          ref={textareaRef}
                                          value={editedMessageContent}
                                          onChange={(e) => setEditedMessageContent(e.target.value)}
                                          className="ml-4 border border-slate-200 rounded-lg mt-1 placeholder:text-slate-400 text-sm font-medium h-40 w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] transition-all duration-200 p-3"
                                        />
                                      ) : (
                                        <p className="ml-4 text-slate-800 text-sm leading-relaxed">
                                          {part.text}
                                        </p>
                                      )}
                                    </div>
                                    {editMessageId === message.id && (
                                      <div className="flex gap-3 mt-3 ml-12">
                                        <button
                                          className="p-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-200"
                                          onClick={() => cancelEditing()}
                                        >
                                          <AiOutlineStop className="text-sm" />
                                        </button>
                                        <button
                                          className="px-4 py-2 text-sm bg-[#D4DB33] hover:bg-[#c4cb2d] text-black font-medium rounded-lg transition-colors duration-200"
                                          onClick={() => saveEditedMessage(message.id)}
                                        >
                                          Save & Resend
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  {editMessageId !== message.id && (
                                    <button
                                      className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors duration-200"
                                      onClick={() => handleEditMessage(message.id, part.text)}
                                    >
                                      <RiEdit2Line size={16} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div key={partIndex} className="mb-4 p-6 flex gap-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                <div className="w-8 h-8 bg-[#D4DB33] rounded-full flex items-center justify-center flex-shrink-0">
                                  <FireIcon className="w-4 h-4 text-black" />
                                </div>
                                <div className="w-[calc(100%-48px)]">
                                  {(() => {
                                    const content = part.text || '';
                                    // Find the first occurrence of <think> tag
                                    const firstThinkIndex = content?.indexOf('<think');
                                    const hasFirstThink = firstThinkIndex !== -1;

                                    // Check if the first <think> has a proper closing tag
                                    let hasOpenThink = false;
                                    if (hasFirstThink) {
                                      const contentFromFirstThink = content?.substring(firstThinkIndex);
                                      const hasClosingTag = contentFromFirstThink?.match(/<think(?:ing)?\b[^>]*>.*?<\/think(?:ing)?\b[^>]*>/s);
                                      hasOpenThink = !hasClosingTag;
                                    }

                                    // If we have an open thinking block, we need to split the content
                                    let contentToRender = content;
                                    if (hasOpenThink) {
                                      // Only show content before the first <think> tag
                                      contentToRender = content?.substring(0, firstThinkIndex);
                                    }

                                    const segments = parseVercelResponse(contentToRender);

                                    return (
                                      <>
                                        {segments.map((segment, segmentIndex) => {
                                          if (segment.type === 'code') {
                                            return (
                                              <pre key={segmentIndex} className="text-sm overflow-hidden border border-slate-200 rounded-lg mt-4 mb-4 bg-slate-900">
                                                <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
                                                  <span className="text-slate-300 text-xs">Code</span>
                                                  <button
                                                    className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors duration-200"
                                                    onClick={() => copyToClipboard(segment.content, `${segment.content}-${segmentIndex}`)}
                                                  >
                                                    {copiedIndex === `${segment.content}-${segmentIndex}` ? 'Copied!' : 'Copy'}
                                                  </button>
                                                </div>
                                                <code className="block p-4 text-slate-100">{segment.content}</code>
                                              </pre>
                                            );
                                          } else if (segment.type === 'reasoning') {
                                            const reasoningKey = `${message.id}-${partIndex}-${segmentIndex}`;
                                            const isExpanded = expandedReasoning[reasoningKey];

                                            return (
                                              <div key={segmentIndex} className="mt-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
                                                <button
                                                  onClick={() => toggleReasoning(message.id, `${partIndex}-${segmentIndex}`)}
                                                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                >
                                                  <FaBrain className="text-blue-600 text-sm" />
                                                  <span className="text-sm font-medium text-blue-800">Thinking Process</span>
                                                  <svg
                                                    className={`ml-auto h-4 w-4 text-blue-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                  </svg>
                                                </button>
                                                {isExpanded && (
                                                  <div className="px-4 pb-4 border-t border-blue-200 bg-white rounded-b-lg">
                                                    <div className="pt-4 text-sm text-slate-700 whitespace-pre-wrap font-mono">
                                                      {segment.content}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          } else {
                                            // Check if this is the last assistant message and currently streaming
                                            const isLastAssistantMessage = message.parts.findIndex(p => p === part) === message.parts.length - 1 &&
                                              message.role === 'assistant' &&
                                              index === messages.length - 1;
                                            const isCurrentlyStreaming = isLastAssistantMessage && isLoading;

                                            return (
                                              <SmoothStreamingMarkdown
                                                key={segmentIndex}
                                                content={segment.content}
                                                isStreaming={isCurrentlyStreaming}
                                                messageId={message.id}
                                                segmentIndex={segmentIndex}
                                                components={{
                                                  ul: ({ node, ...props }) => (
                                                    <ul
                                                      className="list-disc list-inside space-y-1 my-3"
                                                      {...props}
                                                    />
                                                  ),
                                                  ol: ({ node, ...props }) => (
                                                    <ol
                                                      className="list-decimal list-inside space-y-1 my-3"
                                                      {...props}
                                                    />
                                                  ),
                                                  h1: ({ node, ...props }) => (
                                                    <h1
                                                      className="font-bold text-2xl text-slate-900 my-4"
                                                      {...props}
                                                    />
                                                  ),
                                                  h2: ({ node, ...props }) => (
                                                    <h2
                                                      className="font-bold text-xl text-slate-900 my-3"
                                                      {...props}
                                                    />
                                                  ),
                                                  h3: ({ node, ...props }) => (
                                                    <h3
                                                      className="font-bold text-lg text-slate-900 my-2"
                                                      {...props}
                                                    />
                                                  ),
                                                  p: ({ node, ...props }) => (
                                                    <p
                                                      className="text-slate-700 leading-relaxed my-2"
                                                      style={{
                                                        whiteSpace: 'pre-wrap',
                                                      }}
                                                      {...props}
                                                    />
                                                  ),
                                                  code: ({ node, ...props }) => (
                                                    <code
                                                      className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm"
                                                      {...props}
                                                    />
                                                  ),
                                                }}
                                                remarkPlugins={[gfm]}
                                              />
                                            );
                                          }
                                        })}

                                        {/* Show active thinking indicator for unclosed <think> blocks */}
                                        {hasOpenThink && isLoading && (
                                          <div className="mt-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
                                            <div className="w-full flex items-center gap-3 p-4">
                                              <FaBrain className="text-blue-600 text-sm animate-pulse" />
                                              <span className="text-sm font-medium text-blue-800">Thinking...</span>
                                              <div className="ml-auto flex space-x-1">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
                                  {currentRagInfo && currentRagInfo.context && currentRagInfo.context.length > 0 && (
                                    <div className="mt-6 w-full">
                                      <div className="bg-slate-100 border border-slate-200 p-4 rounded-lg">
                                        <p className="text-sm font-medium mb-3 text-slate-700">Relevant documents</p>
                                        {currentRagInfo.context.map((item, contextIndex) => (
                                          <FileSource
                                            key={contextIndex}
                                            source={item.metadata.source}
                                            content={item.pageContent}
                                          />
                                        ))}
                                        <p className="text-xs text-slate-500 mt-3">Run ID: {currentRagInfo.runId}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          } else if (part.type === 'file') {
                            return (
                              <div key={partIndex} className={`flex flex-wrap gap-3 mt-4 ${message.role === 'user' ? 'ml-12' : ''}`}>
                                <div className="mb-2">
                                  {part.mediaType?.startsWith("image/") ? (
                                    <img
                                      className="rounded-lg h-60 border border-slate-200 shadow-sm"
                                      src={part.url}
                                      alt={part.name || 'Image'}
                                    />
                                  ) : part.mediaType?.startsWith("text/") ? (
                                    <div className="text-xs w-40 h-60 overflow-hidden text-slate-500 border border-slate-200 p-3 rounded-lg bg-slate-50">
                                      {getTextFromDataUrl(part.url)}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
            <div className="p-6 bg-white border-t border-slate-200">
              <div className="flex gap-4">
                {/* Left Side (Input Area) */}
                <div className={`flex-grow ${piiCheck ? "w-1/2" : "w-full"}`}>
                  <div className={`rounded-xl bg-white border-2 border-slate-200 focus-within:border-[#D4DB33] transition-all duration-200 shadow-sm ${arenaCheck ? 'ring-2 ring-black' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <AnimatePresence>
                      {isDragging && (
                        <motion.div
                          className="absolute pointer-events-none bg-white/95 backdrop-blur-sm z-10 flex flex-row justify-center items-center flex flex-col gap-2 top-0 left-0 right-0 bottom-0 border-2 border-dashed border-[#D4DB33] rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="text-[#D4DB33] font-medium">Drop files here</div>
                          <div className="text-sm text-slate-500">
                            {"(images and text files)"}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <textarea
                      placeholder="Type your message..."
                      value={input}
                      onChange={handleMessageInputChange}
                      onPaste={handlePaste}
                      className="border-0 resize-y bg-transparent focus:ring-0 focus:outline-none w-full rounded-xl p-4 text-sm placeholder:text-slate-400 min-h-[80px]"
                    />
                    <div className="px-4 pb-4 flex items-center gap-3">
                      <label htmlFor="fileInput" className="bg-slate-600 hover:bg-slate-700 text-white rounded-full cursor-pointer p-2 transition-colors duration-200 shadow-sm">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        <input
                          hidden
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          ref={fileInputRef}
                          accept="image/*, text/*"
                          id="fileInput"
                        />
                      </label>
                      <AnimatePresence>
                        {files && files.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {Array.from(files).map((file) =>
                              file.type.startsWith("image") ? (
                                <div key={file.name} className="relative">
                                  <motion.img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="rounded-lg w-16 h-16 object-cover border border-slate-200 shadow-sm"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{
                                      y: -10,
                                      scale: 1.1,
                                      opacity: 0,
                                      transition: { duration: 0.2 },
                                    }}
                                  />
                                </div>
                              ) : file.type.startsWith("text") ? (
                                <div key={file.name} className="relative">
                                  <motion.div
                                    key={file.name}
                                    className="text-xs w-16 h-16 overflow-hidden text-slate-500 border border-slate-200 p-2 rounded-lg bg-slate-50 shadow-sm"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{
                                      y: -10,
                                      scale: 1.1,
                                      opacity: 0,
                                      transition: { duration: 0.2 },
                                    }}
                                  >
                                    <TextFilePreview file={file} />
                                  </motion.div>
                                </div>
                              ) : null
                            )}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Right Side (PII Check Area) */}
                {piiCheck && (
                  <div className="w-1/2 text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-[120px] overflow-y-auto">
                    <div className="text-slate-600">
                      {getParsedText()}
                    </div>
                  </div>
                )}

              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={syncAllMsg}
                    onChange={() => setSyncAllMsg(!syncAllMsg)}
                    className={classNames(
                      syncAllMsg ? "bg-[#D4DB33]" : "bg-slate-300",
                      "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        syncAllMsg ? "translate-x-4" : "translate-x-0",
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <label className="text-slate-700 text-sm font-medium">
                    Sync to all
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={async (event) => {
                      if (!isLoading) {
                        setErrorOwn(null);

                        const fileParts = files && files.length > 0
                          ? await convertFilesToDataURLs(files)
                          : [];

                        sendMessage({
                          body: formData,
                          role: 'user',
                          parts: [{ type: 'text', text: input }, ...fileParts],
                        });
                        setInput('');
                        setFiles(undefined);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }
                    }}
                    className={`text-black text-sm px-6 py-2 rounded-lg font-medium transition-all duration-200 ${isLoading ? "bg-slate-300 cursor-not-allowed" : "bg-[#D4DB33] hover:bg-[#c4cb2d] shadow-sm"
                      }`}
                    disabled={isLoading}
                    value={input}
                    onChange={handleInputChange}
                  >
                    Send
                  </button>
                  <button
                    onClick={stop}
                    className={`text-black text-sm px-6 py-2 rounded-lg font-medium transition-all duration-200 ${!isLoading ? "bg-slate-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                      }`}
                    disabled={!isLoading}
                  >
                    Stop
                  </button>
                  <button
                    onClick={() => { setErrorOwn(null); regenerate(); }}
                    className={`text-black text-sm px-6 py-2 rounded-lg font-medium transition-all duration-200 ${isLoading ? "bg-slate-300 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300 shadow-sm"
                      }`}
                    disabled={isLoading}
                  >
                    Reload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tooltipData && (
        <Tooltip
          className="tooltip-show-data"
          id={`my-tooltip-${tooltipData.model_id}`}
          place="right"
        >
          <div className="p-5 bg-white text-base border border-slate-200 rounded-xl shadow-xl z-[9] ml-3 max-w-[300px] w-[280px]">
            <h1 className="text-slate-700 text-sm font-semibold mb-2">
              {tooltipData.name}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {tooltipData.model_description}
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <p className="text-slate-800 text-xs font-medium">
                  Context length:
                </p>
                <p className="text-slate-600 text-xs font-mono">
                  {tooltipData.context} tokens
                </p>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <p className="text-slate-800 text-xs font-medium">
                  Input pricing:
                </p>
                <p className="text-slate-600 text-xs font-mono">
                  {tooltipData.input_price}
                </p>
              </div>
              <div className="flex justify-between items-center py-2">
                <p className="text-slate-800 text-xs font-medium">
                  Output pricing:
                </p>
                <p className="text-slate-600 text-xs font-mono">
                  {tooltipData.output_price}
                </p>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showKeyModal}
        onClose={handleModalClose}
        provider={selectedProvider}
        providerNames={providerNames}
      />
    </div>
  );
});

export default Chat_version;
