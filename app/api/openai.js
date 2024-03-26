import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export default async function handler(req, api_key, model) {
  // Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: api_key,
});
 
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: model,
    stream: true,
    messages,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}