import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { Route } from '@angular/router';
import { environment } from '../environments/environment';

export const appRoutes: Route[] = [
  {
    path: 'list',
    loadChildren: () => import('list/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'details/name/:name',
    component: WebComponentWrapper,
    data: {
      remoteEntry: environment.mfesOrigins.details,
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
