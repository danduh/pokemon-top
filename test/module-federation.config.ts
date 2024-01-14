import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'test',
  exposes: {
    './Routes': 'test/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
