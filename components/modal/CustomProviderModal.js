import React, { useState, useEffect } from "react";

const CustomProviderModal = ({ isOpen, onClose, onSubmit, editProvider = null }) => {
    const [name, setName] = useState("");
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        if (editProvider) {
            setName(editProvider.name);
            setBaseUrl(editProvider.baseUrl);
        } else {
            setName("");
            setBaseUrl("");
        }
    }, [editProvider]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, baseUrl, provider_id: editProvider?.provider_id });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h2 className="text-xl mb-4">{editProvider ? 'Edit' : 'Add'} Custom Provider</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Provider Name</label>
                        <input
                            type="text"
                            placeholder="Enter provider name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Base URL</label>
                        <input
                            type="text"
                            placeholder="Enter base URL"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#D4DB33] px-4 py-2 rounded"
                        >
                            {editProvider ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomProviderModal;