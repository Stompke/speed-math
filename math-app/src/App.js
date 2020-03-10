import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch} from 'react-router-dom'


//components
import Login from './userComponents/Login';
import Register from './userComponents/Register';
import Navbar from './userComponents/Navbar';


function App() {
  return (
    <div className="App">


        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Navbar />
            
          </Route>

        </Switch>



    </div>
  );
}

export default App;
