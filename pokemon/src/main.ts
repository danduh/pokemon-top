import { setRemoteDefinitions } from '@nx/angular/mf';
import { environment } from './environments/environment';

fetch(environment.manifestPath)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
