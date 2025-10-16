export async function GET() {
    try {
        // Fetch data from the actual API endpoint
        const response = await fetch('https://host.edif.ai/edif/status', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const models = [];

        // Process deployments to extract available models
        if (data.deployments) {
            for (const [deploymentKey, deployment] of Object.entries(data.deployments)) {
                const model = {
                    model_id: deployment.repo_id
                };

                // Only include config for HOT/RUNNING models
                if (deployment.deployment_level === 'HOT' && deployment.application_state === 'RUNNING') {
                    if (deployment.config) {
                        try {
                            const config = JSON.parse(deployment.config);
                            model.config = {
                                model_type: config.model_type,
                                vocab_size: config.vocab_size,
                                num_attention_heads: config.num_attention_heads,
                                num_hidden_layers: config.num_hidden_layers,
                                num_key_value_heads: config.num_key_value_heads,
                                head_dim: config.head_dim,
                                hidden_size: config.hidden_size,
                                hidden_act: config.hidden_act,
                                max_position_embeddings: config.max_position_embeddings,
                                torch_dtype: config.dtype || config.torch_dtype
                            };
                        } catch (configError) {
                            console.warn(`Failed to parse config for ${deployment.repo_id}:`, configError);
                        }
                    }

                    // Add additional metadata for running models
                    model.deployment_level = deployment.deployment_level;
                    model.application_state = deployment.application_state;
                    model.n_params = deployment.n_params;
                    model.dedicated = deployment.dedicated;
                } else {
                    // For COLD models, only include basic info
                    model.deployment_level = deployment.deployment_level;
                }

                models.push(model);
            }
        }

        return Response.json({
            models,
            message: "Interpretability models retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching interpretability models:", error);
        return Response.json(
            { error: "Failed to fetch interpretability models" },
            { status: 500 }
        );
    }
}