import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  const baseUrl = process.env.BackendBaseUrl;
  const { method } = req;

  const token = await getToken();

  switch (method) {
    case "GET":
      if (req.query.project_id) {
        Url = `${baseUrl}api/get_project_traces`;
        queryParams = new URLSearchParams({
          project_id: req.query.project_id,
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
      if (req.query.playground_id) {
        Url = `${baseUrl}api/get_playground_traces`;
        queryParams = new URLSearchParams({
          playground_id: req.query.playground_id,
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
      if (req.query.dataset_id) {
        Url = `${baseUrl}api/get_dataset_traces`;
        queryParams = new URLSearchParams({
          dataset_id: req.query.dataset_id,
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
  }
}
