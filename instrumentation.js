
const JSONProcessor = require('./utils/telemetryExporter')

// import { registerOTel } from '@vercel/otel'

// const tracing_config = {
//   tracing_key: 'your-tracing-key',
//   project_id: 'your-project-id',
//   user_id: 'your-user-id'
// };

// const re = new RegExp("^(?!.*\/chat).*")

// export function register() {
//   registerOTel({
//     serviceName: 'coai-tracing',
//     spanProcessors: [new JSONProcessor(tracing_config)],

//     instrumentationConfig: {
//       fetch: {
//         dontPropagateContextUrls: [re],
//         ignoreUrls: [re]

//       }
//     }

//   })
// }


export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node.js')
  }
 
}