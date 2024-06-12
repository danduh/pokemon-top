import { then } from '@shellygo/cypress-test-utils';
import { PokemonAppDriver } from '../support/pokemon-app.test.driver';

describe('pokemon-e2e', () => {
  const { beforeAndAfter, given, when, get } = new PokemonAppDriver();

  beforeAndAfter();

  beforeEach(() => {
    when.navigateToHomePage();
  });

  it('should display 10 first pokeomns', () => {
    then(get.list.search.card.numberOfCards()).shouldEqual(10);
  });

  it('show pokemon details when searching pokemon by name', () => {
    when.list.header.typeName('charmeleon');
    when.list.header.clickGo();
    then(get.details.pokemonName()).shouldEqual('charmeleon');
  });

  it('show first pokemon details when searching non existing pokemon', () => {
    when.list.header.typeName('whatever');
    when.list.header.clickGo();
    then(get.details.pokemonName()).shouldEqual('bulbasaur');
  });

  describe('when clicking More Info', () => {
    beforeEach(() => {
      when.list.search.card.clickMoreInfo();
    });

    it('should show pokemon name', () => {
      then(get.details.pokemonName()).shouldEqual('bulbasaur');
    });

    it('should show all pokemon types', () => {
      then(get.details.attributes.numberOfTypes()).shouldEqual(2);
    });

    it('should show pokemon types', () => {
      then(get.details.attributes.pokemonTypeText()).shouldInclude('grass');
      then(get.details.attributes.pokemonTypeText()).shouldInclude('poison');
    });

    it('should show next pokemon when clicking on Next', () => {
      when.details.clickNext();
      then(get.details.pokemonName()).shouldEqual('ivysaur');
    });
  });
});
