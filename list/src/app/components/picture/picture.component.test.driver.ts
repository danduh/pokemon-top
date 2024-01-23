import type { Type } from '@angular/core';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { Assertable, then } from '@shellygo/cypress-test-utils/assertable';
import { MountConfig } from 'cypress/angular';
import { PictureComponent } from './picture.component';

export class PictureComponentAssertable<T> extends Assertable<T> {
  shouldWhatever = () =>
    then(
      this.chainable.pipe((text) => text!.toString().trim())
      // this.chainable.then((text) => text!.toString().trim())
    ).shouldStartWith('data:image/png;');
}

export class PictureComponentDriver {
  private helper = new CypressHelper();
  private angularComponentHelper =
    new CypressAngularComponentHelper<PictureComponent>();
  private componentProperties: Partial<PictureComponent> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  then = (chainable: Cypress.Chainable) =>
    new PictureComponentAssertable(chainable);

  given = {
    pokemonID: (value: number) => (this.componentProperties.pokeId = value),
    mockImageResponse: (fileName: string) =>
      this.helper.given.interceptAndMockResponse({
        url: '**/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        response: { fixture: fileName },
        alias: 'image',
      }),
    missingImage: () =>
      this.helper.given.interceptAndMockResponse({
        url: '**/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        response: { headers: 404 },
        alias: 'image',
      }),
  };

  when = {
    render: (
      type: Type<PictureComponent>,
      config: MountConfig<PictureComponent>
    ) => {
      this.angularComponentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    waitForImageResponse: () => this.helper.when.waitForResponse('image'),
  };

  get = {
    pokemonImage: () => this.helper.get.elementByTestId('pokemon-image'),
    pictureSrc: () =>
      this.helper.get.elementByTestId('pokemon-image').invoke('attr', 'src'),
  };
}
