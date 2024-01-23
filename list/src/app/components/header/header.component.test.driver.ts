import type { Type } from '@angular/core';
import type { Router } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { NamedAPIResource } from 'pokenode-ts';
import { BehaviorSubject } from 'rxjs';
import type { PokemonService } from '../../services/pokemon.service';
import type { HeaderComponent } from './header.component';

export class HeaderComponentDriver {
  private helper = new CypressHelper();
  private angularComponentHelper =
    new CypressAngularComponentHelper<HeaderComponent>();
  private componentProperties: Partial<HeaderComponent> = {};

  private mockPokemonService: Partial<PokemonService> = {
    pokemonTypes: new BehaviorSubject([] as NamedAPIResource[]),
    // pokemons: new BehaviorSubject([] as BetterPokemon[]),
  };

  private mockRouter: Partial<Router> = {};

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  given = {
    types: (value: string[]) =>
      this.mockPokemonService.pokemonTypes?.next(
        value.map((name) => ({ name, url: '' }))
      ),
    // pokemons: (value: { name: string; id: number }[]) =>
    //   this.mockPokemonService.pokemons?.next(
    //     value.map(({ name, id }) => ({ name, id, url: '' }))
    //   ),
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
    selectType: (type: string) => {
      this.helper.when.doWithin(
        () => this.helper.get.element('input').select(type),
        'type'
      );
    },
    typeIDorName: (value: string) =>
      this.helper.when.type('name-id-input', value),
    clickGo: () => this.helper.when.click('go-to'),
  };

  get = {
    mockPokemonService: () => this.mockPokemonService,
    mockRouter: () => this.mockRouter,
    typeOptionText: () => this.helper.get.elementsText('type-option'),
    numberOfTypeOptions: () => this.helper.get.numberOfElements('type-option'),
    navigateByUrlSpy: () => this.helper.get.spy('navigateByUrl'),
  };
}
