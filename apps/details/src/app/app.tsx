import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { PokemonDetails } from './components/pokemon-details/pokemon-details';

const StyledApp = styled.div`
  background-color: #f0f3fa;
`;

export function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="details/name/venusaur" replace />} />
          </Route>
          <Route path="details">
            <Route path="" element={<PokemonDetails />}></Route>
            <Route path="id">
              <Route path=":id" element={<PokemonDetails />} />\
            </Route>
            <Route path="name">
              <Route path=":name" element={<PokemonDetails />} />\
            </Route>
          </Route>
          <Route path="pokemon-top">
            <Route path="details">
              <Route path="" element={<PokemonDetails />}></Route>
              <Route path="id">
                <Route path=":id" element={<PokemonDetails />} />\
              </Route>
              <Route path="name">
                <Route path=":name" element={<PokemonDetails />} />\
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
