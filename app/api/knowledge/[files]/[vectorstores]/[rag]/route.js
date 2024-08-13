import { getToken } from "@/utils/getToken";
import { cookies } from 'next/headers'




export async function GET(req,res) {
  
   try{
    const cookieStore = cookies();
    const user = cookieStore.get("user_id").value;

  
     
    const baseUrl = process.env.BackendBaseUrl;
     // Extract folder_id from query parameters
     const url = new URL(req.url, `http://${req.headers.host}`);
    
     const store_id = url.searchParams.get("store_id");
     console.log("this store", store_id)
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const queryParams = new URLSearchParams({
        user_id: user,
        store_id: store_id
      });
      const apiUrl = `${baseUrl}api/get_vectorstore_for_rag`;

      const urlWithParams = `${apiUrl}?${queryParams}`;

      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: new Headers({
          authorization: `Bearer ${token}`,
        }),
      });
      

        // Check if the response is ok
        if (!response.ok) {
        const errorMessage = await response.text(); // or response.json() based on the API response
        return new Response(errorMessage, { status: response.status });
      }
  
      // Return the response as-is with the correct headers for a ZIP file
      return new Response(await response.blob(), {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="vector_store.zip"',
        },
      });
   }  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  }

