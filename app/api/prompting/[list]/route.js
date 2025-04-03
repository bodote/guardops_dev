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

        const Url = `${baseUrl}api/get_prompts`;
        const queryParams = new URLSearchParams({
            user_id: user,
        });
        const urlWithParams = `${Url}?${queryParams}`;

        const response = await fetch(urlWithParams, {
            method: "GET",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
        });

        const data = await response.json();

        // For each prompt, check if we need to fetch details to determine if it's a RAG prompt
        if (data && data.prompts && Array.isArray(data.prompts)) {
            // Create an array of promises to fetch details for each prompt
            const detailPromises = data.prompts.map(async (prompt) => {
                try {
                    const detailUrl = `${baseUrl}api/get_prompt_details`;
                    const detailParams = new URLSearchParams({
                        user_id: user,
                        prompt_id: prompt.prompt_id
                    });
                    const detailUrlWithParams = `${detailUrl}?${detailParams}`;

                    const detailResponse = await fetch(detailUrlWithParams, {
                        method: "GET",
                        headers: new Headers({
                            authorization: `Bearer ${token}`,
                        }),
                    });

                    const detailData = await detailResponse.json();

                    // Check if any items have validation_details, indicating it's a RAG prompt
                    const isRagPrompt = detailData.items &&
                        detailData.items.some(item => item.validation_details && item.validation_details.length > 0);

                    // Add the flag and vector store ID to the prompt
                    return {
                        ...prompt,
                        is_rag_prompt: isRagPrompt,
                        vector_store_id: detailData.vector_store_id || null // Add vector store ID from details
                    };
                } catch (error) {
                    console.error(`Error fetching details for prompt ${prompt.prompt_id}:`, error);
                    return prompt; // Return original prompt if error
                }
            });

            // Wait for all detail fetches to complete
            data.prompts = await Promise.all(detailPromises);
        }

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

        const Url = `${baseUrl}api/create_prompt`;
        const queryParams = new URLSearchParams({
            user_id: user,
            name: bodyData.name,
            ...(bodyData.vector_store_id && { vector_store_id: bodyData.vector_store_id })
        });
        const urlWithParams = `${Url}?${queryParams}`;

        const response = await fetch(urlWithParams, {
            method: "POST",
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

        const Url = `${baseUrl}api/update_prompt`;
        const queryParams = new URLSearchParams({
            user_id: user,
            prompt_id: bodyData.prompt_id,
            name: bodyData.name,
            ...(bodyData.vector_store_id && { vector_store_id: bodyData.vector_store_id })
        });
        const urlWithParams = `${Url}?${queryParams}`;

        const response = await fetch(urlWithParams, {
            method: "PATCH",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
        });

        if (response.status === 200) {
            return Response.json(response.status);
        } else {
            throw new Error("Failed to update prompt");
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, res) {
    try {
        const bodyData = await req.json();
        const cookieStore = cookies();
        const user = cookieStore.get("user_id").value;
        const baseUrl = process.env.BackendBaseUrl;
        const token = await getToken();

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const Url = `${baseUrl}api/delete_prompt`;
        const queryParams = new URLSearchParams({
            user_id: user,
            prompt_id: bodyData.prompt_id
        });
        const urlWithParams = `${Url}?${queryParams}`;

        const response = await fetch(urlWithParams, {
            method: "DELETE",
            headers: new Headers({
                authorization: `Bearer ${token}`,
            }),
        });

        if (response.status === 200) {
            return Response.json(response.status);
        } else {
            throw new Error("Failed to delete prompt");
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}