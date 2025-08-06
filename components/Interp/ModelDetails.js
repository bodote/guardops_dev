'use client'
import { FiExternalLink, FiCpu, FiLayers, FiGrid, FiHash } from "react-icons/fi";
import { getHuggingFaceUrl, formatModelConfig } from "@/utils/modelUtils";

const ModelDetails = ({ model }) => {
    if (!model) return null;

    const config = formatModelConfig(model.config);
    const huggingFaceUrl = getHuggingFaceUrl(model.model_id);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-Archivo text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <FiCpu className="w-5 h-5 text-[#D4DB33]" />
                        Model Configuration
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Technical specifications and architecture details
                    </p>
                </div>
                <a
                    href={huggingFaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                >
                    <FiExternalLink className="w-4 h-4" />
                    View on HuggingFace
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Architecture Overview */}
                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FiLayers className="w-4 h-4 text-blue-600" />
                        <h4 className="font-Inter text-sm font-semibold text-slate-800">Architecture</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Model Type:</span>
                            <span className="font-medium text-slate-900 capitalize">{config.modelType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Data Type:</span>
                            <span className="font-medium text-slate-900">{config.dtype}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Hidden Layers:</span>
                            <span className="font-medium text-slate-900">{config.hiddenLayers}</span>
                        </div>
                    </div>
                </div>

                {/* Attention Mechanism */}
                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FiGrid className="w-4 h-4 text-green-600" />
                        <h4 className="font-Inter text-sm font-semibold text-slate-800">Attention</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Attention Heads:</span>
                            <span className="font-medium text-slate-900">{config.attentionHeads}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Key-Value Heads:</span>
                            <span className="font-medium text-slate-900">{config.keyValueHeads}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Head Dimension:</span>
                            <span className="font-medium text-slate-900">{config.headDimension}</span>
                        </div>
                    </div>
                </div>

                {/* Model Dimensions */}
                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FiHash className="w-4 h-4 text-purple-600" />
                        <h4 className="font-Inter text-sm font-semibold text-slate-800">Dimensions</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Hidden Size:</span>
                            <span className="font-medium text-slate-900">{config.hiddenSize}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Vocabulary Size:</span>
                            <span className="font-medium text-slate-900">{config.vocabularySize}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Max Position:</span>
                            <span className="font-medium text-slate-900">{config.maxPosition}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Technical Details */}
            <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="font-Inter text-sm font-semibold text-slate-800 mb-2">Additional Details</h4>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span>
                        <strong>Activation Function:</strong> {config.activationFunction}
                    </span>
                    <span>
                        <strong>Model ID:</strong> {model.model_id}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;