import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'list',
  exposes: {
    './Routes': 'list/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
