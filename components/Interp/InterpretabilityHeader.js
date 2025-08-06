'use client'
import { FiZap, FiSearch, FiEye } from "react-icons/fi";
import { FaMicroscope } from "react-icons/fa";

const InterpretabilityHeader = ({ compact = false }) => {
    if (compact) {
        return (
            <div className="mb-4">
                <div className="flex items-center gap-3 text-center">
                    <div className="p-2 bg-[#D4DB33]/10 rounded-lg">
                        <FaMicroscope className="w-5 h-5 text-[#D4DB33]" />
                    </div>
                    <div className="text-left">
                        <h1 className="font-Archivo text-lg font-bold text-slate-900">
                            LLM Interpretability Explorer
                        </h1>
                        <p className="text-slate-600 text-sm">
                            Continue exploring and analyzing model behavior
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-[#D4DB33]/10 rounded-2xl">
                        <FaMicroscope className="w-8 h-8 text-[#D4DB33]" />
                    </div>
                </div>
                <h1 className="font-Archivo text-3xl font-bold text-slate-900 mb-3">
                    LLM Interpretability Explorer
                </h1>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                    Discover interesting model behaviors through interactive prompting, then dive deeper with mechanistic interpretability analysis
                </p>
            </div>

            {/* Process Steps */}
            <div className="flex justify-center items-center gap-8 mb-6">
                <div className="flex items-center gap-3 text-center">
                    <div className="w-10 h-10 bg-[#D4DB33] text-black rounded-full flex items-center justify-center font-bold text-sm">
                        1
                    </div>
                    <div className="text-left">
                        <div className="font-Inter text-sm font-semibold text-slate-900">Select Model</div>
                        <div className="font-Inter text-xs text-slate-600">Quick setup</div>
                    </div>
                </div>

                <div className="w-8 h-px bg-slate-300"></div>

                <div className="flex items-center gap-3 text-center">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                    </div>
                    <div className="text-left">
                        <div className="font-Inter text-sm font-semibold text-slate-900">Explore Prompts</div>
                        <div className="font-Inter text-xs text-slate-600">Find interesting behaviors</div>
                    </div>
                </div>

                <div className="w-8 h-px bg-slate-300"></div>

                <div className="flex items-center gap-3 text-center">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                    </div>
                    <div className="text-left">
                        <div className="font-Inter text-sm font-semibold text-slate-900">Analyze Tokens</div>
                        <div className="font-Inter text-xs text-slate-600">Mechanistic insights</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterpretabilityHeader;