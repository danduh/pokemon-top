import { Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonService } from '../../services/pokemon.service';
import { HeaderComponent } from './header.component';
import { HeaderComponentDriver } from './header.component.test.driver';

describe('HeaderComponent Tests', () => {
  const chance = new Chance();

  const { when, given, get, beforeAndAfter } = new HeaderComponentDriver();
  beforeAndAfter();
  const testConfig = {
    providers: [
      { provide: PokemonService, useValue: get.mockPokemonService() },
      { provide: Router, useValue: get.mockRouter() },
    ],
  };

  it('given types should render types list', () => {
    given.types(['fire', 'water', 'grass']);
    given.spyOnNavigate();
    when.render(HeaderComponent, testConfig);
    when.typeIDorName('9');
    when.clickGo();
    then(get.navigateSpy()).shouldHaveBeenCalledWith(['/details/name/9']);
    // when.selectType('fire');
    // then(get.numberOfTypeOptions()).shouldEqual(3);
  });
});
