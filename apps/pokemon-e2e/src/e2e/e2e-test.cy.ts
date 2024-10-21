import { PokemonListPage } from '../pages/PokemonListPo';
import { PokemonDetailsPage } from '../pages/PokemonDetailPo';

describe('Pokemon Search and Navigation Test', () => {
  const pokemonListPage = new PokemonListPage();
  const pokemonDetailsPage = new PokemonDetailsPage();

  it('should search for pokemon and navigate to details', () => {
    // Step 1: Navigate to the Pokemon List Page
    cy.visit('/');

    // Step 2: Search for "ivysaur"
    pokemonListPage.enterName('ivysaur');
    pokemonListPage.clickGoToButton();
    
    // Step 3: Ensure navigation to "ivysaur" details page
    pokemonDetailsPage.getPokemonName().should('contain', 'ivysaur');

    // Step 4: Click Next button to navigate to "venusaur"
    pokemonDetailsPage.clickNextButton();

    // Step 5: Check that the pokemon details page shows "venusaur"
    pokemonDetailsPage.getPokemonName().should('contain', 'venusaur');
  });
});
