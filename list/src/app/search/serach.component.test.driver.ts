import type { Type } from '@angular/core';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { PokemonCardComponentDriver } from '../pokemon-card/pokemon-card.test.driver';
import { SearchComponent } from './search.component';

export class SearchComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<SearchComponent>();
  private cardDriver = new PokemonCardComponentDriver();
  private componentProperties: Partial<SearchComponent> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.cardDriver.beforeAndAfter();
  };

  given = {
    card: this.cardDriver.given,
  };

  when = {
    card: this.cardDriver.when,
    render: (
      type: Type<SearchComponent>,
      config: MountConfig<SearchComponent>
    ) => {
      this.componentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    clickMoreInfo: () => this.helper.when.click('more-info'),
  };

  get = {
    card: this.cardDriver.get,
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
  };
}
