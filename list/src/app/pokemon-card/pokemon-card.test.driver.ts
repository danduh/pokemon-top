import type { Type } from '@angular/core';
import { UrlTree, type Router, type UrlCreationOptions } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { Observable } from 'rxjs';
import { PictureComponentDriver } from '../components/picture/picture.component.test.driver';
import type { BetterPokemon } from '../services/pokemon.service';
import type { PokemonCardComponent } from './pokemon-card.component';

export class PokemonCardComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<PokemonCardComponent>();
  private pictureDriver = new PictureComponentDriver();
  private componentProperties: Partial<PokemonCardComponent> = {};

  private mockRouter: Partial<Router> = {
    events: new Observable(),
    createUrlTree: (
      commands: any[],
      navigationExtras?: UrlCreationOptions | undefined
    ) => new UrlTree(),
    serializeUrl: (url: UrlTree) => '',
  };

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    picture: this.pictureDriver.given,
    pokemon: (value: BetterPokemon) =>
      (this.componentProperties.pokemon = value),
    pokeID: (value: number) => (this.componentProperties.pokeId = value),
    spyOnNavigateByUrl: () =>
      (this.mockRouter.navigateByUrl = this.helper.given.spy('navigateByUrl')),
  };

  when = {
    picture: this.pictureDriver.when,
    render: (
      type: Type<PokemonCardComponent>,
      config: MountConfig<PokemonCardComponent>
    ) => {
      this.componentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    clickMoreInfo: () => this.helper.when.click('more-info'),
  };

  get = {
    picture: this.pictureDriver.get,
    mockRouter: () => this.mockRouter,
    navigateByUrlSpy: () => this.helper.get.spy('navigateByUrl'),
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
  };
}
