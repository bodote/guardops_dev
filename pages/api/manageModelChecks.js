import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const user = req.cookies.user_id;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;
  //warning: This is actually disgusting and seperating two different post requests in here should be changed to two api routes. Holy fck
  try {
    const token = await getToken();
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
        if (bodyData.input) {
          console.log("i am in here doing pg analysis")
          Url = `${baseUrl}api/pg_analysis`;
          queryParams = new URLSearchParams({
            input: bodyData.input,
            response: bodyData.response,
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
        } else if (!bodyData.input) {
          Url = `${baseUrl}api/detect_pii`;

          try {
            const response = await fetch(Url, {
              method: "POST",
              headers: new Headers({
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }),
              body: JSON.stringify({ text: bodyData }),
            });
            const data = await response.json();
            res.status(response.status).json(data);
          } catch (error) {
            console.error("Error during API request:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
        }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
