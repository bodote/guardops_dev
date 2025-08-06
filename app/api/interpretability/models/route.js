export async function GET() {
    try {
        // Mock interpretability models data with realistic HuggingFace model configs
        const models = [
            {
                model_id: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
                config: {
                    model_type: "llama",
                    vocab_size: 128256,
                    num_attention_heads: 64,
                    num_hidden_layers: 80,
                    num_key_value_heads: 8,
                    head_dim: 128,
                    hidden_size: 8192,
                    hidden_act: "silu",
                    max_position_embeddings: 131072,
                    torch_dtype: "bfloat16"
                }
            },
            {
                model_id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
                config: {
                    model_type: "qwen2",
                    vocab_size: 152064,
                    num_attention_heads: 64,
                    num_hidden_layers: 64,
                    num_key_value_heads: 8,
                    head_dim: 128,
                    hidden_size: 5120,
                    hidden_act: "silu",
                    max_position_embeddings: 32768,
                    torch_dtype: "bfloat16"
                }
            },
            {
                model_id: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
                config: {
                    model_type: "llama",
                    vocab_size: 128256,
                    num_attention_heads: 32,
                    num_hidden_layers: 32,
                    num_key_value_heads: 8,
                    head_dim: 128,
                    hidden_size: 4096,
                    hidden_act: "silu",
                    max_position_embeddings: 131072,
                    torch_dtype: "bfloat16"
                }
            },
            {
                model_id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
                config: {
                    model_type: "qwen2",
                    vocab_size: 152064,
                    num_attention_heads: 40,
                    num_hidden_layers: 48,
                    num_key_value_heads: 8,
                    head_dim: 128,
                    hidden_size: 5120,
                    hidden_act: "silu",
                    max_position_embeddings: 32768,
                    torch_dtype: "bfloat16"
                }
            },
            {
                model_id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
                config: {
                    model_type: "qwen2",
                    vocab_size: 152064,
                    num_attention_heads: 32,
                    num_hidden_layers: 28,
                    num_key_value_heads: 4,
                    head_dim: 128,
                    hidden_size: 3584,
                    hidden_act: "silu",
                    max_position_embeddings: 32768,
                    torch_dtype: "bfloat16"
                }
            }
        ];

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