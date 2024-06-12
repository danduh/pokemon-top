import { then } from '@shellygo/cypress-test-utils';
import { PokemonListAppDriver } from '../support/list-app.test.driver';

describe('List MFE Integration Tests', () => {
  let { beforeAndAfter, given, when, get } = new PokemonListAppDriver();

  beforeAndAfter();

  beforeEach(() => {
    ({ given, when, get } = new PokemonListAppDriver());
    when.navigateToHomePage();
  });

  it('should fetch pokemons of selected type when selecting type', () => {
    when.header.clickTypesList();
    when.header.typeType('unknown');
    when.header.selectType(0);
    then(get.search.card.numberOfCards()).shouldEqual(0);
  });

  it('should display 10 first pokemons', () => {
    then(get.search.card.numberOfCards()).shouldEqual(10);
  });
});
