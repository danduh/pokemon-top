import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const DetailslMfe = React.lazy(
  () => import('details/Module')
  //.then(module => ({ default: module.TagModal }))
);

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/details">Details</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="pokemon" />} />
        <Route path="/details" element={<DetailslMfe />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
