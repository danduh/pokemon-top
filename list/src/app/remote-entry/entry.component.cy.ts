import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import { RemoteEntryComponentDriver } from '../remote-entry/entry.component.test.driver';
import { BetterPokemon, PokemonService } from '../services/pokemon.service';
import { RemoteEntryComponent } from './entry.component';

describe('HeaderComponent Tests', () => {
  const chance = new Chance();
  const pokemon = Builder<BetterPokemon>()
    .name(chance.word())
    .id(chance.integer({ max: 100, min: 1 }))
    .build();
  const types = chance.n(() => chance.word(), 10);

  const { when, given, get, beforeAndAfter } = new RemoteEntryComponentDriver();
  beforeAndAfter();

  const testConfig = {
    imports: [BrowserAnimationsModule, NoopAnimationsModule],
    providers: [
      { provide: PokemonService, useValue: get.header.mockPokemonService() },
      { provide: Router, useValue: get.mockRouter() },
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
  beforeEach(() => {
    given.card.picture.mockImageResponse('default.png');
    given.header.types(types);
    given.header.pokemons([pokemon as { name: string; id: number }]);
    given.spyOnNavigateByUrl();
    given.card.pokemon(pokemon);
    when.render(RemoteEntryComponent, testConfig);
  });

  it('given pokemon, should render pokemon name', () => {
    then(get.card.pokemonNameText()).shouldEqual(pokemon.name);
  });

  it('when clicking mor info, should navigate', () => {
    when.card.clickMoreInfo();
    then(get.card.navigateByUrlSpy()).shouldHaveBeenCalled();
  });

  it('when selecting pokemon type, should filter pokemon list', () => {
    when.header.clickTypesList();
    when.header.selectType(3);
    then(get.header.filterByTypeNameSpy()).shouldHaveBeenCalledWith(types[3]);
  });

  it('when typing name and clicking go should navigate to pokemon details', () => {
    when.header.typeIDorName(pokemon.name);
    when.header.clickGo();
    then(get.header.navigateByUrlSpy()).shouldHaveBeenCalledWith(
      '/details/name/' + pokemon.name
    );
  });
});
