'use client'
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useInterpretability = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [models, setModels] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInterpretabilityModels = async () => {
        try {
            const response = await fetch('/api/interpretability/models', {
                method: 'GET'
            });

            if (response.ok) {
                const data = await response.json();
                setModels(data.models);
            } else {
                console.error('Failed to fetch models');
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const handleGenerate = async () => {
        if (!selectedModel) {
            toast.error("Please select a model first!");
            return;
        }

        if (!prompt.trim()) {
            toast.error("Please enter a prompt!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/interpretability/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model_id: selectedModel.model_id,
                    prompt: prompt
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data);
            } else {
                toast.error("Failed to generate response");
            }
        } catch (error) {
            console.error('Error generating response:', error);
            toast.error("Error generating response");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setPrompt("");
        setResponse(null);
    };

    const setPromptValue = (value) => {
        setPrompt(value);
    };

    useEffect(() => {
        fetchInterpretabilityModels();
    }, []);

    return {
        selectedModel,
        setSelectedModel,
        models,
        prompt,
        setPromptValue,
        response,
        isLoading,
        handleGenerate,
        handleClear
    };
};