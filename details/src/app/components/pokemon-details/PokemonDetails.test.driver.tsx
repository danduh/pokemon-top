import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import type { Attributes, ReactNode } from 'react';
import PokemonDetails, { PokemonDetailsProps } from './PokemonDetails';

export class PokemonDetailsComponentDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();

  private props: PokemonDetailsProps = {
    index: 0,
  };

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    index: (value: number) => (this.props.index = value),
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
      type: typeof PokemonDetails,
      props?: (Attributes & Partial<PokemonDetailsProps>) | null,
      ...children: ReactNode[]
    ) =>
      this.reactComponentHelper.when.mount(
        type,
        { ...this.props, ...props },
        children
      ),
    clickNext: () => this.helper.when.click('next'),
    clickPrev: () => this.helper.when.click('prev'),
  };

  get = {
    pictureSrc: () => this.helper.get.elementsAttribute('pokemon-image', 'src'),
    pokemonImage: () => this.helper.get.elementByTestId('pokemon-image'),
    pokemonName: () => this.helper.get.elementsText('pokemon-name'),
  };
}
