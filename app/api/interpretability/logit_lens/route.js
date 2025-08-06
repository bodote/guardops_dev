export async function POST(req) {
    try {
        const { model_id, context_tokens, context_token_ids, position } = await req.json();

        if (!model_id || !context_tokens || !context_token_ids || position === undefined) {
            return Response.json(
                { error: "Missing required parameters: model_id, context_tokens, context_token_ids, position" },
                { status: 400 }
            );
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock layer configuration based on model
        const getLayerCount = (modelId) => {
            if (modelId.includes("70B")) return 80;
            if (modelId.includes("32B")) return 64;
            if (modelId.includes("7B")) return 32;
            return 24; // default
        };

        const totalLayers = getLayerCount(model_id);

        // Generate mock alternative tokens for each layer
        const mockAlternatives = [
            "the", "and", "to", "of", "a", "in", "is", "it", "you", "that",
            "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
            "at", "be", "this", "have", "from", "or", "one", "had", "by", "word",
            "but", "not", "what", "all", "were", "we", "when", "your", "can", "said"
        ];

        // Create layer-wise predictions
        const layerPredictions = [];

        // Sample every few layers to keep data manageable
        const sampledLayers = [];
        const step = Math.max(1, Math.floor(totalLayers / 20)); // Sample ~20 layers max
        for (let i = 0; i < totalLayers; i += step) {
            sampledLayers.push(i);
        }
        // Always include the final layer
        if (!sampledLayers.includes(totalLayers - 1)) {
            sampledLayers.push(totalLayers - 1);
        }

        sampledLayers.forEach(layerIndex => {
            const topTokens = [];

            // Generate 20 top alternative tokens with probabilities
            for (let i = 0; i < 20; i++) {
                const randomToken = mockAlternatives[Math.floor(Math.random() * mockAlternatives.length)];
                // Create realistic probability distribution (decreasing)
                const baseProb = 0.8 - (i * 0.08); // 0.8, 0.72, 0.64, etc.
                const probability = Math.max(0.01, baseProb + (Math.random() - 0.5) * 0.1);

                topTokens.push({
                    token: randomToken,
                    token_id: 1000 + i + layerIndex, // Mock token ID
                    probability: probability,
                    logit: Math.log(probability / (1 - probability)) // Convert to logit
                });
            }

            // Sort by probability descending
            topTokens.sort((a, b) => b.probability - a.probability);

            layerPredictions.push({
                layer: layerIndex,
                layer_name: `layer_${layerIndex}`,
                position: position,
                actual_token: context_tokens[position],
                actual_token_id: context_token_ids[position],
                top_predictions: topTokens
            });
        });

        const response = {
            model_id,
            position,
            context_length: context_tokens.length,
            total_layers: totalLayers,
            sampled_layers: sampledLayers.length,
            actual_token: context_tokens[position],
            actual_token_id: context_token_ids[position],
            layer_predictions: layerPredictions,
            metadata: {
                analysis_type: "logit_lens",
                timestamp: new Date().toISOString(),
                context_window: {
                    start: Math.max(0, position - 10),
                    end: Math.min(context_tokens.length, position + 10),
                    tokens: context_tokens.slice(
                        Math.max(0, position - 10),
                        Math.min(context_tokens.length, position + 10)
                    )
                }
            }
        };

        return Response.json(response);

    } catch (error) {
        console.error("Error in logit lens analysis:", error);
        return Response.json(
            { error: "Failed to perform logit lens analysis" },
            { status: 500 }
        );
    }
}