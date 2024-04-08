import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req, res) {
  const body = await req.json()
  var response;
  var sysPrompt;
  try {
    var { api_key, model, type,  messages, prompt, settings, systemPrompt } = body;
    // Create an OpenAI API client (that's edge friendly!)
    var openai = new OpenAI({
      apiKey: api_key,
      baseURL: "https://api.perplexity.ai/"

    });
    if (prompt) {
      messages = [{ "role": "user", "content": prompt }]
    }
    if (systemPrompt.length > 1) {
      // If systemPrompt contains more than 1 character, add it to the first index of the message array
      sysPrompt = { "role": "system", "content": systemPrompt }
      if (messages) {
        messages.unshift(sysPrompt);
      }

    }
    if (type === "chat") {
      // Ask OpenAI for a streaming chat completion given the prompt
      response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages: messages,
        max_tokens: Number(settings.maxTokens),
        temperature: Number(settings.temperature),
        top_p: Number(settings.topP),
        frequency_penalty:Number(settings.frequencyPenalty),
        presence_penalty: Number(settings.presencePenalty)
      });
    } else if (type === "prompt") {
      // Extract the `prompt` from the body of the request
      // Ask OpenAI for a streaming completion given the prompt
      response = await openai.chat.completions.create({
        model: model,
        max_tokens: Number(settings.maxTokens),
        temperature: Number(settings.temperature),
        top_p: Number(settings.topP),
        frequency_penalty:Number(settings.frequencyPenalty),
        presence_penalty: Number(settings.presencePenalty),
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