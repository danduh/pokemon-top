// import { composePlugins, withNx } from '@nx/webpack';
// import { withReact } from '@nx/react';
// import { withModuleFederation } from '@nx/react/module-federation';

// import baseConfig from './module-federation.config';

// const config = {
//   ...baseConfig,
// };

// // Nx plugins for webpack to build config object from Nx options and context.
// export default composePlugins(
//   withNx(),
//   withReact(),
//   withModuleFederation(config)
// );

import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';

import { ModuleFederationConfig } from '@nx/webpack';

import * as path from 'path';

const webpackEntry = [
  path.resolve(__dirname, './src/index.html'),
  path.resolve(__dirname, './src/main.ts'),
];

const webpackOutput = {
  publicPath: 'auto',
  path: path.resolve(__dirname, '../../dist/apps/http-mfe-react'),
};

const webpackModuleFederationPlugin: ModuleFederationConfig = {
  name: 'details',
  library: { type: 'var', name: 'details' },
  //filename: 'remoteEntry.js',
  exposes: {
    './Module': path.resolve(__dirname, './src/bootstrap.tsx'),
  },
  // shared: ['react', 'react-dom'],
};

const ruleForTsx = {
  test: /\.tsx$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/react', '@babel/env'],
      },
    },
  ],
};
const ruleForMisc = {
  test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
  use: ['file-loader'],
};
const ruleForHtml = {
  test: /\.html$/,
  use: ['file-loader?name=[name].[ext]'],
};
const ruleForStyles = {
  test: /\.(s[ac]ss|\.css)$/,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
};

const webpackRules = [ruleForTsx, ruleForMisc, ruleForHtml, ruleForStyles];

const webpackExtensions = ['.tsx', '.ts', '.js'];

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(webpackModuleFederationPlugin),
  (config) => {
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`

    config.entry = webpackEntry;
    // config.output = webpackOutput;
    config.optimization.runtimeChunk = false; // Only needed to bypass a temporary bug
    config.module.rules = webpackRules;
    config.resolve.extensions = webpackExtensions;

    return config;
  }
);
