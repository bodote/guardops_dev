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


// ... existing code ...

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
            name: bodyData.name
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