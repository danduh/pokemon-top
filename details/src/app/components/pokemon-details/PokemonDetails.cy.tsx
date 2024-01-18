import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import {
  NamedAPIResource,
  OtherPokemonSprites,
  Pokemon,
  PokemonAbility,
  PokemonSprites,
} from 'pokenode-ts';
import PokemonDetails from './PokemonDetails';
import { PokemonDetailsComponentDriver } from './PokemonDetails.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const pokemonResponse = Builder<Pokemon>()
    .name(chance.word())
    .abilities(
      chance.n(
        () =>
          Builder<PokemonAbility>()
            .ability(Builder<NamedAPIResource>().name(chance.word()).build())
            .build(),
        10
      )
    )
    .sprites(
      Builder<PokemonSprites>()
        .other(
          Builder<OtherPokemonSprites>()
            ['official-artwork']({
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
            })
            .build()
        )
        .build()
    )
    .build();
  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } =
      new PokemonDetailsComponentDriver());
    given.mockImageResponse('default.png');
    given.mockPokemoResponse(pokemonResponse);
    when.render(PokemonDetails);
  });

  it('pokemon name should be displayed', () => {
    then(get.pokemonName()).shouldEqual(pokemonResponse.name);
  });

  it('should render all abilities', () => {
    then(get.numberOfAbilities()).shouldEqual(10);
  });

  it('should render ability name', () => {
    then(get.pokemonAbilityText(2)).shouldEqual(
      pokemonResponse.abilities[2].ability.name
    );
  });
});
