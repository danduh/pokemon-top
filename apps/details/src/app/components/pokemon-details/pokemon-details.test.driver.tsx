import { PokemonDetailsComponentDriver } from '@pokemon/pokemon-details/test-kits';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import { Pokemon } from 'pokenode-ts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export class PokemonDetailsDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();
  private pokemonDetailsComponentDriver = new PokemonDetailsComponentDriver();
  private id: string = '1';
  private name: string | undefined = undefined;
  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    ...this.pokemonDetailsComponentDriver.given,

    id: (value: string) => (this.id = value),
    name: (value: string) => (this.name = value),
    mockPokemonResponse: (response: Pokemon) =>
      this.helper.given.interceptAndMockResponse({
        url: /\/pokeapi\.co\/api\/v2\/pokemon\/(?!other$)/,
        response: response,
        alias: 'pokemon',
      }),
    errorFetchingPokemon: (nameOrId: string) =>
      this.helper.given.interceptAndMockResponse({
        url: /\/pokeapi\.co\/api\/v2\/pokemon\/(?!other$)/,
        response: { forceNetworkError: true },
        alias: 'pokemon',
      }),
  };

  when = {
    ...this.pokemonDetailsComponentDriver.when,
    render: (component: React.ReactNode) => {
      const path = this.name ? `/name/:name` : `/id/:id`;
      const route = this.name ? `/name/${this.name}` : `/id/${this.id}`;
      window.history.pushState({}, '', route);
      const Wrapped = (
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route element={component} path={path} />
          </Routes>
        </MemoryRouter>
      );
      this.reactComponentHelper.when.mountComponent(Wrapped);
    },

    waitForLastPokemonFetch: () => this.helper.when.waitForLastCall('pokemon'),
    waitForPokemonName: (pokemonName: string) =>
      this.helper.when.waitUntil(() =>
        this.helper.when.doWithin(
          () => this.helper.get.elementByText(pokemonName),
          'pokemon-name'
        )
      ),
  };

  get = {
    ...this.pokemonDetailsComponentDriver.get,

    pokemonRequestUrl: () => this.helper.get.requestUrl('pokemon'),
  };
}
