import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let project_id = req.query.projectID || null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const user = req.cookies.user_id;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;

  const token = await getToken();

  switch (method) {
    case "GET":
      if (project_id) {
        Url = `${baseUrl}api/get_evaluation_list`;
        queryParams = new URLSearchParams({
          user_id: user,
          project_id: project_id,
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
      } else if (!project_id) {
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
    case "POST":
      bodyData = JSON.parse(req.body);
      Url = `${baseUrl}api/create_evaluation`;
      queryParams = new URLSearchParams({
        user_id: user,
        project_id: bodyData.project_id,
        evaluation_title: bodyData.evaluation_name,
        evaluation_desc: bodyData.evaluation_description,
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
      Url = `${baseUrl}api/update_evaluation`;
      queryParams = new URLSearchParams({
        user_id: user,
        project_id: bodyData.project_id,
        evaluation_id: bodyData.evaluation_id,
        evaluation_title: bodyData.evaluation_name,
        evaluation_desc: bodyData.evaluation_description,
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
      Url = `${baseUrl}api/delete_evaluation`;
      queryParams = new URLSearchParams({
        user_id: user,
        project_id: bodyData.project_id,
        evaluation_id: bodyData.evaluation_id,
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
}
