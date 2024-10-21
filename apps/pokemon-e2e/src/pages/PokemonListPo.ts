export class PokemonListPage {
  // Selectors
  private nameInput = '[data-cy="name-id-input"]';
  private goToButton = '[data-cy="go-to"]';
  private typesSelect = '[data-cy="types"]';
  private pokemonCards = '[data-cy="pokemon-card"]';
  private pokemonImages = '[data-cy="pokemon-image"]';
  private pokemonNames = '[data-cy="pokemon-name"]';
  private moreInfoLinks = '[data-cy="more-info"]';

  // Methods
  enterName(name: string) {
    cy.get(this.nameInput).type(name);
  }

  clickGoToButton() {
    cy.get(this.goToButton).click();
  }

  selectType(type: string) {
    cy.get(this.typesSelect).click();
    cy.get('.ant-select-item-option-content').contains(type).click();
  }

  getPokemonCards() {
    return cy.get(this.pokemonCards);
  }

  getPokemonCardByName(name: string) {
    return cy.get(this.pokemonCards).contains(this.pokemonNames, name).parent();
  }

  getPokemonImageByName(name: string) {
    return this.getPokemonCardByName(name).find(this.pokemonImages);
  }

  clickMoreInfoByName(name: string) {
    this.getPokemonCardByName(name).find(this.moreInfoLinks).click();
  }
}