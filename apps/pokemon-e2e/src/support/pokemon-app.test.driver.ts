import { CypressHelper } from '@shellygo/cypress-test-utils';
import { PokemonDetailsAppDriver } from '../../../details-e2e/src/support/details-app.test.driver';
import { PokemonListAppDriver } from '../../../list-e2e/src/support/list-app.test.driver';

export class PokemonAppDriver {
  private helper = new CypressHelper();

  private listDriver = new PokemonListAppDriver();
  private detailsDriver = new PokemonDetailsAppDriver();

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.listDriver.beforeAndAfter();
    this.detailsDriver.beforeAndAfter();
  };

  given = {
    list: this.listDriver.given,
    details: this.detailsDriver.given,
  };

  when = {
    list: this.listDriver.when,
    details: this.detailsDriver.when,
    navigateToHomePage: () => this.helper.when.visit('/'),
  };

  get = {
    list: this.listDriver.get,
    details: this.detailsDriver.get,
  };
}
