import type { Type } from '@angular/core';
import { Router, type Event } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { Observable } from 'rxjs';
import type { BetterPokemon } from '../../services/pokemon.service';
import { PictureComponentDriver } from '../picture/picture.component.test.driver';
import type { PokemonCardComponent } from './pokemon-card.component';
export class PokemonCardComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<PokemonCardComponent>();
  private pictureDriver = new PictureComponentDriver();
  private componentProperties: Partial<PokemonCardComponent> = {};

  private mockRouter: Router = this.helper.given.stubbedInstance(Router, {
    events: new Observable<Event>(),
  });

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.pictureDriver.beforeAndAfter();
  };

  given = {
    picture: this.pictureDriver.given,
    pokemon: (value: BetterPokemon) =>
      (this.componentProperties.pokemon = value),
    pokeID: (value: number) => (this.componentProperties.pokeId = value),
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
    mock: { router: () => this.mockRouter },
    navigateByUrlSpy: () => this.mockRouter.navigateByUrl,
    pokemonNameText: (index: number = 0) =>
      this.helper.get.elementsText('pokemon-name', index),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
    numberOfCards: () => this.helper.get.numberOfElements('pokemon-card'),
  };
}
