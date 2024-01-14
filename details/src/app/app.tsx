import styled from 'styled-components';

import PokemonDetails from './components/pokemon-details/PokemonDetails';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <PokemonDetails />
    </StyledApp>
  );
}

export default App;
