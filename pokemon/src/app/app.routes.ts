import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const appRoutes: Route[] = [
  {
    path: 'list',
    loadChildren: () => import('list/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'details',
    component: WebComponentWrapper,
    data: {
      remoteEntry: `http://localhost:4202/remoteEntry.js`,
      remoteName: 'details',
      exposedModule: './Module',
      elementName: 'mfe-react-details',
    } as WebComponentWrapperOptions,
  },

  {
    path: '',
    component: NxWelcomeComponent,
  },
];
