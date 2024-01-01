export default async function handler(req, res) {
  const { settings, modal } = JSON.parse(req.body);

  // config request
  const url = "https://api.openai.com/v1/completions";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: modal.id1,
      prompt: settings.message,
      max_tokens: Number(settings.maxTokens),
    }),
  };
  // make request
  try {
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const reader = response.body.getReader();
      let accumulatedChunks = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const textChunk = new TextDecoder().decode(value);
        accumulatedChunks += textChunk;
      }

      // Do something with the accumulated chunks, e.g., log or send as a response
      const parsedData = JSON.parse(accumulatedChunks);
      const tokens = parsedData.usage;
      const content = parsedData.choices[0].text;
      res.status(response.status).send({ content, tokens, status: true });
    } else {
      console.error("Request failed with status:", response.status);
      res.status(response.status).send("Request failed");
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
