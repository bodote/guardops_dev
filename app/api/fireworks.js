import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
export default async function handler(req) {
  const { api_key, model, max_tokens, type } = req.body;
  // Create an OpenAI API client (that's edge friendly!)
  // but configure it to point to fireworks.ai
  const fireworks = new OpenAI({
    apiKey: api_key || '',
    baseURL: 'https://api.fireworks.ai/inference/v1',
  });
  if (type === "chat") {
    // Extract the `messages` from the body of the request
    const { messages } = await req.body;

    // Ask Fireworks for a streaming chat completion using Llama 2 70b model
    // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
    const response = await fireworks.chat.completions.create({
      model: model,
      stream: true,
      max_tokens: max_tokens,
      messages,
    });
    // Convert the response into a friendly text-stream.
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.body;

    // Ask Fireworks for a streaming chat completion using Llama 2 70b model
    // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
    const response = await fireworks.completions.create({
      model: model,
      stream: true,
      max_tokens: max_tokens,
      prompt,
    });

  }
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}