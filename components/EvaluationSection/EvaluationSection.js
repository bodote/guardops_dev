import React from "react";
import {
  PlusIcon,
} from "@/public/Assets/Icons/Allsvg";

const EvaluationSection = () => {
  return (
    <div className="sm:px-[55px] px-[16px] pb-8">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-slate-600 text-sm">Create runs for evaluating your models using datasets</p>
          <div className="flex items-center justify-between">
            <h1 className="font-Archivo text-[32px] font-thin text-slate-900">Evaluations</h1>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] transform"
              >
                <PlusIcon className="w-4 h-4 stroke-current" />
                New Evaluation
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <PlusIcon className="w-10 h-10 stroke-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">No evaluations yet</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">Get started by creating your first evaluation run to test your models</p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white rounded-xl font-Archivo text-sm font-medium transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4 stroke-current" />
              Create Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSection;
