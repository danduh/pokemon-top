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
import { PokemonDetails } from './pokemon-details';
import { PokemonDetailsComponentDriver } from './pokemon-details.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 1, max: 100 });
  const pokemonResponse = Builder<Pokemon>()
    .name(chance.word())
    .id(id)
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
    given.id(id);
  });

  it('should fetch pokemon by id', () => {
    when.render(<PokemonDetails />);
    then(get.pokemonRequestUrl()).shouldEndWith(`/${id}`);
  });

  it('should fetch pokemon by name', () => {
    const name = chance.word();
    debugger;
    given.name(name);
    when.render(<PokemonDetails />);
    then(get.pokemonRequestUrl()).shouldEndWith(`/${name}`);
  });

  it('pokemon name should be displayed', () => {
    when.render(<PokemonDetails />);
    then(get.pokemonName()).shouldEqual(pokemonResponse.name);
  });

  it('should render all abilities', () => {
    when.render(<PokemonDetails />);
    then(get.numberOfAbilities()).shouldEqual(10);
  });

  it('should render ability name', () => {
    when.render(<PokemonDetails />);
    then(get.pokemonAbilityText(2)).shouldEqual(
      pokemonResponse.abilities[2].ability.name
    );
  });
});
