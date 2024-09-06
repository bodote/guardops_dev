import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req,res) {
  
   try{
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
      return Response.json({data})
   }  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
 

    
  }

  export async function POST(req) {
    try {
      const formData = await req.formData();
      const folder_id = formData.get("folder_id");
      const files = formData.getAll("files[]"); // Ensure this is correctly getting your files
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
  
      // Create a new FormData object for the fetch request
      const uploadData = new FormData();
      files.forEach(file => uploadData.append("files", file)); // Use append to add files to FormData
      const response = await fetch(urlWithParams, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`
        },
        body: uploadData 
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
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
  