import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages) => ({
  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
});

export async function POST(req) {
  const body = await req.json()

  try {
    var { api_key, model, type, max_tokens, messages, settings ,prompt } = body;

  const genAI = new GoogleGenerativeAI(api_key || '');
  if (type === "chat") {
    // Extract the `prompt` from the body of the request

    const geminiStream = await genAI
      .getGenerativeModel({ model: model })
      .generateContentStream(buildGoogleGenAIPrompt(messages));
  } else if (type === "prompt") {
    // Extract the `prompt` from the body of the request

    // Ask Google Generative AI for a streaming completion given the prompt
    const response = await genAI
      .getGenerativeModel({ model: model })
      .generateContentStream({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
  }
  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
} catch (error) {
  console.log(error)
  return new NextResponse(error)
}
}