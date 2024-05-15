import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req,res) {
  
   try{
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;
    let Url = null;
    const baseUrl = process.env.BackendBaseUrl;
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    Url = `${baseUrl}api/get_hub_templates`;
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
      return Response.json({data})
   }  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      Url = `${baseUrl}api/unshare_template`;
      const queryParams = new URLSearchParams({
        user_id: user,
        template_id: bodyData.template_id
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
      Url = `${baseUrl}api/delete_template`;
      const queryParams = new URLSearchParams({
        user_id: user,
        template_id: bodyData.template_id
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
  