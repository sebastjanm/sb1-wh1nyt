const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);

  // Add custom babel configuration
  webpack.chainWebpack((config) => {
    config.module
      .rule('tsx')
      .use('babel-loader')
      .tap((options) => ({
        ...options,
        plugins: [
          ...(options.plugins || []),
          '@babel/plugin-transform-react-jsx'
        ],
        presets: [
          ...(options.presets || []),
          '@babel/preset-react',
          '@babel/preset-typescript'
        ]
      }));
  });

  return webpack.resolveConfig();
};