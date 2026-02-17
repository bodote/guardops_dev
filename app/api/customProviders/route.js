import { getToken } from "@/utils/getToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const getUserIdFromCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("user_id")?.value;
};

const getAuthContext = async () => {
  const user = await getUserIdFromCookie();
  const token = await getToken();
  const baseUrl = process.env.BackendBaseUrl;
  return { user, token, baseUrl };
};

export async function GET() {
  try {
    const { user, token, baseUrl } = await getAuthContext();
    if (!user || !token) return unauthorized();

    const url = `${baseUrl}api/get_custom_providers?${new URLSearchParams({
      user_id: user,
    })}`;
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({ authorization: `Bearer ${token}` }),
    });

    const data = await response.json();
    return NextResponse.json({ data }, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const bodyData = await req.json();
    const { user, token, baseUrl } = await getAuthContext();
    if (!user || !token) return unauthorized();

    const url = `${baseUrl}api/create_custom_provider?${new URLSearchParams({
      user_id: user,
      name: bodyData.name,
      baseUrl: bodyData.baseUrl,
    })}`;
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({ authorization: `Bearer ${token}` }),
    });

    const data = await response.json();
    return NextResponse.json({ data }, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const bodyData = await req.json();
    const { user, token, baseUrl } = await getAuthContext();
    if (!user || !token) return unauthorized();

    const url = `${baseUrl}api/update_custom_provider?${new URLSearchParams({
      user_id: user,
      provider_id: bodyData.provider_id,
      name: bodyData.name,
      baseUrl: bodyData.baseUrl,
    })}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: new Headers({ authorization: `Bearer ${token}` }),
    });

    if (response.status === 200) {
      return NextResponse.json(response.status);
    }
    throw new Error("Failed to update custom provider");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const bodyData = await req.json();
    const { user, token, baseUrl } = await getAuthContext();
    if (!user || !token) return unauthorized();

    const url = `${baseUrl}api/delete_custom_provider?${new URLSearchParams({
      user_id: user,
      provider_id: bodyData.provider_id,
    })}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: new Headers({ authorization: `Bearer ${token}` }),
    });

    if (response.status === 200) {
      return NextResponse.json(response.status);
    }
    throw new Error("Failed to delete custom provider");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
