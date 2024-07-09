import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function POST(req, res) {
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
      Url = `${baseUrl}api/topic_gpt`;
      const queryParams = new URLSearchParams({
        user_id: user,
        template_id: bodyData.template_id,
      });
      const urlWithParams = `$n{Url}?${queryParams}`;
      
      const response = await fetch(urlWithParams, {
        method: "POST",
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
  