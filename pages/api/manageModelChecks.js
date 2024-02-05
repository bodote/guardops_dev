import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const user = req.cookies.user_id;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;

  const token = await getToken();

  switch (method) {
    case "GET":
      Url = `${baseUrl}api/get_models`;
      try {
        const response = await fetch(Url, {
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
