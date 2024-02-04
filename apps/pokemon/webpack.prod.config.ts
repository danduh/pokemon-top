import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

const prefix = process.env['IS_FOR_GP'] ? '/pokemon-top/apps' : '';

export default withModuleFederation({
  ...config,
  /*
   * Remote overrides for production.
   * Each entry is a pair of a unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['app1', 'https://app1.example.com'],
   *   ['app2', 'https://app2.example.com'],
   * ]
   */
  remotes: [
    ['list', `${prefix}/assets/list/remoteEntry.mjs`],
    ['details', `${prefix}/assets/details/remoteEntry.js`],
  ],
});
