import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUploadStore = create(
    persist(
        (set, get) => ({
            uploads: [],
            showOverlay: false,

            // Add new uploads to the queue
            addUploads: (newUploads) => {
                set(state => ({
                    uploads: [...state.uploads, ...newUploads],
                    showOverlay: true
                }));
            },

            // Update a specific upload's status
            updateUpload: (id, data) => {
                set(state => ({
                    uploads: state.uploads.map(upload =>
                        upload.id === id ? { ...upload, ...data } : upload
                    ),
                    showOverlay: true
                }));
            },

            // Update by file_id
            updateByFileId: (fileId, data) => {
                set(state => ({
                    uploads: state.uploads.map(upload =>
                        upload.file_id === fileId ? { ...upload, ...data } : upload
                    ),
                    showOverlay: true
                }));
            },

            // Handle status changes from poller
            handleStatusChange: (fileId, status) => {
                set(state => {
                    // Find the upload that matches this fileId
                    const upload = state.uploads.find(u => u.file_id === fileId);
                    if (!upload) return state; // If no matching upload, return unchanged state

                    // Update the upload with new status
                    const updatedUploads = state.uploads.map(u =>
                        u.file_id === fileId
                            ? { ...u, status, progress: status === 'completed' ? 100 : u.progress }
                            : u
                    );

                    return {
                        uploads: updatedUploads,
                        showOverlay: updatedUploads.some(u => u.status !== 'completed')
                    };
                });
            },

            // Clear completed uploads
            clearCompleted: () => {
                set(state => ({
                    uploads: state.uploads.filter(upload => upload.status !== 'completed')
                }));
            },

            // FIXED: Remove a specific upload by ID
            removeUpload: (id) => {
                set(state => ({
                    uploads: state.uploads.filter(upload => upload.id !== id)
                }));
            },

            // Toggle overlay
            toggleOverlay: () => {
                set(state => ({ showOverlay: !state.showOverlay }));
            },

            // FIXED: Set overlay visibility - ALWAYS allow closing
            setShowOverlay: (show) => {
                set({ showOverlay: show });
            },

            // Force close overlay regardless of upload status
            forceCloseOverlay: () => {
                set({ showOverlay: false });
            }
        }),
        {
            name: 'upload-storage',
            getStorage: () => (typeof window !== 'undefined' ? localStorage : null),
            partialize: (state) => ({
                uploads: state.uploads,
                showOverlay: state.showOverlay
            })
        }
    )
);