import { useEffect, useCallback } from 'react';
import { useUploadStore } from '../utils/UploadManager';

const FileStatusPoller = ({ fileId, onStatusChange }) => {
    // Get current upload status from the store to check if we should stop polling
    const upload = useUploadStore(state =>
        state.uploads.find(u => u.file_id === fileId)
    );

    const checkStatus = useCallback(async () => {
        // Don't poll if the upload is already finished
        if (upload?.status === 'completed' || upload?.status === 'error') {
            return true; // Stop polling if finished
        }

        try {
            const response = await fetch(`/api/knowledge/file-status/${fileId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Status check failed:', response.status);
                return false;
            }

            const data = await response.json();
            console.log(`Status check for ${fileId}:`, data);

            // Instead of reading data.statuses[fileId],
            // extract the status directly from the returned JSON object.
            const status = data.status;

            if (status) {
                onStatusChange(fileId, status);
                return status === 'completed' || status === 'error';
            }

            return false;
        } catch (error) {
            console.error(`Error checking status for ${fileId}:`, error);
            return false;
        }
    }, [fileId, onStatusChange, upload?.status]);

    useEffect(() => {
        // Do not start polling if already finished.
        if (upload?.status === 'completed' || upload?.status === 'error') {
            return;
        }

        let mounted = true;
        let timeoutId;

        const poll = async () => {
            if (!mounted) return;

            const shouldStop = await checkStatus();
            if (!shouldStop && mounted) {
                timeoutId = setTimeout(poll, 2000);
            }
        };

        poll();

        return () => {
            mounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [checkStatus, upload?.status]);

    return null;
};

export default FileStatusPoller;