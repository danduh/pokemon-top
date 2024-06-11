import { aPokemon } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonDetailsAppDriver } from '../support/details-app.test.driver';

describe('Pokemon Details Integration Tests', () => {
  let { beforeAndAfter, given, when, get } = new PokemonDetailsAppDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 1, max: 100 });
  const pokemonResponse = aPokemon(id);

  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } = new PokemonDetailsAppDriver());
  });

  describe('when navigate to home page by name', () => {
    beforeEach(() => {
      given.image.mockImageResponse('default.png');
      given.mockPokemonResponse(pokemonResponse);
      when.navigateToHomePageByName(pokemonResponse.name);
    });

    it('should fetch pokemon by name', () => {
      then(get.pokemonRequestUrl()).shouldEndWith(`/${pokemonResponse.name}`);
    });

    it('pokemon name should be displayed', () => {
      then(get.pokemonName()).shouldEqual(pokemonResponse.name);
    });

    it('should render all abilities', () => {
      then(get.attributes.numberOfAbilities()).shouldEqual(
        pokemonResponse.abilities.length
      );
    });

    it('should render ability name', () => {
      const testFocus = chance.integer({
        min: 0,
        max: pokemonResponse.abilities.length - 1,
      });
      then(get.attributes.pokemonAbilityText(testFocus)).shouldEqual(
        pokemonResponse.abilities[testFocus].ability.name
      );
    });

    it('should render all types', () => {
      then(get.attributes.numberOfTypes()).shouldEqual(
        pokemonResponse.types.length
      );
    });

    it('should render type name', () => {
      const testFocus = chance.integer({
        min: 0,
        max: pokemonResponse.types.length - 1,
      });
      then(get.attributes.pokemonTypeText(testFocus)).shouldEqual(
        pokemonResponse.types[testFocus].type.name
      );
    });
    it('should render all moves', () => {
      then(get.attributes.numberOfMoves()).shouldEqual(
        pokemonResponse.moves.length
      );
    });

    it('should render move name', () => {
      const testFocus = chance.integer({
        min: 0,
        max: pokemonResponse.moves.length - 1,
      });
      then(get.attributes.pokemonMoveText(testFocus)).shouldEqual(
        pokemonResponse.moves[testFocus].move.name
      );
    });

    it('when clicking next should fetch next pokemon', () => {
      when.waitForLastPokemonFetch();
      when.clickNext();
      then(get.pokemonRequestUrl()).shouldEndWith(`/${id + 1}`);
    });

    it('when clicking prev should fetch prev pokemon', () => {
      when.waitForLastPokemonFetch();
      when.clickPrev();
      then(get.pokemonRequestUrl()).shouldEndWith(`/${id - 1}`);
    });
  });
});
