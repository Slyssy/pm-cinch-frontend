import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//# Component Imports............................................
import Navigation from './components/Navigation';
// import Dashboard from './components/Dashboard';
import Router from './Router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
