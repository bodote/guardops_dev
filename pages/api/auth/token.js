export default async function handler(req, res) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_TRACEAPI_CLIENT_ID,
      client_secret:process.env.AUTH0_TRACEAPI_CLIENT_SECRET,
      audience: process.env.TRACEAPI_AUDIENCE,
      grant_type: "client_credentials",
    }),
  };

  try {
    const response = await fetch(
      `${process.env.AUTH0_TRACEAPI}`,
      options
    );
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
