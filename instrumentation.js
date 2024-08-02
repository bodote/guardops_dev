
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const JSONProcessor = require('./utils/telemetryExporter')

import { registerOTel } from '@vercel/otel'


const config = {
    tracing_key: 'your-tracing-key',
    project_id: 'your-project-id',
    user_id: 'your-user-id'
};
export function register() {
  console.log("registering telemetry")
  registerOTel({ config:{ serviceName: 'next-app',spanProcessor: new JSONProcessor(new ConsoleSpanExporter(), config)} })
}
