import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaSpinner, FaCheck, FaExclamationTriangle, FaEyeSlash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useUploadStore } from '../utils/UploadManager';
import FileStatusPoller from './FileStatusPoller';

const UploadProgressOverlay = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    // Get all needed actions from the store
    const {
        uploads,
        showOverlay,
        removeUpload,
        forceCloseOverlay,
        clearCompleted,
        handleStatusChange
    } = useUploadStore();

    const overlayRef = useRef(null);
    const [hoveredUploadId, setHoveredUploadId] = useState(null);
    // Local state to manage whether the overlay is minimized or expanded
    const [minimized, setMinimized] = useState(false);

    const handleMinimize = () => {
        setMinimized(true);
    };

    const handleMaximize = () => {
        setMinimized(false);
    };

    const calculateOverallProgress = () => {
        if (!uploads.length) return 0;
        const completedCount = uploads.filter(u => u.status === 'completed').length;
        const errorCount = uploads.filter(u => u.status === 'error').length;
        const finishedCount = completedCount + errorCount;
        return Math.round((finishedCount / uploads.length) * 100);
    };

    useEffect(() => {
        const hasCompletedUploads = uploads.some(u => u.status === 'completed');
        const allFinished = uploads.every(u =>
            u.status === 'completed' || u.status === 'error'
        );

        let timer;
        if (hasCompletedUploads || allFinished) {
            timer = setTimeout(() => {
                clearCompleted();
                if (allFinished) {
                    forceCloseOverlay();
                }
            }, 3000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [uploads, clearCompleted, forceCloseOverlay]);

    // Only display the overlay if there are uploads and the global showOverlay is true.
    if (!uploads.length || !showOverlay) return null;

    // When minimized, display a small fixed button to maximize the upload overlay.
    if (minimized) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={handleMaximize}
                    className="bg-white shadow-lg rounded-full p-2 border border-gray-200 flex items-center"
                >
                    <FaChevronUp className="mr-1" />
                    <span className="text-sm font-bold">Show Uploads</span>
                </button>
            </div>
        );
    }

    // Determine which uploads should be polled.
    const processingUploads = uploads.filter(u =>
        u.status !== 'completed' &&
        u.status !== 'error' &&
        u.file_id
    );

    return (
        <div
            ref={overlayRef}
            className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
        >
            {processingUploads.map(upload => (
                <FileStatusPoller
                    key={upload.file_id}
                    fileId={upload.file_id}
                    onStatusChange={handleStatusChange}
                />
            ))}

            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm">Processing Files</h3>
                <button
                    className="text-gray-500 hover:text-gray-700 h-6 w-6 flex items-center justify-center"
                    onClick={handleMinimize}
                >
                    <FaChevronDown />
                </button>
            </div>

            <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-coai-blue h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${calculateOverallProgress()}%` }}
                    />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {calculateOverallProgress()}% Complete
                </div>
            </div>

            <div className="max-h-40 overflow-y-auto">
                {uploads.map(upload => (
                    <div
                        key={upload.id}
                        className="py-1.5 border-b border-gray-100 flex items-center relative group"
                        onMouseEnter={() => setHoveredUploadId(upload.id)}
                        onMouseLeave={() => setHoveredUploadId(null)}
                    >
                        {hoveredUploadId === upload.id && (
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeUpload(upload.id);
                                }}
                            >
                                <FaEyeSlash className="text-gray-400 hover:text-gray-600 text-sm" />
                            </button>
                        )}

                        <div className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            {upload.status === 'processing' ? (
                                <FaSpinner className="animate-spin text-coai-blue" />
                            ) : upload.status === 'completed' ? (
                                <FaCheck className="text-green-500" />
                            ) : upload.status === 'error' ? (
                                <FaExclamationTriangle className="text-red-500" />
                            ) : (
                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                            )}
                        </div>

                        <div className="flex-grow truncate pr-6">
                            <div className="text-sm truncate">{upload.fileName}</div>
                            {upload.status === 'error' && (
                                <div className="text-xs text-red-500">
                                    Failed: {upload.error || 'Processing error'}
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-gray-400 ml-1">
                            {upload.file_id?.substring(0, 4) || ''}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-2 text-xs text-gray-500">
                {uploads.filter(u => u.status === 'completed').length} of {uploads.length} completed
            </div>
        </div>
    );
};

export default UploadProgressOverlay;