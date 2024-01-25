import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonService } from '../../services/pokemon.service';
import { HeaderComponent } from './header.component';
import { HeaderComponentDriver } from './header.component.test.driver';

describe('HeaderComponent Tests', () => {
  const chance = new Chance();
  const types = chance.n(() => chance.word(), 10);

  const { when, given, get, beforeAndAfter } = new HeaderComponentDriver();
  beforeAndAfter();

  beforeEach(() => {
    given.types(types);
  });

  const testConfig = {
    imports: [BrowserAnimationsModule, NoopAnimationsModule],
    providers: [
      { provide: PokemonService, useValue: get.mockPokemonService() },
      { provide: Router, useValue: get.mockRouter() },
    ],
  };

  it('when typing pokemon name and clicking GO, should navigate to details page', () => {
    const name = chance.word();
    when.render(HeaderComponent, testConfig);
    when.typeIDorName(name);
    when.clickGo();
    then(get.navigateByUrlSpy()).shouldHaveBeenCalledWith(
      `/details/name/${name}`
    );
  });

  it('given types should render types list', () => {
    when.render(HeaderComponent, testConfig);
    when.clickTypesList();
    then(get.numberOfTypeOptions()).shouldEqual(types.length);
  });

  it('given types should render types list', () => {
    const testFocus = chance.integer({ min: 0, max: types.length - 1 });
    given.types(types);
    when.render(HeaderComponent, testConfig);
    when.clickTypesList();
    then(get.typeOptionText(testFocus)).shouldEqual(types[testFocus]);
  });
});
