import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function GET(req, { params }) {
    try {
        const taskId = params.taskId;
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const queryParams = new URLSearchParams({
            user_id: user
        });
        const Url = `${baseUrl}api/optimize_rag_prompt/status/${taskId}?${queryParams}`;

        console.log("Backend status URL:", Url);

        const response = await fetch(Url, {
            method: "GET",
            headers: new Headers({
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            next: { revalidate: 0 }
        });

        const responseText = await response.text();
        console.log("Backend status response text:", responseText);

        if (!response.ok) {
            console.error("Error response from backend:", response.status, responseText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
            console.log("Parsed backend response:", data);
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            return Response.json({
                error: "Invalid JSON response from backend",
                status: "failed"
            }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("Error in status endpoint:", error);
        return Response.json({
            error: "Internal Server Error: " + error.message,
            status: "failed"
        }, { status: 500 });
    }
} 