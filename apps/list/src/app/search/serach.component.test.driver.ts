import type { Type } from '@angular/core';
import { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCardComponentDriver } from '../pokemon-card/pokemon-card.test.driver';
import { BetterPokemon, PokemonService } from '../services/pokemon.service';
import { SearchComponent } from './search.component';

export class SearchComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<SearchComponent>();
  private cardDriver = new PokemonCardComponentDriver();
  private componentProperties: Partial<SearchComponent> = {};

  private mockPokemonService = this.helper.given.stubbedInstance(
    PokemonService,
    {
      pokemonTypes: new BehaviorSubject<NamedAPIResource[]>([]),
      pokemons: new BehaviorSubject<BetterPokemon[]>([]),
    }
  );

  private mockRouter = this.helper.given.stubbedInstance(Router, {
    events: new Observable(),
  });

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.cardDriver.beforeAndAfter();
  };

  given = {
    card: this.cardDriver.given,
    types: (value: string[]) =>
      this.mockPokemonService.pokemonTypes?.next(
        value.map((name) => ({ name, url: '' }))
      ),
    pokemons: (value: { name: string; id: number }[]) =>
      this.mockPokemonService.pokemons?.next(
        value.map(({ name, id }) => ({ name, id, url: '' }))
      ),
  };

  when = {
    card: this.cardDriver.when,
    render: (
      type: Type<SearchComponent>,
      config: MountConfig<SearchComponent>
    ) => {
      this.componentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
  };

  get = {
    card: this.cardDriver.get,
    mockRouter: () => this.mockRouter,
    mockPokemonService: () => this.mockPokemonService,
  };
}
