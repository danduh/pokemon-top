import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonImage } from './pokemon-image';
import { PokemonImageComponentDriver } from './pokemon-image.test.driver';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } = new PokemonImageComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  let id: number;
  let src: string;
  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } = new PokemonImageComponentDriver());
    id = chance.integer({ min: 2, max: 100 });
    src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    given.src(src);
  });

  it('given valid image response should render correct image source', () => {
    given.mockImageResponse('default.png');
    when.render(PokemonImage);
    then(get.pictureSrc()).shouldEqual(src);
  });

  it('given missing image response should render fallback image', () => {
    given.missingImage();
    when.render(PokemonImage);
    then(get.fallbackImage()).shouldBeVisible();
  });
});
