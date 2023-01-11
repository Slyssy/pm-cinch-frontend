import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
//# Component Imports............................................
import Navigation from './components/Navigation';
// import Dashboard from './components/Dashboard';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Router />
    </BrowserRouter>
  );
}

export default App;
