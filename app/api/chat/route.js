import { createOpenAI, openai } from '@ai-sdk/openai';
import { convertToCoreMessages, LangChainAdapter, streamText ,StreamData} from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createAnthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { createMistral } from '@ai-sdk/mistral';
import { cohere } from '@ai-sdk/cohere';
import { createCohere } from '@ai-sdk/cohere';
import { NextResponse } from 'next/server';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChatOpenAI } from "@langchain/openai";
import { Fireworks } from "@langchain/community/llms/fireworks"
import {
  RunnableMap,
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { formatDocumentsAsString } from "langchain/util/document";
import { TransformStream } from 'stream/web'; 
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";



export async function POST(req) {
  const body = await req.json()
  try {

    var { model, messages, prompt, settings, systemPrompt, provider, api_keys, multimodal, rag, selectedRag, chromaCollectionName } = body;
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

    if (providerConfig[provider]?.create === createOpenAI) {
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

    let base_url_for_rag = baseURL || undefined;
    let api_key_for_rag = apiKey || undefined;

    //only convert images to message if model is multimodal
    var messagesToSend = messages;
    if (multimodal) {
      messagesToSend = convertToCoreMessages(messages);
    }

    if (rag) {
      if (!openAiModelSelected) {
        return NextResponse.json(
          { error: "Only OpenAI API-based models support RAG. Select a compatible model." },
          { status: 400 }
          // Or another appropriate status code
        );
      }
      try {
        const lastUserMessageIndex = messages.map(msg => msg.role).lastIndexOf("user");
        const question = messages[lastUserMessageIndex].content;

        const chat_history = messages
          .filter((_, index) => index !== lastUserMessageIndex)  // Exclude the last User message
          .map((element) => {
            if (element.role === "assistant") {
              return new AIMessage(element.content);
            } else if (element.role === "user") {
              return new HumanMessage(element.content);
            }
          });

        const embeddings = new HuggingFaceTransformersEmbeddings({ model: "Xenova/all-MiniLM-L6-v2" })
        const vectorStore = new Chroma(embeddings, {
          collectionName: chromaCollectionName,
          url: process.env.CHROMA_HOST,
          clientParams: {
            auth: {
              provider: "token",
              credentials: process.env.CHROMA_CLIENT_AUTH_CREDENTIALS,
            }
          }
        })
        const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {minSimilarityScore: 0.85,maxK:2})
        let llm;

        if (provider === "fireworks") {
            llm = new Fireworks({
                model: model,
                apiKey: api_key_for_rag,
                temperature: 0,
                ...(base_url_for_rag ? { configuration: { baseURL: base_url_for_rag } } : {})
            });
        } else {
            llm = new ChatOpenAI({
                model: model,
                apiKey: api_key_for_rag,
                temperature: 0,
                ...(base_url_for_rag ? { configuration: { baseURL: base_url_for_rag } } : {})
            });
        }
        



        const contextualizeQSystemPrompt = `Given a chat history and the latest user question
which might reference context in the chat history, formulate a standalone question
which can be understood without the chat history. Do NOT answer the question,
just reformulate it if needed and otherwise return it as is.`;


        const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
          ["system", contextualizeQSystemPrompt],
          new MessagesPlaceholder("chat_history"),
          ["human", "{question}"],
        ]);
        const contextualizeQChain = contextualizeQPrompt
          .pipe(llm)
          .pipe(new StringOutputParser());


        const qaSystemPrompt = `You are an assistant for question-answering tasks.
  Use the following pieces of retrieved context to answer the question.
  If you don't know the answer, just say that you don't know.
  Use three sentences maximum and keep the answer concise.
  
  {context}`;

        const qaPrompt = ChatPromptTemplate.fromMessages([
          ["system", qaSystemPrompt],
          new MessagesPlaceholder("chat_history"),
          ["human", "{question}"],
        ]);

        const contextualizedQuestion = (input) => {
          if ("chat_history" in input) {
            return contextualizeQChain;
          }
          return input.question;
        };

        const ragChainWithSources = RunnableSequence.from([
          RunnablePassthrough.assign({
            contextualized_question: async (input) => {
              if (input.chat_history && input.chat_history.length > 0) {
                return contextualizeQChain.invoke({
                  chat_history: input.chat_history,
                  question: input.question,
                });
              }
              return input.question;
            }
          }),
          RunnableMap.from({
            context: (input) => retriever.getRelevantDocuments(input.contextualized_question),
            question: (input) => input.contextualized_question,
            chat_history: (input) => input.chat_history,
          }),
          RunnablePassthrough.assign({
            answer: RunnableSequence.from([
              (input) => ({
                context: formatDocumentsAsString(input.context),
                question: input.question,
                chat_history: input.chat_history,
              }),
              qaPrompt,
              llm,
              new StringOutputParser(),
            ]),
          }),

        ]);
        const data = new StreamData()
        const customHandler = {
          handleChainEnd: async (outputs, runId, parentRunId) => {
            if (outputs.context && Array.isArray(outputs.context)) {
              data.append({ context: outputs.context, runId: runId , parentRunId: parentRunId});
            }
          },
        };
        
        const ragResponse = await ragChainWithSources.stream({ question, chat_history  }, { callbacks:[customHandler]});

        //Here follows some needed code to make it work with the langchainadapter 
        //This basically extracts the ragResponse.answer and assigns it to the extractedAnswerStream
        let accumulatedResponse = {};
        const extractAnswerStream = new TransformStream({
          transform(chunk, controller) {

            accumulatedResponse = { ...accumulatedResponse, ...chunk };

            if (accumulatedResponse.answer) {
              controller.enqueue(accumulatedResponse.answer);
              accumulatedResponse = {};
            }
          },
          flush(controller) {
            if (accumulatedResponse.answer) {
              controller.enqueue(accumulatedResponse.answer);
            }
          }
        });
        const answerStream = ragResponse.pipeThrough(extractAnswerStream);

        
        return LangChainAdapter.toDataStreamResponse(answerStream, {data, callbacks:{onFinal() { data.close()}}});

      } catch (error) {
        console.error("Error in rag:", error);
      }

    }

    const response = await streamText({
      model: target_model,
      prompt: prompt,
      system: systemPrompt,
      maxTokens: Number(settings.maxTokens),
      temperature: Number(settings.temperature),
      messages: messagesToSend,
    
    })

    return response.toDataStreamResponse();
  } catch (error) {
    console.log("actual error ", error)
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