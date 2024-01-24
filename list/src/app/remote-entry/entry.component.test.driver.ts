import type { Type } from '@angular/core';
import { UrlTree, type Router, type UrlCreationOptions } from '@angular/router';
import { CypressHelper } from '@shellygo/cypress-test-utils';
import { CypressAngularComponentHelper } from '@shellygo/cypress-test-utils/angular';
import { MountConfig } from 'cypress/angular';
import { Observable } from 'rxjs';
import { HeaderComponentDriver } from '../components/header/header.component.test.driver';
import { PokemonCardComponentDriver } from '../pokemon-card/pokemon-card.test.driver';
import type { RemoteEntryComponent } from './entry.component';

export class RemoteEntryComponentDriver {
  private helper = new CypressHelper();
  private componentHelper =
    new CypressAngularComponentHelper<RemoteEntryComponent>();
  private cardDriver = new PokemonCardComponentDriver();
  private headerDriver = new HeaderComponentDriver();
  private componentProperties: Partial<RemoteEntryComponent> = {};

  private mockRouter: Partial<Router> = {
    events: new Observable(),
    createUrlTree: (
      commands: any[],
      navigationExtras?: UrlCreationOptions | undefined
    ) => new UrlTree(),
    serializeUrl: (url: UrlTree) => '',
  };

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
    this.cardDriver.beforeAndAfter();
    this.headerDriver.beforeAndAfter();
  };

  given = {
    header: this.headerDriver.given,
    card: this.cardDriver.given,

    spyOnNavigateByUrl: () =>
      (this.mockRouter.navigateByUrl = this.helper.given.spy('navigateByUrl')),
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
    navigateByUrlSpy: () => this.helper.get.spy('navigateByUrl'),
    pokemonNameText: () => this.helper.get.elementsText('pokemon-name'),
    overlay: () => this.helper.get.element('.ant-image-preview-wrap'),
  };
}
