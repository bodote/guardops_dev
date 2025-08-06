// Model utility functions

export const getModelDisplayName = (model_id) => {
    const parts = model_id.split('/');
    const modelName = parts[parts.length - 1];
    return modelName.replace(/-/g, ' ');
};

export const getHuggingFaceUrl = (model_id) => {
    return `https://huggingface.co/${model_id}`;
};

export const formatModelConfig = (config) => {
    return {
        vocabularySize: config.vocab_size?.toLocaleString() || 'N/A',
        attentionHeads: config.num_attention_heads || 'N/A',
        hiddenLayers: config.num_hidden_layers || 'N/A',
        keyValueHeads: config.num_key_value_heads || 'N/A',
        headDimension: config.head_dim || 'N/A',
        hiddenSize: config.hidden_size?.toLocaleString() || 'N/A',
        activationFunction: config.hidden_act || 'N/A',
        modelType: config.model_type || 'N/A',
        maxPosition: config.max_position_embeddings?.toLocaleString() || 'N/A',
        dtype: config.torch_dtype || 'N/A'
    };
};

export const getModelArchitectureSummary = (config) => {
    const layers = config.num_hidden_layers || 0;
    const heads = config.num_attention_heads || 0;
    const hiddenSize = config.hidden_size || 0;

    return `${layers}L-${heads}H-${hiddenSize}D`;
};