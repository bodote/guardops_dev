
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
},

webpack: (config) => {
  // Ignore node-specific modules when bundling for the browser
  // See https://webpack.js.org/configuration/resolve/#resolvealias
  config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
  }
  return config;
},
};

module.exports = nextConfig;
