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
      Url = `${baseUrl}api/add_model`;
      queryParams = new URLSearchParams({
        user_id: user,
        name: bodyData.name,
        id1: bodyData.id1,
        provider: bodyData.provider,
        context: bodyData.context,
        input_price: bodyData.input_price,
        output_price: bodyData.output_price,
        model_description: bodyData.model_description,
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
      Url = `${baseUrl}api/update_model`;
      queryParams = new URLSearchParams({
        model_id: bodyData.model_id,
        user_id: user,
        name: bodyData.name,
        id1: bodyData.id1,
        provider: bodyData.provider,
        context: bodyData.context,
        input_price: bodyData.input_price,
        output_price: bodyData.output_price,
        model_description: bodyData.model_description,
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
      Url = `${baseUrl}api/delete_model`;
      queryParams = new URLSearchParams({
        user_id: user,
        model_id: bodyData.model_id,
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
