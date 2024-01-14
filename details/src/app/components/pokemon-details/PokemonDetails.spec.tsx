import { render } from '@testing-library/react';

import PokemonDetails from './PokemonDetails';

describe('PokemonDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonDetails />);
    expect(baseElement).toBeTruthy();
  });
});
