import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from './services/pokemon.service';

export const appConfig: ApplicationConfig = {
  providers: [
    PokemonService,
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
