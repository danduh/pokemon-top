import type { Type } from '@angular/core';
import { Router, Event as RouterEvent } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import type { SinonStub } from 'cypress/types/sinon';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import type { StubbedInstance } from 'ts-stubber/.';
import { BetterPokemon, PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponentDriver } from '../pokemon-card/pokemon-card.test.driver';
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
    events: new Observable<RouterEvent>(),
  });

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.cardDriver.beforeAndAfter();
  };

  given = {
    card: this.cardDriver.given,
    types: (value: string[]) =>
      (
        this.mockPokemonService.pokemonTypes! as unknown as Subject<
          NamedAPIResource[]
        >
      ).next(value.map((name) => ({ name, url: '' }))),
    pokemons: (value: { name: string; id: number }[]) =>
      (
        this.mockPokemonService.pokemons! as unknown as Subject<BetterPokemon[]>
      ).next(value.map(({ name, id }) => ({ name, id, url: '' }))),
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
    mock: {
      router: (): StubbedInstance<Router, SinonStub> & Router =>
        this.mockRouter,
      pokemonService: (): StubbedInstance<PokemonService, SinonStub> &
        PokemonService => this.mockPokemonService,
    },
  };
}
