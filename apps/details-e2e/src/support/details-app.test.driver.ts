import { CypressHelper } from '@shellygo/cypress-test-utils';
import { PokemonDetailsDriver } from '../../../details/src/app/components/pokemon-details/pokemon-details.test.driver';
export class PokemonDetailsAppDriver {
  private helper = new CypressHelper();
  private detailsDriver = new PokemonDetailsDriver();

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.detailsDriver.beforeAndAfter();
  };

  given = {
    ...this.detailsDriver.given,
  };

  when = {
    ...this.detailsDriver.when,
    navigateToHomePageByName: (pokemonName: string) =>
      this.helper.when.visit(`details/name/${pokemonName}`),
  };

  get = {
    ...this.detailsDriver.get,
  };
}
