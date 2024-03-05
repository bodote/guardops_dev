import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let project_id = req.query.projectID || null;
  let dataType = req.query.type || null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const user = req.cookies.user_id;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;

  try {
    const token = await getToken();
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    switch (method) {
      case "GET":
        if (project_id) {
          if (dataType === "eval") {
            Url = `${baseUrl}api/get_data_for_eval_viz`;
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
          } else if (dataType === "trace") {
            Url = `${baseUrl}api/get_data_for_traces_viz`;
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
          } else {
            Url = `${baseUrl}api/get_thresholds_for_viz`;
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
          }
        }
        break;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
