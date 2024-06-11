import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import type { Attributes, ReactNode } from 'react';
import { IProps, PokemonImage } from './pokemon-image';

export class PokemonImageComponentDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();

  private props: IProps = {
    name: undefined,
    src: '',
  };

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    name: (value: string) => (this.props.name = value),
    src: (value: string) => (this.props.src = value),
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
    render: (
      type: typeof PokemonImage,
      props?: (Attributes & Partial<IProps>) | null,
      ...children: ReactNode[]
    ) => {
      const mergedProps: Attributes & IProps = { ...this.props, ...props };
      this.reactComponentHelper.when.mount(type, mergedProps, children);
    },
  };

  get = {
    pictureSrc: () => this.helper.get.elementsAttribute('pokemon-image', 'src'),
    pokemonImage: () => this.helper.get.elementByTestId('pokemon-image'),
    spinner: () => this.helper.get.elementByTestId('spinner'),
  };
}
