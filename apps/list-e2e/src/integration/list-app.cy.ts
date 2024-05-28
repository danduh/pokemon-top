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

  const types = Builder<NamedAPIResourceList>()
    .count(10)
    .results(
      chance.n(
        () => Builder<NamedAPIResource>().name(chance.word()).build(),
        10
      )
    )
    .build();

  const type = aType();

  beforeEach(() => {
    ({ given, when, get } = new PokemonListAppDriver());
    given.typesResponse(types);
    given.pokemonsResponse(aNamedAPIResourceList());
    given.pokemonsByTypeResponse(type);
    when.navigateToHomePage();
  });

  it('should fetch pokemons of selected type when selecting type', () => {
    when.header.clickTypesList();
    when.header.selectType(3);
    then(get.pokemonsByTypeRequest()).shouldEndWith(types.results[3].name);
  });
});
