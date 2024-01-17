import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import { Pokemon } from 'pokenode-ts';
import PokemonDetails from './PokemonDetails';
import { PokemonDetailsComponentDriver } from './PokemonDetails.test.driver';

describe(PokemonDetails.name, () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const pokemonResponse = Builder<Pokemon>().name(chance.word()).build();
  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } =
      new PokemonDetailsComponentDriver());
    given.mockImageResponse('default.png');
    given.mockPokemoResponse(pokemonResponse);
  });

  it('when setting index to 3, name should be venusaur', () => {
    given.index(3);
    when.render(PokemonDetails);

    then(get.pokemonName()).shouldEqual(pokemonResponse.name);
  });
});
