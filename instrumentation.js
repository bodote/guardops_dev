
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const JSONProcessor = require('./utils/telemetryExporter')
const {BatchSpanProcessor} = require("@opentelemetry/sdk-trace-node")

import { registerOTel } from '@vercel/otel'


const tracing_config = {
    tracing_key: 'your-tracing-key',
    project_id: 'your-project-id',
    user_id: 'your-user-id'
};
export function register() {
  console.log("registering telemetry")
  registerOTel( {  serviceName: 'coai-tracing',
    spanProcessors: [new JSONProcessor(tracing_config)],
 
    instrumentationConfig: {
      fetch: {
        ignoreUrls: [/^\/api\/manage.*/,/^\/api\/auth.*/]
      }
    }
    
  } )
}
