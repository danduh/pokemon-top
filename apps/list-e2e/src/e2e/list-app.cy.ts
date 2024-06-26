import { then } from '@shellygo/cypress-test-utils';
import { PokemonListAppDriver } from '../support/list-app.test.driver';

describe('List MFE Integration Tests', () => {
  let { beforeAndAfter, given, when, get } = new PokemonListAppDriver();

  beforeAndAfter();

  beforeEach(() => {
    ({ given, when, get } = new PokemonListAppDriver());
    when.navigateToHomePage();
  });

  it('should display 10 first pokemons', () => {
    then(get.search.card.numberOfCards()).shouldEqual(10);
  });

  it('should display 83 pokemons when selecting fairy type', () => {
    given.spyOnPokemonsByTypeRequest();
    when.header.clickTypesList();
    when.header.typeType('fairy');
    when.header.selectType(0);
    when.waitForPokemonsByTypeResponse();
    when.scrollToBottom();
    then(get.search.card.numberOfCards()).shouldEqual(83);
  });
});
