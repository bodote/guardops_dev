import React, { DragEvent, useState, Fragment, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react";
import {
  EditIcon,
  MinusIcon,
  PlusRectangleIcon,
  SettingIcon,
  ShareIcon,
  LoadingIcon,
  SaveIcon,
  User2Icon,
  FireIcon,
} from "@/public/Assets/Icons/Allsvg";
import 'highlight.js/styles/atom-one-dark.css';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { FaRobot, FaBrain, FaServer, FaDatabase, FaCloud, FaLock, FaUnlock } from "react-icons/fa";
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
import { useChat } from 'ai/react';
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{displayName} API Key</h2>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your {displayName} API key
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={saveKey}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
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
    maxTokens: 2500,
    temperature: 0.6,
    topP: 0.2,
    topK: 50,
    frequencyPenalty: 0.3,
    presencePenalty: 0.3,
  });
  const [formData, setFormData] = useState({
    max_tokens: Number(settings.maxTokens),
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
        max_tokens: Number(settings.maxTokens),
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
  const { id, messages, input, stop, handleInputChange, isLoading, handleSubmit, reload, setInput, setMessages, error, data } = useChat({
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
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editedMessageContent, setEditedMessageContent] = useState('');
  const textareaRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatDivRef = useRef(null);

  const [ragInfo, setRagInfo] = useState([]);
  //the index to make sure that each source gets displayed at the right response
  let assistantIndex = 0;

  // useEffect to update the filtered data when `data` changes
  useEffect(() => {
    if (data && Array.isArray(data)) { // Check if data exists and is an array
      // Filter out elements that do not have `parentRunId`
      const filteredData = data.filter(item => !item.parentRunId);
      setRagInfo(filteredData);
    }
  }, [data]); // Re-run this effect whenever `data` changes

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [messages]);


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
        content: pair.attributes.prompt || "",
      },
      {
        role: "assistant",
        content: pair.attributes.output || "",
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
    const regex = /```(.*?)```/gs;
    let lastIndex = 0;
    apiResponse?.replace(regex, (match, codeBlock, index) => {
      // Add the text segment before the code block
      if (index > lastIndex) {
        segments.push({
          type: "text",
          content: apiResponse.slice(lastIndex, index),
        });
      }
      // Add the code block
      segments.push({ type: "code", content: codeBlock });
      lastIndex = index + match.length;
    });

    // Add any remaining text after the last code block
    if (apiResponse && lastIndex < apiResponse.length) {
      segments.push({ type: "text", content: apiResponse.slice(lastIndex) });
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
        .map((message, index) =>
          index === editIndex
            ? { ...message, content: editedMessageContent } // Update the edited message
            : message
        );

      return updatedMessages;
    });

    // Reset editing state and reload
    setEditMessageId(null);
    setEditedMessageContent('');
    reload(); // Call reload to update the component if necessary
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
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        if (!isLoading) {
          setErrorOwn(null);

          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
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

    <div className="flex sm:flex-row flex-col items-start">

      <div className="w-full">
        <div className="border-r-[#CCCCCC] border-r-[1px]">
          <div className="flex sm:items-center justify-between sm:flex-row flex-col relative 2xl:p-[9px_27px_10px_11px] p-[9px_11px_10px_11px]">
            <div className="flex items-center gap-2">
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
                            "relative flex items-center w-[220px] h-10 bg-white text-[12px] border-2 border-gray-200 rounded-md py-1 pl-3 pr-10 text-left focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-offset-blue-300 overflow-hidden cursor-pointer",
                            columnCount > 2 ? "h-8 w-full" : ""
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
                              columnCount && "text-[10px]"
                            )}
                          >
                            {selected?.name ? (
                              <div className="flex items-center gap-1 truncate">
                                <span className={`flex items-center justify-center w-4 h-4 rounded-full ${selected.multimodal ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                                  <FaDatabase size={8} />
                                </span>
                                <span className="font-medium whitespace-nowrap">
                                  {selected.name}
                                </span>

                                {selected.provider && (
                                  <span className="text-[10px] text-gray-500 ml-1 truncate max-w-[60px]">
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
                                      className={`ml-1 ${hasApiKey(selected.provider) ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
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
                              <span>Select a Model</span>
                            )}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <MdKeyboardArrowUp
                              className="h-4 w-4 text-gray-400"
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
                          <Listbox.Options className="absolute z-10 mt-1 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#cccccc] rounded-lg w-[320px] max-h-[700px] overflow-auto resize"
                            onClick={(e) => {
                              // If clicking a lock button, prevent closing
                              if (e.target.closest('.lock-button-wrapper')) {
                                e.stopPropagation();
                                e.preventDefault();
                              }
                            }}>
                            <div className="bg-white sticky top-0 z-[9] p-1">
                              <input
                                type="text"
                                className="border-b border-gray-300 focus:outline-none px-2 py-1 w-full bg-white rounded-[6px] text-xs"
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
                                      ? "bg-[#f0efef] rounded-[6px]"
                                      : "text-[#000]",
                                    "relative cursor-default select-none py-2 px-[8px] border-b border-gray-200 last:border-b-0 hover:bg-[#f0efef]"
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
                                        className="flex items-center gap-1.5 flex-grow"
                                        onClick={() => handleSelect(model)}
                                      >
                                        <span className={`flex items-center justify-center w-4 h-4 rounded-full ${model.multimodal ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                                          <FaDatabase size={8} />
                                        </span>
                                        <span
                                          className={classNames(
                                            "text-[13px] font-Inter font-medium",
                                            "block truncate"
                                          )}
                                        >
                                          {model.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1 ml-auto">
                                        {model.provider && (
                                          <span
                                            className="text-[10px] text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded-full"
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
                                              className={`ml-1 inline-flex ${hasApiKey(model.provider) ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
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
                                      <span className="text-[10px] text-gray-500 mt-0.5 line-clamp-1 ml-5">
                                        {model.model_description}
                                      </span>
                                    )}
                                    <div className="flex gap-2 mt-1 ml-5">
                                      {model.multimodal && (
                                        <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[9px]">
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
              <button className="text-[#464F60] text-[17px] rotate-[95deg]">
                <AiOutlineStop />
              </button>
            </div>
            <div
              className={`flex gap-[17px] sm:mt-0 mt-[20px] ${columnCount > 2 ? "2xl:!gap-[10px] xl:!gap-[6px] !gap-[10px]" : ""
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

                  }
                  setMessages([]);
                }
                }
              >

                <LoadingIcon />
              </button>
              <button onClick={handleSave}>
                <SaveIcon />
              </button>
              <button onClick={() => setOpen(!open)}>
                <EditIcon />
              </button>
              <button disabled={arenaCheck && columnCount <= 2}>
                <MinusIcon onClick={() => removeChatVersion()} />
              </button>
              <button>
                <PlusRectangleIcon onClick={() => addChatVersion()} />
              </button>
              <button>
                <ShareIcon />
              </button>
              <button onClick={() => setShowSettings(true)}>
                <SettingIcon />{" "}
              </button>
            </div>

            {showSettings && (
              <div
                ref={modalRef}
                className="max-w-[285px] w-full mx-auto bg-white shadow-lg rounded-lg absolute sm:top-[40px] top-[80px] right-0 p-[13px_23px_17px_25px] z-[1]"
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
              <p className="bg-[#ffe1e1bb] text-[red] p-[10px] flex gap-2 items-center absolute top-0 w-full">
                <MdErrorOutline className="text-[20px]" />
                {errorOwn}
              </p>
            )}



            <div
              ref={chatDivRef}
              className={`bg-[#F7F7F7] h-[calc(100vh-287px)] overflow-y-auto ${errorOwn ? "pt-[44px]" : ""
                }`}
            >
              {open && (
                <div className="border-[#CCCCCC] border-[1px] rounded-[12px] p-[7px_10px_10px_14px] m-[10px] mt-[16px]">
                  <p className="text-[#252525] font-medium text-[14px]">
                    System Prompt
                  </p>
                  <textarea
                    placeholder="Your system prompt to the model"
                    name="system"
                    id="system"
                    value={systemPrompt}
                    onChange={handleSystemInputChange}
                    className="border-[#EAEBF0] border-[1px] rounded-[6px] mt-2 placeholder:text-[#68727D] text-[15px] font-medium h-[153px] w-full resize-none shadow-[0px_1px_2px_0px_#1018280A]"
                  ></textarea>
                  <div className="flex justify-between items-center gap-[10px] flex-wrap">
                    <div className="flex items-center gap-[5px]">
                      <Switch
                        checked={syncAll}
                        onChange={() => setsyncAll(!syncAll)}
                        className={classNames(
                          syncAll ? "bg-[#0074fb]" : "bg-gray-200",
                          "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            syncAll ? "translate-x-[11px]" : "translate-x-0",
                            "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                      <label className="text-[#252525] text-[12px] font-medium">
                        Sync to all
                      </label>
                    </div>
                    <button
                      onClick={() =>
                        systemPrompt &&
                        toast.success("System prompt saved successfully")
                      }
                      className=" flex items-center gap-[2px] bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[12px] font-Inter py-[6px] px-[14px] rounded-md"
                    >
                      Save System Prompt
                    </button>
                  </div>
                </div>
              )}
              <div
                className={open ? "h-[calc(100vh-520px)] overflow-auto" : ""}
              >

                {messages.map((message, index) => {
                  // Keep track of the current assistant message index
                  const isAssistant = message.role === 'assistant';
                  const currentRagInfo = isAssistant ? ragInfo[assistantIndex] : null;


                  if (isAssistant) {
                    assistantIndex++;
                  }
                  return (
                    <div key={message.id} className="flex justify-center">
                      <div className="w-[75%]">
                        {message.role === 'user' ? (
                          <div
                            className={`mb-2 bg-[#e1e1e1] md:p-[19px_31px] flex flex-col rounded-3xl ${index === 0 ? 'mt-4' : ''}`}
                          >
                            <div className="flex justify-between">
                              <div className="flex sm:gap-[19px] gap-[8px] flex-col w-full">
                                <div className="flex items-start">
                                  <User2Icon className="min-w-[16px]" />
                                  {editMessageId === message.id ? (
                                    <textarea
                                      ref={textareaRef}
                                      value={editedMessageContent}
                                      onChange={(e) => setEditedMessageContent(e.target.value)}
                                      className="ml-5 border-[#EAEBF0] border-[1px] rounded-[6px] mt-2 placeholder:text-[#68727D] text-[15px] font-medium h-[153px] w-full resize-none shadow-[0px_1px_2px_0px_#1018280A]"
                                    />
                                  ) : (
                                    <p className="ml-5 md:text-[16px] text-[14px]">
                                      {message.content}
                                    </p>
                                  )}
                                </div>
                                {editMessageId === message.id && (
                                  <div className="flex gap-2 mt-2 ml-10">
                                    <button
                                      className="p-1 border-1 rounded-full bg-gray-400 hover:bg-gray-700"
                                      onClick={() => cancelEditing()}
                                    >
                                      <AiOutlineStop className="text-[16px]" />
                                    </button>
                                    <button
                                      className="p-1 border-1 rounded-full text-[12px] bg-[#D4DB33] hover:bg-[#0D859A]"
                                      onClick={() => saveEditedMessage(message.id)}
                                    >
                                      Save & Resend
                                    </button>
                                  </div>
                                )}
                              </div>
                              {editMessageId !== message.id && (
                                <button
                                  className="text-[20px] text-[#2B3F6C] group-hover:block"
                                  onClick={() => handleEditMessage(message.id, message.content)}
                                >
                                  <RiEdit2Line />
                                </button>
                              )}
                            </div>
                            <div className="flex flex-wrap justify-start">
                              {message.experimental_attachments?.map((attachment) => (
                                <div key={attachment.name} className="mb-3 mr-3">
                                  {attachment.contentType?.startsWith("image") ? (
                                    <img
                                      className="rounded-md h-60"
                                      src={attachment.url}
                                      alt={attachment.name}
                                    />
                                  ) : attachment.contentType?.startsWith("text") ? (
                                    <div className="text-xs w-40 h-60 overflow-hidden text-zinc-400 border p-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700">
                                      {getTextFromDataUrl(attachment.url)}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="mb-2  md:p-[19px_31px] p-[8px_10px] flex sm:gap-[19px] gap-[8px] rounded-3xl">
                            <FireIcon className="min-w-[16px]" />
                            <div className="w-[calc(100%-35px)]">
                              {parseVercelResponse(message.content).map((segment, index) =>
                                segment.type === 'code' ? (
                                  (() => {
                                    return (
                                      <pre className="text-sm overflow-hidden border-t rounded-lg mt-5 mb-5">
                                        <button className="w-full text-right pr-5 pb-0.5 pt-1.5 bg-gray-700 text-neutral-200" onClick={() => copyToClipboard(segment.content, `${segment.content}-${index}`)}>
                                          {copiedIndex === `${segment.content}-${index}` ? 'Copied' : 'Copy'}
                                        </button>
                                        <code>{segment.content}</code>
                                      </pre>
                                    );
                                  })()
                                ) : (
                                  <ReactMarkdown
                                    components={{
                                      ul: ({ node, ...props }) => (
                                        <ul
                                          style={{
                                            display: 'block',
                                            listStyleType: 'disc',
                                            paddingInlineStart: '40px',
                                          }}
                                          {...props}
                                        />
                                      ),
                                      ol: ({ node, ...props }) => (
                                        <ol
                                          style={{
                                            display: 'block',
                                            listStyleType: 'decimal',
                                            paddingInlineStart: '40px',
                                          }}
                                          {...props}
                                        />
                                      ),
                                      h1: ({ node, ...props }) => (
                                        <h1
                                          className="font-bold text-6xl"
                                          {...props}
                                        />
                                      ),
                                      p: ({ node, ...props }) => (
                                        <p
                                          style={{
                                            whiteSpace: 'pre-wrap',
                                          }}
                                          {...props}
                                        />
                                      ),
                                    }}
                                    remarkPlugins={[gfm]}
                                    key={index}
                                    children={segment.content}
                                  />
                                )
                              )}
                              {currentRagInfo && currentRagInfo.context && currentRagInfo.context.length > 0 && (
                                <div className="mt-4 w-full">
                                  <div className="bg-gray-200 p-4 rounded-lg">
                                    <p className="text-sm font-medium mb-2">Relevant documents</p>
                                    {currentRagInfo.context.map((item, index) => (
                                      <FileSource
                                        key={index}
                                        source={item.metadata.source}
                                        content={item.pageContent}
                                      />
                                    ))}
                                    <p className="text-xs text-gray-500 mt-2">Run ID: {currentRagInfo.runId}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
            <div className="p-[10px_14px_12px_20px] border-b-[#CCC] border-b-[1px]">
              <div className="flex">
                {/* Left Side (Input Area) */}
                <div className={`flex-grow ${piiCheck ? "w-1/2" : "w-full"}`}>
                  <div className={`rounded-md bg-[#e1e1e1] ${arenaCheck ? 'border-black border' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <AnimatePresence>
                      {isDragging && (
                        <motion.div
                          className="absolute pointer-events-none dark:bg-zinc-900/90  z-10 flex flex-row justify-center items-center flex flex-col gap-1 bg-zinc-100/90 top-0 left-0 right-0 bottom-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div>Drag and drop files here</div>
                          <div className="text-sm dark:text-zinc-400 text-zinc-500">
                            {"(images and text)"}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <textarea
                      placeholder="Send a message"
                      value={input}
                      onChange={handleMessageInputChange}
                      onPaste={handlePaste}
                      className={`border-0 resize-y bg-[#e1e1e1] focus:ring-0 focus:shadow-none w-full rounded-md}`}
                    />
                    <div className="pl-2 pb-2 flex items-center gap-[5px]">
                      <label htmlFor="fileInput" className="bg-gray-600 hover:bg-gray-800 text-white rounded-full cursor-pointer">
                        <svg
                          className="cursor-pointer hover:text-gray-700 border rounded-full p-1 h-8"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
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
                          <div className="flex items-center bottom-12 px-4 w-full md:w-[500px] md:px-0">
                            {Array.from(files).map((file) =>
                              file.type.startsWith("image") ? (
                                <div key={file.name} className="ml-2">
                                  <motion.img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="rounded-md w-24"
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
                                <div key={file.name} className="ml-2">
                                  <motion.div
                                    key={file.name}
                                    className="text-[8px] leading-1 w-28 h-16 overflow-hidden text-zinc-500 border p-2 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
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
                  <div className="w-1/2 text-[16px] font-normal placeholder:text-[#CCCCCC] shadow-none ml-2 mt-[5px] focus:ring-0 focus:outline-none lg:border-l lg:border-l-[#CCCCCC] lg:border-t-0 border-t border-t-[#CCCCCC] p-[8px_12px] max-h-[100px] overflow-y-auto flex-grow">
                    {getParsedText()}
                  </div>
                )}

              </div>

              <div className="flex justify-end gap-[10px] pr-[13px] pb-2 mt-2">
                <div className="flex items-center gap-[5px]">
                  <Switch
                    checked={syncAllMsg}
                    onChange={() => setSyncAllMsg(!syncAllMsg)}
                    className={classNames(
                      syncAllMsg ? "bg-[#0074fb]" : "bg-[#898989]",
                      "relative inline-flex h-[16px] w-[27px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        syncAllMsg ? "translate-x-[11px]" : "translate-x-0",
                        "pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <label className="text-[#252525] text-[12px] font-medium">
                    Sync to all
                  </label>
                </div>
                <button
                  onClick={event => {
                    if (!isLoading) {
                      setErrorOwn(null);
                      handleSubmit(event, {
                        experimental_attachments: files,
                      });

                      setFiles(undefined);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }
                  }}
                  className={`text-black text-[12px] w-[54px] h-[22px] rounded-[6px] ${isLoading ? "bg-[#CCCCCC]" : "bg-[#D4DB33] hover:bg-[#0D859A]"
                    }`}
                  disabled={isLoading}
                  value={input}
                  onChange={handleInputChange}
                >
                  Send
                </button>
                <button
                  onClick={stop}
                  className={`text-black text-[12px] w-[54px] h-[22px] rounded-[6px] ${!isLoading ? "bg-[#CCCCCC]" : "bg-[#D4DB33] hover:bg-[#0D859A]"
                    }`}
                  disabled={!isLoading}
                >
                  Stop
                </button>
                <button
                  onClick={() => { setErrorOwn(null); reload(); }}
                  className={`text-black text-[12px] w-[54px] h-[22px] rounded-[6px] ${isLoading ? "bg-[#CCCCCC]" : "bg-[#D4DB33] hover:bg-[#0D859A]"
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
      {tooltipData && (
        <Tooltip
          className="tooltip-show-data"
          id={`my-tooltip-${tooltipData.model_id}`}
          place="right"
        >
          <div className="p-[16px] bg-white text-base border border-[#cccccc] rounded-lg  z-[9] ml-[10px] 2xl:!w-[270px] w-[230px opacity-100">
            <h1 className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium ">
              {tooltipData.name}
            </h1>
            <p className="font-Archivo sm:text-[12px] text-[10px] font-normal text-[#aaa] leading-normal mt-[5px]">
              {tooltipData.model_description}
            </p>
            <div className="my-[10px]">
              <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Context length:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  {tooltipData.context} tokens
                </p>
              </div>
              <div className="grid grid-cols-2 border-b border-b-[#ccc] sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Input pricing:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  {tooltipData.input_price}
                </p>
              </div>
              <div className="grid grid-cols-2  sm:py-[5px] py-[10px]">
                <p className="text-[#000] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
                  Output princing:
                </p>
                <p className="text-[#656565] sm:text-[12px] text-[10px] font-Inter font-medium leading-normal">
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
