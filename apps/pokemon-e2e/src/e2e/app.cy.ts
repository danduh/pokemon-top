import { PokemonListPage } from './../pages/list-po.cy';
import { PokemonDetailsPage } from './../pages/details-po.cy';
describe('Pokemon Search and Navigation', () => {
  const pokemonListPage = new PokemonListPage();
  const pokemonDetailsPage = new PokemonDetailsPage();

  it('should search for Ivysaur and navigate to its details page, then navigate to Venusaur details page', () => {
      // Visit Pokemon List Page
      cy.visit('/');

      // Search for Ivysaur
      pokemonListPage.getNameIdInput().type('ivysaur');
      pokemonListPage.getGoToButton().click();

      // Verify navigation to Ivysaur Details Page
      pokemonDetailsPage.pokemonName.should('contain', 'ivysaur');

      // Click on the Next button
      pokemonDetailsPage.nextButton.click();

      // Verify navigation to Venusaur Details Page
      pokemonDetailsPage.pokemonName.should('contain', 'venusaur');
  });
});