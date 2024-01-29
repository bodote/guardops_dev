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
      Url = `${baseUrl}api/get_evaluation_list`;
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
      break;
  }
}
