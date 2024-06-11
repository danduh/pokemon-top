import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import { Pokemon } from 'pokenode-ts';
import type { Attributes, ReactNode } from 'react';
import type { IProps, PokemonAttributesComponent } from './pokemon-attributes';

export class PokemonAttributesComponentDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();

  private props: Partial<IProps> = {};
  private id: string = '1';
  private name: string | undefined = undefined;
  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    pokemon: (value: Pokemon) => (this.props.pokemon = value),
  };

  when = {
    render: (
      type: typeof PokemonAttributesComponent,
      props?: (Attributes & Partial<IProps>) | null,
      ...children: ReactNode[]
    ) => {
      const mergedProps: Attributes & IProps = { ...this.props, ...props };
      this.reactComponentHelper.when.mount(type, mergedProps, children);
    },
  };

  get = {
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
  };
}
