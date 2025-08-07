export async function POST(request) {
    try {
        // Simulate processing delay for activation patching (7-10 seconds)
        await new Promise(resolve => setTimeout(resolve, 8000));

        const body = await request.json();
        const {
            model_id,
            original_prompt,
            patch_source_prompt,
            patch_source_position,
            target_prompt,
            target_position,
            patch_config
        } = body;

        // Extract patch configuration
        const { layers, neurons } = patch_config;

        // Generate mock tokens for original prompt
        const originalPromptWords = original_prompt.trim().split(/\s+/);
        const originalPromptTokens = [];
        const originalPromptTokenIds = [];

        originalPromptWords.forEach((word, idx) => {
            originalPromptTokens.push(word);
            originalPromptTokenIds.push(1000 + idx);
        });

        // Generate mock tokens for patch source prompt  
        const patchSourceWords = patch_source_prompt.trim().split(/\s+/);
        const patchSourceTokens = [];
        const patchSourceTokenIds = [];

        patchSourceWords.forEach((word, idx) => {
            patchSourceTokens.push(word);
            patchSourceTokenIds.push(1500 + idx);
        });

        // Generate mock tokens for target prompt (if different from original)
        const targetPromptWords = target_prompt.trim().split(/\s+/);
        const targetPromptTokens = [];
        const targetPromptTokenIds = [];

        targetPromptWords.forEach((word, idx) => {
            targetPromptTokens.push(word);
            targetPromptTokenIds.push(2000 + idx);
        });

        // Mock original response (baseline)
        const originalResponseTokens = ["The", "cat", "sat", "on", "the", "warm", "wooden", "chair", "peacefully", "."];
        const originalResponseTokenIds = originalResponseTokens.map((_, idx) => 3000 + idx);

        // Mock patch source response (where we extract activations from)
        const patchSourceResponseTokens = ["The", "dog", "ran", "through", "the", "muddy", "garden", "path", "quickly", "."];
        const patchSourceResponseTokenIds = patchSourceResponseTokens.map((_, idx) => 3500 + idx);

        // Create patched response scenarios based on patch configuration
        const patchingScenarios = [
            // Scenario 1: Direct concept transfer (animal concept patching)
            ["The", "dog", "sat", "on", "the", "warm", "wooden", "chair", "peacefully", "."],
            // Scenario 2: Behavioral transfer (action/manner patching)  
            ["The", "cat", "ran", "through", "the", "warm", "wooden", "chair", "quickly", "."],
            // Scenario 3: Environmental transfer (setting/context patching)
            ["The", "cat", "sat", "in", "the", "muddy", "garden", "chair", "peacefully", "."],
            // Scenario 4: Multi-aspect transfer (complex patching)
            ["The", "dog", "ran", "through", "the", "muddy", "garden", "path", "quickly", "."],
            // Scenario 5: Partial transfer (selective patching)
            ["The", "cat", "sat", "on", "the", "muddy", "wooden", "chair", "quickly", "."],
            // Scenario 6: Minimal transfer (weak patch effect)
            ["The", "cat", "sat", "on", "the", "warm", "garden", "chair", "peacefully", "."]
        ];

        const patchedResponseTokens = patchingScenarios[Math.floor(Math.random() * patchingScenarios.length)];
        const patchedResponseTokenIds = patchedResponseTokens.map((_, idx) => 4000 + idx);

        // Calculate patching statistics
        const totalLayersPatched = layers.length;
        const entireLayersPatched = layers.filter(layer =>
            neurons[layer] && neurons[layer].entire_layer
        ).length;

        const totalNeuronsPatched = layers.reduce((total, layer) => {
            const layerNeurons = neurons[layer];
            if (!layerNeurons) return total;
            return total + (layerNeurons.entire_layer ? 4096 : layerNeurons.neuron_ids.length);
        }, 0);

        // Generate activation extraction metadata
        const extractedActivations = {
            source_prompt: patch_source_prompt,
            source_position: patch_source_position,
            target_position: target_position,
            layers_extracted: layers,
            activation_shapes: layers.reduce((shapes, layer) => {
                const layerNeurons = neurons[layer];
                if (!layerNeurons) return shapes;

                shapes[layer] = {
                    layer: layer,
                    neuron_count: layerNeurons.entire_layer ? 4096 : layerNeurons.neuron_ids.length,
                    activation_vector_size: layerNeurons.entire_layer ? 4096 : layerNeurons.neuron_ids.length,
                    extracted_from_token: patch_source_prompt.split(/\s+/)[patch_source_position] || "unknown"
                };
                return shapes;
            }, {})
        };

        const response = {
            model_id,
            original_prompt,
            target_prompt,
            patch_source_prompt,
            patch_source_position,
            target_position,
            patch_config: {
                layers_patched: totalLayersPatched,
                entire_layers_patched: entireLayersPatched,
                total_neurons_patched: totalNeuronsPatched,
                layer_details: layers.map(layer => ({
                    layer: layer,
                    entire_layer: neurons[layer]?.entire_layer || false,
                    neuron_ids: neurons[layer]?.neuron_ids || [],
                    neuron_count: neurons[layer]?.entire_layer ? 4096 : (neurons[layer]?.neuron_ids.length || 0)
                }))
            },
            extracted_activations: extractedActivations,
            original_response: {
                text: originalResponseTokens.join(' '),
                tokens: originalResponseTokens,
                token_ids: originalResponseTokenIds
            },
            patch_source_response: {
                text: patchSourceResponseTokens.join(' '),
                tokens: patchSourceResponseTokens,
                token_ids: patchSourceResponseTokenIds
            },
            patched_result: {
                prompt: {
                    text: target_prompt,
                    token_ids: targetPromptTokenIds,
                    tokens: targetPromptTokens
                },
                generated: {
                    text: patchedResponseTokens.join(' '),
                    token_ids: patchedResponseTokenIds,
                    tokens: patchedResponseTokens
                },
                full_output: {
                    text: [...targetPromptTokens, ...patchedResponseTokens].join(' '),
                    token_ids: [...targetPromptTokenIds, ...patchedResponseTokenIds],
                    tokens: [...targetPromptTokens, ...patchedResponseTokens]
                }
            },
            comparison_metrics: {
                text_similarity_original_vs_patched: Math.random() * 0.6 + 0.2, // 0.2 - 0.8
                semantic_shift_score: Math.random() * 0.8 + 0.1, // 0.1 - 0.9
                activation_transfer_strength: Math.random() * 0.7 + 0.3, // 0.3 - 1.0
                patch_effectiveness: Math.random() * 0.9 + 0.1 // 0.1 - 1.0
            }
        };

        return Response.json(response);
    } catch (error) {
        console.error('Activation patching error:', error);
        return Response.json(
            { error: 'Failed to perform activation patching analysis' },
            { status: 500 }
        );
    }
}