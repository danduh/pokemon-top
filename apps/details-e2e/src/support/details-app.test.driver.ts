import { PokemonDetailsComponentDriver } from '@pokemon/pokemon-details';
import { CypressHelper } from '@shellygo/cypress-test-utils';
export class PokemonDetailsAppDriver {
  private helper = new CypressHelper();
  private detailsDriver = new PokemonDetailsComponentDriver();

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.detailsDriver.beforeAndAfter();
  };

  given = {
    ...this.detailsDriver.given,
  };

  when = {
    ...this.detailsDriver.when,
    navigateToHomePageByID: (pokemonIndex: number) =>
      this.helper.when.visit(`details/id/${pokemonIndex}`),
    navigateToHomePageByName: (pokemonName: string) =>
      this.helper.when.visit(`details/name/${pokemonName}`),
  };

  get = {
    ...this.detailsDriver.get,
  };
}
