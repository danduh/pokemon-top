import { then } from '@shellygo/cypress-test-utils/assertable';
import PokemonDetails, { PokemonDetailsProps } from './PokemonDetails';
import { PokemonDetailsComponentDriver } from './PokemonDetails.test.driver';

describe(PokemonDetails.name, () => {
  let { beforeAndAfter, given, when, get } =
    new PokemonDetailsComponentDriver();
  beforeAndAfter();

  let props: PokemonDetailsProps;

  beforeEach(() => {
    given.mockImageResponse('default.png');
  });

  it('when setting index to 3, name should be venusaur', () => {
    given.index(3);
    when.render(PokemonDetails);

    then(get.pokemonName()).shouldEqual('venusaur');
  });
});
