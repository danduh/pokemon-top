import styled from 'styled-components';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  console.log('http-mfe-react-element App');
  return (
    <StyledApp>
      <NxWelcome title="details" />
    </StyledApp>
  );
}

export default App;
