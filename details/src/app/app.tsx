import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { PokemonDetails } from './components/pokemon-details/PokemonDetails';

const StyledApp = styled.div`
  background-color: #f0f3fa;
  height: 98vh;
`;

export function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<PokemonDetails />}></Route>
          <Route path="id">
            <Route path=":id" element={<PokemonDetails />} />\
          </Route>
          <Route path="name">
            <Route path=":name" element={<PokemonDetails />} />\
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
