import { createParser } from "eventsource-parser";

export async function ModalAIStream(payload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  if (
    payload.modal.provider === "openai" ||
    payload.modal.provider === "fireworks" ||
    payload.modal.provider === "custom" ||
    payload.modal.provider === "togethercompute"
  ) {
    let counter = 0;

    try {
      let filteredData = payload.data?.filter(
        (item) => item.input.trim() !== "" || item.output.trim() !== ""
      );
      let messages = [];
      if (payload.type === "chat") {
        messages = [{ role: "system", content: payload.systemPrompt }];
        filteredData.forEach((item, index) => {
          messages.push({
            role: "user",
            content: item.input,
          });
          messages.push({
            role: "assistant",
            content: item.output ? item.output : "",
          });
        });
        // Add the current message
        messages.push({
          role: "user",
          content: payload.message,
        });
      } else {
        messages = [
          { role: "system", content: payload.systemPrompt },
          { role: "user", content: payload.message },
        ];
      }
      // Ask OpenAI or Fireworks or Custom or Together for a streaming completion given the prompt
      const response = await fetch(`${payload.apiEndpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.authKey,
        },
        method: "POST",
        body: JSON.stringify({
          model:
            payload.modal.provider === "fireworks"
              ? `accounts/fireworks/models/${payload.modal.id1}`
              : payload.modal.id1,
          ...(payload.modal.provider === "togethercompute"
            ? { prompt: payload.message }
            : {
                messages,
              }),
          stream: true,
          max_tokens: Number(payload?.settings.maxOutputTokens),
          temperature: Number(payload?.settings.temperature),
          top_p: Number(payload?.settings.topP),
        }),
      });

      if (!response.ok) {
        const errorResponseText = await response.text();
        return errorResponseText;
      }

      const readableStream = new ReadableStream({
        async start(controller) {
          function onParse(event) {
            if (event.type === "event") {
              const data = event.data;
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const text = json.choices[0].delta?.content || "";
                if (counter < 2 && (text.match(/\n/) || []).length) {
                  return;
                }
                const queue = encoder.encode(text);
                controller.enqueue(queue);
                counter++;
              } catch (e) {
                controller.error(e);
              }
            }
          }

          const parser = createParser(onParse);
          const reader = response.body?.getReader();

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              const decodedValue = decoder.decode(value);
              if (done) {
                break;
              }
              parser.feed(decodedValue);
            }
          }
        },
      });

      return readableStream;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
