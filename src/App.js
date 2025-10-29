import './App.css';
import React from 'react';
import ListScreen from './components/ListScreen';

function App() {
  return (
    <ListScreen initialItems={["bacon", "eggs", "oil", "avocado"]} />
    

  );
}

export default App;
