import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
export async function POST(req) {
  const body = await req.json()
  var response;

  try {
    console.log(body)
    const { api_key, model, type, max_tokens, messages, prompt } = body;
  // Create an OpenAI API client (that's edge friendly!)
  // but configure it to point to fireworks.ai
  var fireworks = new OpenAI({
    apiKey: api_key || '',
    baseURL: 'https://api.fireworks.ai/inference/v1',
  });
  if (type === "chat") {
    // Extract the `messages` from the body of the request

    // Ask Fireworks for a streaming chat completion using Llama 2 70b model
    // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
    response = await fireworks.chat.completions.create({
      model: model,
      stream: true,
      max_tokens: max_tokens,
      messages:messages,
    });
    // Convert the response into a friendly text-stream.
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request

    // Ask Fireworks for a streaming chat completion using Llama 2 70b model
    // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
    response = await fireworks.chat.completions.create({
      model: model,
      stream: true,
      max_tokens: max_tokens,
      messages:[{ role: 'user', content: prompt }],
    });

  }
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
} catch (error) {
  console.log(error)
  return new NextResponse(error)
}
}