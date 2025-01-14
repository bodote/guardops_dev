
const nextConfig = {
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    missingSuspenseWithCSRBailout: false,

},

webpack: (config) => {
  // Ignore node-specific modules when bundling for the browser
  // See https://webpack.js.org/configuration/resolve/#resolvealias
  config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
  }
  config.externals.push({
    'https://unpkg.com/@xenova/transformers@2.13.2': 'transformers',
  });
  return config;
},
};

module.exports = nextConfig;
