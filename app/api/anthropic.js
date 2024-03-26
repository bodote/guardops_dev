import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
 

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export default async function handler(req) {
  const { api_key, model, max_tokens } = req.body;
  // Create an Anthropic API client (that's edge friendly)
  const anthropic = new Anthropic({
    apiKey: api_key || '',
  });
 
  // Extract the `prompt` from the body of the request
  const { messages } = await req.body;
 
  // Ask Claude for a streaming chat completion given the prompt
  const response = await anthropic.messages.create({
    messages,
    model: model,
    stream: true,
    max_tokens: max_tokens,
  });
 
  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}