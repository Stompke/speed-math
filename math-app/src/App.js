import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './userComponents/Login'
import Register from './userComponents/Register'

//components


function App() {
  return (
    <div className="App">

        <span className="App-logo" alt="logo"><p>+</p></span>
        <h1>Math Game</h1>
        <Login />
        <Register />

    </div>
  );
}

export default App;
