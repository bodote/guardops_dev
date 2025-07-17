import { DeteleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus, FiKey, FiCopy, FiTrash2, FiCalendar, FiClock, FiAlertCircle } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Apimanagement = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [keyDetails, setkeyDetails] = useState([]);
  const [latestGeneratedKey, setLatestGeneratedKey] = useState("");
  const [deletedKey, setDeletedKey] = useState("");

  const getUserKeyDetails = async () => {
    try {
      const response = await fetch(`/api/manageKeys`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.keys) {
          setkeyDetails(responseData.keys);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const ganerateNewKey = async () => {
    try {
      const response = await fetch("/api/manageKeys", {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setLatestGeneratedKey(responseData);
          getUserKeyDetails();
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleDeleteKey = async () => {
    const formData = {
      key_hash: deletedKey.hash,
    };
    try {
      const response = await fetch("/api/manageKeys", {
        method: "DELETE",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setLatestGeneratedKey(responseData);
          getUserKeyDetails();
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleCopyText = () => {
    if (latestGeneratedKey) {
      navigator.clipboard
        .writeText(latestGeneratedKey)
        .then(() => {
          setModal(false);
        })
        .catch((err) => {
          console.error("Unable to copy text: ", err);
        });
    }
  };

  useEffect(() => {
    getUserKeyDetails();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#D4DB33] to-[#D4DB33]/80 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiKey className="w-8 h-8 text-black" />
        </div>
        <h2 className="font-Archivo text-2xl font-bold text-slate-900 mb-2">
          API Key Management
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Secure API keys for integrating with COAI monitoring services
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-amber-800 font-Archivo font-medium text-sm">
              Security Guidelines
            </p>
            <div className="text-amber-700 font-Archivo text-sm space-y-1">
              <p>• Keep your API keys confidential and never expose them in client-side code</p>
              <p>• COAI does NOT automatically deactivate any publicly leaked keys</p>
              <p>• API keys are only displayed ONCE during generation - save them securely</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-Archivo text-lg font-semibold text-slate-900">
            Active API Keys
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            {keyDetails.length} {keyDetails.length === 1 ? 'key' : 'keys'} configured
          </p>
        </div>

        {keyDetails.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-Archivo text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiKey className="w-4 h-4" />
                      Name
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-Archivo text-sm font-semibold text-slate-700">
                    Key Preview
                  </th>
                  <th className="text-left py-4 px-6 font-Archivo text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      Created
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-Archivo text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      Last Used
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 font-Archivo text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {keyDetails.map((val, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#D4DB33]/10 rounded-lg flex items-center justify-center">
                          <FiKey className="w-4 h-4 text-[#D4DB33]" />
                        </div>
                        <span className="font-Archivo text-sm font-medium text-slate-900">
                          API Key {i + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <code className="bg-slate-100 px-3 py-1 rounded-lg font-mono text-sm text-slate-700">
                        {val.hint}
                      </code>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-Archivo text-sm text-slate-600">
                        {val.created}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-Archivo text-sm text-slate-600">
                        {val.lastused || 'Never'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setDeletedKey(val);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-Archivo text-sm font-medium"
                        title="Delete API key"
                      >
                        <FiTrash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiKey className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">
              No API Keys
            </h3>
            <p className="text-slate-600 mb-4">
              Create your first API key to start integrating with COAI services
            </p>
          </div>
        )}
      </div>

      {/* Create New Key Button */}
      <div className="text-center">
        <button
          onClick={() => {
            setModal(true);
            ganerateNewKey();
          }}
          className="inline-flex items-center gap-2 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white font-Archivo font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
        >
          <FiPlus className="w-4 h-4" />
          Create New API Key
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all w-full max-w-md">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <FiTrash2 className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="font-Archivo text-lg font-semibold text-slate-900">
                        Delete API Key
                      </h3>
                    </div>

                    <p className="text-slate-600 font-Archivo text-sm mb-4 leading-relaxed">
                      This API key will be permanently deleted. All applications using this key will stop working immediately.
                    </p>

                    <div className="bg-slate-50 rounded-lg p-3 mb-6">
                      <code className="font-mono text-sm text-slate-700">
                        {deletedKey.hint}
                      </code>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 text-slate-600 hover:text-slate-800 font-Archivo text-sm font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setOpen(false);
                          handleDeleteKey();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-Archivo text-sm font-medium rounded-lg transition-all duration-200"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* New Key Generated Modal */}
      <Transition.Root show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all w-full max-w-lg">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#D4DB33]/20 rounded-full flex items-center justify-center">
                        <FiKey className="w-5 h-5 text-[#D4DB33]" />
                      </div>
                      <h3 className="font-Archivo text-lg font-semibold text-slate-900">
                        API Key Generated
                      </h3>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                      <p className="text-amber-800 font-Archivo text-sm">
                        ⚠️ This key will only be shown once. Please copy and store it securely.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <code className="font-mono text-sm text-slate-700 break-all">
                        {latestGeneratedKey}
                      </code>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setModal(false)}
                        className="px-4 py-2 text-slate-600 hover:text-slate-800 font-Archivo text-sm font-medium transition-colors duration-200"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleCopyText}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4DB33] hover:bg-[#0D859A] text-black hover:text-white font-Archivo text-sm font-medium rounded-lg transition-all duration-200"
                      >
                        <FiCopy className="w-4 h-4" />
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Apimanagement;
