import { Route } from '@angular/router';
import { PokemonListComponent } from '@pokemon/pokemon-list';

export const remoteRoutes: Route[] = [
  { path: '', component: PokemonListComponent },
];
