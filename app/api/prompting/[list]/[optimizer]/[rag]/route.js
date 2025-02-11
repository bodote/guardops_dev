import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function POST(req, res) {
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

        const response = await fetch(urlWithParams, {
            method: "POST",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return Response.json({ data });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}