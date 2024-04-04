import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req) {
  const body = await req.json()
  var response;
  var sysPrompt;
  try {
    var { api_key, model, type, max_tokens, messages, prompt,systemPrompt } = body;
    // Create an OpenAI API client (that's edge friendly!)
    var openai = new OpenAI({
      apiKey: api_key,
      baseURL: "https://lm3.hs-ansbach.de/worker2/v1"
      
    });
    if(prompt){
      messages =  [{"role": "user", "content":prompt}]
    }
    if (systemPrompt.length > 1) {
      // If systemPrompt contains more than 1 character, add it to the first index of the message array
      sysPrompt = { "role": "system", "content": systemPrompt }
      console.log(sysPrompt)
      if (messages){
        messages.unshift(sysPrompt);
      }
      
    }
    if (type === "chat") {
      // Ask OpenAI for a streaming chat completion given the prompt
      response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages: messages,
        max_tokens: max_tokens
      });
    } else if (type === "prompt") {
      // Extract the `prompt` from the body of the request
      // Ask OpenAI for a streaming completion given the prompt
      response = await openai.chat.completions.create({
        model: model,
        max_tokens: max_tokens,
        stream: true,
        messages: messages,
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