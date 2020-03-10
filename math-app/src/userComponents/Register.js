import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import Paper from '@material-ui/core/Paper';



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
    paper: {
      padding: 50,
      background: '#ffffff90'
    },
  }));

const Register = () => {
    const classes = useStyles();
    const [ credentials, setCredentials ] = useState({});

    const onChangeHandler = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    const registerUser = e => {
      e.preventDefault();
      axios
      .post('http://localhost:5000/api/users/', credentials)
      .then(res => {
        console.log(res)
      })
      .catch( err => {
        console.log(err.message)
      })
    }

    return (
        <div className='App-header'>
          <Paper className={classes.paper} elevation={3}>
            <h1>Register</h1>
            <form onSubmit={registerUser} className={classes.root} noValidate autoComplete="off">
                <TextField onChange={onChangeHandler} name="email" id="email" label="email" variant="outlined" />
                <TextField onChange={onChangeHandler} name="username" id="username" label="username" variant="outlined" />
                <TextField onChange={onChangeHandler} name="password" type='password' id="password" label="password" variant="outlined" />
                <Button variant="contained" type='submit' color="primary">Register</Button>
            </form>
            <h6>
              <Link to='/login'>login</Link>
            </h6>
          </Paper>
        </div>
    )
}

export default Register;