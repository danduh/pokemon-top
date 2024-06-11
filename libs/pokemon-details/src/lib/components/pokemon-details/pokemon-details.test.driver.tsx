import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressReactComponentHelper } from '@shellygo/cypress-test-utils/react';
import { Pokemon } from 'pokenode-ts';
import type { Attributes, ReactNode } from 'react';
import { PokemonAttributesComponentDriver } from '../pokemon-attributes/pokemon-attributes.test.driver';
import { PokemonImageComponentDriver } from '../pokemon-image/pokemon-image.test.driver';
import type { IProps, PokemonDetailsComponent } from './pokemon-details';

export class PokemonDetailsComponentDriver {
  private helper = new CypressHelper();
  private reactComponentHelper = new CypressReactComponentHelper();
  private pokemonImageDriver = new PokemonImageComponentDriver();
  private pokemonAttributesDriver = new PokemonAttributesComponentDriver();

  private props: Partial<IProps> = {};
  private id: string = '1';
  private name: string | undefined = undefined;
  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    image: this.pokemonImageDriver.given,
    attributes: this.pokemonAttributesDriver.given,

    pokemon: (value: Pokemon) => (this.props.pokemon = value),
    nextIsDisabled: (value: boolean = true) =>
      (this.props.isNextDisabled = value),
    prevIsDisabled: (value: boolean = true) =>
      (this.props.isPrevDisabled = value),
  };

  when = {
    image: this.pokemonImageDriver.when,
    attributes: this.pokemonAttributesDriver.when,

    render: (
      type: typeof PokemonDetailsComponent,
      props?: (Attributes & Partial<IProps>) | null,
      ...children: ReactNode[]
    ) => {
      const mergedProps: Attributes & IProps = {
        ...this.props,
        ...props,
        onNext: this.helper.given.spy('onNext'),
        onPrev: this.helper.given.spy('onPrev'),
      };
      this.reactComponentHelper.when.mount(type, mergedProps, children);
    },

    clickNext: () => this.helper.when.click('next'),
    clickPrev: () => this.helper.when.click('prev'),
  };

  get = {
    image: this.pokemonImageDriver.get,
    attributes: this.pokemonAttributesDriver.get,
    pokemonName: () => this.helper.get.elementsText('pokemon-name'),
    prevButton: () => this.helper.get.elementByTestId('prev'),
    nextButton: () => this.helper.get.elementByTestId('next'),
    onNextSpy: () => this.helper.get.spy('onNext'),
    onPrevSpy: () => this.helper.get.spy('onPrev'),
  };
}
