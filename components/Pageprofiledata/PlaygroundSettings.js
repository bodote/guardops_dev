import React, { useState, useEffect } from "react";
import APIKeyInput from "./APIKeyInput"; // Adjust the path as necessary
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import AddModal from "../modal/AddModal";
import { toast } from "react-toastify";
import CustomProviderModal from "../modal/CustomProviderModal";

const PlaygroundSettings = () => {
  // State for API keys
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [modelsForEdit, setModelsForEdit] = useState();
  const [createModelStatus, setCreateModelStatus] = useState("new");
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
  const [customProviders, setCustomProviders] = useState([]);
  const [customProviderKeys, setCustomProviderKeys] = useState({});
  const [showCustomProviderModal, setShowCustomProviderModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

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
    if (!open && model.user_id !== 0) {
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
      if (modelsForEdit.user_id == 0) {
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
          toast.success(`Project deleted successfully!`);
          getModels();
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
  // Load keys from Local Storage
  useEffect(() => {
    getModels();
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
  useEffect(() => {
    getModels();
    fetchCustomProviders();
    // Load existing API keys...
  }, []);
  const fetchCustomProviders = async () => {
    try {
      const response = await fetch('/api/customProviders');
      const { data } = await response.json();
      setCustomProviders(data.custom_providers || []);

      // Load saved keys for custom providers
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
    // If it's not a custom provider, return the original provider name
    if (!model.provider.includes('-')) {  // Custom provider IDs typically include a dash as they're UUIDs
      return model.provider;
    }

    // Find matching custom provider and return its name
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
        // Refresh models list as some models might have been deleted
        getModels();
      }
    } catch (error) {
      toast.error('Failed to delete custom provider');
    }
  };

  // Save API key to Local Storage
  const saveApiKey = (keyName, keyValue) => {
    localStorage.setItem(keyName, keyValue);
  };


  return (
    <>
      <div className="mb-[30px]">
        <p className="text-[16px] text-black my-[60px] max-w-[950px]">
          Enter the API keys of each Model Provider that you want to use in the Playground.
          The API keys are stored in your Browser's local storage. The key will be
          directly forwarded to the model provider and is never stored on coai servers. Only the Input
          and Response is stored on coai servers for tracing and versioning.{" "}
        </p>
        {/* ... */}
        <div className="flex items-start flex-wrap xl:gap-[248px] lg:gap-[90px] sm:gap-[20px] gap-[40px]">
          <div className="flex flex-col gap-[31px]">
            <button
              onClick={() => {
                setEditingProvider(null);
                setShowCustomProviderModal(true);
              }}
              className="flex items-center gap-[10px] bg-[#D4DB33] text-black font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md mb-4"
            >
              <FiPlus className="text-[20px]" />
              Add Custom Provider
            </button>
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
              label="Huggingface"
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
                />
                <div className="absolute right-0 top-0 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProvider(provider);
                      setShowCustomProviderModal(true);
                    }}
                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomProvider(provider.provider_id)}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="text-[14px] text-black font-medium">
              Models available in Playground
            </label>
            <div className="text-[14px] font-medium border-[#CCCCCC] border-[1px] rounded-[6px] sm:leading-[30px] leading-[26px] mt-[7px] break-all max-w-[450px]">
              {models.map((model) => (
                <button
                  key={model.model_id}
                  onClick={() => setModelsForEdit(model)}
                  onDoubleClick={() => handleModelEdit(model)}
                  className="focus:bg-[#0D859A] block w-full text-left px-[13px]"
                >
                  {getProviderName(model)}/{model.id1}
                </button>
              ))}
            </div>
            <div className="flex sm:gap-[43px] gap-[12px] mt-[13px] sm:ml-[15px]">
              <button
                onClick={() => {
                  setOpen(true);
                  setCreateModelStatus("new");
                }}
                className="flex items-center gap-[10px] bg-[#D4DB33] text-black font-medium text-[14px] font-Inter py-[6px] sm:px-[12px] px-[9px] rounded-md"
              >
                <FiPlus className="text-[20px]" />
                Add Model
              </button>
              <button
                onClick={handleDeleteModel}
                className="flex items-center gap-[10px] bg-[#D1293D] text-black font-medium text-[14px] font-Inter py-[6px] sm:px-[12px] px-[9px] rounded-md"
              >
                <IoClose className="text-[20px] text-white" />
                Del Model
              </button>
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
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
    </>
  );
};

export default PlaygroundSettings;
