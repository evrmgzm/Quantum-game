import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import QuantumPuzzle from './components/QuantumPuzzle';

function App() {
  return (
    // LanguageProvider, içindeki tüm bileşenlerin dil context'ine erişmesini sağlar.
    <LanguageProvider>
      <QuantumPuzzle />
    </LanguageProvider>
  );
}

export default App;