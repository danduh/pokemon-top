import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import { Pokemon } from 'pokenode-ts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export class PokemonDetailsComponentDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();

  private id: string = '1';
  private name: string | undefined = undefined;
  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
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
    mockImageResponse: (fileName: string) =>
      this.helper.given.interceptAndMockResponse({
        url: '**/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        response: { fixture: fileName },
        alias: 'pokemonImage',
      }),
    missingImage: () =>
      this.helper.given.interceptAndMockResponse({
        url: '**/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        response: { headers: 404 },
        alias: 'pokemonImage',
      }),
  };

  when = {
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
    clickNext: () => this.helper.when.click('next'),
    clickPrev: () => this.helper.when.click('prev'),
    waitForLastPokemonFetch: () => this.helper.when.waitForLastCall('pokemon'),
  };

  get = {
    pictureSrc: () => this.helper.get.elementsAttribute('pokemon-image', 'src'),
    pokemonImage: () => this.helper.get.elementByTestId('pokemon-image'),
    pokemonName: () => this.helper.get.elementsText('pokemon-name'),
    pokemonAbilityText: (index: number) =>
      this.helper.get.elementsText('pokemon-ability', index),
    numberOfAbilities: () =>
      this.helper.get.numberOfElements('pokemon-ability'),
    pokemonTypeText: (index: number) =>
      this.helper.get.elementsText('pokemon-type', index),
    numberOfTypes: () => this.helper.get.numberOfElements('pokemon-type'),
    pokemonMoveText: (index: number) =>
      this.helper.get.elementsText('pokemon-move', index),
    numberOfMoves: () => this.helper.get.numberOfElements('pokemon-move'),
    pokemonRequestUrl: () => this.helper.get.requestUrl('pokemon'),
    prevButton: () => this.helper.get.elementByTestId('prev'),
    nextButton: () => this.helper.get.elementByTestId('next'),
  };
}
