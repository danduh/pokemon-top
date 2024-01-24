import type { Type } from '@angular/core';
import type { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject } from 'rxjs';
import type {
  BetterPokemon,
  PokemonService,
} from '../../services/pokemon.service';
import type { HeaderComponent } from './header.component';

export class HeaderComponentDriver {
  private helper = new CypressHelper();
  private angularComponentHelper =
    new CypressAngularComponentHelper<HeaderComponent>();
  private componentProperties: Partial<HeaderComponent> = {};

  private mockPokemonService: Partial<PokemonService> = {
    pokemonTypes: new BehaviorSubject([] as NamedAPIResource[]),
    loadTypes: () => {},
    getPokemons: () => this.mockPokemonService.pokemons!,
    pokemons: new BehaviorSubject([] as BetterPokemon[]),
    initialLoad: () => {},
    filterByTypeName: () => {},
  };

  private mockRouter: Partial<Router> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    beforeEach(() => {
      this.mockPokemonService.loadTypes = this.helper.given.spy('loadTypes');
      this.mockPokemonService.initialLoad =
        this.helper.given.spy('initialLoad');
      this.mockPokemonService.filterByTypeName =
        this.helper.given.spy('filterByTypeName');
    });
  };

  given = {
    types: (value: string[]) =>
      this.mockPokemonService.pokemonTypes?.next(
        value.map((name) => ({ name, url: '' }))
      ),
    pokemons: (value: { name: string; id: number }[]) =>
      this.mockPokemonService.pokemons?.next(
        value.map(({ name, id }) => ({ name, id, url: '' }))
      ),
    spyOnNavigateByUrl: () =>
      (this.mockRouter.navigateByUrl = this.helper.given.spy('navigateByUrl')),
  };

  when = {
    render: (
      type: Type<HeaderComponent>,
      config: MountConfig<HeaderComponent>
    ) => {
      this.angularComponentHelper.when.mount(type, config, {
        ...this.componentProperties,
      });
    },
    selectType: (index: number) => {
      this.helper.when.click('type-option', index);
    },
    typeIDorName: (value: string) =>
      this.helper.when.type('name-id-input', value),
    clickGo: () => this.helper.when.click('go-to'),
    clickTypesList: () => this.helper.when.click('types'),
  };

  get = {
    mockPokemonService: () => this.mockPokemonService,
    mockRouter: () => this.mockRouter,
    typeOptionText: (index: number) =>
      this.helper.get.elementsText('type-option', index),
    numberOfTypeOptions: () => this.helper.get.numberOfElements('type-option'),
    navigateByUrlSpy: () => this.helper.get.spy('navigateByUrl'),
    loadTypesSpy: () => this.helper.get.spy('loadTypes'),
    filterByTypeNameSpy: () => this.helper.get.spy('filterByTypeName'),
  };
}
