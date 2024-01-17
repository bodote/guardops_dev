import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;

  const token = await getToken();

  switch (method) {
    case "POST":
      bodyData = JSON.parse(req.body);
      Url = `${baseUrl}api/create_playground`;
      queryParams = new URLSearchParams({
        user_id: bodyData.user_id,
        playground_name: bodyData.playground_name,
        playground_description: bodyData.playground_description,
      });
      urlWithParams = `${Url}?${queryParams}`;
      try {
        const response = await fetch(urlWithParams, {
          method: "POST",
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
      break;
  }
}
