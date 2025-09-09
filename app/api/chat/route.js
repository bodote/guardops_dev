import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { createCohere } from '@ai-sdk/cohere';
import { NextResponse } from 'next/server';
import { ChromaClient } from 'chromadb';
import { streamText, convertToModelMessages } from 'ai';

import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';


export async function POST(req) {
  const body = await req.json()
  try {
    const requestBody = body.messages[body.messages.length - 1].body;
    var messages = body.messages;
    var { model, settings, systemPrompt, provider, customProvider, api_keys, rag, chromaCollectionName } = requestBody;

    const providerConfig = {
      openai: {
        create: createOpenAI,
        apiKey: api_keys.openaiKey,
        baseURL: undefined, // No baseURL needed
        compatibility: 'strict'
      },
      anthropic: {
        create: createAnthropic,
        apiKey: api_keys.anthropicKey
      },
      google: {
        create: createGoogleGenerativeAI,
        apiKey: api_keys.googleKey
      },
      mistral: {
        create: createMistral,
        apiKey: api_keys.mistralKey
      },
      cohere: {
        create: createCohere,
        apiKey: api_keys.mistralKey
      },
      groq: {
        create: createOpenAI,
        apiKey: api_keys.groqKey,
        baseURL: 'https://api.groq.com/openai/v1',
        compatibility: 'compatible'
      },
      perplexity: {
        create: createOpenAI,
        apiKey: api_keys.perplexityKey,
        baseURL: 'https://api.perplexity.ai/',
        compatibility: 'compatible'
      },
      fireworks: {
        create: createOpenAI,
        apiKey: api_keys.fireworksKey,
        baseURL: 'https://api.fireworks.ai/inference/v1',
        compatibility: 'compatible'
      },
      together: {
        create: createOpenAI,
        apiKey: api_keys.togetherKey,
        baseURL: 'https://api.together.xyz/v1',
        compatibility: 'compatible'
      },
      custom: {
        create: createOpenAI,
        apiKey: api_keys.customKey,
        baseURL: 'https://demo6.ki-ansbach.de/hostedmodels/v1',
        compatibility: 'compatible'
      },
      custom_h: {
        create: createOpenAI,
        apiKey: api_keys.customKey,
        baseURL: 'https://demo6.ki-ansbach.de/hostedmodels/v1',
        compatibility: 'compatible'
      }
    };
    let openAiModelSelected = false;

    if (customProvider) {
      // For custom providers, always use createOpenAI with the provided baseUrl
      providerConfig[provider.baseUrl] = {
        create: createOpenAI,
        apiKey: provider.apiKey,
        baseURL: provider.baseUrl,
        compatibility: 'compatible'
      };
      // Use the baseUrl as the provider key
      provider = provider.baseUrl;
      openAiModelSelected = true;
    } else if (providerConfig[provider]?.create === createOpenAI) {
      openAiModelSelected = true;
    }
    const { create, apiKey, baseURL, compatibility } = providerConfig[provider] || {};

    if (!create || !apiKey) {
      throw new Error(`Unsupported provider or missing API key for provider: ${provider}`);
    }

    let target_model = create({
      apiKey,
      ...(compatibility ? { compatibility } : {}),
      ...(baseURL ? { baseURL } : {})
    }).chat?.(model);


    var messagesToSend = messages;


    if (rag) {
      // commenting this out for now since RAG is replaced with a rudimentary similarity search without any framework usage
      // if (!openAiModelSelected) {
      //   return NextResponse.json(
      //     { error: "Only OpenAI API-based models support RAG. Select a compatible model." },
      //     { status: 400 }
      //   );
      // }

      try {
        // Get the last user question
        const lastUserMessageIndex = messages.map(msg => msg.role).lastIndexOf("user");

        if (lastUserMessageIndex === -1) {
          throw new Error('No user message found in conversation');
        }

        const lastUserMessage = messages[lastUserMessageIndex];

        if (!lastUserMessage) {
          throw new Error('Last user message is undefined');
        }

        // Extract question from either content property or parts array
        let question;
        if (lastUserMessage.content) {
          question = lastUserMessage.content;
        } else if (lastUserMessage.parts && lastUserMessage.parts.length > 0) {
          // Find the text part
          const textPart = lastUserMessage.parts.find(part => part.type === 'text');
          question = textPart ? textPart.text : '';
        } else {
          question = '';
        }

        // Ensure question is not undefined or null
        if (!question || typeof question !== 'string') {
          throw new Error('Unable to extract question from user message');
        }

        // Initialize embeddings model
        const embeddings = new HuggingFaceTransformersEmbeddings({
          model: "Xenova/all-MiniLM-L6-v2"
        });


        // Embed the user's question
        const queryEmbedding = await embeddings.embedQuery(question);

        // Initialize ChromaDB client
        const client = new ChromaClient({
          path: process.env.CHROMA_HOST,
          auth: {
            provider: "token",
            credentials: process.env.CHROMA_CLIENT_AUTH_CREDENTIALS,
          }
        });

        // Get the collection
        const collection = await client.getCollection({
          name: chromaCollectionName
        });

        // Query using the embedded question
        const results = await collection.query({
          queryEmbeddings: [queryEmbedding],
          nResults: 2,
        });

        // Format the context from the results
        const relevantDocs = results.documents?.[0] || [];
        const context = relevantDocs.length > 0
          ? `Relevant information:\n${relevantDocs.join('\n\n')}`
          : "No relevant information found.";

        // Convert messages to proper format for convertToModelMessages
        const convertedMessages = messages.map(msg => {
          if (msg.parts && msg.parts.length > 0) {
            // Extract text content from parts array
            const textContent = msg.parts
              .filter(part => part.type === 'text')
              .map(part => part.text)
              .join('\n');

            return {
              role: msg.role,
              content: textContent
            };
          } else if (msg.content) {
            // Already has content property
            return msg;
          } else {
            // Fallback
            return {
              role: msg.role,
              content: ''
            };
          }
        });


        // Create messages array with context
        const enrichedMessages = [
          {
            role: "system",
            content: `You are a helpful assistant. Use this context to answer the question:
${context}

If you don't find relevant information in the context, just say you don't know.
Keep your answer concise, using three sentences maximum. Always respond in the language of the question regardless of the language of the context.`
          },
          ...convertedMessages
        ];


        // Stream the response - try without convertToModelMessages first
        const response = await streamText({
          model: target_model,
          messages: enrichedMessages,
          maxOutputTokens: Number(settings.maxOutputTokens),
          temperature: 0
        });

        return response.toUIMessageStreamResponse();

      } catch (error) {
        console.error("Error in RAG:", error);
        throw error;
      }
    }

    const response = await streamText({
      model: target_model,
      system: systemPrompt,
      maxOutputTokens: Number(settings.maxOutputTokens),
      temperature: Number(settings.temperature),
      messages: convertToModelMessages(messagesToSend),

    })

    return response.toUIMessageStreamResponse();
  } catch (error) {
    let errorData;

    try {
      // Attempt to parse the error body
      const parsedError = JSON.parse(error.responseBody).error;

      // Check if the parsed error is an object or a string
      if (typeof parsedError === 'object' && parsedError !== null) {
        errorData = parsedError;
      } else {
        errorData = { message: parsedError };
      }
    } catch (parseError) {
      // If parsing fails, use the raw error message
      errorData = { message: error.message || 'An unknown error occurred' };
    }


    // Convert the error data to a JSON string
    const errorJson = JSON.stringify(errorData);

    // Encode the JSON string
    const encodedErrorJson = encodeURIComponent(errorJson);

    // Return the encoded JSON error
    return new NextResponse(encodedErrorJson, {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}