import './style/App.css';
import { Routes, Route } from 'react-router-dom';

import { MainApp } from './pages';
import { PokemonProvider } from './global-state/contexts/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </PokemonProvider>
  );
}

export default App;
