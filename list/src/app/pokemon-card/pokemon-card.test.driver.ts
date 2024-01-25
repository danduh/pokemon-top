import type { Type } from '@angular/core';
import { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { PictureComponentDriver } from '../components/picture/picture.component.test.driver';
import type { BetterPokemon } from '../services/pokemon.service';
import type { PokemonCardComponent } from './pokemon-card.component';

export class PokemonCardComponentDriver {
  // private addGetter = (obj: Object, key: string, value: any) => {
  //   Object.defineProperty(obj, key, {
  //     get: () => value,
  //   });
  // }
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<PokemonCardComponent>();
  private pictureDriver = new PictureComponentDriver();
  private componentProperties: Partial<PokemonCardComponent> = {};

  private mockRouter: any = this.helper.given.stubbedInstance(Router);

  // private mockRouter: Partial<Router> = {
  //   events: new Observable(),
  //   createUrlTree: (
  //     commands: any[],
  //     navigationExtras?: UrlCreationOptions | undefined
  //   ) => new UrlTree(),
  //   serializeUrl: (url: UrlTree) => '',
  // };

  beforeAndAfter = () => {
    // before(() => {
    //   this.addGetter(this.mockRouter, 'events', new Observable());

    // });
    this.helper.beforeAndAfter();
    this.pictureDriver.beforeAndAfter();
    beforeEach(() => {
      // debugger;
      // this.mockRouter._events = new Observable();
    });
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
    mockRouter: () => this.mockRouter,
    navigateByUrlSpy: () =>
      this.helper.get.assertableStub(this.mockRouter.navigateByUrl),
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
  };
}
