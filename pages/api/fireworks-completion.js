export default async function handler(req, res) {
  const { settings, modal} = JSON.parse(req.body);

  try {
    const response = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${process.env.FIREWORKS_KEY}`,
        }),
        body: JSON.stringify({
          model: `accounts/fireworks/models/${modal.id1}`,
          messages: [
            {
              role: "user",
              content: "test user",
            },
          ],
          stream: false,
          n: 1,
          max_tokens: Number(settings.maxTokens),
          temperature: settings.temperature,
          top_p: settings.topP,
          stop: [],
        }),
      }
    );

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
      const content = parsedData.choices[0].message.content;
      res.status(response.status).send({ content, status:true});
    } else {
      console.error("Request failed with status:", response.status);
      res.status(response.status).send("Request failed");
    }
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
