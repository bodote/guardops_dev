"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon, HubSubscribeIcon } from "@/public/Assets/Icons/Allsvg";
import { getCookie } from "cookies-next";
import { RiDownloadLine, RiCalendarLine, RiLinkM, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const PublicPrompts = ({ searchPrompt }) => {
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleExpand = (templateId) => {
    if (expandedTemplateId === templateId) {
      setExpandedTemplateId(null);
    } else {
      setExpandedTemplateId(templateId);
    }
  };

  const user_id = getCookie("user_id");

  const getTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/prompthub`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const res = await response.json();
      const data = res.data;

      if (data.available_templates) {
        setAvailableTemplates(data.available_templates);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToTemplate = async (e, template_id) => {
    e.stopPropagation();

    const params = { template_id: template_id };
    const response = await fetch(`/api/prompthub/share/subscribe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    getTemplates();
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const filterTemplates = (templates) => {
    return templates.filter((template) =>
      template.name.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.description.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.template.toLowerCase().includes(searchPrompt.toLowerCase()) ||
      template.link.toLowerCase().includes(searchPrompt.toLowerCase())
    );
  };

  const filteredAvailableTemplates = filterTemplates(availableTemplates);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredAvailableTemplates.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <RiDownloadLine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
          <p className="text-gray-500">
            {searchPrompt ?
              "Try adjusting your search terms or browse all available prompts." :
              "No community prompts are available at the moment. Check back later!"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Header */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Community Prompts</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filteredAvailableTemplates.length} prompt{filteredAvailableTemplates.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Updated recently</span>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAvailableTemplates.map((template) => {
          const isExpanded = expandedTemplateId === template.template_id;

          return (
            <div
              key={template.template_id}
              onClick={() => toggleExpand(template.template_id)}
              className={`group bg-white border rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 cursor-pointer ${isExpanded
                  ? 'border-[#D4DB33] ring-2 ring-[#D4DB33]/20'
                  : 'border-gray-200 hover:border-gray-300'
                } overflow-hidden`}
            >
              {/* Card Header */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-lg leading-tight group-hover:text-[#0D859A] transition-colors duration-200">
                    {template.name}
                  </h4>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <button
                      onClick={(e) => subscribeToTemplate(e, template.template_id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4DB33] hover:bg-[#c4d128] text-gray-800 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <RiDownloadLine className="w-4 h-4" />
                      Subscribe
                    </button>
                    <div className="flex items-center text-[#0D859A] transition-colors duration-200">
                      {isExpanded ? (
                        <RiArrowUpSLine className="w-5 h-5" />
                      ) : (
                        <RiArrowDownSLine className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <RiCalendarLine className="w-3 h-3" />
                    <span>Community</span>
                  </div>
                  {template.link && (
                    <div className="flex items-center gap-1">
                      <RiLinkM className="w-3 h-3" />
                      <span className="truncate max-w-20">{template.link}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 -mx-4 -mb-4 mt-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Prompt Template
                      </span>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                        {template.template}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load More (Future Enhancement) */}
      {filteredAvailableTemplates.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing all {filteredAvailableTemplates.length} available prompts
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicPrompts;
