import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from '@pokemon/pokemon-list';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

export const appConfig: ApplicationConfig = {
  providers: [
    CdkConnectedOverlay,
    PokemonService,
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
