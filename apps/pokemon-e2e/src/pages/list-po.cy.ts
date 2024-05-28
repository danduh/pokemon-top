export class PokemonListPage {
  getNameIdInput() {
    return cy.get('[data-cy="name-id-input"]');
  }

  getGoToButton() {
    return cy.get('[data-cy="go-to"]');
  }

  getTypesSelect() {
    return cy.get('[data-cy="types"]');
  }

  getPokemonCards() {
    return cy.get('[data-cy="pokemon-card"]');
  }

  getPokemonCardByName(name: string) {
    return cy.get('[data-cy="pokemon-card"]').contains('[data-cy="pokemon-name"]', name).parents('[data-cy="pokemon-card"]');
  }

  getPokemonImages() {
    return cy.get('[data-cy="pokemon-image"]');
  }

  getPokemonNames() {
    return cy.get('[data-cy="pokemon-name"]');
  }

  getMoreInfoLinks() {
    return cy.get('[data-cy="more-info"]');
  }

  getMoreInfoLinkByName(name: string) {
    return cy.get('[data-cy="more-info"]').contains(name);
  }
}