import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  const baseUrl = process.env.BackendBaseUrl;
  const { method } = req;
  const user = req.cookies.user_id;
  try {
    const token = await getToken();
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    switch (method) {
      case "GET":
        if (req.query.project_id) {
          Url = `${baseUrl}api/get_project_traces`;
          queryParams = new URLSearchParams({
            project_id: req.query.project_id,
            page: req.query.page || 1,
            limit: req.query.limit || 20,
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
            page: req.query.page || 1,
            limit: req.query.limit || 20,
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

        if (req.body.action === 'move' && req.body.sourceProjectId && req.body.targetProjectId) {
          Url = `${baseUrl}api/move_traces_to_other_project`;
          queryParams = new URLSearchParams({
            source_project: req.body.sourceProjectId,
            target_project: req.body.targetProjectId,
            user_id: user
          });
          urlWithParams = `${Url}?${queryParams}`;

          try {
            const response = await fetch(urlWithParams, {
              method: "PATCH",
              headers: new Headers({
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              })
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.detail || 'Failed to move traces');
            }

            res.status(response.status).json(data);
          } catch (error) {
            console.error("Error during trace move:", error);
            res.status(error.status || 500).json({
              error: error.message || "Internal Server Error"
            });
          }
        } else {
          res.status(400).json({
            error: "Missing required parameters for move operation"
          });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'PATCH']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
