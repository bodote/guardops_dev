import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req, res) {
  const body = await req.json()
  console.log("vercel")
  try {
    const { api_key, model, type, max_tokens, messages, prompt } = body;
    // Create an OpenAI API client (that's edge friendly!)
    var openai = new OpenAI({
      apiKey: api_key,
      
    });
    if (type === "chat") {
      // Ask OpenAI for a streaming chat completion given the prompt
      const response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages,
      });
    } else if (type === "prompt") {
      // Extract the `prompt` from the body of the request
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
  } catch (error) {
    console.log(error)
    return new NextResponse(error)
  }
}