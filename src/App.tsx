import './style/App.css';
import { Routes, Route } from 'react-router-dom';

import { MainApp } from './pages';
import { PokemonProvider } from './global-state/contexts/pokemonContext';
import { FilterProvider } from './global-state/contexts/FilterContext';
import { Compare } from './pages/compare';

function App() {
  return (
    <PokemonProvider>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </FilterProvider>
    </PokemonProvider>
  );
}

export default App;
