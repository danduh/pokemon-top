import { aPokemon } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonAttributesComponent } from './pokemon-attributes';
import { PokemonAttributesComponentDriver } from './pokemon-attributes.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonAttributesComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 2, max: 100 });

  const pokemon = aPokemon(id);

  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } =
      new PokemonAttributesComponentDriver());
    given.pokemon(pokemon);
    when.render(PokemonAttributesComponent);
  });

  it('should render all abilities', () => {
    then(get.numberOfAbilities()).shouldEqual(pokemon.abilities.length);
  });

  it('should render ability name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.abilities.length - 1,
    });
    then(get.pokemonAbilityText(testFocus)).shouldEqual(
      pokemon.abilities[testFocus].ability.name
    );
  });

  it('should render all types', () => {
    then(get.numberOfTypes()).shouldEqual(pokemon.types.length);
  });

  it('should render type name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.types.length - 1,
    });
    then(get.pokemonTypeText(testFocus)).shouldEqual(
      pokemon.types[testFocus].type.name
    );
  });
  it('should render all moves', () => {
    then(get.numberOfMoves()).shouldEqual(pokemon.moves.length);
  });

  it('should render type name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.moves.length - 1,
    });
    then(get.pokemonMoveText(testFocus)).shouldEqual(
      pokemon.moves[testFocus].move.name
    );
  });
});
