import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'list-app',
  exposes: {
    './Routes': 'apps/list-app/src/app/remote-entry/entry.routes.ts',
    './Module': 'apps/list-app/src/app/remote-entry/entry.component.ts',
  },
  library: { type: 'var', name: 'list' },
};

export default config;
