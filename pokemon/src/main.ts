import { setRemoteDefinitions } from '@nx/angular/mf';
import { env } from './environments/environment';

fetch(env.manifestPath)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
