import { getRoleToken } from "@/utils/getToken";

export default async function handler(req, res) {
  const user = req.cookies.user_id;
  const { method } = req;

  try {
    const token = await getRoleToken();

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    switch (method) {
      case "GET":
        const Url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user}/roles`;
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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
