export async function POST(req) {
    try {
        const body = await req.json();
        const { model_id, prompt } = body;

        if (!model_id || !prompt) {
            return Response.json(
                { error: "Missing required fields: model_id and prompt" },
                { status: 400 }
            );
        }

        // Simulate processing time (5 seconds for testing overlay)
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Create mock tokenization of the prompt
        const promptTokens = prompt.trim().split(/\s+/).flatMap(word => {
            // Simple tokenization - split words into subwords occasionally
            if (word.length > 6) {
                const mid = Math.floor(word.length / 2);
                return [word.slice(0, mid), word.slice(mid)];
            }
            return [word];
        });

        // Add some subword tokens for realism
        const processedPromptTokens = promptTokens.flatMap(token => {
            if (token.length > 4 && Math.random() > 0.7) {
                return [token.slice(0, -2), token.slice(-2)];
            }
            return [token];
        });

        // Generate a mock response based on the prompt
        const generateMockResponse = (inputPrompt) => {
            const responses = [
                "This is a fascinating question that requires careful consideration of multiple perspectives.",
                "To answer this effectively, we need to examine the underlying principles and their applications.",
                "The complexity of this topic suggests that a multi-faceted approach would be most beneficial.",
                "Based on current understanding, several key factors contribute to this phenomenon.",
                "The implications of this question extend far beyond the immediate scope of inquiry."
            ];

            const baseResponse = responses[Math.floor(Math.random() * responses.length)];

            // Add some content related to the prompt
            if (inputPrompt.toLowerCase().includes('explain')) {
                return baseResponse + " Let me break this down into digestible components for better understanding.";
            } else if (inputPrompt.toLowerCase().includes('what')) {
                return baseResponse + " The answer involves several interconnected elements that work together.";
            } else if (inputPrompt.toLowerCase().includes('how')) {
                return baseResponse + " The process typically follows a structured sequence of steps.";
            }

            return baseResponse;
        };

        const generatedText = generateMockResponse(prompt);

        // Tokenize the generated response
        const generatedTokens = generatedText.trim().split(/\s+/).flatMap(word => {
            // More aggressive subword tokenization for generated text
            if (word.length > 5) {
                const parts = [];
                let remaining = word;
                while (remaining.length > 3) {
                    const chunkSize = Math.min(4, remaining.length);
                    parts.push(remaining.slice(0, chunkSize));
                    remaining = remaining.slice(chunkSize);
                }
                if (remaining.length > 0) {
                    parts.push(remaining);
                }
                return parts;
            }
            return [word];
        });

        // Create token IDs (mock)
        const promptTokenIds = processedPromptTokens.map((_, index) => 1000 + index);
        const generatedTokenIds = generatedTokens.map((_, index) => 2000 + index);
        const fullOutputTokenIds = [...promptTokenIds, ...generatedTokenIds];
        const fullOutputTokens = [...processedPromptTokens, ...generatedTokens];

        // Build the response structure as specified
        const response = {
            prompt: {
                text: prompt,
                token_ids: promptTokenIds,
                tokens: processedPromptTokens
            },
            generated: {
                text: generatedText,
                token_ids: generatedTokenIds,
                tokens: generatedTokens
            },
            full_output: {
                text: prompt + " " + generatedText,
                token_ids: fullOutputTokenIds,
                tokens: fullOutputTokens
            },
            model_info: {
                model_id: model_id,
                processing_time_ms: 1500,
                total_tokens: fullOutputTokenIds.length
            }
        };

        return Response.json(response);
    } catch (error) {
        console.error("Error generating interpretability response:", error);
        return Response.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}