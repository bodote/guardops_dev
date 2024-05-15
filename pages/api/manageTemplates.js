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
        Url = `${baseUrl}api/get_templates`;
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
        Url = `${baseUrl}api/create_template`;
        queryParams = new URLSearchParams({
          user_id: user,
          template_name: bodyData.template_name,
          template_description: bodyData.template_description,
          template_link: bodyData.template_link,
          template: bodyData.template
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
        Url = `${baseUrl}api/update_template`;
        queryParams = new URLSearchParams({
          template_id: bodyData.template_id,
          user_id: user,
          template_name: bodyData.template_name,
          template_description: bodyData.template_description,
          template_link: bodyData.template_link,
          template: bodyData.template,
          share: bodyData.share,
          update_public: bodyData.update_public
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
        Url = `${baseUrl}api/delete_template`;
        queryParams = new URLSearchParams({
          user_id: user,
          template_id: bodyData.template_id,
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
