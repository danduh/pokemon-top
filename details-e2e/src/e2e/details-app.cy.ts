import { CypressHelper } from '@shellygo/cypress-test-utils';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { PokemonDetailsAppDriver } from '../support/details-app.test.driver';

describe('Pokemon Details E2E Tests', () => {
  let { beforeAndAfter, when, get } = new PokemonDetailsAppDriver();
  const helper = new CypressHelper();
  beforeAndAfter();

  beforeEach(() => {
    ({ beforeAndAfter, when, get } = new PokemonDetailsAppDriver());
  });

  describe('when navigate to home page by name', () => {
    beforeEach(() => {
      when.navigateToHomePageByName('caterpie');
    });

    it('pokemon name should be displayed', () => {
      then(get.pokemonName()).shouldEqual('caterpie');
    });

    it('should render all abilities', () => {
      then(get.numberOfAbilities()).shouldEqual(2);
    });

    it('should render ability name', () => {
      then(get.pokemonAbilityText(1)).shouldEqual('run-away');
    });

    it('should render all types', () => {
      then(get.numberOfTypes()).shouldEqual(1);
    });

    it('should render type name', () => {
      then(get.pokemonTypeText(0)).shouldEqual('bug');
    });
    it('should render all moves', () => {
      then(get.numberOfMoves()).shouldEqual(5);
    });

    it('should render move name', () => {
      then(get.pokemonMoveText(2)).shouldEqual('snore');
    });

    it('when clicking next should show next pokemon', () => {
      when.clickNext();
      then(get.pokemonName()).shouldEqual('metapod');
    });

    it('when clicking prev should show prev pokemon', () => {
      when.clickPrev();
      then(get.pokemonName()).shouldEqual('blastoise');
    });
  });

  it('given error fetching pokemon should show alert', () => {
    when.navigateToHomePageByName('blah blah');
    helper.when.closeAlert();
    then(get.pokemonName()).shouldEqual('bulbasaur');
  });
});
