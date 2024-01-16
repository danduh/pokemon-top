import { Route } from '@angular/router';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { env } from '../environments/environments';

export const appRoutes: Route[] = [
  {
    path: 'list',
    loadChildren: () => import('list/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'details',
    component: WebComponentWrapper,
    data: {
      remoteEntry: env.mfesOrigins.details,
      remoteName: 'details',
      exposedModule: './Module',
      elementName: 'mfe-react-details',
    } as WebComponentWrapperOptions,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
];
