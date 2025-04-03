import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const bodyData = await req.json();
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const Url = `${baseUrl}api/optimize_rag_prompt`;
        const queryParams = new URLSearchParams({
            user_id: user,
            store_id: bodyData.store_id,
            target_behavior: bodyData.target_behavior
        });
        const urlWithParams = `${Url}?${queryParams}`;

        // Set a longer timeout for this request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15 * 60 * 1000); // 15 minute timeout

        try {
            const response = await fetch(urlWithParams, {
                method: "POST",
                headers: new Headers({
                    authorization: `Bearer ${token}`,
                }),
                signal: controller.signal,
                next: {
                    revalidate: 0,
                    fetchOptions: {
                        headersTimeout: 15 * 60 * 1000, // 15 minutes for headers
                        bodyTimeout: 15 * 60 * 1000,    // 15 minutes for body
                    }
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return Response.json(data);
        } catch (error) {
            if (error.name === 'AbortError') {
                return Response.json({
                    error: "Request timed out - RAG optimization is taking too long",
                    status: "failed"
                }, { status: 504 });
            }

            console.error("Error:", error);
            return Response.json({
                error: "Internal Server Error",
                status: "failed"
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 