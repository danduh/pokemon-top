import type { Type } from '@angular/core';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { PictureComponent } from './picture.component';

export class PokemonImageComponentDriver {
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
      }),
    missingImage: () =>
      this.helper.given.interceptAndMockResponse({
        url: '**/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        response: { headers: 404 },
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
  };

  get = {
    pokemonImage: () => this.helper.get.elementByTestId('pokemon-image'),
    pictureSrc: () => this.helper.get.elementsAttribute('pokemon-image', 'src'),
  };
}
