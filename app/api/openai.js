import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export default async function handler(req) {
  const { api_key, model, type, max_tokens } = req.body;
  // Create an OpenAI API client (that's edge friendly!)
  const openai = new OpenAI({
    apiKey: api_key,
  });
  if (type === "chat") {
    const { messages } = await req.body;

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages,
    });
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.body;

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.completions.create({
      model: model,
      max_tokens: max_tokens,
      stream: true,
      prompt,
    });
  }
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}