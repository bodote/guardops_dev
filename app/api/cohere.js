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
  const { api_key } = req.body;
  if (!api_key) {
    throw new Error('Missing COHERE_API_KEY environment variable');
  }
   
  const cohere = new CohereClient({
    token: api_key,
  });
  // Extract the `prompt` from the body of the request
  const { messages } = await req.body;
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
 
  return new Response(stream);
}