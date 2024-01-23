import { TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';

describe(PokemonCardComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PokemonCardComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(PokemonCardComponent, {
      componentProperties: {
        pokeId: 0,
      },
    });
  });
});
