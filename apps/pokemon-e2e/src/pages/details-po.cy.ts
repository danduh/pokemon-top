export class PokemonDetailsPage {
  get pokemonImage() {
    return cy.get('[data-cy=pokemon-image]');
  }

  get pokemonName() {
    return cy.get('[data-cy=pokemon-name]');
  }

  get prevButton() {
    return cy.get('[data-cy=prev]');
  }

  get nextButton() {
    return cy.get('[data-cy=next]');
  }

  get abilities() {
    return cy.get('[data-cy=pokemon-ability]');
  }

  ability(name: string) {
    return this.abilities.contains(name);
  }

  get types() {
    return cy.get('[data-cy=pokemon-type]');
  }

  type(name: string) {
    return this.types.contains(name);
  }

  get moves() {
    return cy.get('[data-cy=pokemon-move]');
  }

  move(name: string) {
    return this.moves.contains(name);
  }
}
