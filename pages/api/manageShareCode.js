import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const baseUrl = process.env.BackendBaseUrl;
  const user = req.cookies.user_id;

  const { method } = req;

  const token = await getToken();

  switch (method) {
    case "POST":
      bodyData = JSON.parse(req.body);
      if (bodyData.code) {
        bodyData = JSON.parse(req.body);
        if (bodyData.name === "project") {
          Url = `${baseUrl}api/import_project`;
        } else if (bodyData.name === "dataset") {
          Url = `${baseUrl}api/import_dataset`;
        }
        queryParams = new URLSearchParams({
          user_id: user,
          share_code: bodyData.code,
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
      } else if (bodyData.project_id || bodyData.dataset_id) {
        let queryParams;
        if (bodyData.project_id) {
          Url = `${baseUrl}api/share_project`;
          queryParams = new URLSearchParams({
            user_id: user,
            project_id: bodyData.project_id,
          });
        } else if (bodyData.dataset_id) {
          Url = `${baseUrl}api/share_dataset`;
          queryParams = new URLSearchParams({
            user_id: user,
            dataset_id: bodyData.dataset_id,
          });
        }
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
        break;
      }
  }
}
