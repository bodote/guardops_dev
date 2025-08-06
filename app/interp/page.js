'use client'
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import { getUserRole } from "@/helper/getRole";
import Loader from "@/components/Loader/Loader";

// Interpretability Components
import InterpretabilityHeader from "@/components/Interp/InterpretabilityHeader";
import CompactModelSelector from "@/components/Interp/CompactModelSelector";
import ModelDetails from "@/components/Interp/ModelDetails";
import PromptInterface from "@/components/Interp/PromptInterface";
import AnalysisResults from "@/components/Interp/AnalysisResults";
import GenerationLoadingOverlay from "@/components/Interp/GenerationLoadingOverlay";
import { useInterpretability } from "@/hooks/useInterpretability";

const InterpretabilityPage = () => {
    const [role, setRole] = useState("");
    const [loader, setLoader] = useState(true);
    const [showModelDetails, setShowModelDetails] = useState(false);

    const {
        selectedModel,
        setSelectedModel,
        models,
        prompt,
        setPromptValue,
        response,
        isLoading,
        handleGenerate,
        handleClear
    } = useInterpretability();

    const getRole = async () => {
        const roles = await getUserRole();
        if (roles) {
            setRole(roles);
            setLoader(false);
        }
    };

    useEffect(() => {
        getRole();
    }, []);

    return (
        <>
            {loader ? (
                <Loader />
            ) : role.includes("Playground") || role.includes("Full_Access") ? (
                <div className="flex">
                    <Sidebar />
                    <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px]">
                        {/* Header */}
                        <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
                            <div className="flex items-center gap-[5px]">
                                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                                    COAI
                                </h1>
                                <RightIcon />
                                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                                    Interpretability
                                </h1>
                            </div>
                            <Logout />
                        </div>

                        {/* Main Content */}
                        <div className="max-w-7xl mx-auto px-6 py-8">
                            {/* Setup Section - Compact when response exists */}
                            <div className={`transition-all duration-500 ${response ? 'mb-4' : 'mb-8'}`}>
                                <div className={response ? 'transform scale-95 opacity-75' : ''}>
                                    <InterpretabilityHeader compact={!!response} />

                                    <CompactModelSelector
                                        selectedModel={selectedModel}
                                        onModelSelect={setSelectedModel}
                                        models={models}
                                        isLoading={isLoading}
                                        showDetails={showModelDetails}
                                        onToggleDetails={() => setShowModelDetails(!showModelDetails)}
                                        compact={!!response}
                                    />

                                    {selectedModel && showModelDetails && (
                                        <ModelDetails model={selectedModel} />
                                    )}

                                    <PromptInterface
                                        prompt={prompt}
                                        onPromptChange={setPromptValue}
                                        onGenerate={handleGenerate}
                                        onClear={handleClear}
                                        isLoading={isLoading}
                                        selectedModel={selectedModel}
                                        compact={!!response}
                                    />
                                </div>
                            </div>

                            {/* Results Section - Prominent when exists */}
                            {response && (
                                <div className="animate-in slide-in-from-bottom-4 duration-700">
                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 shadow-lg mb-6 p-1">
                                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                                            <AnalysisResults response={response} selectedModel={selectedModel} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Generation Loading Overlay */}
                            <GenerationLoadingOverlay
                                isVisible={isLoading}
                                prompt={prompt}
                                selectedModel={selectedModel}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <p className="text-[20px]">
                        You don't have permission to access this page.
                    </p>
                </div>
            )}
        </>
    );
};

export default InterpretabilityPage;