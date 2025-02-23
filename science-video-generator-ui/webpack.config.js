const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    url: require.resolve("url"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );
  return config;
};