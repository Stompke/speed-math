import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        color: 'white',
      },
    },
  }));

const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [ credentials, setCredentials ] = useState({});

    const onChangeHandler = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    const loginUser = e => {
      e.preventDefault();
      axios
      .post('http://localhost:5000/api/users/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.message)
        history.push('/');
      })
      .catch( err => {
        console.log(err)
      })
    }

    return (
        <div className='App-header'>
            <h1>Login</h1>
            <form onSubmit={loginUser} className={classes.root} noValidate autoComplete="off">
                <TextField onChange={onChangeHandler} name="email" id="email" label="email" variant="outlined" />
                {/* <TextField onChange={onChangeHandler} name="username" id="username" label="username" variant="outlined" /> */}
                <TextField onChange={onChangeHandler} name="password" type='password' id="password" label="password" variant="outlined" />
                  <Button variant="contained" type='submit' color="primary">Log In</Button>
        </form>
        <Link to="/register" >register</Link>
        </div>
    )
}

export default Login;