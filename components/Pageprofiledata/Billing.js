import React from "react";
import { FiDollarSign, FiClock, FiZap, FiShield } from "react-icons/fi";

const Billing = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#D4DB33] to-[#D4DB33]/80 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiDollarSign className="w-8 h-8 text-black" />
        </div>
        <h2 className="font-Archivo text-2xl font-bold text-slate-900 mb-2">
          Billing & Subscription
        </h2>
        <p className="text-slate-600 text-lg">
          Currently in beta phase - free access to all features
        </p>
      </div>

      {/* Beta Status Card */}
      <div className="bg-gradient-to-br from-[#D4DB33]/10 to-[#0D859A]/10 border border-[#D4DB33]/20 rounded-xl p-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4DB33]/20 text-[#D4DB33] px-4 py-2 rounded-full font-Archivo font-semibold text-sm mb-4">
            <FiZap className="w-4 h-4" />
            BETA PHASE
          </div>
          <h3 className="font-Archivo text-xl font-bold text-slate-900 mb-3">
            Free Access During Beta
          </h3>
          <p className="text-slate-600 font-Archivo text-base leading-relaxed max-w-2xl mx-auto">
            You're currently enjoying free access to all COAI monitoring features during our beta phase.
            Subscription plans and billing will be introduced after the beta period concludes.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#D4DB33]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FiZap className="w-6 h-6 text-[#D4DB33]" />
          </div>
          <h4 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">
            Full Feature Access
          </h4>
          <p className="text-slate-600 font-Archivo text-sm">
            Complete access to all monitoring, analytics, and playground features
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#0D859A]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-6 h-6 text-[#0D859A]" />
          </div>
          <h4 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">
            No Usage Limits
          </h4>
          <p className="text-slate-600 font-Archivo text-sm">
            Unlimited API calls and data retention during beta
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FiClock className="w-6 h-6 text-slate-500" />
          </div>
          <h4 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">
            Early Access Benefits
          </h4>
          <p className="text-slate-600 font-Archivo text-sm">
            Be among the first to experience our advanced monitoring platform
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-Archivo text-lg font-semibold text-slate-900 mb-4 text-center">
          What's Coming After Beta
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#D4DB33]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-[#D4DB33] rounded-full"></div>
            </div>
            <div>
              <h4 className="font-Archivo font-medium text-slate-900 text-sm">Flexible Pricing Plans</h4>
              <p className="text-slate-600 font-Archivo text-sm">Choose from options such as startup, professional, and enterprise tiers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#D4DB33]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-[#D4DB33] rounded-full"></div>
            </div>
            <div>
              <h4 className="font-Archivo font-medium text-slate-900 text-sm">Usage-Based Billing</h4>
              <p className="text-slate-600 font-Archivo text-sm">Pay only for what you use with transparent pricing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#D4DB33]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-[#D4DB33] rounded-full"></div>
            </div>
            <div>
              <h4 className="font-Archivo font-medium text-slate-900 text-sm">Advanced Features</h4>
              <p className="text-slate-600 font-Archivo text-sm">Premium analytics, custom integrations, and priority support</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-8">
        <p className="text-slate-600 font-Archivo text-sm mb-4">
          We'll notify you well in advance before the beta phase ends
        </p>
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-Archivo text-sm">
          <FiClock className="w-4 h-4" />
          Beta access continues indefinitely
        </div>
      </div>
    </div>
  );
};

export default Billing;
