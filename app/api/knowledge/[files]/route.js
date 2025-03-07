import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req, res) {

  try {
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;

    const url = new URL(req.url, `http://${req.headers.host}`);
    const folder_id = url.searchParams.get("folder_id");

    if (!folder_id) {
      return res.status(400).json({ error: "folder_id is required" });
    }
    const baseUrl = process.env.BackendBaseUrl;
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const apiUrl = `${baseUrl}api/get_files_for_folder`;
    const queryParams = new URLSearchParams({
      user_id: user,
      folder_id: folder_id
    });
    const urlWithParams = `${apiUrl}?${queryParams}`;


    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: new Headers({
        authorization: `Bearer ${token}`,
      }),
    });


    const data = await response.json();
    return Response.json({ data })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }



}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const folder_id = formData.get("folder_id");
    const files = formData.getAll("files[]");
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;
    const baseUrl = process.env.BackendBaseUrl;
    const token = await getToken();

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const url = `${baseUrl}api/add_file_to_folder`;
    const queryParams = new URLSearchParams({
      user_id: user,
      folder_id: folder_id
    });

    const urlWithParams = `${url}?${queryParams}`;
    const uploadData = new FormData();
    files.forEach(file => uploadData.append("files", file));
    console.log("Uploading files:", files);
    // Actually wait for the response from FastAPI
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`
      },
      body: uploadData
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}`);
    }

    // Get the actual response from FastAPI
    const fastApiData = await response.json();
    console.log("FastAPI response:", fastApiData);
    // Return the PROPER structure that the frontend expects
    return new Response(JSON.stringify(fastApiData), {  // Remove the extra data wrapper
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("Error starting upload:", error);
    return new Response(JSON.stringify({
      error: error.message || "Internal Server Error",
      data: { file_ids: [] }
    }), { status: 500 });
  }
}


export async function DELETE(req, res) {
  try {
    const bodyData = await req.json();
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;
    let Url = null;
    const baseUrl = process.env.BackendBaseUrl;
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    Url = `${baseUrl}api/delete_file_from_folder`;
    const queryParams = new URLSearchParams({
      user_id: user,
      folder_id: bodyData.folder_id,
      file_id: bodyData.file_id
    });
    const urlWithParams = `${Url}?${queryParams}`;

    const response = await fetch(urlWithParams, {
      method: "DELETE",
      headers: new Headers({
        authorization: `Bearer ${token}`,
      }),
    });

    // Check if the response status is OK (200)
    if (response.status == 200) {

      return Response.json(response.status)
    } else {
      throw new Error("Failed to fetch"); // Throw an error if the response status is not OK
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
