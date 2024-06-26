import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListComponentDriver } from './pokemon-list.component.test.driver';
import { BetterPokemon, PokemonService } from './services/pokemon.service';

describe('Pokemon List Component Tests', () => {
  const chance = new Chance();
  const pokemon = Builder<BetterPokemon>()
    .name(chance.word())
    .id(chance.integer({ max: 100, min: 1 }))
    .build();
  const types = chance.n(() => chance.word(), 10);
  const { when, given, get, beforeAndAfter } = new PokemonListComponentDriver();

  beforeAndAfter();

  const testConfig = {
    imports: [BrowserAnimationsModule, NoopAnimationsModule],
    providers: [
      { provide: PokemonService, useValue: get.mock.pokemonService() },
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
  beforeEach(() => {
    given.search.card.picture.mockImageResponse('default.png');
    when.render(PokemonListComponent, testConfig);
    given.types(types);
    given.pokemons([pokemon as { name: string; id: number }]);
  });

  it('given pokemon, should render pokemon name', () => {
    then(get.search.card.pokemonNameText()).shouldEqual(pokemon.name);
  });

  it('when clicking more info, should navigate', () => {
    when.search.card.clickMoreInfo();
    then(get.navigateByUrlSpy()).shouldHaveBeenCalled();
  });

  it('when selecting pokemon type, should filter pokemon list', () => {
    when.header.clickTypesList();
    when.header.selectType(3);
    then(get.filterByTypeNameSpy()).shouldHaveBeenCalledWith(types[3]);
  });

  it('when typing name and clicking go should navigate to pokemon details', () => {
    when.header.typeName(pokemon.name);
    when.header.clickGo();
    then(get.navigateByUrlSpy()).shouldHaveBeenCalledWith(
      '/details/name/' + pokemon.name
    );
  });
});
