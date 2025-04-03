import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function POST(req, { params }) {
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
        const Url = `${baseUrl}api/optimize_rag_prompt/cancel/${taskId}?${queryParams}`;

        const response = await fetch(Url, {
            method: "POST",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error:", error);
        return Response.json({
            error: "Internal Server Error",
            status: "failed"
        }, { status: 500 });
    }
} 