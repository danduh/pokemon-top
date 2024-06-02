import type { Type } from '@angular/core';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { PictureComponent } from './picture.component';

export class PictureComponentDriver {
  private helper = new CypressHelper();
  private angularComponentHelper =
    new CypressAngularComponentHelper<PictureComponent>();
  private componentProperties: Partial<PictureComponent> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

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
    clickImage: (index: number = 0) =>
      this.helper.when.click('pokemon-image', index),
  };

  get = {
    pokemonImage: (index: number = 0) =>
      this.helper.get.elementByTestId('pokemon-image', index),
    pictureSrc: (index: number = 0) =>
      this.helper.get.elementsAttribute('pokemon-image', 'src', index),
  };
}
