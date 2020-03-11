import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

import Paper from '@material-ui/core/Paper';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [open, setOpen] = useState(false);
    const [ snackbarText, setSnackbarText ] = useState({})
    const history = useHistory();

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
        localStorage.setItem('token', res.data.token)
        history.push('/')
      })
      .catch( err => {
        // console.log(err.message)
        // console.log(err.response.data.message)
        setSnackbarText(err.response.data.message)
        handleSnackbar()
      })
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleSnackbar = () => {
      setOpen(true);
    };

    const snackbarWithText = (text) => {
      return (
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert severity="error">{text}</Alert>
        </Snackbar>
      )
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
          <div className={classes.root}>
            {snackbarWithText(snackbarText)}
          </div>
        </div>
    )
}

export default Register;