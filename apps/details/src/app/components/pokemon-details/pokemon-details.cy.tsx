import { aPokemon } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import React from 'react';
import { PokemonDetails } from './pokemon-details';
import { PokemonDetailsComponentDriver } from './pokemon-details.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 2, max: 100 });

  const pokemonResponse = aPokemon(id);

  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } =
      new PokemonDetailsComponentDriver());
    given.name(pokemonResponse.name);
    given.mockImageResponse('default.png');
    given.mockPokemonResponse(pokemonResponse);
    // given.id(`${id}`);
  });

  it('should fetch pokemon by name', () => {
    when.render(<PokemonDetails />);
    then(get.pokemonRequestUrl()).shouldEndWith(`/${pokemonResponse.name}`);
  });

  it('pokemon name should be displayed', () => {
    when.render(<PokemonDetails />);
    then(get.pokemonName()).shouldEqual(pokemonResponse.name);
  });

  it('should render all abilities', () => {
    when.render(<PokemonDetails />);
    then(get.numberOfAbilities()).shouldEqual(pokemonResponse.abilities.length);
  });

  it('should render ability name', () => {
    when.render(<PokemonDetails />);
    const testFocus = chance.integer({
      min: 0,
      max: pokemonResponse.abilities.length - 1,
    });
    then(get.pokemonAbilityText(testFocus)).shouldEqual(
      pokemonResponse.abilities[testFocus].ability.name
    );
  });

  it('should render all types', () => {
    when.render(<PokemonDetails />);
    then(get.numberOfTypes()).shouldEqual(pokemonResponse.types.length);
  });

  it('should render type name', () => {
    when.render(<PokemonDetails />);
    const testFocus = chance.integer({
      min: 0,
      max: pokemonResponse.types.length - 1,
    });
    then(get.pokemonTypeText(testFocus)).shouldEqual(
      pokemonResponse.types[testFocus].type.name
    );
  });
  it('should render all moves', () => {
    when.render(<PokemonDetails />);
    then(get.numberOfMoves()).shouldEqual(pokemonResponse.moves.length);
  });

  it('should render type name', () => {
    when.render(<PokemonDetails />);
    const testFocus = chance.integer({
      min: 0,
      max: pokemonResponse.moves.length - 1,
    });
    then(get.pokemonMoveText(testFocus)).shouldEqual(
      pokemonResponse.moves[testFocus].move.name
    );
  });

  it('when clicking next should fetch next pokemon', () => {
    when.render(<PokemonDetails />);
    when.waitForLastPokemonFetch();
    when.clickNext();
    then(get.pokemonRequestUrl()).shouldEndWith(`/${id + 1}`);
  });

  it('when clicking prev should fetch prev pokemon', () => {
    when.render(<PokemonDetails />);
    when.waitForLastPokemonFetch();
    when.clickPrev();
    then(get.pokemonRequestUrl()).shouldEndWith(`/${id - 1}`);
  });

  it('when rendering first pokemon prev button should be disabled', () => {
    given.mockPokemonResponse({ ...pokemonResponse, id: 1 });
    when.render(<PokemonDetails />);
    then(get.prevButton()).shouldBeDisabled();
  });

  it('when rendering last pokemon next button should be disabled', () => {
    given.mockPokemonResponse({ ...pokemonResponse, id: 1000 });
    when.render(<PokemonDetails />);
    then(get.nextButton()).shouldBeDisabled();
  });
});
