import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const baseUrl = process.env.BackendBaseUrl;
  const user = req.cookies.user_id;
  const { method } = req;

  try {
    const token = await getToken();
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    switch (method) {
      case "POST":
        bodyData = JSON.parse(req.body);
        Url = `${baseUrl}api/trace_playground_chat`;
        queryParams = new URLSearchParams({
          user_id: user,
          project_id: bodyData.project_id,
          playground_id: bodyData.playground_id,
          access_token: bodyData.access_token,
          start_time: bodyData.start_time,
        });
        urlWithParams = `${Url}?${queryParams.toString()}`;

        try {
          const response = await fetch(urlWithParams, {
            method: "POST",
            headers: new Headers({
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(bodyData.prompt_response_pairs),
          });

          const data = await response.json();
          res.status(response.status).json(data);
        } catch (error) {
          console.error("Error during API request:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }

        break;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
