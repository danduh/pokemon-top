import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Builder } from 'builder-pattern';
import { Chance } from 'chance';
import { BetterPokemon, PokemonService } from '../services/pokemon.service';
import { SearchComponent } from './search.component';
import { SearchComponentDriver } from './serach.component.test.driver';

describe('HeaderComponent Tests', () => {
  const chance = new Chance();
  const aPokemon = (id: number) =>
    Builder<BetterPokemon>().name(chance.word()).id(id).build();
  const types = chance.n(() => chance.word(), 10);
  const pokemons = [aPokemon(1), aPokemon(2)];

  const { when, given, get, beforeAndAfter } = new SearchComponentDriver();
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
    given.card.picture.mockImageResponse('default.png');
    given.pokemons(
      pokemons as {
        name: string;
        id: number;
      }[]
    );

    when.render(SearchComponent, testConfig);
    given.types(types);
  });

  it('given pokemons, should render pokemon cards', () => {
    then(get.card.numberOfCards()).shouldEqual(pokemons.length);
  });

  it('given pokemon should render pokemon name', () => {
    then(get.card.pokemonNameText(1)).shouldEqual(pokemons[1].name);
  });

  it('given pokemon should render pokemon picture', () => {
    then(get.card.picture.pictureSrc(1)).shouldEndWith(
      `/${pokemons[1].id}.png`
    );
  });
});
