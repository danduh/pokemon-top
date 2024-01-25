import type { Type } from '@angular/core';
import { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponentDriver } from '../components/header/header.component.test.driver';
import { PokemonCardComponentDriver } from '../pokemon-card/pokemon-card.test.driver';
import { BetterPokemon, PokemonService } from '../services/pokemon.service';
import type { RemoteEntryComponent } from './entry.component';

export class RemoteEntryComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<RemoteEntryComponent>();
  private cardDriver = new PokemonCardComponentDriver();
  private headerDriver = new HeaderComponentDriver();
  private componentProperties: Partial<RemoteEntryComponent> = {};

  private mockPokemonService =
    this.helper.given.stubbedInstance(PokemonService);

  private mockRouter = this.helper.given.stubbedInstance(Router);

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.cardDriver.beforeAndAfter();
    this.headerDriver.beforeAndAfter();
    this.mockPokemonService.pokemonTypes = new BehaviorSubject(
      [] as NamedAPIResource[]
    );
    this.mockPokemonService.pokemons = new BehaviorSubject(
      [] as BetterPokemon[]
    );
  };

  given = {
    header: this.headerDriver.given,
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
    header: this.headerDriver.when,
    card: this.cardDriver.when,
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
    card: this.cardDriver.get,
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
