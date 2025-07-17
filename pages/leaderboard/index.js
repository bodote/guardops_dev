import React, { useEffect, useState } from "react";
import { RightIcon, ThreeDotsIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RiTrophyLine, RiMedalLine, RiAwardLine, RiStarLine, RiMoreLine, RiRocketLine } from "react-icons/ri";

const Leaderboard = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let rank = 1;

  const getModels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/manageModels`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.models) {
        setModels(data.models.sort((a, b) => (b.elo || 0) - (a.elo || 0)));
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <RiTrophyLine className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <RiMedalLine className="w-5 h-5 text-gray-400" />;
      case 3:
        return <RiAwardLine className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-500">{position}</span>;
    }
  };

  const getProviderColor = (provider) => {
    const colors = {
      'OpenAI': 'bg-green-100 text-green-800',
      'Anthropic': 'bg-orange-100 text-orange-800',
      'Google': 'bg-blue-100 text-blue-800',
      'Custom': 'bg-purple-100 text-purple-800',
      'Mistral': 'bg-red-100 text-red-800',
      'Cohere': 'bg-indigo-100 text-indigo-800',
    };
    return colors[provider] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return price.split(" / ")[0];
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 sm:ml-[96px] ml-[72px]">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-Archivo text-sm font-medium text-gray-600">COAI</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-gray-600">Monitoring</span>
              <RightIcon className="w-3 h-3 text-gray-400" />
              <span className="font-Archivo text-sm font-medium text-[#0D859A]">Leaderboard</span>
            </div>
            <Logout />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#0D859A] to-[#0A6B7A] rounded-xl">
                <RiTrophyLine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-Archivo font-light text-gray-900">
                  Model Leaderboard
                </h1>
                <p className="text-gray-600 text-base mt-1">
                  Performance rankings based on ELO ratings from community evaluations
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <RiTrophyLine className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {models.filter(m => m.user_id === "0").length}
                    </p>
                    <p className="text-sm text-gray-600">Official Models</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RiRocketLine className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {models.filter(m => m.user_id !== "0").length}
                    </p>
                    <p className="text-sm text-gray-600">Custom Models</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <RiStarLine className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {Math.max(...models.map(m => m.elo || 0))}
                    </p>
                    <p className="text-sm text-gray-600">Highest Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Rankings</h2>
              <p className="text-sm text-gray-600 mt-1">Models ranked by performance score</p>
            </div>

            {isLoading ? (
              <div className="p-6">
                <LoadingSkeleton />
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {models.map((model, index) => {
                  const isCustom = model.user_id !== "0";
                  const currentRank = isCustom ? null : rank++;

                  return (
                    <div
                      key={model.model_id}
                      className={`p-6 transition-all duration-200 hover:bg-gray-50 ${isCustom ? 'bg-gradient-to-r from-[#D4DB33]/10 to-transparent border-l-4 border-l-[#D4DB33]' : ''
                        }`}
                    >
                      <div className="flex items-center gap-6">
                        {/* Rank */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50">
                          {isCustom ? (
                            <RiRocketLine className="w-5 h-5 text-[#D4DB33]" />
                          ) : (
                            getRankIcon(currentRank)
                          )}
                        </div>

                        {/* Model Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {model.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(model.provider)}`}>
                              {model.provider}
                            </span>
                            {isCustom && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Custom
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{model.id1}</p>
                          <p className="text-xs text-gray-500">{model.model_description}</p>
                        </div>

                        {/* Context & Pricing */}
                        <div className="hidden sm:block text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {model.context?.toLocaleString()} tokens
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatPrice(model.input_price)}/{formatPrice(model.output_price)} € per token
                          </div>
                        </div>

                        {/* Score */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${isCustom
                                ? 'bg-[#D4DB33] text-gray-900'
                                : 'bg-green-100 text-green-800'
                              }`}>
                              {model.elo || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">ELO Score</div>
                          </div>

                          {/* Actions */}
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <RiMoreLine className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!isLoading && models.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <RiTrophyLine className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Models Found</h3>
                <p className="text-gray-600">
                  No models have been evaluated yet. Start using the playground to generate rankings.
                </p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[#D4DB33]/20 to-transparent border-l-2 border-l-[#D4DB33]"></div>
                <span className="text-gray-600">Custom Models (User-created)</span>
              </div>
              <div className="flex items-center gap-2">
                <RiTrophyLine className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600">Official Models (Provider-hosted)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
