import { aPokemon } from '@pokemon/test-helpers';
import { then } from '@shellygo/cypress-test-utils/assertable';
import { Chance } from 'chance';
import { PokemonImageComponentDriver } from '../pokemon-image/pokemon-image.test.driver';
import { PokemonImage } from './pokemon-image';

describe('When rendering PokemonDetails component', () => {
  let { beforeAndAfter, given, when, get } = new PokemonImageComponentDriver();
  beforeAndAfter();

  const chance = new Chance();
  const id = chance.integer({ min: 2, max: 100 });

  const pokemonResponse = aPokemon(id);
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  beforeEach(() => {
    ({ beforeAndAfter, given, when, get } = new PokemonImageComponentDriver());
    given.name(pokemonResponse.name);
    given.src(src);
  });

  describe('given valid image response', () => {
    beforeEach(() => {
      given.mockImageResponse('default.png');
    });

    it('should render image', () => {
      when.render(PokemonImage);
      then(get.pictureSrc()).shouldEqual(src);
    });

    it('should not render spinner', () => {
      when.render(PokemonImage);
      then(get.spinner()).shouldNotExist();
    });
  });

  describe('given missing image response', () => {
    beforeEach(() => {
      given.missingImage();
    });

    it('should not render image', () => {
      when.render(PokemonImage);
      then(get.pokemonImage()).shouldNotBeVisible();
    });

    it('should render spinner', () => {
      when.render(PokemonImage);
      then(get.spinner()).shouldBeVisible();
    });
  });
});
