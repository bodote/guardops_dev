import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export  async function POST(req) {
  const body = await req.json()
  var response;
  try {
    const { api_key, model, type,  messages, prompt,settings } = body;
  // Create an Anthropic API client (that's edge friendly)
  const anthropic = new Anthropic({
    apiKey: api_key || '',
  });
  if (type === "chat") {
    // Extract the `prompt` from the body of the request

    // Ask Claude for a streaming chat completion given the prompt
    response = await anthropic.messages.create({
      messages,
      model: model,
      stream: true,
      max_tokens: Number(settings.maxTokens),
      temperature: Number(settings.temperature),
      top_k: Number(settings.topK),
      top_p: Number(settings.topP),
    });
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request
    // Ask Claude for a streaming chat completion given the prompt
    response = await anthropic.messages.create({
      messages: [{"role":"user","content":prompt}],
      model: "claude-3-opus-20240229",
      stream: true,
      max_tokens: Number(settings.maxTokens),
      temperature: Number(settings.temperature),
      top_k: Number(settings.topK),
      top_p: Number(settings.topP),
    });
  }
  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
} catch (error) {
  console.log(error)
  return new NextResponse(error)
}
}