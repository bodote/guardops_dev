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
      case "GET":
        Url = `${baseUrl}api/get_projects`;
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
        break;
      case "POST":
        bodyData = JSON.parse(req.body);
        Url = `${baseUrl}api/create_project`;
        queryParams = new URLSearchParams({
          user_id: user,
          project_name: bodyData.project_name,
          project_description: bodyData.project_description,
          project_retention: bodyData.project_retention,
          project_tags:
            bodyData.project_tags.length > 0
              ? bodyData.project_tags.join(",")
              : "[]",
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
      case "PATCH":
        bodyData = JSON.parse(req.body);
        Url = `${baseUrl}api/update_project`;
        queryParams = new URLSearchParams({
          project_id: bodyData.project_id,
          user_id: user,
          project_name: bodyData.project_name,
          project_description: bodyData.project_description,
          project_retention: bodyData.project_retention,
          project_tags:
            bodyData.project_tags.length > 0
              ? bodyData.project_tags.join(",")
              : "[]",
        });
        urlWithParams = `${Url}?${queryParams}`;
        try {
          const response = await fetch(urlWithParams, {
            method: "PATCH",
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
      case "DELETE":
        bodyData = JSON.parse(req.body);
        Url = `${baseUrl}api/delete_project`;
        queryParams = new URLSearchParams({
          user_id: user,
          project_id: bodyData.project_id,
          cascade: true,
        });

        urlWithParams = `${Url}?${queryParams}`;
        try {
          const response = await fetch(urlWithParams, {
            method: "DELETE",
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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
