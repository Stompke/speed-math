import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'


//components
import Login from './userComponents/Login';
import Register from './userComponents/Register';
import Navbar from './userComponents/Navbar';
import PrivateRoute from './utils/PrivateRoute';


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
          <PrivateRoute component={Navbar} path="/" />
        </Switch>
    </div>
  );
}

export default App;
