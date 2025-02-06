import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { createCohere } from '@ai-sdk/cohere';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json()

    try {
        var { prompt, model, provider, settings, api_keys, customProvider } = body;


        // Provider configuration
        const providerConfig = {
            openai: {
                create: createOpenAI,
                apiKey: api_keys.openaiKey,
                baseURL: undefined,
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
                apiKey: api_keys.cohereKey
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
                baseURL: 'https://lm3.hs-ansbach.de/worker2/v1',
                compatibility: 'compatible'
            },
            custom_h: {
                create: createOpenAI,
                apiKey: api_keys.customKey,
                baseURL: 'http://159.69.166.67:55504/v1',
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

        // Get provider configuration
        const { create, apiKey, baseURL, compatibility } = providerConfig[provider] || {};

        if (!create || !apiKey) {
            throw new Error(`Unsupported provider or missing API key for provider: ${provider}`);
        }

        // Create the model instance
        const target_model = create({
            apiKey,
            ...(compatibility ? { compatibility } : {}),
            ...(baseURL ? { baseURL } : {})
            //using .completion here results in bad responses? Basically abusing .chat even though it is just a completion for this case since it guarantees proper responses
        }).chat?.(model);

        // Stream the completion
        const response = await streamText({
            model: target_model,
            prompt: prompt,
            maxTokens: Number(settings?.maxTokens) || 2500,
            temperature: Number(settings?.temperature) || 0.6,
        });

        return response.toDataStreamResponse();

    } catch (error) {
        console.error("Error in completion:", error);

        let errorMessage = error.message || 'An unknown error occurred';

        try {
            // Try to parse error body if it exists
            if (error.responseBody) {
                const parsedError = JSON.parse(error.responseBody).error;
                errorMessage = typeof parsedError === 'object' ? parsedError.message : parsedError;
            }
        } catch (parseError) {
            // If parsing fails, use the original error message
        }

        return new NextResponse(
            JSON.stringify({ error: errorMessage }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}