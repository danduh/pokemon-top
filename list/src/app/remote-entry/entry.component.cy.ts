import { TestBed } from '@angular/core/testing';
import { RemoteEntryComponent } from './entry.component';

describe(RemoteEntryComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(RemoteEntryComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(RemoteEntryComponent);
  });
});
