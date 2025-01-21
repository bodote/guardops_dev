import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    const historyData = await request.json();

    // Generate UUID for the new Prompt entry
    const promptId = uuidv4();

    // Data for Prompts table
    const promptData = {
        id: promptId,
        name: historyData.name,
        timestamp: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };

    // Data for PromptHistory table
    const promptHistoryData = {
        promptId: promptId,
        items: historyData.items
    };

    // Server-side console log
    console.log('New Prompt:', promptData);
    console.log('Prompt History:', promptHistoryData);

    // Return both pieces of data
    return NextResponse.json({
        prompt: promptData,
        history: promptHistoryData
    });
}
export async function GET(request) {
    // Get promptId from URL search params
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get('promptId');


    // Dummy data for prompt history
    const data = {
        promptId: promptId,
        items: [
            {
                id: '456e7890-f12d-34e5-6789-012345678901',
                parentId: null,
                name: 'Initial Email Campaign',
                timestamp: '2024-03-20T15:30:00Z',
                userInput: 'Create an email campaign for new product launch',
                generatedPrompt: 'Write a compelling email...',
                selectedModels: [{ model_id: 'gpt4' }],
                testContext: 'Product: AI Assistant\nLaunch Date: April 2024',
                testResults: {
                    'gpt4': 'Subject: Introducing Your New AI Assistant...'
                }
            },
            {
                id: '789a1234-b56c-78d9-ef01-234567890abc',
                parentId: '456e7890-f12d-34e5-6789-012345678901',
                name: 'Email Campaign Iteration 1',
                timestamp: '2024-03-20T16:30:00Z',
                userInput: 'Make the email more engaging',
                generatedPrompt: 'Revise the email to...',
                selectedModels: [{ model_id: 'gpt4' }],
                testContext: 'Previous metrics: 25% open rate',
                testResults: {
                    'gpt4': 'Subject: Don\'t Miss Out - Your AI Assistant Awaits...'
                }
            }
        ]
    };

    return Response.json(data);
}