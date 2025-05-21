import './style/App.css';
import { Routes, Route } from 'react-router-dom';

import { MainApp } from './pages';
import { PokemonProvider } from './global-state/contexts/pokemonContext';
import { FilterProvider } from './global-state/contexts/FilterContext';

function App() {
  return (
    <PokemonProvider>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<MainApp />} />
        </Routes>
      </FilterProvider>
    </PokemonProvider>
  );
}

export default App;
