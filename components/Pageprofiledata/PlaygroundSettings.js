import React, { useState, useEffect } from "react";
import APIKeyInput from "./APIKeyInput"; // Adjust the path as necessary
import CustomAPIEndpoint from "./CustomAPIEndpoint";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import AddModal from "../modal/AddModal";
import { toast } from "react-toastify";

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

  const [customAIKey, setCustomAIKey] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");

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
          toast.success(`Project deleted successfully !!`);
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
    setCustomEndpoint(localStorage.getItem("customEndpoint") || "");
    setGoogleKey(localStorage.getItem("googleKey")|| "");
    setCohereKey(localStorage.getItem("cohereKey")|| "");
    setMistralKey(localStorage.getItem("mistralKey")|| "");
    setTogetherKey(localStorage.getItem("togetherKey")|| "");
  }, []);

  // Save API key to Local Storage
  const saveApiKey = (keyName, keyValue) => {
    localStorage.setItem(keyName, keyValue);
  };

  const saveApiKeyWithEndpoint = (values) => {
    if (typeof values === "object") {
      for (const key in values) {
        localStorage.setItem(key, values[key]);
      }
    }
  };

  return (
    <>
      <div className="mb-[30px]">
        <p className="text-[16px] text-black my-[60px] max-w-[950px]">
          Enter the API keys of each Model Provider, which you want to use in
          the the playground of coai monitoring solution. The API keys are not
          stored server side, rather are stored on client side. The api will be
          directly provided to the model provider not to coai. Only the Input
          and Response is stored on coai servers for tracing and versioning.{" "}
        </p>
        {/* ... */}
        <div className="flex items-start flex-wrap xl:gap-[248px] lg:gap-[90px] sm:gap-[20px] gap-[40px]">
          <div className="flex flex-col gap-[31px]">
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
            <CustomAPIEndpoint
              apiKey={customAIKey}
              setApiKey={setCustomAIKey}
              apiEndpint={customEndpoint}
              setApiEndpoint={setCustomEndpoint}
              saveApiKeyWithEndpoint={() =>
                saveApiKeyWithEndpoint({
                  customAIKey: customAIKey,
                  customEndpoint: customEndpoint,
                })
              }
              label="Custom Provider"
            />
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
                  {model.provider}/{model.id1}
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
