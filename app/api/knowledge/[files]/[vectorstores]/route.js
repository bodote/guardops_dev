import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req,res) {
  
   try{
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;

      // Extract folder_id from query parameters
  
     
    const baseUrl = process.env.BackendBaseUrl;
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const url = `${baseUrl}api/get_vectorstores`;

    const queryParams = new URLSearchParams({
        user_id: user,
      });
  
      const urlWithParams = `${url}?${queryParams}`;

  
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
      const bodyData = await req.json();
      const cookieStore = cookies();
      const user = cookieStore.get("user_id").value;
      const baseUrl = process.env.BackendBaseUrl;
      const token = await getToken();
  
      if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
  
      const url = `${baseUrl}api/create_vectorstore`;
      const queryParams = new URLSearchParams({
        user_id: user,
        folder_id: bodyData.folder_id,
        store_name: bodyData.store_name
      });
  
      const urlWithParams = `${url}?${queryParams}`;
       
      const response = await fetch(urlWithParams, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`
        },
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
  
  export async function PATCH(req, res) {
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
      Url = `${baseUrl}api/update_vectorstore`;
      const queryParams = new URLSearchParams({
        user_id: user,
        store_id: bodyData.store_id,
        name: bodyData.name
      });
      const urlWithParams = `${Url}?${queryParams}`;
  
      const response = await fetch(urlWithParams, {
        method: "PATCH",
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
      Url = `${baseUrl}api/delete_vectorstore`;
      const queryParams = new URLSearchParams({
        user_id: user,
        store_id: bodyData.store_id
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
  