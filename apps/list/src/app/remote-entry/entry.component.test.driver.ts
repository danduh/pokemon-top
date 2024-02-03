import type { Type } from '@angular/core';
import { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderComponentDriver } from '../components/header/header.component.test.driver';
import { SearchComponentDriver } from '../search/serach.component.test.driver';
import { BetterPokemon, PokemonService } from '../services/pokemon.service';
import type { RemoteEntryComponent } from './entry.component';

export class RemoteEntryComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<RemoteEntryComponent>();
  private searchDriver = new SearchComponentDriver();
  private headerDriver = new HeaderComponentDriver();
  private componentProperties: Partial<RemoteEntryComponent> = {};

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
    this.searchDriver.beforeAndAfter();
    this.headerDriver.beforeAndAfter();
  };

  given = {
    header: this.headerDriver.given,
    search: this.searchDriver.given,
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
    header: this.headerDriver.when,
    search: this.searchDriver.when,
    render: (
      type: Type<RemoteEntryComponent>,
      config: MountConfig<RemoteEntryComponent>
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
    navigateByUrlSpy: () =>
      this.helper.get.assertableStub(this.mockRouter.navigateByUrl),
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
    filterByTypeNameSpy: () =>
      this.helper.get.assertableStub(this.mockPokemonService.filterByTypeName),
  };
}
