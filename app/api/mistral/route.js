import { MistralStream, StreamingTextResponse } from 'ai';
 
import MistralClient from '@mistralai/mistralai';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export async function POST(req) {
  const body = await req.json()
  var response;
  try {
    const { api_key, model, type, max_tokens, messages, prompt } = body;

  const mistral = new MistralClient(api_key || '');
  // Extract the `messages` from the body of the request
  if (type ==="chat"){
 
  response = mistral.chatStream({
    model: model,
    maxTokens: max_tokens,
    messages,
  });
} else if (type==="prompt"){
   // Extract the `prompt` from the body of the request
 
   // Ask Mistral for a streaming completion given the prompt
   response = mistral.chatStream({
     model: model,
     maxTokens: max_tokens,
     messages: [{ role: 'user', content: prompt }],
   });
}
  // Convert the response into a friendly text-stream. The Mistral client responses are
  // compatible with the Vercel AI SDK MistralStream adapter.
  const stream = MistralStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
} catch (error) {
  console.log(error)
  return new NextResponse(error)
}
}