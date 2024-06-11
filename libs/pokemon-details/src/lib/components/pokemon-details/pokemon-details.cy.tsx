import { aPokemon } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonDetailsComponent } from './pokemon-details';
import { PokemonDetailsComponentDriver } from './pokemon-details.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 2, max: 100 });

  const pokemon = aPokemon(id);

  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } =
      new PokemonDetailsComponentDriver());
    given.pokemon(pokemon);
    when.render(PokemonDetailsComponent);
  });

  it('onNext should be called when Next is clicked', () => {
    when.clickNext();
    then(get.onNextSpy()).shouldHaveBeenCalledOnce();
  });

  it('onPrev should be called when Next is clicked', () => {
    when.clickPrev();
    then(get.onPrevSpy()).shouldHaveBeenCalledOnce();
  });

  it('pokemon name should be displayed', () => {
    then(get.pokemonName()).shouldEqual(pokemon.name);
  });

  it('should render all abilities', () => {
    then(get.attributes.numberOfAbilities()).shouldEqual(
      pokemon.abilities.length
    );
  });

  it('should render ability name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.abilities.length - 1,
    });
    then(get.attributes.pokemonAbilityText(testFocus)).shouldEqual(
      pokemon.abilities[testFocus].ability.name
    );
  });

  it('should render all types', () => {
    then(get.attributes.numberOfTypes()).shouldEqual(pokemon.types.length);
  });

  it('should render type name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.types.length - 1,
    });
    then(get.attributes.pokemonTypeText(testFocus)).shouldEqual(
      pokemon.types[testFocus].type.name
    );
  });
  it('should render all moves', () => {
    then(get.attributes.numberOfMoves()).shouldEqual(pokemon.moves.length);
  });

  it('should render type name', () => {
    const testFocus = chance.integer({
      min: 0,
      max: pokemon.moves.length - 1,
    });
    then(get.attributes.pokemonMoveText(testFocus)).shouldEqual(
      pokemon.moves[testFocus].move.name
    );
  });

  it('given isPrevDisabled prev button should be disabled', () => {
    given.prevIsDisabled();
    when.render(PokemonDetailsComponent);
    then(get.prevButton()).shouldBeDisabled();
  });

  it('given isNextDisabled next button should be disabled', () => {
    given.nextIsDisabled();
    when.render(PokemonDetailsComponent);
    then(get.nextButton()).shouldBeDisabled();
  });
});
