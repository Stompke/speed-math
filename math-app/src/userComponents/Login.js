import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import '../App.css';
import Paper from '@material-ui/core/Paper';

import { loadingAnimation } from './loadingAnimation';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        color: 'white',
      },
    },
    paper: {
      padding: 50,
      background: '#ffffff90'
    }
  }));

const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading ] = useState(false);
    const [ credentials, setCredentials ] = useState({});
    const [open, setOpen] = useState(false);
    const [ snackbarText, setSnackbarText ] = useState({})


    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    const onChangeHandler = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }
    
    const loginUser = e => {
      setLoading(true)
      e.preventDefault()
      axiosWithAuth()
      .post('api/users/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        setLoading(false)
        history.push('/')
      })
      .catch( err => {
        console.log(err.response.data.message)
        setSnackbarText(err.response.data.message)
        setLoading(false)
        handleSnackbar()
        
      })
    }

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
            <h1>Login</h1>
            <form onSubmit={loginUser} className={classes.root} noValidate autoComplete="off">
                  <TextField onChange={onChangeHandler} name="email" id="email" label="email" variant="outlined" />
                  {/* <TextField onChange={onChangeHandler} name="username" id="username" label="username" variant="outlined" /> */}
                  <TextField onChange={onChangeHandler} name="password" type='password' id="password" label="password" variant="outlined" />
                {loading ?
                    loadingAnimation
                    :
                  <Button variant="contained" type='submit' color="primary">Log In</Button>
                } 
            </form>
            <h6>
              <Link to="/register" >register</Link>
            </h6>
          </Paper>
          <div className={classes.root}>
            {snackbarWithText(snackbarText)}
          </div>
          {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Welcome!
            </Alert>
          </Snackbar> */}
        </div>
    )
}

export default Login;