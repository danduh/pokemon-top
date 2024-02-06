import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'list',
  exposes: {
    './Routes': 'apps/list/src/app/remote-entry/entry.routes.ts',
    './Module': 'apps/list/src/app/remote-entry/entry.component.ts',
  },
  library: { type: 'var', name: 'list' },
};

export default config;
