import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'

export async function GET(req,res) {
    let Url = null;
    const baseUrl = process.env.BackendBaseUrl;
    const cookieStore = cookies()
    const user = cookieStore.get("user_id").value;
  
   try{
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