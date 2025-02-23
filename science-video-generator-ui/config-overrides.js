const { override } = require("customize-cra");
const webpack = require("webpack");

module.exports = override((config) => {
  config.resolve = {
    ...config.resolve,
    fallback: {
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer"),
      vm: require.resolve("vm-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert"),
      util: require.resolve("util"),
      process: require.resolve("process/browser"),
      fs: false, // fs is not available in the browser
      net: false, // net is not available in the browser
      tls: false, // tls is not available in the browser
    },
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );
  return config;
});