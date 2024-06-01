import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'details-app',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
