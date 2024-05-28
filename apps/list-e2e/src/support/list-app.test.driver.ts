import { CypressHelper } from '@shellygo/cypress-test-utils';
import type { NamedAPIResourceList, Type } from 'pokenode-ts';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RemoteEntryComponentDriver } from '../../../list/src/app/remote-entry/entry.component.test.driver';
export class PokemonListAppDriver {
  private helper = new CypressHelper();

  private remoteEntryComponentDriver = new RemoteEntryComponentDriver();

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.remoteEntryComponentDriver.beforeAndAfter();
  };

  given = {
    ...this.remoteEntryComponentDriver.given,
    typesResponse: (response: NamedAPIResourceList) =>
      this.helper.given.interceptAndMockResponse({
        url: '**/api/v2/type?*',
        response,
        alias: 'types',
      }),
    pokemonsResponse: (response: NamedAPIResourceList) =>
      this.helper.given.interceptAndMockResponse({
        url: '**/api/v2/pokemon?*',
        response,
        alias: 'pokemons',
      }),
    pokemonsByTypeResponse: (response: Type) =>
      this.helper.given.interceptAndMockResponse({
        url: '**/api/v2/type/*',
        response,
        alias: 'pokemons-by-type',
      }),
  };

  when = {
    ...this.remoteEntryComponentDriver.when,
    navigateToHomePage: () => this.helper.when.visit('/'),
  };

  get = {
    ...this.remoteEntryComponentDriver.get,
    pokemonsByTypeRequest: () => this.helper.get.requestUrl('pokemons-by-type'),
  };
}
