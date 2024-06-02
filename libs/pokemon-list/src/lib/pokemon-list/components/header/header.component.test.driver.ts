import type { Type } from '@angular/core';
import { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { SinonStub } from 'cypress/types/sinon';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject, Subject } from 'rxjs';
import { StubbedInstance } from 'ts-stubber';
import { BetterPokemon, PokemonService } from '../../services/pokemon.service';
import type { HeaderComponent } from './header.component';
export class HeaderComponentDriver {
  private helper = new CypressHelper();
  private angularComponentHelper =
    new CypressAngularComponentHelper<HeaderComponent>();
  private componentProperties: Partial<HeaderComponent> = {};

  private mockPokemonService = this.helper.given.stubbedInstance(
    PokemonService,
    {
      pokemonTypes: new BehaviorSubject<NamedAPIResource[]>([]),
      pokemons: new BehaviorSubject<BetterPokemon[]>([]),
    }
  );

  private mockRouter = this.helper.given.stubbedInstance(Router);

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    types: (value: string[]) =>
      (
        this.mockPokemonService.pokemonTypes as unknown as Subject<
          NamedAPIResource[]
        >
      ).next(value.map((name) => ({ name, url: '' }))),
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
    mock: {
      pokemonService: (): StubbedInstance<PokemonService, SinonStub> &
        PokemonService => this.mockPokemonService,
      router: (): StubbedInstance<Router, SinonStub> & Router =>
        this.mockRouter,
    },
    typeOptionText: (index: number) =>
      this.helper.get.elementsText('type-option', index),
    numberOfTypeOptions: () => this.helper.get.numberOfElements('type-option'),
    navigateByUrlSpy: () => this.get.mock.router().navigateByUrl,
    loadTypesSpy: () => this.get.mock.pokemonService().loadTypes,
    filterByTypeNameSpy: () => this.get.mock.pokemonService().filterByTypeName,
  };
}
