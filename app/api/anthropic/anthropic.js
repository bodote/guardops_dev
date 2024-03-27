import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export default async function handler(req) {
  const body = await req.json()

  try {
    const { api_key, model, type, max_tokens, messages, prompt } = body;
  // Create an Anthropic API client (that's edge friendly)
  const anthropic = new Anthropic({
    apiKey: api_key || '',
  });

  if (type === "chat") {
    // Extract the `prompt` from the body of the request

    // Ask Claude for a streaming chat completion given the prompt
    const response = await anthropic.messages.create({
      messages,
      model: model,
      stream: true,
      max_tokens: max_tokens,
    });
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request

    // Ask Claude for a streaming chat completion given the prompt
    const response = await anthropic.completions.create({
      prompt: `Human: ${prompt}\n\nAssistant:`,
      model: model,
      stream: true,
      max_tokens_to_sample: max_tokens,
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