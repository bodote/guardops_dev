import React, { useState, useEffect } from "react";
import APIKeyInput from "./APIKeyInput";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { EditBlackIcon, DeleteBlackIcon, LightIcon } from "@/public/Assets/Icons/Allsvg";
import AddModal from "../modal/AddModal";
import { toast } from "react-toastify";
import CustomProviderModal from "../modal/CustomProviderModal";

const PlaygroundSettings = () => {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [modelsForEdit, setModelsForEdit] = useState();
  const [createModelStatus, setCreateModelStatus] = useState("new");
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeTab, setActiveTab] = useState("supported");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  // API Keys state
  const [openAIKey, setOpenAIKey] = useState("");
  const [huggingfaceKey, setHuggingfaceKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [fireworksAIKey, setFireworksAIKey] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [cohereKey, setCohereKey] = useState("");
  const [mistralKey, setMistralKey] = useState("");
  const [togetherKey, setTogetherKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [customAIKey, setCustomAIKey] = useState("");
  const [tracingKey, setTracingKey] = useState("");

  // Custom providers state
  const [customProviders, setCustomProviders] = useState([]);
  const [customProviderKeys, setCustomProviderKeys] = useState({});
  const [showCustomProviderModal, setShowCustomProviderModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  // Helper function to check if model is custom (created by current user)
  const isCustomModel = (model) => {
    return currentUserId && model.user_id && model.user_id.toString() === currentUserId.toString();
  };

  // Helper function to get user ID from cookies
  const getUserIdFromCookies = () => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user_id') {
          return value;
        }
      }
    }
    return null;
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

  const handleModelEdit = (model) => {
    if (!open && isCustomModel(model)) {
      setOpen(true);
      setModelsForEdit(model);
      setCreateModelStatus("existing");
    }
  };

  const handleDeleteModel = async () => {
    if (modelsForEdit) {
      const formData = {
        model_id: modelsForEdit.model_id,
      };
      if (!isCustomModel(modelsForEdit)) {
        toast.error("Default model cannot be deleted");
        return;
      }
      try {
        const response = await fetch("/api/manageModels", {
          method: "DELETE",
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        if (response.ok) {
          toast.success(`Model deleted successfully!`);
          getModels();
          setSelectedModel(null);
        } else {
          toast.error(responseData.detail);
          console.error("API request failed:", response.statusText);
        }
      } catch (error) {
        toast.error(`${error.message}`);
        console.error("Error during API request:", error);
      }
    }
  };

  const fetchCustomProviders = async () => {
    try {
      const response = await fetch('/api/customProviders');
      const { data } = await response.json();
      setCustomProviders(data.custom_providers || []);

      const savedKeys = {};
      data.custom_providers.forEach(provider => {
        savedKeys[provider.provider_id] = localStorage.getItem(`${provider.provider_id}`) || "";
      });
      setCustomProviderKeys(savedKeys);
    } catch (error) {
      toast.error("Failed to fetch custom providers");
    }
  };

  const handleAddCustomProvider = async (providerData) => {
    try {
      const response = await fetch('/api/customProviders', {
        method: 'POST',
        body: JSON.stringify(providerData),
      });
      if (response.ok) {
        toast.success('Custom provider added successfully');
        fetchCustomProviders();
      }
    } catch (error) {
      toast.error('Failed to add custom provider');
    }
  };

  const handleEditCustomProvider = async (providerData) => {
    try {
      const response = await fetch('/api/customProviders', {
        method: 'PATCH',
        body: JSON.stringify(providerData),
      });
      if (response.ok) {
        toast.success('Custom provider updated successfully');
        fetchCustomProviders();
      }
    } catch (error) {
      toast.error('Failed to update custom provider');
    }
  };

  const getProviderName = (model) => {
    if (!model.provider.includes('-')) {
      return model.provider;
    }
    const customProvider = customProviders.find(p => p.provider_id === model.provider);
    return customProvider ? customProvider.name : model.provider;
  };

  const handleDeleteCustomProvider = async (providerId) => {
    try {
      const response = await fetch('/api/customProviders', {
        method: 'DELETE',
        body: JSON.stringify({ provider_id: providerId }),
      });
      if (response.ok) {
        toast.success('Custom provider deleted successfully');
        fetchCustomProviders();
        localStorage.removeItem(`${providerId}`);
        getModels();
      }
    } catch (error) {
      toast.error('Failed to delete custom provider');
    }
  };

  const saveApiKey = (keyName, keyValue) => {
    localStorage.setItem(keyName, keyValue);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(6)}`;
    }
    return price || 'N/A';
  };

  const formatContext = (context) => {
    if (typeof context === 'number') {
      return context.toLocaleString();
    }
    return context || 'N/A';
  };

  const filterModels = (models, query) => {
    if (!query.trim()) return models;

    try {
      const regex = new RegExp(query, 'i');
      return models.filter(model => {
        const providerName = getProviderName(model);
        const contextStr = model.context ? model.context.toString() : '';

        return (
          regex.test(model.name) ||
          regex.test(providerName) ||
          regex.test(model.id1) ||
          regex.test(contextStr)
        );
      });
    } catch (error) {
      // If regex is invalid, fall back to simple string includes
      const lowerQuery = query.toLowerCase();
      return models.filter(model => {
        const providerName = getProviderName(model);
        const contextStr = model.context ? model.context.toString() : '';

        return (
          model.name.toLowerCase().includes(lowerQuery) ||
          providerName.toLowerCase().includes(lowerQuery) ||
          model.id1.toLowerCase().includes(lowerQuery) ||
          contextStr.toLowerCase().includes(lowerQuery)
        );
      });
    }
  };

  const filteredModels = filterModels(models, searchQuery);

  useEffect(() => {
    // Get user ID from cookies on component mount
    const userId = getUserIdFromCookies();
    setCurrentUserId(userId);

    getModels();
    fetchCustomProviders();

    // Load API keys from localStorage
    setOpenAIKey(localStorage.getItem("openAIKey") || "");
    setHuggingfaceKey(localStorage.getItem("huggingfaceKey") || "");
    setAnthropicKey(localStorage.getItem("anthropicKey") || "");
    setFireworksAIKey(localStorage.getItem("fireworksAIKey") || "");
    setCustomAIKey(localStorage.getItem("customAIKey") || "");
    setGoogleKey(localStorage.getItem("googleKey") || "");
    setCohereKey(localStorage.getItem("cohereKey") || "");
    setMistralKey(localStorage.getItem("mistralKey") || "");
    setTogetherKey(localStorage.getItem("togetherKey") || "");
    setPerplexityKey(localStorage.getItem("perplexityKey") || "");
    setTracingKey(localStorage.getItem("tracingKey") || "");
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Header Section */}
      <div className="space-y-3">
        <h1 className="font-Archivo text-3xl font-thin text-slate-900">
          Playground Settings
        </h1>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <p className="text-slate-700 text-sm leading-relaxed">
            Configure API keys for model providers and manage available models for the Playground. Keys are stored securely in your browser and sent directly to providers.
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column - API Keys */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-Archivo text-xl font-semibold text-slate-900">
              API Key Management
            </h2>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("supported")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "supported"
                  ? "border-[#D4DB33] text-[#D4DB33]"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
              >
                Supported Providers
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "custom"
                  ? "border-[#D4DB33] text-[#D4DB33]"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
              >
                Custom Providers ({customProviders.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-4" style={{ height: 'calc(100vh - 280px)', overflowY: 'auto' }}>
            {activeTab === "supported" && (
              <div className="space-y-4 pr-2">
                <APIKeyInput
                  apiKey={openAIKey}
                  setApiKey={setOpenAIKey}
                  saveApiKey={() => saveApiKey("openAIKey", openAIKey)}
                  label="OpenAI"
                />
                <APIKeyInput
                  apiKey={huggingfaceKey}
                  setApiKey={setHuggingfaceKey}
                  saveApiKey={() => saveApiKey("huggingfaceKey", huggingfaceKey)}
                  label="Hugging Face"
                />
                <APIKeyInput
                  apiKey={anthropicKey}
                  setApiKey={setAnthropicKey}
                  saveApiKey={() => saveApiKey("anthropicKey", anthropicKey)}
                  label="Anthropic"
                />
                <APIKeyInput
                  apiKey={fireworksAIKey}
                  setApiKey={setFireworksAIKey}
                  saveApiKey={() => saveApiKey("fireworksAIKey", fireworksAIKey)}
                  label="Fireworks.ai"
                />
                <APIKeyInput
                  apiKey={googleKey}
                  setApiKey={setGoogleKey}
                  saveApiKey={() => saveApiKey("googleKey", googleKey)}
                  label="Google"
                />
                <APIKeyInput
                  apiKey={cohereKey}
                  setApiKey={setCohereKey}
                  saveApiKey={() => saveApiKey("cohereKey", cohereKey)}
                  label="Cohere"
                />
                <APIKeyInput
                  apiKey={mistralKey}
                  setApiKey={setMistralKey}
                  saveApiKey={() => saveApiKey("mistralKey", mistralKey)}
                  label="Mistral"
                />
                <APIKeyInput
                  apiKey={togetherKey}
                  setApiKey={setTogetherKey}
                  saveApiKey={() => saveApiKey("togetherKey", togetherKey)}
                  label="Together.ai"
                />
                <APIKeyInput
                  apiKey={perplexityKey}
                  setApiKey={setPerplexityKey}
                  saveApiKey={() => saveApiKey("perplexityKey", perplexityKey)}
                  label="Perplexity.ai"
                />
                <APIKeyInput
                  apiKey={customAIKey}
                  setApiKey={setCustomAIKey}
                  saveApiKey={() => saveApiKey("customAIKey", customAIKey)}
                  label="Custom Provider"
                />
                <APIKeyInput
                  apiKey={tracingKey}
                  setApiKey={setTracingKey}
                  saveApiKey={() => saveApiKey("tracingKey", tracingKey)}
                  label="Playground Tracing"
                />
              </div>
            )}

            {activeTab === "custom" && (
              <div className="space-y-4 pr-2">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => {
                      setEditingProvider(null);
                      setShowCustomProviderModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Custom Provider
                  </button>
                </div>

                {customProviders.length > 0 ? (
                  <div className="space-y-4">
                    {customProviders.map((provider) => (
                      <div key={provider.provider_id} className="relative">
                        <APIKeyInput
                          apiKey={customProviderKeys[provider.provider_id] || ""}
                          setApiKey={(value) => {
                            setCustomProviderKeys(prev => ({
                              ...prev,
                              [provider.provider_id]: value
                            }));
                          }}
                          saveApiKey={() => {
                            localStorage.setItem(
                              `${provider.provider_id}`,
                              customProviderKeys[provider.provider_id]
                            );
                          }}
                          label={provider.name}
                          hasActionButtons={true}
                        />
                        <div className="absolute right-2 top-2 flex gap-1 z-10">
                          <button
                            onClick={() => {
                              setEditingProvider(provider);
                              setShowCustomProviderModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 bg-white shadow-sm border border-slate-200"
                            title="Edit provider"
                          >
                            <EditBlackIcon className="w-3 h-3 stroke-slate-500 hover:stroke-[#0D859A]" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomProvider(provider.provider_id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 bg-white shadow-sm border border-slate-200"
                            title="Delete provider"
                          >
                            <DeleteBlackIcon className="w-3 h-3 stroke-slate-500 hover:stroke-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 max-w-sm mx-auto">
                    <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <FiPlus className="w-8 h-8 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">No custom providers</h4>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      Add custom providers to connect with your own API endpoints
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Models */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-Archivo text-xl font-semibold text-slate-900">
                Available Models
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                {filteredModels.length} of {models.length} models {searchQuery && 'matching search'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOpen(true);
                  setCreateModelStatus("new");
                  setModelsForEdit(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiPlus className="w-4 h-4" />
                Add Model
              </button>
              {selectedModel && (
                <button
                  onClick={handleDeleteModel}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <IoClose className="w-4 h-4" />
                  Delete Model
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search models by name, provider, ID, or context window..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl font-Archivo text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4DB33] focus:border-[#D4DB33] transition-colors duration-200"
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Models Grid */}
          <div style={{ height: 'calc(100vh - 280px)', overflowY: 'auto' }} className="pr-2">
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {filteredModels.map((model) => (
                  <div
                    key={model.model_id}
                    onClick={() => setSelectedModel(model.model_id === selectedModel?.model_id ? null : model)}
                    onDoubleClick={() => {
                      if (isCustomModel(model)) {
                        handleModelEdit(model);
                      }
                    }}
                    className={`group bg-white border rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 cursor-pointer ${selectedModel?.model_id === model.model_id
                      ? 'border-[#D4DB33] ring-2 ring-[#D4DB33]/20'
                      : 'border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    {/* Model Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-[#D4DB33] to-[#D4DB33]/80 rounded-lg flex items-center justify-center">
                          <span className="text-black font-bold text-xs">
                            {getProviderName(model).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-Archivo text-sm font-semibold text-slate-900 group-hover:text-[#0D859A] transition-colors duration-200 truncate">
                            {model.name}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">
                            {getProviderName(model)}/{model.id1}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {isCustomModel(model) && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModelEdit(model);
                              }}
                              className="p-1 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                              title="Edit model"
                            >
                              <EditBlackIcon className="w-3 h-3 stroke-slate-500 hover:stroke-[#0D859A]" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedModel(model);
                                setModelsForEdit(model);
                                handleDeleteModel();
                              }}
                              className="p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                              title="Delete model"
                            >
                              <DeleteBlackIcon className="w-3 h-3 stroke-slate-500 hover:stroke-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Model Details */}
                    <div className="space-y-2">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1">
                        {model.multimodal && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#0D859A]/10 text-[#0D859A] border border-[#0D859A]/20">
                            Multimodal
                          </span>
                        )}
                        {isCustomModel(model) ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#D4DB33]/10 text-[#D4DB33] border border-[#D4DB33]/20">
                            Custom
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            Default
                          </span>
                        )}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="bg-slate-50 rounded-lg p-1.5">
                          <p className="text-xs text-slate-500 font-medium mb-0.5">Context</p>
                          <p className="text-xs font-semibold text-slate-900">
                            {formatContext(model.context)}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-1.5">
                          <p className="text-xs text-slate-500 font-medium mb-0.5">$ Input</p>
                          <p className="text-xs font-semibold text-slate-900">
                            {formatPrice(model.input_price)}/1M
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-1.5">
                          <p className="text-xs text-slate-500 font-medium mb-0.5">$ Output</p>
                          <p className="text-xs font-semibold text-slate-900">
                            {formatPrice(model.output_price)}/1M
                          </p>
                        </div>
                      </div>

                      {/* System Prompt Preview */}
                      {model.model_description && (
                        <div className="bg-slate-50 rounded-lg p-1.5">
                          <p className="text-xs text-slate-500 font-medium mb-1">System Prompt</p>
                          <p className="text-xs text-slate-700 line-clamp-2">
                            {model.model_description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 max-w-md mx-auto">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  {searchQuery ? (
                    <FiSearch className="w-8 h-8 stroke-slate-400" />
                  ) : (
                    <LightIcon className="w-8 h-8 stroke-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {searchQuery ? 'No models found' : 'No models configured'}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                  {searchQuery
                    ? `No models match "${searchQuery}". Try adjusting your search terms.`
                    : 'Add your first model to start using the Playground'
                  }
                </p>
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <IoClose className="w-4 h-4" />
                    Clear Search
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(true);
                      setCreateModelStatus("new");
                      setModelsForEdit(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Model
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CustomProviderModal
        isOpen={showCustomProviderModal}
        onClose={() => {
          setShowCustomProviderModal(false);
          setEditingProvider(null);
        }}
        onSubmit={(data) => {
          if (editingProvider) {
            handleEditCustomProvider(data);
          } else {
            handleAddCustomProvider(data);
          }
        }}
        editProvider={editingProvider}
      />
      {open && (
        <AddModal
          updateModelList={getModels}
          open={open}
          setOpen={setOpen}
          model_status={createModelStatus}
          value={createModelStatus !== "new" ? modelsForEdit : null}
        />
      )}
    </div>
  );
};

export default PlaygroundSettings;
