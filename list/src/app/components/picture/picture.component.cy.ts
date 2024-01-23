import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PictureComponent } from './picture.component';
import { PokemonImageComponentDriver as PictureComponentDriver } from './picture.component.test.driver';
describe('PictureComponent Tests', () => {
  const testConfig = {};

  const chance = new Chance();

  let { when, given, get, beforeAndAfter } = new PictureComponentDriver();
  beforeAndAfter();

  beforeEach(() => {
    ({ when, given, get } = new PictureComponentDriver());
  });

  it('given valid pokemon index should show gif', () => {
    const pokemonID: number = chance.integer({ min: 1, max: 500 });
    given.pokemonID(pokemonID);
    given.mockImageResponse('default.png');
    when.render(PictureComponent, testConfig);
    then(get.pictureSrc()).shouldEndWith(`/${pokemonID}.png`);
  });

  it('given image not found should show fallback image', () => {
    const pokemonIndex: number = chance.integer({ min: 501, max: 1000 });
    given.pokemonID(pokemonIndex);
    given.missingImage();
    when.render(PictureComponent, testConfig);
    then(get.pictureSrc()).shouldStartWith(`data:image/png;`);
  });
});
