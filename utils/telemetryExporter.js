const { BatchSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { trace } = require('@opentelemetry/api');
const axios = require('axios');
const crypto = require('crypto');

const config = {
    tracing_key: 'your-tracing-key',
    project_id: 'your-project-id',
    user_id: 'your-user-id'
};

const STORAGE_API_URL = "https://lm3.hs-ansbach.de/tracing/api/store_trace/";

const PROMPT_DEFINITIONS = [
    /llm_prompts_\d+_content/,
    /gen_ai_prompt_\d+_content/
];

const RESPONSE_DEFINITIONS = [
    /llm_completions_\d+_content/,
    /gen_ai_completion_\d+_content/
];

const MODEL_DEFINITIONS = [
    "llm_response_model",
    "gen_ai_response_model"
];

class JSONProcessor extends BatchSpanProcessor {
    constructor(spanExporter, config, options = {}) {
        console.log("creating exporter");
        super(spanExporter, options);
        this.config = config;
        this.traces = [];
        this.traceIds = new Set();
    }

    onEnd(span) {
        console.log("ending span")
        const spanJson = JSON.parse(JSON.stringify(span));

        if (spanJson.name === "GET" || spanJson.name === "POST") {
            return;
        }

        const exportSpanDict = replaceDotsRecursive(spanJson);
        exportSpanDict.attributes.response = JSON.stringify(exportSpanDict.attributes);
        exportSpanDict.attributes.output = extractResponse(exportSpanDict);
        exportSpanDict.attributes.prompt = extractPrompt(exportSpanDict);
        exportSpanDict.attributes.model = extractModel(exportSpanDict);

        this.traces.push(exportSpanDict);
        this.clean();
    }

    async clean() {
        console.log("cleaning exporter")
        const key = this.config.tracing_key;
        const projectId = this.config.project_id;
        const user = this.config.user_id;

        for (const span of this.traces) {
            const traceId = span.spanContext.traceId;
            let data;

            if (!this.traceIds.has(traceId)) {
                const traceDict = {
                    trace_id: traceId,
                    access_token: key,
                    project_id: projectId,
                    playground_id: span.attributes.playground_id
                };
                data = { span, trace: traceDict };
                this.traceIds.add(traceId);
            } else {
                data = { span };
            }

            try {
                const response = await axios.post(
                    STORAGE_API_URL,
                    data,
                    {
                        params: {
                            user_id: user,
                            project_id: projectId,
                            key_hash: crypto.createHash('sha256').update(key).digest('hex')
                        }
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.error('Error storing trace:', error);
            }
        }
        this.traces = [];
    }
}

function replaceDotsRecursive(obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return obj.map(replaceDotsRecursive);
        } else {
            return Object.fromEntries(
                Object.entries(obj).map(([k, v]) => [k.replace(/\./g, '_'), replaceDotsRecursive(v)])
            );
        }
    }
    return obj;
}

function extractResponse(span) {
    let response = "";
    for (const key in span.attributes) {
        for (const pattern of RESPONSE_DEFINITIONS) {
            if (pattern.test(key)) {
                response += span.attributes[key];
                response += "\n";
            }
        }
    }
    return response;
}

function extractPrompt(span) {
    let response = "";
    for (const key in span.attributes) {
        for (const pattern of PROMPT_DEFINITIONS) {
            if (pattern.test(key)) {
                const value = span.attributes[key];
                if (Array.isArray(value)) {
                    response += value.join("\n");
                } else {
                    response += String(value);
                }
                response += "\n";
            }
        }
    }
    return response === "" ? "No Prompt Found" : response;
}

function extractModel(span) {
    let model = "";
    for (const modelDefinition of MODEL_DEFINITIONS) {
        if (modelDefinition in span.attributes) {
            model = span.attributes[modelDefinition];
        }
    }
    return model;
}

module.exports = JSONProcessor;