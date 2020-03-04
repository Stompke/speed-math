import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

const Login = () => {
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
      })
      .catch( err => {
        console.log(err)
      })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser} className={classes.root} noValidate autoComplete="off">
                <TextField onChange={onChangeHandler} name="email" id="email" label="email" variant="outlined" />
                {/* <TextField onChange={onChangeHandler} name="username" id="username" label="username" variant="outlined" /> */}
                <TextField onChange={onChangeHandler} name="password" type='password' id="password" label="password" variant="outlined" />
                  <Button variant="contained" type='submit' color="primary">Primary</Button>
        </form>
        </div>
    )
}

export default Login;