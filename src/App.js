import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListsProvider } from './context/ListsContext';
import ListsOverview from './components/ListsOverview';
import ListScreen from './components/ListScreen';

function App() {
  return (
    <ListsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListsOverview />} />
          <Route path="/list/:listId" element={<ListScreen />} />
        </Routes>
      </Router>
    </ListsProvider>
  );
}

export default App;
