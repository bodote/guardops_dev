import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function POST(req, { params }) {
    try {
        const fileId = decodeURIComponent(params.fileId);
        if (!fileId) {
            return new Response(JSON.stringify({ error: "Invalid file ID" }), { status: 400 });
        }


        const cookieStore = cookies();
        const user = cookieStore.get("user_id")?.value;
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Change to POST since we need to send a body
        const apiUrl = `${baseUrl}api/file_processing_status`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify([fileId])  // Just send the array directly
        });

        if (!response.ok) {
            console.error(`Backend error (${response.status}):`, await response.text());
            return new Response(JSON.stringify({
                fileId,
                status: "processing"
            }), { status: 200 });
        }

        const data = await response.json();
        console.log("RESPONSE:", data);
        const status = data.statuses?.[fileId] || "processing";

        return new Response(JSON.stringify({ fileId, status }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error checking file status:", error);
        return new Response(JSON.stringify({
            fileId: params.fileId,
            status: "processing"
        }), { status: 200 });
    }
}