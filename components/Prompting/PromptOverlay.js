import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { toast } from 'react-toastify';
import 'highlight.js/styles/atom-one-dark.css';
const hljs = require('highlight.js/lib/common');

const PromptOverlay = ({ isOpen, onClose, prompt, title = "Generated Prompt", onUpdate, setPrompt }) => {
    const [editedPrompt, setEditedPrompt] = useState(prompt);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showSaveTemplate, setShowSaveTemplate] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    useEffect(() => {
        if (isOpen) {
            hljs.highlightAll();
        }
    }, [isOpen, editedPrompt]);

    useEffect(() => {
        setEditedPrompt(prompt);
    }, [prompt]);


    if (!isOpen) return null;

    const parseContentSegments = (content) => {
        const segments = [];
        const codeBlockRegex = /```(.*?)```/gs;
        let lastIndex = 0;

        content?.replace(codeBlockRegex, (match, codeBlock, index) => {
            // Add text before code block
            if (index > lastIndex) {
                segments.push({
                    type: "text",
                    content: content.slice(lastIndex, index),
                });
            }
            // Add code block
            segments.push({ type: "code", content: codeBlock });
            lastIndex = index + match.length;
        });

        // Add remaining text after last code block
        if (content && lastIndex < content.length) {
            segments.push({ type: "text", content: content.slice(lastIndex) });
        }
        return segments;
    };

    const handleStartEditing = (index, content) => {
        setEditingIndex(index);
        setEditingContent(content);
    };

    const handleSaveEdit = (index) => {
        const segments = parseContentSegments(editedPrompt);
        segments[index].content = editingContent;
        const newPrompt = segments.map(s =>
            s.type === 'code' ? '```' + s.content + '```' : s.content
        ).join('');
        setEditedPrompt(newPrompt);
        setEditingIndex(null);
    };

    const handleClose = () => {
        if (editedPrompt !== prompt) {  // Only update if there are changes
            setPrompt(editedPrompt);
        }
        onClose();
    };


    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingContent('');
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSaveEdit(index);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancelEdit();
        }
    };

    const copyToClipboard = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(id);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleSaveTemplate = async () => {
        if (templateName.trim() === "") {
            toast.error("Please enter a template name!");
            return false;
        }
        const segments = parseContentSegments(editedPrompt);
        const fullPrompt = segments.map(s =>
            s.type === 'code' ? '```' + s.content + '```' : s.content
        ).join('');

        const formData = {
            template_name: templateName,
            template_description: "Prompt saved by prompting process",
            template_link: "",
            template: fullPrompt,
        };

        try {
            const response = await fetch("/api/manageTemplates", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();

            if (response.ok) {
                toast.success("Template created successfully!");
                setShowSaveTemplate(false);
                setTemplateName('');
            } else {
                toast.error(responseData.detail);
                console.error("API request failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during API request:", error);
            toast.error("Failed to save template");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-medium">{title}</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSaveTemplate(true)}
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                        >
                            <FaSave className="w-3 h-3" />
                            Save as Template
                        </button>
                        <button
                            onClick={handleClose} // Changed from onClose to handleClose
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaTimes className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="bg-gray-50 rounded-lg">
                        {parseContentSegments(editedPrompt).map((segment, index) =>
                            segment.type === 'code' ? (

                                <pre key={index} className="text-sm overflow-hidden border-t rounded-lg mt-5 mb-5 hljs">
                                    <div className="w-full flex justify-between pr-5 pb-0.5 pt-1.5 bg-gray-700 text-neutral-200">
                                        <div className="flex items-center pl-4">
                                            {editingIndex === index && (
                                                <>
                                                    <button
                                                        onClick={() => handleSaveEdit(index)}
                                                        className="text-green-400 hover:text-green-300 mr-2"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(segment.content, `${segment.content}-${index}`)}
                                        >
                                            {copiedIndex === `${segment.content}-${index}` ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <code
                                        contentEditable={true}
                                        onFocus={() => handleStartEditing(index, segment.content)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onInput={(e) => setEditingContent(e.target.textContent)}
                                        className="block p-4"
                                    >
                                        {segment.content}
                                    </code>
                                </pre>
                            ) : (
                                <div key={index} className="relative group p-4">
                                    {editingIndex === index && (
                                        <div className="absolute right-4 top-4 flex gap-2 bg-white shadow-sm rounded p-1">
                                            <button
                                                onClick={() => handleSaveEdit(index)}
                                                className="text-green-600 hover:text-green-700"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    {editingIndex === index ? (
                                        <textarea
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-full h-full min-h-[100px] prose max-w-none focus:outline-none p-2 border rounded"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => handleStartEditing(index, segment.content)}
                                            className="cursor-text"
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    ul: ({ node, ...props }) => (
                                                        <ul style={{ display: 'block', listStyleType: 'disc', paddingInlineStart: '40px' }} {...props} />
                                                    ),
                                                    ol: ({ node, ...props }) => (
                                                        <ol style={{ display: 'block', listStyleType: 'decimal', paddingInlineStart: '40px' }} {...props} />
                                                    ),
                                                    h1: ({ node, ...props }) => (
                                                        <h1 className="font-bold text-6xl" {...props} />
                                                    ),
                                                }}
                                                remarkPlugins={[gfm]}
                                            >
                                                {segment.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Save Template Modal */}
                {showSaveTemplate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-medium mb-4">Save as Template</h3>
                            <input
                                type="text"
                                placeholder="Template name"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowSaveTemplate(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveTemplate}
                                    disabled={!templateName.trim()}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptOverlay;