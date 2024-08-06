import { createOpenAI, openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createAnthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { createMistral } from '@ai-sdk/mistral';
import { cohere } from '@ai-sdk/cohere';
import { createCohere } from '@ai-sdk/cohere';
import { NextResponse } from 'next/server';
 


export async function POST(req) {
  const body = await req.json()
  try {

    var { model,  messages, prompt, settings, systemPrompt, provider, api_keys, multimodal } = body;
    
    var target_model;
    switch (provider) {
      case "openai":
        const openai = createOpenAI({ 
          apiKey: api_keys.openaiKey,
          compatibility: 'strict'
         })
        target_model = openai.chat(model);
        break;
      case "anthropic":
        const anthropic = createAnthropic({
          apiKey: api_keys.anthropicKey
        });
        target_model = anthropic(model);
        break;
      case "google":
        const google = createGoogleGenerativeAI({
          apiKey: api_keys.googleKey
        });
        target_model = google(model);
        break;
      case "mistral":
        const mistral = createMistral({
          apiKey: api_keys.mistralKey
        });
        target_model = mistral(model);
        break;
      case "cohere":
        const cohere = createCohere({
          apiKey: api_keys.mistralKey
        });
        target_model = cohere(model);
        break;
      case "groq":
        const groq = createOpenAI({
          baseURL: 'https://api.groq.com/openai/v1',
          apiKey: api_keys.groqKey,
          compatibility: 'strict'
        });
        target_model = groq(model);
        break;
      case "perplexity":
        const perplexity = createOpenAI({
          apiKey: api_keys.perplexityKey,
          baseURL: 'https://api.perplexity.ai/',
          compatibility: 'strict'
        });
        target_model = perplexity(model);
        break;
      case "fireworks":
        const fireworks = createOpenAI({
          apiKey: api_keys.fireworksKey,
          baseURL: 'https://api.fireworks.ai/inference/v1',
          compatibility: 'strict'
        });
        target_model = fireworks(model);
        break;
      case "custom":
        const custom = createOpenAI({
          apiKey: api_keys.customKey,
          baseURL: "https://lm3.hs-ansbach.de/worker2/v1",
          compatibility: 'strict'
        })
        target_model = custom(model);
        break;
    }
    //only convert images to message if model is multimodal
    var messagesToSend = messages;
    if (multimodal){
      messagesToSend = convertToCoreMessages(messages);
    }
    const response = await streamText({
      model: target_model, 
      prompt: prompt, 
      system: systemPrompt, 
      maxTokens: Number(settings.maxTokens), 
      temperature: Number(settings.temperature),
      messages: messagesToSend,
      experimental_telemetry: {isEnabled: true,
        functionId: "playground_chat"
      }
    })
    

    return response.toDataStreamResponse();
  } catch (error) {
    console.log(error)
    return new NextResponse(error)
  }
}