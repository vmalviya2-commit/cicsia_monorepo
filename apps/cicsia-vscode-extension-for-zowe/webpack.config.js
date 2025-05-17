//@ts-check
'use strict';

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node',
  mode: 'development',
  context: __dirname,
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@cicsia-nx-monorepo-workspace/shared-ui': path.resolve(__dirname, '../../libs/shared-ui/src/index.ts')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'commonjs'
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  infrastructureLogging: {
    level: "log",
  },
};

/** @type WebpackConfig */
const webviewConfig = {
  target: 'web',
  mode: 'development',
  context: __dirname,
  entry: './src/webview/panel.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'webview.js',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@cicsia-nx-monorepo-workspace/shared-ui': path.resolve(__dirname, '../../libs/shared-ui/src/index.ts'),
      'vscode': false // Ignore vscode module in webview bundle
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext'
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = [extensionConfig, webviewConfig];
