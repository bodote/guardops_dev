import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { FaStop } from 'react-icons/fa';

const TestModel = forwardRef(({ model, prompt, testContext, onLoadingChange, setPromptHistory, selectedHistoryItem }, ref) => {
    // Add states for all API keys
    const [fireworksAIKey, setFireworksAIKey] = useState('');
    const [openaiKey, setOpenaiKey] = useState('');
    const [customAIKey, setCustomAIKey] = useState('');
    const [togetherKey, setTogetherKey] = useState('');
    const [anthropicKey, setAnthropicKey] = useState('');
    const [cohereKey, setCohereKey] = useState('');
    const [googleKey, setGoogleKey] = useState('');
    const [mistralKey, setMistralKey] = useState('');
    const [perplexityKey, setPerplexityKey] = useState('');
    const [groqKey, setGroqKey] = useState('');

    // Load API keys from localStorage
    useEffect(() => {
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
        const key10 = localStorage.getItem("groqKey") || "";
        setGroqKey(key10);
    }, []);

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
    // Build the request body with all necessary model info
    const [requestBody, setRequestBody] = useState(null);

    useEffect(() => {
        const updateRequestBody = async () => {
            let providerInfo = {
                provider: model.provider,
                customProvider: false
            };

            if (model.provider?.includes('-')) {
                const provider = await fetchProviderDetails(model.provider);
                if (provider) {
                    const storedKey = localStorage.getItem(model.provider);
                    providerInfo = {
                        provider: {
                            baseUrl: provider.baseUrl,
                            apiKey: storedKey
                        },
                        customProvider: true
                    };
                }
            }

            setRequestBody({
                model: model.id1,
                ...providerInfo,
                settings: {
                    maxOutputTokens: 2500,
                    temperature: 0.6,
                },
                api_keys: {
                    openaiKey,
                    fireworksKey: fireworksAIKey,
                    customKey: customAIKey,
                    anthropicKey,
                    cohereKey,
                    googleKey,
                    mistralKey,
                    perplexityKey,
                    groqKey,
                    togetherKey
                }
            });
        };

        updateRequestBody();
    }, [model, openaiKey, fireworksAIKey, customAIKey, anthropicKey, cohereKey, googleKey, mistralKey, perplexityKey, groqKey, togetherKey]);

    const { completion, complete, isLoading, error, setCompletion, stop } = useCompletion({
        body: requestBody,
        onError: (err) => {
            console.error(`Error testing model ${model.name}:`, err);
        },
        onFinish: (prompt, completion) => {
            if (setPromptHistory && selectedHistoryItem) {
                console.log("THIS COMPLETION", completion)
                setPromptHistory(prev => ({
                    ...prev,
                    items: prev.items.map(item =>
                        item.id === selectedHistoryItem.id
                            ? {
                                ...item,
                                testResults: {
                                    ...item.testResults,
                                    [model.model_id]: completion
                                }
                            }
                            : item
                    )
                }));
            }
        }
    });

    useImperativeHandle(ref, () => {
        onLoadingChange?.(isLoading);

        return {
            runTest: () => {
                const fullPrompt = testContext ? `${prompt}\n\n${testContext}` : prompt;
                complete(fullPrompt);
            },
            stop,
            isLoading,
            result: completion
        };
    }, [isLoading, stop, onLoadingChange, completion]);;
    useEffect(() => {
        if (model.testResult) {
            setCompletion(model.testResult);
        }
    }, [model.testResult, setCompletion]);
    return (
        <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700">{model.name}</h4>
                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="animate-spin w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                        <span>Testing...</span>
                    </div>
                )}
            </div>

            {error ? (
                <div className="text-red-500 p-3 bg-red-50 rounded-md">
                    <span className="font-medium">Error:</span> {error.message}
                </div>
            ) : (
                <div
                    className={`group relative prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg font-mono text-sm ${isLoading ? 'border-l-4 border-blue-400 cursor-pointer' : ''}`}
                    onClick={() => isLoading && stop()}
                >
                    {isLoading && (
                        <div className="absolute hidden group-hover:flex items-center justify-center inset-0 bg-black/10 backdrop-blur-[1px] transition-all duration-200 rounded-lg">
                            <div className="bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-all duration-200">
                                <FaStop className="w-4 h-4 text-red-500" />
                            </div>
                        </div>
                    )}
                    <ReactMarkdown>
                        {completion || "No response yet"}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
});

TestModel.displayName = 'TestModel';
export default TestModel;