export async function POST(req) {
    try {
        const { model_id, original_prompt, modified_prompt, position, ablations } = await req.json();

        if (!model_id || !original_prompt || !modified_prompt || !ablations || position === undefined) {
            return Response.json(
                { error: "Missing required fields: model_id, original_prompt, modified_prompt, position, and ablations" },
                { status: 400 }
            );
        }

        // Simulate processing time (ablation can take longer)
        await new Promise(resolve => setTimeout(resolve, 7000)); // 7 seconds

        // Mock tokenization for modified prompt
        const modifiedWords = modified_prompt.trim().split(/\s+/);
        const modifiedPromptTokens = [];
        const modifiedPromptTokenIds = [];

        modifiedWords.forEach((word, idx) => {
            if (word.length > 6) {
                // Split longer words into sub-tokens
                const chunks = [];
                for (let i = 0; i < word.length; i += 4) {
                    chunks.push(word.slice(i, i + 4));
                }
                chunks.forEach((chunk, chunkIdx) => {
                    modifiedPromptTokens.push(chunkIdx === 0 ? chunk : `##${chunk}`);
                    modifiedPromptTokenIds.push(1000 + modifiedPromptTokens.length);
                });
            } else {
                modifiedPromptTokens.push(word);
                modifiedPromptTokenIds.push(1000 + modifiedPromptTokens.length);
            }
        });

        // Create ablated response - simulate partial ablation effects with some unchanged tokens
        // Original: "This is a normal response that would have been generated without ablation."
        // We'll keep some tokens and change others to show realistic ablation impact

        const originalTokens = ["This", "is", "a", "normal", "response", "that", "would", "have", "been", "generated", "without", "ablation", "."];

        // Create several ablation scenarios with different patterns
        const ablationScenarios = [
            // Scenario 1: Preserve structure, change content words (sentiment/content affected)
            ["This", "is", "a", "poor", "response", "that", "cannot", "have", "been", "generated", "without", "errors", "."],
            // Scenario 2: Preserve beginning, degrade towards end (cascade effect)
            ["This", "is", "a", "normal", "response", "but", "unclear", "and", "confusing", "output", "with", "issues", "."],
            // Scenario 3: Keep functional words, change content (semantic core affected)  
            ["This", "is", "a", "broken", "output", "that", "would", "have", "been", "corrupted", "without", "processing", "."],
            // Scenario 4: Minor changes (mild ablation effect)
            ["This", "is", "a", "decent", "response", "that", "might", "have", "been", "generated", "without", "ablation", "."],
            // Scenario 5: Major structural change (severe ablation)
            ["The", "system", "cannot", "provide", "coherent", "responses", "due", "to", "disabled", "neural", "components", "here", "."]
        ];

        const ablatedTokens = ablationScenarios[Math.floor(Math.random() * ablationScenarios.length)];

        // Generate token IDs for ablated response
        const ablatedResponseTokenIds = ablatedTokens.map((_, idx) => 2000 + idx);

        // Combine for full output
        const fullOutputTokens = [...modifiedPromptTokens, ...ablatedTokens];
        const fullOutputTokenIds = [...modifiedPromptTokenIds, ...ablatedResponseTokenIds];
        const fullOutputText = fullOutputTokens.join(' ');

        // Calculate ablation statistics
        const totalLayersAblated = ablations.length;
        const entireLayersAblated = ablations.filter(a => a.entire_layer).length;
        const totalNeuronsAblated = ablations.reduce((total, ablation) => {
            return total + (ablation.entire_layer ? 4096 : ablation.neurons.length); // Assume 4096 as example hidden size
        }, 0);

        const response = {
            model_id,
            original_prompt,
            modified_prompt,
            position,
            ablation_config: {
                layers_ablated: totalLayersAblated,
                entire_layers_ablated: entireLayersAblated,
                total_neurons_ablated: totalNeuronsAblated,
                ablations: ablations
            },
            original_response: {
                // This would typically come from the previous generation, 
                // for now we'll create a mock original response
                text: "This is a normal response that would have been generated without ablation.",
                tokens: ["This", "is", "a", "normal", "response", "that", "would", "have", "been", "generated", "without", "ablation", "."],
                token_ids: [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012]
            },
            ablated_result: {
                prompt: {
                    text: modified_prompt,
                    token_ids: modifiedPromptTokenIds,
                    tokens: modifiedPromptTokens
                },
                generated: {
                    text: ablatedTokens.join(' '),
                    token_ids: ablatedResponseTokenIds,
                    tokens: ablatedTokens
                },
                full_output: {
                    text: fullOutputText,
                    token_ids: fullOutputTokenIds,
                    tokens: fullOutputTokens
                }
            },
            comparison_metrics: {
                text_similarity: Math.random() * 0.3 + 0.1, // 0.1 - 0.4 (low similarity due to ablation)
                token_overlap: Math.random() * 0.2 + 0.05,   // 0.05 - 0.25
                semantic_distance: Math.random() * 0.8 + 0.6, // 0.6 - 1.4 (high distance)
                coherence_score: Math.random() * 0.4 + 0.2    // 0.2 - 0.6 (reduced coherence)
            },
            message: "Ablation study completed successfully"
        };

        return Response.json(response);
    } catch (error) {
        console.error("Error during ablation study:", error);
        return Response.json(
            { error: "Failed to perform ablation study" },
            { status: 500 }
        );
    }
}