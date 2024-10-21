export class PokemonDetailsPage {
    // Selectors
    private backButton = '[data-cy="back"]';
    private pokemonName = '[data-cy="pokemon-name"]';
    private pokemonImage = '[data-cy="pokemon-image"]';
    private prevButton = '[data-cy="prev"]';
    private nextButton = '[data-cy="next"]';
    private pokemonAbilities = '[data-cy="pokemon-ability"]';
    private pokemonTypes = '[data-cy="pokemon-type"]';
    private pokemonMoves = '[data-cy="pokemon-move"]';
  
    // Methods
    clickBackButton() {
      cy.get(this.backButton).click();
    }
  
    getPokemonName() {
      return cy.get(this.pokemonName);
    }
  
    getPokemonImage() {
      return cy.get(this.pokemonImage);
    }
  
    clickPrevButton() {
      cy.get(this.prevButton).click();
    }
  
    clickNextButton() {
      cy.get(this.nextButton).click();
    }
  
    getPokemonAbilities() {
      return cy.get(this.pokemonAbilities);
    }
  
    getPokemonAbilityByText(text: string) {
      return cy.get(this.pokemonAbilities).contains(text);
    }
  
    getPokemonTypes() {
      return cy.get(this.pokemonTypes);
    }
  
    getPokemonTypeByText(text: string) {
      return cy.get(this.pokemonTypes).contains(text);
    }
  
    getPokemonMoves() {
      return cy.get(this.pokemonMoves);
    }
  
    getPokemonMoveByText(text: string) {
      return cy.get(this.pokemonMoves).contains(text);
    }
  }