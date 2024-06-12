import { aNamedAPIResourceList, aType } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import type { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import { PokemonListAppDriver } from '../support/list-app.test.driver';

describe('List MFE Integration Tests', () => {
  let { beforeAndAfter, given, when, get } = new PokemonListAppDriver();

  beforeAndAfter();
  const chance = new Chance();

  const NUMBER_OF_TYPES = 7;
  const NUMBER_OF_POKEMONS = 12;

  const types = Builder<NamedAPIResourceList>()
    .count(NUMBER_OF_TYPES)
    .results(
      chance.n(
        () => Builder<NamedAPIResource>().name(chance.word()).build(),
        NUMBER_OF_TYPES
      )
    )
    .build();

  const type = aType(NUMBER_OF_POKEMONS);

  const pokemons = aNamedAPIResourceList(NUMBER_OF_POKEMONS);

  beforeEach(() => {
    ({ given, when, get } = new PokemonListAppDriver());
    given.typesResponse(types);
    given.pokemonsResponse(pokemons);
    given.pokemonsByTypeResponse(type);
    when.navigateToHomePage();
  });

  it('should fetch pokemons of selected type when selecting type', () => {
    when.header.clickTypesList();
    when.header.selectType(3);
    then(get.pokemonsByTypeRequest()).shouldEndWith(types.results[3].name);
  });

  it('should display all type pokemons when selecting type', () => {
    when.header.clickTypesList();
    when.header.selectType(3);
    when.scrollToBottom();
    then(get.search.card.numberOfCards()).shouldEqual(NUMBER_OF_POKEMONS);
  });
});
