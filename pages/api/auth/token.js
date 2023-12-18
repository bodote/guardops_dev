export default async function handler(req, res) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "K0JYM4VcOtVAcOsQikuhdkxWCVh5ka78",
      client_secret:
        "yU0IyBHKkQAyuxuNmXFijObknCkEZnNjKVFtZwvWiy0Q4wk6mmymUj8yv1avmuPz",
      audience: "https://lm3.hs-ansbach.de/tracing/",
      grant_type: "client_credentials",
    }),
  };

  try {
    const response = await fetch(
      "https://coai.eu.auth0.com/oauth/token",
      options
    );
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
