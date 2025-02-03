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

        const Url = `${baseUrl}api/get_custom_providers`;
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

        const Url = `${baseUrl}api/create_custom_provider`;
        const queryParams = new URLSearchParams({
            user_id: user,
            name: bodyData.name,
            baseUrl: bodyData.baseUrl,
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

        const Url = `${baseUrl}api/update_custom_provider`;
        const queryParams = new URLSearchParams({
            user_id: user,
            provider_id: bodyData.provider_id,
            name: bodyData.name,
            baseUrl: bodyData.baseUrl,
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
            throw new Error("Failed to fetch");
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

        const Url = `${baseUrl}api/delete_custom_provider`;
        const queryParams = new URLSearchParams({
            user_id: user,
            provider_id: bodyData.provider_id,
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
            throw new Error("Failed to fetch");
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}