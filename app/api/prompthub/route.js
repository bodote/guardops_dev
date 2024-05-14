import { getToken } from "@/utils/getToken";

export async function GET() {
     let Url = null;

    const baseUrl = process.env.BackendBaseUrl;
    const user = req.cookies.user_id;
   try{
    const token = await getToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
//TODO: Replace with actual API
    Url = `${baseUrl}api/get_prompthub_templates`;
    queryParams = new URLSearchParams({
      user_id: user,
    });
    urlWithParams = `${Url}?${queryParams}`;

    try {
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: new Headers({
          authorization: `Bearer ${token}`,
        }),
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error during API request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

   }  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
   
    return Response.json({ data })
  }