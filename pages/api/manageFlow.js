import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let evaluation_id = req.query.evaluationID || null;
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
      case "GET":
        if (evaluation_id) {
          Url = `${baseUrl}api/get_flow_definition`;
          queryParams = new URLSearchParams({
            user_id: user,
            evaluation_id: evaluation_id,
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
        } else {
          Url = `${baseUrl}api/get_flow_elements`;
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
        }
        break;
      case "PATCH":
        bodyData = JSON.parse(req.body);
        Url = `${baseUrl}api/generate_and_store_flow_definition`;
        queryParams = new URLSearchParams({
          user_id: user,
          evaluation_id: bodyData.evaluation_id,
        });
        urlWithParams = `${Url}?${queryParams}`;
        try {
          const response = await fetch(urlWithParams, {
            method: "PATCH",
            headers: new Headers({
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(bodyData.flowDefinition),
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
