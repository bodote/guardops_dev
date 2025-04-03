import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

// Simple in-memory job storage - in production, use a database
const activeJobs = new Map();

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        const jobId = searchParams.get('job_id');
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const token = await getToken();

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Handle status check request
        if (action === 'status' && jobId) {
            // Check if job exists in our memory store
            const job = activeJobs.get(jobId);

            if (!job) {
                return Response.json({
                    data: {
                        status: "not_found",
                        message: "Job not found or expired"
                    }
                });
            }

            // If job is completed or failed, remove it from memory after sending
            if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
                // Return the result, but keep the job for a short while for repeated requests
                setTimeout(() => {
                    activeJobs.delete(jobId);
                }, 60 * 1000); // Remove after 1 minute
            }

            return Response.json({ data: job });
        }

        return Response.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        const cancelJobId = searchParams.get('job_id');

        // Handle cancellation request
        if (action === 'cancel' && cancelJobId) {
            const cookieStore = cookies();
            const user = cookieStore.get("user_id").value;
            const token = await getToken();

            if (!token) {
                return Response.json({ error: "Unauthorized" }, { status: 401 });
            }

            // Check if job exists
            const job = activeJobs.get(cancelJobId);
            if (!job) {
                return Response.json({
                    data: {
                        status: "not_found",
                        message: "Job not found or already completed"
                    }
                });
            }

            // Mark the job as cancelled
            job.status = 'cancelled';
            job.error = 'Job was cancelled by user';

            // In a production app, you would call your backend to cancel the job
            // For now, we'll just update our in-memory store

            return Response.json({
                data: {
                    status: "cancelled",
                    message: "Job cancelled successfully"
                }
            });
        }

        // Handle normal optimization request
        const bodyData = await req.json();
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Create a job ID
        const jobId = Date.now().toString();

        // Store job in memory
        activeJobs.set(jobId, {
            id: jobId,
            user_id: user,
            store_id: bodyData.store_id,
            item_id: bodyData.item_id, // Optional: related history item ID
            target_behavior: bodyData.target_behavior,
            status: 'processing',
            created_at: new Date().toISOString()
        });

        // Create AbortController with a longer timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();

            // Update job status on timeout
            const job = activeJobs.get(jobId);
            if (job) {
                job.status = 'failed';
                job.error = 'Request timed out - RAG optimization took too long';
            }
        }, 15 * 60 * 1000); // 15 minute timeout

        const Url = `${baseUrl}api/optimize_rag_prompt`;
        const queryParams = new URLSearchParams({
            user_id: user,
            store_id: bodyData.store_id,
            target_behavior: bodyData.target_behavior
        });
        const urlWithParams = `${Url}?${queryParams}`;

        try {
            // Set both the signal and the specialized Fetch API options
            const response = await fetch(urlWithParams, {
                method: "POST",
                headers: new Headers({
                    authorization: `Bearer ${token}`,
                }),
                signal: controller.signal,
                // Add Fetch API timeout configuration
                next: {
                    revalidate: 0,
                    // Increase headers timeout to 15 minutes
                    fetchOptions: {
                        headersTimeout: 15 * 60 * 1000, // 15 minutes for headers
                        bodyTimeout: 15 * 60 * 1000,    // 15 minutes for body
                    }
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Update job status on error
                const job = activeJobs.get(jobId);
                if (job) {
                    job.status = 'failed';
                    job.error = `HTTP error! status: ${response.status}`;
                }

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Update job with result
            const job = activeJobs.get(jobId);
            if (job) {
                job.status = 'completed';
                job.result = data;
                job.completed_at = new Date().toISOString();
            }

            // Return job ID and status for immediate feedback
            return Response.json({
                data: {
                    job_id: jobId,
                    status: "processing",
                    message: "Optimization job started successfully. Poll the status endpoint for updates."
                }
            });
        } catch (error) {
            // Update job status on error if we haven't already
            const job = activeJobs.get(jobId);
            if (job && job.status !== 'failed') {
                job.status = 'failed';
                job.error = error.message || "Unknown error";
            }

            if (error.name === 'AbortError') {
                return Response.json({
                    error: "Request timed out - RAG optimization is taking too long",
                    job_id: jobId,
                    status: "failed"
                }, { status: 504 });
            }

            console.error("Error:", error);
            return Response.json({
                error: "Internal Server Error",
                job_id: jobId,
                status: "failed"
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}