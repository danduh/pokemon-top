import { PokemonAppDriver } from '../support/pokemon-app.test.driver';

describe('pokemon-e2e', () => {
  const { beforeAndAfter, given, when, get } = new PokemonAppDriver();

  // beforeAndAfter();

  beforeEach(() => {
    // when.navigateToHomePage();
    cy.visit('/');
  });

  it('should display welcome message', () => {});
});
