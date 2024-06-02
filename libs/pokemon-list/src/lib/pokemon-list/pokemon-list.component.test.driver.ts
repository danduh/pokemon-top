import type { Type } from '@angular/core';
import { Router, Event as RouterEvent } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HeaderComponentDriver } from './components/header/header.component.test.driver';
import { PokemonListComponent } from './pokemon-list.component';
import { SearchComponentDriver } from './search/serach.component.test.driver';
import { BetterPokemon, PokemonService } from './services/pokemon.service';

import * as sinon from '@shellygo/cypress-test-utils/node_modules/cypress/types/sinon';

export class PokemonListComponentDriver {
  kuku = sinon;
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<PokemonListComponent>();
  private searchDriver = new SearchComponentDriver();
  private headerDriver = new HeaderComponentDriver();
  private componentProperties: Partial<PokemonListComponent> = {};

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
    this.searchDriver.beforeAndAfter();
    this.headerDriver.beforeAndAfter();
  };

  given = {
    header: this.headerDriver.given,
    search: this.searchDriver.given,
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
    header: this.headerDriver.when,
    search: this.searchDriver.when,
    render: (
      type: Type<PokemonListComponent>,
      config: MountConfig<PokemonListComponent>
    ) => {
      this.componentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    clickMoreInfo: () => this.helper.when.click('more-info'),
  };

  get = {
    header: this.headerDriver.get,
    search: this.searchDriver.get,
    mockRouter: () => this.mockRouter,
    mockPokemonService: () => this.mockPokemonService,
    navigateByUrlSpy: () => this.mockRouter.navigateByUrl,
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
    filterByTypeNameSpy: () => this.mockPokemonService.filterByTypeName,
  };
}
