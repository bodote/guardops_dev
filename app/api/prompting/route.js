import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers';

export async function GET(req, res) {
    try {
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Get prompt_id from search params
        const { searchParams } = new URL(req.url);
        const promptId = searchParams.get('prompt_id');

        if (!promptId) {
            return Response.json({ error: "Prompt ID is required" }, { status: 400 });
        }

        const Url = `${baseUrl}api/get_prompt_details`;
        const queryParams = new URLSearchParams({
            user_id: user,
            prompt_id: promptId
        });
        const urlWithParams = `${Url}?${queryParams}`;

        const response = await fetch(urlWithParams, {
            method: "GET",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
        });
        const data = await response.json();
        return Response.json({ data });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req, res) {
    try {
        const bodyData = await req.json();
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const Url = `${baseUrl}api/save_prompt_details`;

        // Transform the items to match backend expectations
        const transformedItems = bodyData.items.map(item => ({
            id: item.id,
            parent_id: item.parentId,
            name: item.name,
            timestamp: item.timestamp,
            user_input: item.userInput,
            generated_prompt: item.generatedPrompt,
            selected_models: item.selectedModels,
            test_context: item.testContext,
            test_results: item.testResults
        }));

        // Prepare the request body
        const requestBody = {
            user_id: user,
            prompt_id: bodyData.prompt_id, // Make sure this exists in bodyData
            items: transformedItems
        };

        const response = await fetch(Url, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        return Response.json({ data });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function PATCH(req, res) {
    try {
        const bodyData = await req.json();
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const Url = `${baseUrl}api/update_prompt_details`;

        // Prepare the request body
        const requestBody = {
            user_id: user,
            prompt_id: bodyData.prompt_id,
            items: bodyData.items
        };

        const response = await fetch(Url, {
            method: "PATCH",
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify(requestBody)
        });

        if (response.status === 200) {
            const data = await response.json();
            return Response.json({ data });
        } else {
            throw new Error("Failed to update prompt details");
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}