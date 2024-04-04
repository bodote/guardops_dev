import { CohereStream, StreamingTextResponse } from 'ai';
import { CohereClient, Cohere } from 'cohere-ai';
 
export const runtime = 'edge';
 
// IMPORTANT! Set the dynamic to force-dynamic
// Prevent nextjs to cache this route
export const dynamic = 'force-dynamic';
 

 
const toCohereRole = (role) => {
  if (role === 'user') {
    return Cohere.ChatMessageRole.User;
  }
  return Cohere.ChatMessageRole.Chatbot;
};
 
export default async function handler(req) {
  const body = await req.json()

  try {
    const { api_key, model, type, max_tokens, messages, settings ,prompt } = body;
  if (!api_key) {
    throw new Error('Missing COHERE_API_KEY environment variable');
  }
   
  const cohere = new CohereClient({
    token: api_key,
  });
  // Extract the `prompt` from the body of the request
  if (type==="chat"){
   const chatHistory = messages.map((message) => ({
    message: message.content,
    role: toCohereRole(message.role),
  }));
  const lastMessage = chatHistory.pop();
 
  const response = await cohere.chatStream({
    message: lastMessage.message,
    chatHistory,
  });
 
  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of response) {
        if (event.eventType === 'text-generation') {
          controller.enqueue(event.text);
        }
      }
      controller.close();
    },
  });
  }else if (type==="prompt"){

    // Extract the `prompt` from the body of the request
 
  const body = JSON.stringify({
    prompt,
    model: model,
    max_tokens: max_tokens,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: 'NONE',
    stream: true,
  });
 
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${api_key}`,
    },
    body,
  });
 
  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }
 
  // Extract the text response from the Cohere stream
  const stream = CohereStream(response);
  }
  return new Response(stream);
} catch (error) {
  console.log(error)
  return new NextResponse(error)
}
}