import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PictureComponent } from './picture.component';
import { PictureComponentDriver } from './picture.component.test.driver';
describe('Picture Component Tests', () => {
  const testConfig = {
    imports: [BrowserAnimationsModule, NoopAnimationsModule],
  };

  const chance = new Chance();

  let { when, given, get, beforeAndAfter } = new PictureComponentDriver();
  beforeAndAfter();

  beforeEach(() => {
    ({ when, given, get } = new PictureComponentDriver());
  });

  it('given image found should show image', () => {
    const pokemonID: number = chance.integer({ min: 1, max: 500 });
    given.pokemonID(pokemonID);
    given.mockImageResponse('default.png');
    when.render(PictureComponent, testConfig);
    when.waitForImageResponse();
    then(get.pictureSrc()).shouldEndWith(`/${pokemonID}.png`);
  });

  it('given image not found should show fallback image', () => {
    const pokemonIndex: number = chance.integer({ min: 501, max: 1000 });
    given.pokemonID(pokemonIndex);
    given.missingImage();
    when.render(PictureComponent, testConfig);
    when.waitForImageResponse();
    then(get.pictureSrc()).shouldStartWith('data:image/png;');
  });
});
