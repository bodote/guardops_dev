"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon, HubDeleteIcon, HubShareIcon, HubUnshareIcon, HubRefreshIcon } from "@/public/Assets/Icons/Allsvg";
import { getCookie } from "cookies-next";
import { RiShareLine, RiLockLine, RiDownloadLine, RiRefreshLine, RiDeleteBinLine, RiArrowDownSLine, RiArrowUpSLine, RiCalendarLine, RiLinkM } from "react-icons/ri";

const MyPrompts = ({ searchPrompt }) => {
  const [unsharedTemplates, setUnsharedTemplates] = useState([]);
  const [sharedTemplates, setSharedTemplates] = useState([]);
  const [subscribedTemplates, setSubscribedTemplates] = useState([]);
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
      if (data.unshared_templates) {
        setUnsharedTemplates(data.unshared_templates);
      }
      if (data.shared_templates) {
        setSharedTemplates(data.shared_templates);
      }
      if (data.subscribed_templates) {
        setSubscribedTemplates(data.subscribed_templates);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const unshareTemplate = async (e, template_id) => {
    e.stopPropagation();

    const params = { template_id: template_id };
    const response = await fetch(`/api/prompthub`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    console.log(res);
    getTemplates();
  };

  const shareTemplate = async (e, template_id) => {
    e.stopPropagation();

    const params = { template_id: template_id, share: true };
    const response = await fetch(`/api/prompthub/share`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    console.log(res);
    getTemplates();
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

  const deleteTemplate = async (e, template_id) => {
    e.stopPropagation();

    const params = { template_id: template_id };
    const response = await fetch(`/api/prompthub`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    console.log(res);
    getTemplates();
  };

  const updateTemplate = async (e, template_id) => {
    e.stopPropagation();
    await deleteTemplate(e, template_id);
    await subscribeToTemplate(e, template_id);
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

  const filteredSharedTemplates = filterTemplates(sharedTemplates);
  const filteredUnsharedTemplates = filterTemplates(unsharedTemplates);
  const filteredSubscribedTemplates = filterTemplates(subscribedTemplates);

  const TemplateCard = ({ template, type, index }) => {
    const isExpanded = expandedTemplateId === template.template_id;

    return (
      <div
        onClick={() => toggleExpand(template.template_id)}
        className={`group bg-white border rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 cursor-pointer ${isExpanded
            ? 'border-[#D4DB33] ring-2 ring-[#D4DB33]/20'
            : 'border-gray-200 hover:border-gray-300'
          } overflow-hidden`}
      >
        <div className="mb-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 text-lg leading-tight truncate group-hover:text-[#0D859A] transition-colors duration-200">
                  {template.name}
                </h4>
                {type === 'shared' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <RiShareLine className="w-3 h-3 mr-1" />
                    Shared
                  </span>
                )}
                {type === 'private' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <RiLockLine className="w-3 h-3 mr-1" />
                    Private
                  </span>
                )}
                {type === 'subscribed' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <RiDownloadLine className="w-3 h-3 mr-1" />
                    Subscribed
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {template.description}
              </p>
            </div>

            {/* Action Button and Expand Arrow */}
            <div className="ml-3 flex items-center gap-2 flex-shrink-0">
              {type === 'shared' && (
                <button
                  onClick={(e) => unshareTemplate(e, template.template_id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  title="Unshare this prompt"
                >
                  <RiArrowUpSLine className="w-4 h-4" />
                  Unshare
                </button>
              )}
              {type === 'private' && (
                <button
                  onClick={(e) => shareTemplate(e, template.template_id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4DB33] hover:bg-[#c4d128] text-gray-800 rounded-lg text-sm font-medium transition-colors duration-200"
                  title="Share this prompt with the community"
                >
                  <RiShareLine className="w-4 h-4" />
                  Share
                </button>
              )}
              {type === 'subscribed' && (
                template.update_available ? (
                  <button
                    onClick={(e) => updateTemplate(e, template.template_id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-sm font-medium transition-colors duration-200"
                    title="Update to latest version"
                  >
                    <RiRefreshLine className="w-4 h-4" />
                    Update
                  </button>
                ) : (
                  <button
                    onClick={(e) => deleteTemplate(e, template.template_id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                    title="Remove from your library"
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                    Remove
                  </button>
                )
              )}

              <div className="flex items-center text-[#0D859A] transition-colors duration-200">
                {isExpanded ? (
                  <RiArrowUpSLine className="w-5 h-5" />
                ) : (
                  <RiArrowDownSLine className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <RiCalendarLine className="w-3 h-3" />
              <span>My Library</span>
            </div>
            {template.link && (
              <div className="flex items-center gap-1">
                <RiLinkM className="w-3 h-3" />
                <span className="truncate max-w-24">{template.link}</span>
              </div>
            )}
            {template.update_available && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                Update Available
              </span>
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
  };

  const Section = ({ title, templates, type, icon, description }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gray-100">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {templates.length}
        </span>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="max-w-sm mx-auto">
            {icon}
            <h4 className="text-lg font-medium text-gray-900 mb-2 mt-4">{`No ${type} prompts`}</h4>
            <p className="text-gray-500 text-sm">
              {type === 'shared' && "Share your prompts with the community to see them here."}
              {type === 'private' && "Create new prompts or import them to see them here."}
              {type === 'subscribed' && "Subscribe to community prompts to see them here."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={template.template_id}
              template={template}
              type={type}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );

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

  return (
    <div className="p-6">
      {/* Overview Stats */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <RiShareLine className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Shared</p>
                <p className="text-2xl font-bold text-green-600">{filteredSharedTemplates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <RiLockLine className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Private</p>
                <p className="text-2xl font-bold text-gray-600">{filteredUnsharedTemplates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <RiDownloadLine className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Subscribed</p>
                <p className="text-2xl font-bold text-blue-600">{filteredSubscribedTemplates.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Templates */}
      <Section
        title="Shared with Community"
        templates={filteredSharedTemplates}
        type="shared"
        icon={<RiShareLine className="w-5 h-5 text-green-600" />}
        description="Prompts you've shared with the COAI community"
      />

      {/* Private Templates */}
      <Section
        title="Private Library"
        templates={filteredUnsharedTemplates}
        type="private"
        icon={<RiLockLine className="w-5 h-5 text-gray-600" />}
        description="Your personal prompts not shared with others"
      />

      {/* Subscribed Templates */}
      <Section
        title="Subscribed Prompts"
        templates={filteredSubscribedTemplates}
        type="subscribed"
        icon={<RiDownloadLine className="w-5 h-5 text-blue-600" />}
        description="Community prompts you've added to your library"
      />
    </div>
  );
};

export default MyPrompts;
