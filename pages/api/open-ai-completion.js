import { ModalAIStream } from "@/utils/ModalAIStream";

export default async function handler(req, res) {
  const { settings, modal, apiEndpoint, authKey, message } = req.body;
  try {
    // Set appropriate headers for streaming data
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Cache-Control", "no-cache");

    const stream = await ModalAIStream({
      settings,
      modal,
      apiEndpoint,
      authKey,
      message,
    });

    // Manually handle writing chunks to the response
    const reader = stream.getReader();

    const pump = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          res.write(value);
          res.flush();
        }
      } catch (error) {
        console.error("Error streaming data:", error);
        res.status(500).end("Internal Server Error");
      } finally {
        reader.releaseLock();
        res.end(); // Ensure response is closed even in case of an error
      }
    };

    pump();
  } catch (error) {
    console.error("Error streaming data:", error);
    res.status(500).end("Internal Server Error");
  }
}
