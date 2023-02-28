import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import './App.css';
// import Order from './components/Order';

function App() {
  return (
    <PlanetsProvider>
      <h1>StarWars</h1>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
