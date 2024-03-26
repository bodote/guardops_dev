import { MistralStream, StreamingTextResponse } from 'ai';
 
import MistralClient from '@mistralai/mistralai';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export async function POST(req) {
  const { api_key, model, max_tokens } = req.body;

  const mistral = new MistralClient(api_key || '');
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
 
  const response = mistral.chatStream({
    model: model,
    maxTokens: max_tokens,
    messages,
  });
 
  // Convert the response into a friendly text-stream. The Mistral client responses are
  // compatible with the Vercel AI SDK MistralStream adapter.
  const stream = MistralStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}