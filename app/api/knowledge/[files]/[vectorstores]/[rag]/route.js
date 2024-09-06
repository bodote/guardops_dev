import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req,res) {
  
   try{
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;

    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
     
    const baseUrl = process.env.BackendBaseUrl;
    const url = new URL(req.url, `http://${req.headers.host}`);
    
     const store_id = url.searchParams.get("store_id");
     if (!store_id) {
      return res.status(400).json({ error: "store_id is required" });
    }
 
 
      const apiUrl = `${baseUrl}api/get_vectorstore_for_rag`;
      const queryParams = new URLSearchParams({
        user_id: user,
        store_id: store_id
      });
      const urlWithParams = `${apiUrl}?${queryParams}`;

      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: new Headers({
          authorization: `Bearer ${token}`,
        }),
      });
      

        if (!response.ok) {
        const errorMessage = await response.text(); 
        return new Response(errorMessage, { status: response.status });
      }
  
      const data = await response.json();
      return Response.json({data})
   }  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  }

