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
        Url = `${baseUrl}api/score_arena`;
        queryParams = new URLSearchParams({
          user_id: user,
          project_id: bodyData.project_id,
          winner_trace_id: bodyData.winner_trace_id,
          winning_model_id: bodyData.winning_model_id,
        });
        urlWithParams = `${Url}?${queryParams.toString()}`;

        try {
          const response = await fetch(urlWithParams, {
            method: "POST",
            headers: new Headers({
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(bodyData.losing_model_ids),
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
