import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import { BetterPokemon } from '../../services/pokemon.service';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonCardComponentDriver } from './pokemon-card.test.driver';

describe('HeaderComponent Tests', () => {
  const chance = new Chance();
  const pokemon = Builder<BetterPokemon>()
    .name(chance.word())
    .id(chance.integer({ max: 100, min: 1 }))
    .build();
  const { when, given, get, beforeAndAfter } = new PokemonCardComponentDriver();
  beforeAndAfter();

  beforeEach(() => {
    given.picture.mockImageResponse('default.png');
    given.pokemon(pokemon);
  });

  const testConfig = {
    imports: [BrowserAnimationsModule, NoopAnimationsModule],
    providers: [
      { provide: Router, useValue: get.mock.router() },
      {
        provide: ActivatedRoute,
        useValue: {
          root: Builder<ActivatedRoute>()
            .routeConfig(Builder<Route>().build())
            .build(),
        },
      },
    ],
  };

  it('when clicking More Info, should navigate to details page', () => {
    when.render(PokemonCardComponent, testConfig);
    when.clickMoreInfo();
    then(get.navigateByUrlSpy()).shouldHaveBeenCalled();
  });

  it('given pokemon should render pokemon name', () => {
    when.render(PokemonCardComponent, testConfig);
    then(get.pokemonNameText()).shouldEqual(pokemon.name);
  });

  it('given pokemon should render pokemon picture', () => {
    when.render(PokemonCardComponent, testConfig);
    then(get.picture.pictureSrc()).shouldEndWith(`/${pokemon.id}.png`);
  });

  it('when clicking image should show overlay', () => {
    when.render(PokemonCardComponent, testConfig);
    when.picture.clickImage();
    then(get.overlay()).shouldBeVisible();
  });
});
