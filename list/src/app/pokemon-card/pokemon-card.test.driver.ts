import type { Type } from '@angular/core';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import type { PokemonCardComponent } from './pokemon-card.component';

export class PokemonGoComponentDriver {
  private helper = new CypressHelper({ defaultDataAttribute: 'data-hook' });
  private angularComponentHelper =
    new CypressAngularComponentHelper<PokemonCardComponent>();

  private componentProperties: Partial<PokemonCardComponent> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {};

  when = {
    render: (
      type: Type<PokemonCardComponent>,
      config: MountConfig<PokemonCardComponent>
    ) => {
      this.angularComponentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    typePokemonIndex: (value: string) =>
      this.helper.when.type('pokemon-index', value),
    clickGo: () => this.helper.when.click('go'),
  };

  get = {
    pokemonIndexInputValue: () => this.helper.get.inputValue('pokemon-index'),
    selectedPokemonSpy: () => this.helper.get.spy('selectedPokemon'),
    goButton: () => this.helper.get.elementByTestId('go'),
  };
}
