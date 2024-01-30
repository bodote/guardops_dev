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
    case "GET":
      Url = `${baseUrl}api/get_playgrounds`;
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
      if (bodyData.project_id) {
        Url = `${baseUrl}api/trace_playground`;
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
      } else if (!bodyData.project_id) {
        Url = `${baseUrl}api/create_playground`;
        queryParams = new URLSearchParams({
          user_id: user,
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
      }
      break;
    case "PATCH":
      bodyData = JSON.parse(req.body);
      Url = `${baseUrl}api/update_playground`;
      queryParams = new URLSearchParams({
        user_id: user,
        playground_id: bodyData.playground_id,
        playground_name: bodyData.playground_name,
        playground_description: bodyData.playground_description,
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
      Url = `${baseUrl}api/delete_playground`;
      queryParams = new URLSearchParams({
        user_id: user,
        playground_id: bodyData.playground_id,
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
      break;
  }
}
