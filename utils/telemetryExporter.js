const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
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
    /gen_ai_prompt_\d+_content/,
    /ai_prompt/
];

const RESPONSE_DEFINITIONS = [
    /llm_completions_\d+_content/,
    /gen_ai_completion_\d+_content/,
    /ai_result_text/
];

const MODEL_DEFINITIONS = [
    "llm_response_model",
    "gen_ai_response_model",
    "ai_model_id"
];

class JSONProcessor extends SimpleSpanProcessor {
    constructor( config = {}) {
        console.log("creating exporter");
        super();
        this.config = config;
        this.traces = [];
        this.traceIds = new Set();
        
    }
   
    async onEnd(span) {
        console.log("a span is ending");
        const spanJson = span;
        if(spanJson.name.includes("streamText") || spanJson.name.includes("toolCall")){
            console.log("an ai span with this name ", spanJson.name);
            console.log("this span", spanJson);

        }
        
        return;
        if (spanJson.name !== "POST /api/chat/route") {
            console.log("ignoring this one");
            console.log(spanJson)
            return;
        }
       

        

        const exportSpanDict = renameKeysDeep(spanJson);
        console.log("ending span ", exportSpanDict)
        exportSpanDict.attributes.response = JSON.stringify(exportSpanDict.attributes);
        exportSpanDict.attributes.output = extractResponse(exportSpanDict);
        exportSpanDict.attributes.prompt = extractPrompt(exportSpanDict);
        exportSpanDict.attributes.model = extractModel(exportSpanDict);

        console.log("FOUND THIS SPAN TO EXPORT", exportSpanDict);

        //this.traces.push(exportSpanDict);
        //this.clean();
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

function renameKeys(obj) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = key.replace(/\./g, '_');
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }
  
  // To handle nested objects recursively
  function renameKeysDeep(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(renameKeysDeep);
    }
  
    const renamedObj = renameKeys(obj);
    Object.keys(renamedObj).forEach(key => {
      renamedObj[key] = renameKeysDeep(renamedObj[key]);
    });
  
    return renamedObj;
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